# UQ Final #

The project is currently split into two main parts, the static content and the scraper. The static content is stored in an S3 bucket and served by CloudFront.
The scraper is written in python and bulk scrapes course profiles when given a semester and a list of courses.
The scraper generates JSON files which are copied into the static content.

## The goal ##
The static content is served from an S3 bucket fronted by CloudFront, as current.
The course information comes from an API Gateway with Lambda functions behind it. It generates the json blobs from a database and has full support for non-linear courses and hurdles.
The data comes from a provided UQ API instead of scraping it from ECPs.
The calculation of grades is done server-side and it logs all the entered grades, which can then be queried for aggregate statistics on a public API.
