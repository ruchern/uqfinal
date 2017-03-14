from sqlalchemy import orm
from flask_sqlalchemy import SQLAlchemy

DB = SQLAlchemy()
Session = DB.session
