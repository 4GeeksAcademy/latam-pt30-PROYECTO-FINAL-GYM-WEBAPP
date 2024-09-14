from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from sqlalchemy import CheckConstraint
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    image_url = db.Column(db.String(130), unique=False, nullable=True)
    name  = db.Column(db.String(60), nullable=True) 
    last_name  = db.Column(db.String(60), nullable=True)
    gender  = db.Column(db.String(10), nullable=True)
    height  = db.Column(db.Float, nullable=True) 
    weight = db.Column(db.Float, nullable=True) 
    birthday = db.Column(db.String(10), nullable=True) 
    city = db.Column(db.String(30), nullable=True) 
    country = db.Column(db.String(30), nullable=True)
    creation_date = db.Column(db.String(80), unique=False, nullable=False, default=datetime.now())
    is_active= db.Column(db.Boolean, nullable=False, default=True) #When email validation change to True. 
    members = db.relationship('Member', backref='user', lazy=True)
    workout_plans = db.relationship('WorkoutPlan', backref='user', lazy=True)
    body_measurements = db.relationship('BodyMeasurement', backref='user', lazy=True)

    __table_args__ = (
        CheckConstraint(gender.in_(['male', 'female', 'other']), name='check_gender'),
    )

    def __repr__(self):
        return '<User %r>' %self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "image_url": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "gender": self.gender,
            "height": self.height,
            "weight": self.weight,
            "birthday": self.birthday,
            "city": self.city,
            "country": self.country,
            "creation_date": self.creation_date,
            "is_active": self.is_active
            # do not serialize the password, its a security breach
        }    
    

class Member(db.Model):
    __tablename__ = 'member'    
    id = db.Column(db.Integer, primary_key=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    objective_id = db.Column(db.Integer, db.ForeignKey('objective.id'), nullable=False)

    workout_plans = db.relationship('WorkoutPlan', backref='member', lazy=True)

    def __repr__(self):
        return '<Member %r>' %self.member_id

    def serialize(self):
        return {
            "id": self.id
            
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
member_objectives = db.Table('member_objectives',
    db.Column('member_id', db.Integer, db.ForeignKey('member.id'), primary_key=True),
    db.Column('objective_id', db.Integer, db.ForeignKey('objective.id'), primary_key=True)
)

class BodyMeasurement(db.Model):
    __tablename__ = 'body_measurement'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Integer, nullable=True)
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
            "date": self.date,
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
    
          # Pivot table for WorkoutPlan and Exercises - agregar al endpoint!!!
workout_plan_days = db.Table('workout_plan_days',
    db.Column('workout_plan_id', db.Integer, db.ForeignKey('workout_plan.id'), primary_key=True),
    db.Column('day_id', db.Integer, db.ForeignKey('day.id'), primary_key=True),
    db.Column('exercise_id', db.Integer,db.ForeignKey('exercise.id'), primary_key=True )
)
class WorkoutPlan(db.Model):
    __tablename__ = 'workout_plan'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    rounds = db.Column(db.String(50), nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    rest_time = db.Column(db.String(50), nullable=False)
    description_id = db.Column(db.String(255))
    training_day = db.Column(db.Integer)
    super_set = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey('member.id'), nullable=False)

    muscle_group_id = db.Column(db.Integer, db.ForeignKey('muscle_group.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'), nullable=False)
    days = db.relationship('Day', secondary=workout_plan_days, backref=db.backref('workout_plans', lazy='dynamic'))

    def __repr__(self):
        return '<WorkoutPlan %r>' %self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "rounds": self.rounds,
            "reps": self.reps,
            "rest_time": self.rest_time,
            "description_id": self.description_id,
            "training_day": self.training_day,
            "super_set": self.super_set,
            "user_id": self.user_id,
            "member_id": self.member_id,
            "muscle_group_id": self.muscle_group_id,
            "exercise_id": self.exercise_id
            # do not serialize the password, its a security breach
        }  
    

class Day(db.Model):
    __tablename__ = 'day'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    muscle_groups = db.relationship('MuscleGroup', backref='day', lazy=True)
    #exercises = db.relationship('Exercise', backref='day', lazy=True)
    sets = db.relationship('Set', backref='day', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return '<Day %r>' %self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
    

class MuscleGroup(db.Model):
    __tablename__ = 'muscle_group'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    day_id = db.Column(db.Integer, db.ForeignKey('day.id'))

    def __repr__(self):
        return '<MuscleGroups %r>' %self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
            # do not serialize the password, its a security breach
        }
    
class Set(db.Model):
    __tablename__ = 'set'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(10), nullable=False)  # 'pair' o 'trio'
    rest_time = db.Column(db.Integer, nullable=False)  # Tiempo en segundos

    day_id = db.Column(db.Integer, db.ForeignKey('day.id'), nullable=False)
    exercises = db.relationship('Exercise', backref='set', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Set {self.id} - {self.type}>'

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "rest_time": self.rest_time,
            "exercises": [exercise.serialize() for exercise in self.exercises]
        }    
    

class Exercise(db.Model):
    __tablename__ = 'exercise'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    sets = db.Column(db.Integer, nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    rest_time = db.Column(db.Integer, nullable=False)
    description_id = db.Column(db.String(255))
    super_set = db.Column(db.Integer)
    Link_video = db.Column(db.String(50))

    muscle_group_id = db.Column(db.Integer, db.ForeignKey('muscle_group.id'))#muscle group esta en workout no exercices
    #day_id = db.Column(db.Integer, db.ForeignKey('day.id'))
    set_id = db.Column(db.Integer, db.ForeignKey('set.id'))  # Nueva relación

    def __repr__(self):
        return '<Exercise %r>' %self.Id_exercise

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "sets": self.sets,
            "reps": self.reps,
            "rest_time": self.rest_time,
            "description_id": self.description_id,
            "super_set": self.super_set,
            "Link_video": self.Link_video,
            "muscle_group_id": self.muscle_group_id
            # do not serialize the password, its a security breach
        }
    
      #2. Tabla que conecta work out con exercicio - Tablas pivote.

    # Pivot table for WorkoutPlan and MuscleGroup
workout_plan_muscle_group = db.Table('workout_plan_muscle_group',
    db.Column('workout_plan_id', db.Integer, db.ForeignKey('workout_plan.id'), primary_key=True),
    db.Column('muscle_group_id', db.Integer, db.ForeignKey('muscle_group.id'), primary_key=True)
)

    
class Videos(db.Model):
    __tablename__ = 'videos'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    link = db.Column(db.String(255), nullable=False)
    muscle_group_id = db.Column(db.Integer, db.ForeignKey('muscle_group.id'), nullable=False)
    
    def __repr__(self):
        return f'<Videos {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "link": self.link,
            "muscle_group_id": self.muscle_group_id
        }
    


    
