from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from sqlalchemy import CheckConstraint
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    creation_date = db.Column(db.String(80), unique=False, nullable=False, default=datetime.utcnow)

    members = db.relationship('Member', backref='user', lazy=True)
    workout_plans = db.relationship('WorkoutPlan', backref='user', lazy=True)
    body_measurements = db.relationship('BodyMeasurement', backref='user', lazy=True)

    def __repr__(self):
        return '<User %r>' %self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "Creation_date": self.creation_date.isoformat()
            # do not serialize the password, its a security breach
        }    
    

class Member(db.Model):
    __tablename__ = 'member'    
    id = db.Column(db.Integer, primary_key=True)
    name  = db.Column(db.String(60), nullable=False) 
    last_name  = db.Column(db.String(60), nullable=False)
    gender  = db.Column(db.String(10), nullable=False)
    height  = db.Column(db.Float, nullable=False) 
    weight = db.Column(db.Float, nullable=False) 
    birthday = db.Column(db.String(10), nullable=False) 
    city = db.Column(db.String(30), nullable=False) 
    country = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    objective_id = db.Column(db.Integer, db.ForeignKey('objective.id'), nullable=False)

    __table_args__ = (
        CheckConstraint(gender.in_(['male', 'female', 'other']), name='check_gender'),
    )

    workout_plans = db.relationship('WorkoutPlan', backref='member', lazy=True)

    def __repr__(self):
        return '<Member %r>' %self.id_member

    def serialize(self):
        return {
            "id": self.Id_member,
            "name": self.Name,
            "last_name": self.Last_name,
            "gender": self.Gender,
            "height": self.Height,
            "weight": self.Weight,
            "birthday": self.Birthday,
            "city": self.City,
            "country": self.Country
            # do not serialize the password, its a security breach
        }  

    
class Objective(db.Model):
    __tablename__ = 'objective'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False) 

    members = db.relationship('Member', backref='objective', lazy=True)


    def __repr__(self):
        return '<Objective %r>' %self.Id_objective

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
            # do not serialize the password, its a security breach
        }


class BodyMeasurement(db.Model):
    __tablename__ = 'body_measurement'

    id = db.Column(db.Integer, primary_key=True)
    height = db.Column(db.Float, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    neck = db.Column(db.Float, nullable=False)
    relaxed_arm = db.Column(db.Float, nullable=False)
    flexed_arm = db.Column(db.Float, nullable=False)
    waist = db.Column(db.Float, nullable=False)
    calves = db.Column(db.Float, nullable=False)
    chest = db.Column(db.Float, nullable=False)
    hips = db.Column(db.Float, nullable=False)
    thighs = db.Column(db.Float, nullable=False)
    shoulders = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'height': self.height,
            'weight': self.weight,
            'neck': self.neck,
            'relaxed_arm': self.relaxed_arm,
            'flexed_arm': self.flexed_arm,
            'waist': self.waist,
            'calves': self.calves,
            'chest': self.chest,
            'hips': self.hips,
            'thighs': self.thighs,
            'shoulders': self.shoulders
        }
    
class WorkoutPlan(db.Model):
    __tablename__ = 'workout_plan'
    id = db.Column(db.Integer, primary_key=True)
    name_id = db.Column(db.String(50), nullable=False)
    sets = db.Column(db.String(50), nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    rest_time = db.Column(db.String(50), nullable=False)
    description_id = db.Column(db.String(255))
    training_day = db.Column(db.Integer)
    super_set = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey('member.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)
    muscle_group_id = db.Column(db.Integer, db.ForeignKey('muscle_group.id'), nullable=False)

    #1. Tabla que conecta work out con muscle group.

    def __repr__(self):
        return '<WorkoutPlan %r>' %self.id

    def serialize(self):
        return {
            "id": self.id,
            "name_id": self.name_id,
            "sets": self.sets,
            "reps": self.reps,
            "rest_time": self.rest_time,
            "description_id": self.description_id,
            "training_day": self.training_day,
            "super_set": self.super_set
            # do not serialize the password, its a security breach
        }  

class Exercises(db.Model):
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    Link_video = db.Column(db.String(50))
    muscle_group_id = db.Column(db.Integer, db.ForeignKey('muscle_group.id'))#muscle group esta en workout no exercices
    
    def __repr__(self):
        return '<Exercises %r>' %self.Id_exercise

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "Link_video": self.Link_video
            # do not serialize the password, its a security breach
        }
    
      #2. Tabla que conecta work out con exercicio - Tablas pivote.


class MuscleGroup(db.Model):
    __tablename__ = 'muscle_group'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    exercises = db.relationship('Exercises', backref='muscle_group', lazy=True)
    workout_plans = db.relationship('WorkoutPlan', backref='muscle_group', lazy=True)

    def __repr__(self):
        return '<MuscleGroups %r>' %self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
            # do not serialize the password, its a security breach
        }

    
