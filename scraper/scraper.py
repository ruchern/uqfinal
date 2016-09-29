from lxml import html, etree
import requests
import sys
import json


def get_course_codes():
    with open('courses.csv', 'r') as f:
        return [l.strip() for l in f]
    page = requests.get("http://rota.eait.uq.edu.au/semester/6660/offerings.json")
    data = json.loads(page.text)

    return [o['course']['code'] for o in data]


class Course(object):
    PROFILE_UNAVAILABLE = "Profile unavailable"

    MESSAGE_NO_COURSE_PROFILE = "This course has no Course Profile on the UQ website. A valid course profile is required to calculate grades."
    MESSAGE_UNAVAILABLE_COURSE_PROFILE = "The official course profile for this course is unavailable. A valid course profile is required to calculate grades."
    MESSAGE_INVALID_COURSE_PROFILE = "The official course profile for this course contains invalid symbols and can not be read. A valid course profile is required to calculate grades."

    def __init__(self, code, semester):
        self.code = code
        self.semester = semester
        self.isCalculable = False
        self.cutoff = [
            0,
            30,
            47,
            50,
            65,
            75,
            85
        ]
        self.message = None

    def get_course_profile_assessment_url(self):
        # Load the UQ offerings page to get the profileid
        course_page_url = "https://www.uq.edu.au/study/course.html?course_code=" + self.code
        headers = {
            'User-Agent': 'UQ Final 1.0',
            'From': 'mitch@gricey.net',
        }
        course_page = requests.get(course_page_url, headers=headers)
        course_tree = html.fromstring(course_page.text)

        # Get the list of available profiles
        offering_rows = course_tree.xpath('//table[@class="offerings"]/tbody/tr')
        for offering_row in offering_rows:
            cells = offering_row.xpath('td')
            semester = cells[0].xpath('a')[0].text.strip()
            if semester == self.semester:
                location = cells[1].text.strip()
                mode = cells[2].text.strip()

                profile_cell_contents = cells[3][0]
                if profile_cell_contents.tag == 'a':
                    return profile_cell_contents.attrib['href'] + "&section=5"
                else:
                    print self.code + " : Course code's current profile is unavailable, skipped"
                    self.isCalculable = False
                    self.message = self.MESSAGE_UNAVAILABLE_COURSE_PROFILE
                    return

        # Nothing found
        print self.code + " : No course profile this semester"
        self.isCalculable = False
        self.message = self.MESSAGE_NO_COURSE_PROFILE
        return

    def get_assessment_from_uq_website(self):
        # Turn it into a new html object
        url = self.get_course_profile_assessment_url()
        if url is None:
            return None
        course_assessment_page = requests.get(url)
        course_assessment_tree = html.fromstring(course_assessment_page.text)

        # Read the table
        assessment_tasks_elements = course_assessment_tree.xpath('//table[@class="tblborder"]/tr[position() > 1]/td[1]/div')
        assessment_tasks = []
        for element in assessment_tasks_elements:
            assessment_tasks.append( etree.tostring(element).split("<br />", 1)[1].split("</div>", 1)[0].replace('&amp;', '&') )
        assessment_weighting_elements = course_assessment_tree.xpath('//table[@class="tblborder"]/tr[position() > 1]/td[3]/div')
        assessment_weights = []
        for element in assessment_weighting_elements:
            assessment_weights.append( etree.tostring(element).split(">", 1)[1].split("%", 1)[0].split("</", 1)[0] )

        # Fix bug when assessment contains '<' or '>'
        if len(assessment_tasks) != len(assessment_weights):
            print self.code + " : Course's profile contains invalid html, skipped"
            self.isCalculable = False
            self.message = self.MESSAGE_INVALID_COURSE_PROFILE
            return

        # All good
        self.isCalculable = True

        # Convert to dict
        return [
            {
                'task': assessment_tasks[i],
                'weight': assessment_weights[i]
            }
            for i in range(len(assessment_tasks))
        ]

    def get_dict(self):
        assessment = self.get_assessment_from_uq_website()

        return {
            'course': self.code,
            'semester': self.semester,
            'calculable': self.isCalculable,
            'isLinear': True,
            'assessment': assessment or [],
            'message': self.message,
            'related': [],
            'cutoff': self.cutoff,
            'manuallyModified': False,
        }

    def write_json_file(self):
        with open("json/" + self.code + ".json", "w") as f:
            json.dump(self.get_dict(), f, indent=4, separators=(',', ': '))
