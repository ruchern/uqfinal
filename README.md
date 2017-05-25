# UQ Final #

UQ Final is a tool which helps students calculate what grades they need to get on their assessment in order to achieve a desired grade in courses at [The University of Queensland](http://www.uq.edu.au/).

You can use the tool at [uqfinal.com](https://uqfinal.com).

UQ Final is not associated with The University of Queensland.

## Software Structure ##
The app is in two parts, the fully-static webapp and the Python api which powers it.

### Webapp ###
The webapp found in the `/site` directory is fully static and is served to the users with S3 and Cloudfront.

You can contribute to the webapp in simple Javascript, HTML and LESS without any required knowledge of templating or server side code.
The site can be run locally and is configured to point to the production API.
The core files for contribution in this area are `index.html`, `app.less` and `app.js`.

### API ###
The API found in the `/api` directory is a Python Flask app which is served by AWS Lambda and API Gateway in production.

To run the API locally you need to install it using `pip install .`.
<br />Then, set the `UQFINAL_DB_URI` environment variable to a [Database URL](http://docs.sqlalchemy.org/en/latest/core/engines.html#database-urls).
You can generate the required tables in your database by running `python run.py generatedb`. The tables will be empty, you can populate the `semester` table using data from [ROTA](http://rota.eait.uq.edu.au/semesters.json).

The production database is MariaDB, other database software may work but is untested at this stage.
