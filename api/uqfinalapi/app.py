"""
UQFinal API Webapp
"""
from flask import Flask, make_response
import sqlalchemy as sa
from sqlalchemy.orm.exc import NoResultFound

from helpers import APIFailureException, APINotFoundException, APIException, api_response
from orm import Session
import models
import scraper


webapp = Flask(__name__)


# CORS
@webapp.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response


@webapp.route('/')
def home():
    return make_response("No resource specified. See the API Docs", 404)


@webapp.route('/favicon.ico')
def favicon():
    # When running on lambda, invalid requests for a favicon polute the logs with exceptions
    return make_response("Not Found", 404)


@webapp.route('/semesters', methods=['GET'])
@api_response
def get_semesters():
    semesters = Session().query(
        models.Semester
    ).all()

    return {
        'semesters': [
            semester.serialise()
            for semester in semesters
        ]
    }


@webapp.route('/course/<int:semester_uq_id>/<string:course_code>', methods=['GET'])
@api_response
def get_offering(semester_uq_id, course_code):
    try:
        offering = Session().query(
            models.Offering
        ).join(
            models.Semester,
            sa.and_(
                models.Offering.semester_id == models.Semester.id,
                models.Semester.uq_id == semester_uq_id,
            )
        ).join(
            models.Course,
            sa.and_(
                models.Offering.course_id == models.Course.id,
                models.Course.course_code == course_code,
            )
        ).one()

        return offering.serialise()
    except NoResultFound:
        # Didn't find anything existing, try scraping it
        try:
            offering = _attempt_scrape(semester_uq_id, course_code)
            return offering.serialise()
        except (scraper.ScraperException, APIException):
            # Scraping failed, probably just a bad request
            raise APINotFoundException("No offering for that course code and semester")


@webapp.route('/scrape/<int:semester_uq_id>/<string:course_code>', methods=['GET'])
@api_response
def scrape_offering(semester_uq_id, course_code):
    try:
        offering = _attempt_scrape(semester_uq_id, course_code)
        return offering.serialise()
    except scraper.ScraperInvalidCourseProfileException:
        raise APIFailureException("Course profile is invalid")
    except scraper.ScraperNoCourseProfileException:
        raise APIFailureException("There is no course profile for that course code and semester. Course might not be listed as being offered")
    except scraper.ScraperUnavailableCourseProfileException:
        raise APIFailureException("Course profile is listed as unavailable. Try again after the course profile becomes available")


def _attempt_scrape(semester_uq_id, course_code):
    try:
        semester = Session().query(
            models.Semester
        ).filter(
            models.Semester.uq_id == semester_uq_id
        ).one()
    except NoResultFound:
        raise APINotFoundException("Semester doesn't exist")

    # Don't scrape if we've already got it
    try:
        offering = Session().query(
            models.Offering
        ).join(
            models.Course,
            models.Offering.course_id == models.Course.id,
        ).filter(
            models.Course.course_code == course_code,
            models.Offering.semester_id == semester.id,
        ).one()
        # If we got to here, the offering has already been scraped and we should abort
        raise APIFailureException("Offering has already been scraped")
    except NoResultFound:
        # this is what we want
        pass

    # Actual scrape
    assessment_items = scraper.scrape_assessment(semester.semester, course_code)

    try:
        course = Session().query(
            models.Course
        ).filter(
            models.Course.course_code == course_code
        ).one()
    except NoResultFound:
        course = models.Course(course_code)
        Session().add(course)
        Session().commit()

    session = Session()

    offering = models.Offering(
        course_id=course.id,
        semester_id=semester.id,
    )
    session.add(offering)
    session.flush()

    # Add assessment items
    for item in assessment_items:
        session.add(models.AssessmentItem(
            offering_id=offering.id,
            task_name=item['task'],
            weight=item['weight'],
        ))
    session.commit()

    return offering
