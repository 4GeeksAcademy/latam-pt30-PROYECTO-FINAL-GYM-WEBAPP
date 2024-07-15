"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Member, Objective, Muscle_group
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import app
import api.models



api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def Signup1():
     data = request.json
     respuesta = app.Signup(data)
     return jsonify({"Message" : respuesta}),200

@api.route('/login', methods=['POST'])
def Login1():
     data = request.json
     print("Data dentro de Login1",data)
     respuesta = app.Login(data)
     print(respuesta)
     return jsonify({"Message" : respuesta}),201

# Endpoint para obtener todos los usuarios
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]
    return jsonify(serialized_users), 200

# Endpoint para obtener un usuario específico por su ID
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = User.query.filter_by(id=user_id).one()
        return jsonify(user.serialize()), 200
    except NoResultFound:
        raise APIException('User not found', status_code=404)

# Endpoint para actualizar un usuario existente por su ID
@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json

    try:
        user = User.query.filter_by(id=user_id).one()
        user.email = data.get('email', user.email)
        user.password = data.get('password', user.password)
        user.Creation_date = data.get('Creation_date', user.Creation_date)

        db.session.commit()
        return jsonify({"message": "User updated successfully", "user_id": user.id}), 200
    except NoResultFound:
        raise APIException('User not found', status_code=404)

# Endpoint para eliminar un usuario por su ID
@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.filter_by(id=user_id).one()
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully", "user_id": user_id}), 200
    except NoResultFound:
        raise APIException('User not found', status_code=404)

# Endpoint para obtener todos los miembros
@api.route('/members', methods=['GET'])
def get_members():
    members = Member.query.all()
    serialized_members = [member.serialize() for member in members]
    return jsonify(serialized_members), 200

# Endpoint para obtener un miembro específico por su ID
@api.route('/members/<int:member_id>', methods=['GET'])
def get_member(member_id):
    try:
        member = Member.query.filter_by(Id_member=member_id).one()
        return jsonify(member.serialize()), 200
    except NoResultFound:
        raise APIException('Member not found', status_code=404)
    
# Endpoint para actualizar un miembro existente por su ID
@api.route('/members/<int:member_id>', methods=['PUT'])
def update_member(member_id):
    data = request.json

    try:
        member = Member.query.filter_by(Id_member=member_id).one()
        member.Name = data.get('Name', member.Name)
        member.Last_name = data.get('Last_name', member.Last_name)
        member.Gender = data.get('Gender', member.Gender)
        member.Height = data.get('Height', member.Height)
        member.Weight = data.get('Weight', member.Weight)
        member.Birthday = data.get('Birthday', member.Birthday)
        member.City = data.get('City', member.City)
        member.Country = data.get('Country', member.Country)

        db.session.commit()
        return jsonify({"message": "Member updated successfully", "member_id": member.Id_member}), 200
    except NoResultFound:
        raise APIException('Member not found', status_code=404)

# Endpoint para eliminar un miembro por su ID
@api.route('/members/<int:member_id>', methods=['DELETE'])
def delete_member(member_id):
    try:
        member = Member.query.filter_by(Id_member=member_id).one()
        db.session.delete(member)
        db.session.commit()
        return jsonify({"message": "Member deleted successfully", "member_id": member_id}), 200
    except NoResultFound:
        raise APIException('Member not found', status_code=404)

# Endpoint para obtener todos los objetivos
@api.route('/objectives', methods=['GET'])
def get_objectives():
    objectives = Objective.query.all()
    serialized_objectives = [objective.serialize() for objective in objectives]
    return jsonify(serialized_objectives), 200

# Endpoint para obtener un objetivo específico por su ID
@api.route('/objectives/<int:objective_id>', methods=['GET'])
def get_objective(objective_id):
    try:
        objective = Objective.query.filter_by(Id_objective=objective_id).one()
        return jsonify(objective.serialize()), 200
    except NoResultFound:
        raise APIException('Objective not found', status_code=404)

# Endpoint para crear un nuevo objetivo
@api.route('/objectives', methods=['POST'])
def create_objective():
    data = request.json
    new_objective = Objective(name=data['name'])

    try:
        db.session.add(new_objective)
        db.session.commit()
        return jsonify({"message": "Objective created successfully", "objective_id": new_objective.Id_objective}), 201
    except IntegrityError:
        db.session.rollback()
        raise APIException('Error creating objective', status_code=400)

