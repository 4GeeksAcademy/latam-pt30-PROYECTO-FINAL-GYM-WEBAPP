from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    Creation_date = db.Column(db.String(80), unique=False, nullable=False)


    def __repr__(self):
        return '<User %r>' %self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "Creation_date": self.Creation_date
            # do not serialize the password, its a security breach
        }    
    

class Member(db.Model):
    __tablename__ = 'member'    
    Id_member = db.Column(db.Integer, primary_key=True)
    Name  = db.Column(db.String(60), nullable=False) 
    Last_name  = db.Column(db.String(60), nullable=False)
    Gender  = db.Column(db.String(2), nullable=False)
    Height  = db.Column(db.Float, nullable=False) 
    Weight = db.Column(db.Float, nullable=False) 
    Birthday = db.Column(db.String(10), nullable=False) 
    City = db.Column(db.String(30), nullable=False) 
    Country = db.Column(db.String(30), nullable=False)
    id = db.Column(db.Integer, db.ForeignKey('user.id'))
    Id_objective = db.Column(db.Integer, db.ForeignKey('objective.Id_objective'))

    def __repr__(self):
        return '<Member %r>' %self.id_member

    def serialize(self):
        return {
            "id": self.Id_member,
            "Name": self.Name,
            "Last_name": self.Last_name,
            "Gender": self.Gender,
            "Height": self.Height,
            "Weight": self.Weight,
            "Birthday": self.Birthday,
            "City": self.City,
            "Country": self.Country
            # do not serialize the password, its a security breach
        }  

    
class Objective(db.Model):
    __tablename__ = 'objective'
    Id_objective = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False) 

    def __repr__(self):
        return '<Objective %r>' %self.Id_objective

    def serialize(self):
        return {
            "Id_objective": self.Id_objective,
            "name": self.name
            # do not serialize the password, its a security breach
        }


class Workout_plan(db.Model):
    __tablename__ = 'workout_plan'
    Id_workout = db.Column(db.Integer, primary_key=True)
    Sets = db.Column(db.String(50), nullable=False)
    Reps = db.Column(db.Integer, nullable=False)
    Rest_time = db.Column(db.String(50), nullable=False)
    training_day = db.Column(db.Integer)
    SuperSet = db.Column(db.Integer)
    id = db.Column(db.Integer, db.ForeignKey('user.id'))
    Id_member = db.Column(db.Integer, db.ForeignKey('member.Id_member'))
    Id_exercise = db.Column(db.Integer, db.ForeignKey('exercises.Id_exercise'))
    Id_musclegroup = db.Column(db.Integer, db.ForeignKey('muscle_group.Id_musclegroup'))

    def __repr__(self):
        return '<Workout_plan %r>' %self.Id_workout

    def serialize(self):
        return {
            "Id_workout": self.Id_workout,
            "Name": self.Name,
            "Sets": self.Sets,
            "Reps": self.Reps,
            "Rest_time": self.HeiRest_timeght,
            "training_day": self.training_day,
            "SuperSet": self.SuperSet
            # do not serialize the password, its a security breach
        }  

class Exercises(db.Model):
    __tablename__ = 'exercises'
    Id_exercise = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(50), nullable=False, unique=True)
    Link_video = db.Column(db.Integer)
    Id_musclegroup = db.Column(db.Integer, db.ForeignKey('muscle_group.Id_musclegroup'))
    
    def __repr__(self):
        return '<Exercises %r>' %self.Id_exercise

    def serialize(self):
        return {
            "Id_exercise": self.Id_exercise,
            "name": self.name,
            "Link_video": self.Link_video
            # do not serialize the password, its a security breach
        }



class Muscle_group(db.Model):
    __tablename__ = 'muscle_group'
    Id_musclegroup = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(50), nullable=False, unique=True)

    def __repr__(self):
        return '<Muscle_groups %r>' %self.Id_musclegroup

    def serialize(self):
        return {
            "Id_musclegroup": self.Id_musclegroup,
            "name": self.name
            # do not serialize the password, its a security breach
        }
