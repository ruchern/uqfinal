"""
Entry point for Lambda from API Gateway
"""
import views
import re


def lambda_handler(event, context):
    """
    Entry function for Lambda function, split up from here
    :param event: Event object
    :type event: dict
    :param context: Context object
    :type context: ?????????
    :return: Response json blob
    """
    body = event.get('body')
    headers = event.get('headers', {})
    method = event.get('httpMethod')
    params = event.get('pathParameters', {})
    query = event.get('queryStringParameters', {})
    path = event.get('path', '')

    # TODO: Replace all this with a router library

    # Introspection
    if path is '/introspect':
        return views.introspect(event)

    # Semesters
    if path is '/semesters' and method is 'GET':
        return views.get_semesters()

    # Course info
    courseMatchObj = re.match(r'/courses/(\d+)/([A-Z|0-9]+)', path)
    if method is 'GET' and courseMatchObj:
        semester = int(courseMatchObj.group(1))
        courseCode = courseMatchObj.group(2)
        return views.get_offering(semester, courseCode)