# Endpoint para actualizar un objetivo existente por su ID
@api.route('/objectives/<int:objective_id>', methods=['PUT'])
def update_objective(objective_id):
    data = request.json

    try:
        objective = Objective.query.filter_by(Id_objective=objective_id).one()
        objective.name = data.get('name', objective.name)

        db.session.commit()
        return jsonify({"message": "Objective updated successfully", "objective_id": objective.Id_objective}), 200
    except NoResultFound:
        raise APIException('Objective not found', status_code=404)

# Endpoint para eliminar un objetivo por su ID
@api.route('/objectives/<int:objective_id>', methods=['DELETE'])
def delete_objective(objective_id):
    try:
        objective = Objective.query.filter_by(Id_objective=objective_id).one()
        db.session.delete(objective)
        db.session.commit()
        return jsonify({"message": "Objective deleted successfully", "objective_id": objective_id}), 200
    except NoResultFound:
        raise APIException('Objective not found', status_code=404)

# Endpoint para eliminar un objetivo por su ID
@api.route('/objectives/<int:objective_id>', methods=['DELETE'])
def delete_objective(objective_id):
    try:
        objective = Objective.query.filter_by(Id_objective=objective_id).one()
        db.session.delete(objective)
        db.session.commit()
        return jsonify({"message": "Objective deleted successfully", "objective_id": objective_id}), 200
    except NoResultFound:
        raise APIException('Objective not found', status_code=404)

# Endpoint para obtener todos los planes de entrenamiento
@api.route('/workout-plans', methods=['GET'])
def get_workout_plans():
    workout_plans = Workout_plan.query.all()
    serialized_workout_plans = [plan.serialize() for plan in workout_plans]
    return jsonify(serialized_workout_plans), 200

# Endpoint para obtener un plan de entrenamiento específico por su ID
@api.route('/workout-plans/<int:workout_id>', methods=['GET'])
def get_workout_plan(workout_id):
    try:
        workout_plan = Workout_plan.query.filter_by(Id_workout=workout_id).one()
        return jsonify(workout_plan.serialize()), 200
    except NoResultFound:
        raise APIException('Workout plan not found', status_code=404)

# Endpoint para crear un nuevo plan de entrenamiento
@api.route('/workout-plans', methods=['POST'])
def create_workout_plan():
    data = request.json
    new_workout_plan = Workout_plan(Sets=data['Sets'], Reps=data['Reps'], Rest_time=data['Rest_time'],
                                    training_day=data['training_day'], SuperSet=data['SuperSet'],
                                    id=data['id'], Id_member=data['Id_member'], Id_exercise=data['Id_exercise'],
                                    Id_musclegroup=data['Id_musclegroup'])

    try:
        db.session.add(new_workout_plan)
        db.session.commit()
        return jsonify({"message": "Workout plan created successfully", "workout_id": new_workout_plan.Id_workout}), 201
    except IntegrityError:
        db.session.rollback()
        raise APIException('Error creating workout plan', status_code=400)

# Endpoint para actualizar un plan de entrenamiento existente por su ID
@api.route('/workout-plans/<int:workout_id>', methods=['PUT'])
def update_workout_plan(workout_id):
    data = request.json

    try:
        workout_plan = Workout_plan.query.filter_by(Id_workout=workout_id).one()
        workout_plan.Sets = data.get('Sets', workout_plan.Sets)
        workout_plan.Reps = data.get('Reps', workout_plan.Reps)
        workout_plan.Rest_time = data.get('Rest_time', workout_plan.Rest_time)
        workout_plan.training_day = data.get('training_day', workout_plan.training_day)
        workout_plan.SuperSet = data.get('SuperSet', workout_plan.SuperSet)
        workout_plan.id = data.get('id', workout_plan.id)
        workout_plan.Id_member = data.get('Id_member', workout_plan.Id_member)
        workout_plan.Id_exercise = data.get('Id_exercise', workout_plan.Id_exercise)
        workout_plan.Id_musclegroup = data.get('Id_musclegroup', workout_plan.Id_musclegroup)

        db.session.commit()
        return jsonify({"message": "Workout plan updated successfully", "workout_id": workout_plan.Id_workout}), 200
    except NoResultFound:
        raise APIException('Workout plan not found', status_code=404)

# Endpoint para eliminar un plan de entrenamiento por su ID
@api.route('/workout-plans/<int:workout_id>', methods=['DELETE'])
def delete_workout_plan(workout_id):
    try:
        workout_plan = Workout_plan.query.filter_by(Id_workout=workout_id).one()
        db.session.delete(workout_plan)
        db.session.commit()
        return jsonify({"message": "Workout plan deleted successfully", "workout_id": workout_id}), 200
    except NoResultFound:
        raise APIException('Workout plan not found', status_code=404)

