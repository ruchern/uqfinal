import os

from app import webapp
from orm import DB, Session
import models

webapp.config.update({
    'SQLALCHEMY_DATABASE_URI': os.environ['UQFINAL_DB_URI'],
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
})
DB.init_app(webapp)


if __name__ == "__main__":
    import sys
    args = sys.argv
    if len(args) > 1 and args[1] == "generatedb":
        with webapp.app_context():
            s = Session()
            models.ORMBase.metadata.create_all(s.connection())
            s.commit()
    else:
        webapp.run(port=8080)
