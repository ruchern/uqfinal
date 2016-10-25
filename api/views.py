"""
Views
"""
import json


def respond(err=None, res=None):
    """
    Formats a json response for API Gateway
    :param err: Error dictionary
    :type err: Exception or None
    :param res: Response string
    :type res: str
    :return:
    """
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
        },
    }


def introspect(event):
    """
    Prints back the request details to the user
    :param event: API Gateway Request
    """
    return respond(None, json.dumps(event))


def get_semesters():
    """
    Gets the list of semesters
    """
    # TODO Database
    data = {
        'semesters': [
            {
                'name': 'Semester 2, 2015',
                'shortName': 'Sem 2, 2015',
                'uqId': 6560,
            },
            {
                'name': 'Semester 1, 2016',
                'shortName': 'Sem 1, 2016',
                'uqId': 6620,
            },
            {
                'name': 'Semester 2, 2016',
                'shortName': 'Sem 2, 2016',
                'uqId': 6660,
            },
        ]
    }
    return respond(None, json.dumps(data))


def get_offering(semester_uqid, course_code):
    """
    Get data about an offering
    :param semester_uqid: UQID for a semester
    :type semester_uqid: int
    :param course_code: Course code
    :type course_code: str
    """
    # TODO database
    try:
        fn = 'json/{semester}/{coursecode}.json'.format(semester_uqid, course_code)
        with open(fn, 'r') as f:
            data = f.read()
            return respond(None, data)
    except IOError:
        return respond({'message': 'Course code not found'})