# Endpoint para obtener todos los ejercicios
@api.route('/exercises', methods=['GET'])
def get_exercises():
    exercises = Exercises.query.all()
    serialized_exercises = [exercise.serialize() for exercise in exercises]
    return jsonify(serialized_exercises), 200

# Endpoint para obtener un ejercicio específico por su ID
@api.route('/exercises/<int:exercise_id>', methods=['GET'])
def get_exercise(exercise_id):
    try:
        exercise = Exercises.query.filter_by(Id_exercise=exercise_id).one()
        return jsonify(exercise.serialize()), 200
    except NoResultFound:
        raise APIException('Exercise not found', status_code=404)

# Endpoint para crear un nuevo ejercicio
@api.route('/exercises', methods=['POST'])
def create_exercise():
    data = request.json
    new_exercise = Exercises(Name=data['Name'], Link_video=data['Link_video'], Id_musclegroup=data['Id_musclegroup'])

    try:
        db.session.add(new_exercise)
        db.session.commit()
        return jsonify({"message": "Exercise created successfully", "exercise_id": new_exercise.Id_exercise}), 201
    except IntegrityError:
        db.session.rollback()
        raise APIException('Error creating exercise', status_code=400)

# Endpoint para actualizar un ejercicio existente por su ID
@api.route('/exercises/<int:exercise_id>', methods=['PUT'])
def update_exercise(exercise_id):
    data = request.json

    try:
        exercise = Exercises.query.filter_by(Id_exercise=exercise_id).one()
        exercise.Name = data.get('Name', exercise.Name)
        exercise.Link_video = data.get('Link_video', exercise.Link_video)
        exercise.Id_musclegroup = data.get('Id_musclegroup', exercise.Id_musclegroup)

        db.session.commit()
        return jsonify({"message": "Exercise updated successfully", "exercise_id": exercise.Id_exercise}), 200
    except NoResultFound:
        raise APIException('Exercise not found', status_code=404)

# Endpoint para eliminar un ejercicio por su ID
@api.route('/exercises/<int:exercise_id>', methods=['DELETE'])
def delete_exercise(exercise_id):
    try:
        exercise = Exercises.query.filter_by(Id_exercise=exercise_id).one()
        db.session.delete(exercise)
        db.session.commit()
        return jsonify({"message": "Exercise deleted successfully", "exercise_id": exercise_id}), 200
    except NoResultFound:
        raise APIException('Exercise not found', status_code=404)

# Endpoint para obtener todos los grupos musculares
@api.route('/muscle-groups', methods=['GET'])
def get_muscle_groups():
    muscle_groups = Muscle_group.query.all()
    serialized_muscle_groups = [group.serialize() for group in muscle_groups]
    return jsonify(serialized_muscle_groups), 200

# Endpoint para obtener un grupo muscular específico por su ID
@api.route('/muscle-groups/<int:group_id>', methods=['GET'])
def get_muscle_group(group_id):
    try:
        muscle_group = Muscle_group.query.filter_by(Id_musclegroup=group_id).one()
        return jsonify(muscle_group.serialize()), 200
    except NoResultFound:
        raise APIException('Muscle group not found', status_code=404)

# Endpoint para crear un nuevo grupo muscular
@api.route('/muscle-groups', methods=['POST'])
def create_muscle_group():
    data = request.json
    new_muscle_group = Muscle_group(Name=data['Name'])

    try:
        db.session.add(new_muscle_group)
        db.session.commit()
        return jsonify({"message": "Muscle group created successfully", "group_id": new_muscle_group.Id_musclegroup}), 201
    except IntegrityError:
        db.session.rollback()
        raise APIException('Error creating muscle group', status_code=400)

# Endpoint para actualizar un grupo muscular existente por su ID
@api.route('/muscle-groups/<int:group_id>', methods=['PUT'])
def update_muscle_group(group_id):
    data = request.json

    try:
        muscle_group = Muscle_group.query.filter_by(Id_musclegroup=group_id).one()
        muscle_group.Name = data.get('Name', muscle_group.Name)

        db.session.commit()
        return jsonify({"message": "Muscle group updated successfully", "group_id": muscle_group.Id_musclegroup}), 200
    except NoResultFound:
        raise APIException('Muscle group not found', status_code=404)

# Endpoint para eliminar un grupo muscular por su ID
@api.route('/muscle-groups/<int:group_id>', methods=['DELETE'])
def delete_muscle_group(group_id):
    try:
        muscle_group = Muscle_group.query.filter_by(Id_musclegroup=group_id).one()
        db.session.delete(muscle_group)
        db.session.commit()
        return jsonify({"message": "Muscle group deleted successfully", "group_id": group_id}), 200
    except NoResultFound:
        raise APIException('Muscle group not found', status_code=404)
    