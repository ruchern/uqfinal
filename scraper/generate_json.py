import scraper
import multiprocessing


# Parallel
def process_code(code):
    print code
    course = scraper.Course(code, "Semester 2, 2016")
    course.write_json_file()

if __name__ == "__main__":
    course_codes = scraper.get_course_codes()

    print "{} course codes this sememster".format(len(course_codes))
    pool = multiprocessing.Pool(5)
    pool.map(process_code, course_codes)
