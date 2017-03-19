"""
Database models
"""
from sqlalchemy import Column, ForeignKeyConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base, declared_attr

from orm import Session


DEFAULT_CUTOFFS = {
    1: 0,
    2: 30,
    3: 45,
    4: 50,
    5: 65,
    6: 75,
    7: 85,
}


class _ORMBase(object):
    id = Column(Integer, primary_key=True)

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()


ORMBase = declarative_base(cls=_ORMBase)


class ORMMixin(ORMBase):
    __abstract__ = True

    @declared_attr
    def __table_args__(cls):
        return cls.get_table_args()

    @classmethod
    def get_table_args(cls):
        return ()

    def serialise(self):
        raise NotImplementedError


class Semester(ORMMixin):
    semester = Column(String(255), nullable=False)  # Must match the format on uq site (e.g. "Semester 1, 2016")
    short_name = Column(String(255), nullable=False)  # Displayed on the app (e.g. "Sem 1, 2016")
    uq_id = Column(Integer, nullable=False)  # The UQ ID for a semester (e.g. 6670)
    is_current = Column(Boolean, nullable=False, default=False)  # Only one should ever be True at a time

    def serialise(self):
        return {
            'semester': self.semester,
            'shortName': self.short_name,
            'uqId': self.uq_id,
        }

    @classmethod
    def get_current_semester(cls):
        return Session().query(
            cls
        ).filter(
            cls.is_current == True,
        ).one()


class Course(ORMMixin):
    course_code = Column(String(255), nullable=False, unique=True)

    def __init__(self, course_code):
        self.course_code = course_code

    def serialise(self):
        return {
            'courseCode': self.course_code,
        }


class Offering(ORMMixin):
    """
    An offering is a course in a semester which has assessment
    """
    course_id = Column(Integer, nullable=False)
    semester_id = Column(Integer, nullable=False)
    is_linear = Column(Boolean, nullable=False, default=True)
    manually_modified = Column(Boolean, nullable=False, default=False)
    calculable = Column(Boolean, nullable=False, default=True)
    message = Column(String(255), nullable=True)

    cutoff_1 = Column(Integer, nullable=False, default=DEFAULT_CUTOFFS.get(1))
    cutoff_2 = Column(Integer, nullable=False, default=DEFAULT_CUTOFFS.get(2))
    cutoff_3 = Column(Integer, nullable=False, default=DEFAULT_CUTOFFS.get(3))
    cutoff_4 = Column(Integer, nullable=False, default=DEFAULT_CUTOFFS.get(4))
    cutoff_5 = Column(Integer, nullable=False, default=DEFAULT_CUTOFFS.get(5))
    cutoff_6 = Column(Integer, nullable=False, default=DEFAULT_CUTOFFS.get(6))
    cutoff_7 = Column(Integer, nullable=False, default=DEFAULT_CUTOFFS.get(7))

    course = relationship('Course')
    semester = relationship('Semester')

    @classmethod
    def get_table_args(cls):
        return (
            ForeignKeyConstraint(
                ['course_id'],
                ['course.id'],
                ondelete='CASCADE',
            ),
            ForeignKeyConstraint(
                ['semester_id'],
                ['semester.id'],
                ondelete='CASCADE',
            ),
        )

    def __init__(self, course_id, semester_id, is_linear=True, manually_modified=False, calculable=True, message=None,
                 cutoff_1=None, cutoff_2=None, cutoff_3=None, cutoff_4=None, cutoff_5=None, cutoff_6=None, cutoff_7=None):
        self.course_id = course_id
        self.semester_id = semester_id
        self.is_linear = is_linear
        self.manually_modified = manually_modified
        self.calculable = calculable
        self.message = message
        self.cutoff_1 = cutoff_1 or DEFAULT_CUTOFFS[1]
        self.cutoff_2 = cutoff_2 or DEFAULT_CUTOFFS[2]
        self.cutoff_3 = cutoff_3 or DEFAULT_CUTOFFS[3]
        self.cutoff_4 = cutoff_4 or DEFAULT_CUTOFFS[4]
        self.cutoff_5 = cutoff_5 or DEFAULT_CUTOFFS[5]
        self.cutoff_6 = cutoff_6 or DEFAULT_CUTOFFS[6]
        self.cutoff_7 = cutoff_7 or DEFAULT_CUTOFFS[7]

    def serialise(self):
        return {
            'course': self.course.serialise(),
            'semester': self.semester.serialise(),
            'isLinear': self.is_linear,
            'manuallyModified': self.manually_modified,
            'calculable': self.calculable,
            'cutoff': {
                1: self.cutoff_1,
                2: self.cutoff_2,
                3: self.cutoff_3,
                4: self.cutoff_4,
                5: self.cutoff_5,
                6: self.cutoff_6,
                7: self.cutoff_7,
            },
            'assessment': [
                item.serialise()
                for item in self.get_assessment_items()
            ]
        }

    def get_assessment_items(self):
        return Session().query(
            AssessmentItem
        ).filter(
            AssessmentItem.offering_id == self.id,
        ).all()


class AssessmentItem(ORMMixin):
    offering_id = Column(Integer, nullable=False)
    task_name = Column(String(255), nullable=False)
    weight = Column(String(255), nullable=False)

    @classmethod
    def get_table_args(cls):
        return (
            ForeignKeyConstraint(
                ['offering_id'],
                ['offering.id'],
                ondelete='CASCADE',
            ),
        )

    def __init__(self, offering_id, task_name, weight):
        self.offering_id = offering_id
        self.task_name = task_name
        self.weight = weight

    def serialise(self):
        return {
            'id': self.id,
            'taskName': self.task_name,
            'weight': self.weight,
        }

    def is_integer_weight(self):
        try:
            int(self.weight)
            return True
        except ValueError:
            return False
