"""
Scraping logic
"""
from lxml import html, etree
import requests


class ScraperException(Exception):
    pass


class ScraperNoCourseProfileException(ScraperException):
    pass


class ScraperUnavailableCourseProfileException(ScraperException):
    pass


class ScraperInvalidCourseProfileException(ScraperException):
    pass


def scrape_assessment(semester_string, course_code):
    course_profile_url = _get_course_profile_assessment_url(semester_string, course_code)
    if course_profile_url is None:
        return None
    page = requests.get(course_profile_url)
    tree = html.fromstring(page.text)

    # Read the table
    assessment_tasks_elements = tree.xpath('//table[@class="tblborder"]/tr[position() > 1]/td[1]/div')
    assessment_tasks = [
        etree.tostring(element).split("<br />", 1)[1].split("</div>", 1)[0].replace('&amp;', '&')
        for element in assessment_tasks_elements
    ]

    assessment_weighting_elements = tree.xpath('//table[@class="tblborder"]/tr[position() > 1]/td[3]/div')
    assessment_weights = [
        etree.tostring(element).split(">", 1)[1].split("%", 1)[0].split("</", 1)[0]
        for element in assessment_weighting_elements
    ]

    # TODO Fix bug when assessment contains non escaped '<' or '>'
    if len(assessment_tasks) < 1 or len(assessment_tasks) != len(assessment_weights):
        raise ScraperInvalidCourseProfileException()

    # Convert to dict
    return [
        {
            'task': task[0],
            'weight': task[1],
        }
        for task in zip(assessment_tasks, assessment_weights)
    ]


def _get_course_profile_assessment_url(semester_string, course_code):
    # Load the UQ offerings page to get the profileid
    course_page_url = "https://www.uq.edu.au/study/course.html?course_code={}".format(course_code)
    headers = {
        'User-Agent': 'UQ Final 1.0',
        'From': 'mitch@gricey.net',
    }
    page = requests.get(course_page_url, headers=headers)
    tree = html.fromstring(page.text)

    # Get the list of available profiles
    offering_rows = tree.xpath('//table[@class="offerings"]/tbody/tr')
    for offering_row in offering_rows:
        cells = offering_row.xpath('td')
        semester = cells[0].xpath('a')[0].text.strip()
        if semester == semester_string:
            location = cells[1].text.strip()
            mode = cells[2].text.strip()

            profile_cell_contents = cells[3][0]
            if profile_cell_contents.tag == 'a':
                return profile_cell_contents.attrib['href'] + "&section=5"
            else:
                raise ScraperUnavailableCourseProfileException()

    # Nothing found
    raise ScraperNoCourseProfileException()
