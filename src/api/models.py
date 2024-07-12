from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    Creation_date = db.Column(db.String(80), unique=False, nullable=False)
    Id_member = db.Column(db.Integer, db.ForeignKey('member.Id_member'))

    def __repr__(self):
        return '<User %r>' %self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }    
    

class Member(db.Model):
    __tablename__ = 'member'    
    id_member = db.Column(db.Integer, primary_key=True)
    Name  = db.Column(db.String(60), nullable=False) 
    Last_name  = db.Column(db.String(60), nullable=False)
    Gender  = db.Column(db.String(2), nullable=False)
    Height  = db.Column(db.Float, nullable=False) 
    Weight = db.Column(db.Float, nullable=False) 
    Birthday = db.Column(db.String(10), nullable=False) 
    City = db.Column(db.String(30), nullable=False) 
    Country = db.Column(db.String(30), nullable=False)
    Id_objective = db.Column(db.Integer, db.ForeignKey('objective.Id_objective'))

    
class Objective(db.Model):
    __tablename__ = 'objective'
    Id_objective = db.Column(db.Integer, primary_key=True)
    Objective_name = db.Column(db.String(60), nullable=False) 


class Workout_plan(db.Model):
    __tablename__ = 'workout_plan'
    Id_workout = db.Column(db.Integer, primary_key=True)
    Sets = db.Column(db.String(50), nullable=False)
    Reps = db.Column(db.Integer, nullable=False)
    Rest_time = db.Column(db.String(50), nullable=False)
    training_day = db.Column(db.Integer)
    SuperSet = db.Column(db.Integer)
    Id_user = db.Column(db.Integer, db.ForeignKey('user.Id_user'))
    Id_member = db.Column(db.Integer, db.ForeignKey('member.Id_member'))
    Id_exercise = db.Column(db.Integer, db.ForeignKey('exercises.Id_exercise'))
    Id_musclegroup = db.Column(db.Integer, db.ForeignKey('musclegroup.Id_musclegroup'))


class Exercises(db.Model):
    __tablename__ = 'exercises'
    Id_exercise = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(50), nullable=False, unique=True)
    Link_video = db.Column(db.Integer)
    Id_musclegroup = db.Column(db.Integer, db.ForeignKey('musclegroup.Id_musclegroup'))
    



class Muscle_groups(db.Model):
    __tablename__ = 'muscle_groups'
    Id_musclegroup = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(50), nullable=False, unique=True)
