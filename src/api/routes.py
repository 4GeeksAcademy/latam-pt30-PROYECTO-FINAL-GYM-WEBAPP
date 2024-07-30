"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Member, Objective, MuscleGroup, WorkoutPlan, Exercises, BodyMeasurement
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import app
import api.models
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

##HANDLE ERRORS
# @app.errorhandler(APIException)
# def handle_api_exception(error):
#     response = jsonify(error.to_dict())
#     response.status_code = error.status_code
#     return response


#SignUp & Login

# @api.route('/signup', methods=['POST'])
# def Signup1():
#      data = request.json
#      respuesta = app.Signup(data)
#      return jsonify({"Message" : respuesta}), 200

@api.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()  # Utiliza get_json para asegurar que los datos se parsean correctamente
        respuesta = app.Signup(data)  # Llama a tu función de registro
        return jsonify({"Message": respuesta}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@api.route('/login', methods=['POST'])
def Login1():
     data = request.json
     #print("Data dentro de Login1",data)
     respuesta = app.Login(data)
     #print(respuesta)
     return jsonify({"Message" : respuesta}),200

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
        user.Creation_date = data.get('creation_date', user.creation_date)

        db.session.commit()
        return jsonify({"message": "User updated successfully", "user_id": user.id}), 200
    except NoResultFound:
        raise APIException('User not found', status_code=400)

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
        member = Member.query.filter_by(id=member_id).one()
        return jsonify(member.serialize()), 200
    except NoResultFound:
        raise APIException('Member not found', status_code=400)
    
# Endpoint para actualizar un miembro existente por su ID
# @api.route('/members/<int:member_id>', methods=['PUT'])
# def update_member(member_id):
#     data = request.json

#     try:
#         member = Member.query.filter_by(Id_member=member_id).one()
#         member.Name = data.get('Name', member.Name)
#         member.Last_name = data.get('Last_name', member.Last_name)
#         member.Gender = data.get('Gender', member.Gender)
#         member.Height = data.get('Height', member.Height)
#         member.Weight = data.get('Weight', member.Weight)
#         member.Birthday = data.get('Birthday', member.Birthday)
#         member.City = data.get('City', member.City)
#         member.Country = data.get('Country', member.Country)

#         db.session.commit()
#         return jsonify({"message": "Member updated successfully", "member_id": member.Id_member}), 200
#     except NoResultFound:
#         raise APIException('Member not found', status_code=404)


@api.route('/members', methods=['POST'])
@jwt_required()
def create_member():
    data = request.json

    required_fields = ['name', 'last_name', 'gender', 'height', 'weight', 'birthday', 'city', 'country']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400

    if not isinstance(data['height'], (int, float)) or not isinstance(data['weight'], (int, float)):
        return jsonify({"error": "Height and Weight must be numeric"}), 400

    new_member = Member(
        name=data['Name'],
        last_name=data['Last_name'],
        gender=data['Gender'],
        height=data['Height'],
        weight=data['Weight'],
        birthday=data['Birthday'],
        city=data['City'],
        country=data['Country'],
        user_id=data['user_id'],
        objective_id=data['objective_id']
    )

    try:
        db.session.add(new_member)
        db.session.commit()
        return jsonify({"message": "Member created successfully", "member_id": new_member.id}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Error creating member, possibly due to duplicate entry"}), 400

# Endpoint para actualizar un miembro existente por su ID
@api.route('/members/<int:member_id>', methods=['PUT'])
def update_member(member_id):
    data = request.json

    try:
        member = Member.query.filter_by(id=member_id).one()
        member.name = data.get('name', member.name)
        member.last_name = data.get('last_name', member.last_name)
        member.gender = data.get('gender', member.gender)
        member.height = data.get('height', member.height)
        member.weight = data.get('weight', member.weight)
        member.birthday = data.get('birthday', member.birthday)
        member.city = data.get('city', member.city)
        member.country = data.get('country', member.country)
        member.user_id = data.get('user_id', member.user_id)
        member.objective_id = data.get('objective_id', member.objective_id)

        db.session.commit()
        return jsonify({"message": "Member updated successfully", "member_id": member.id}), 200
    except NoResultFound:
        raise APIException('Member not found', status_code=404)

# Endpoint para eliminar un miembro por su ID
@api.route('/members/<int:member_id>', methods=['DELETE'])
def delete_member(member_id):
    try:
        member = Member.query.filter_by(id=member_id).one()
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
        objective = Objective.query.filter_by(id=objective_id).one()
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
        objective = Objective.query.filter_by(id=objective_id).one()
        objective.name = data.get('name', objective.name)

        db.session.commit()
        return jsonify({"message": "Objective updated successfully", "objective_id": objective.id}), 200
    except NoResultFound:
        raise APIException('Objective not found', status_code=404)

# Endpoint para eliminar un objetivo por su ID
@api.route('/objectives/<int:objective_id>', methods=['DELETE'])
def delete_objective(objective_id):
    try:
        objective = Objective.query.filter_by(id=objective_id).one()
        db.session.delete(objective)
        db.session.commit()
        return jsonify({"message": "Objective deleted successfully", "objective_id": objective_id}), 200
    except NoResultFound:
        raise APIException('Objective not found', status_code=400)

# Endpoint para obtener todos los planes de entrenamiento
@api.route('/workout-plans', methods=['GET'])
def get_workout_plans():
    workout_plans = WorkoutPlan.query.all()
    serialized_workout_plans = [plan.serialize() for plan in workout_plans]
    return jsonify(serialized_workout_plans), 200

# Endpoint para obtener un plan de entrenamiento específico por su ID
@api.route('/workout-plans/<int:workout_id>', methods=['GET'])
def get_workout_plan(workout_id):
    try:
        workout_plan = WorkoutPlan.query.filter_by(Id_workout=workout_id).one()
        return jsonify(workout_plan.serialize()), 200
    except NoResultFound:
        raise APIException('Workout plan not found', status_code=404)

# Endpoint para crear un nuevo plan de entrenamiento
@api.route('/workout-plans', methods=['POST'])
def create_workout_plan():
    data = request.json
    new_workout_plan = WorkoutPlan(
        name_id=data['name_id'], 
        sets=data['sets'], 
        reps=data['reps'], 
        rest_time=data['rest_time'],
        description_id=data.get('description_id'), 
        training_day=data['training_day'], 
        superSet=data['super_set'],
        use_id=data['user_id'], 
        member_id=data['member_id'], 
        exercise_id=data['exercise_id'],
        musclegroup_id=data['muscle_group_id'])

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
        workout_plan = WorkoutPlan.query.filter_by(id=workout_id).one()
        workout_plan.name_id = data.get('name_id', workout_plan.name_id)
        workout_plan.sets = data.get('sets', workout_plan.sets)
        workout_plan.reps = data.get('reps', workout_plan.reps)
        workout_plan.rest_time = data.get('rest_time', workout_plan.rest_time)
        workout_plan.description_id = data.get('description_id', workout_plan.description_id)
        workout_plan.training_day = data.get('training_day', workout_plan.training_day)
        workout_plan.super_set = data.get('super_set', workout_plan.super_set)
        workout_plan.user_id = data.get('user_id', workout_plan.user_id)
        workout_plan.member_id = data.get('member_id', workout_plan.member_id)
        workout_plan.exercise_id = data.get('exercise_id', workout_plan.exercise_id)
        workout_plan.muscle_group_id = data.get('muscle_group_id', workout_plan.muscle_group_id)
        db.session.commit()
        return jsonify({"message": "Workout plan updated successfully", "workout_id": workout_plan.id}), 200
    except NoResultFound:
        raise APIException('Workout plan not found', status_code=404)

# Endpoint para eliminar un plan de entrenamiento por su ID
@api.route('/workout-plans/<int:workout_id>', methods=['DELETE'])
def delete_workout_plan(workout_id):
    try:
        workout_plan = WorkoutPlan.query.filter_by(id=workout_id).one()
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
        exercise = Exercises.query.filter_by(id=exercise_id).one()
        return jsonify(exercise.serialize()), 200
    except NoResultFound:
        raise APIException('Exercise not found', status_code=404)

# Endpoint para crear un nuevo ejercicio
@api.route('/exercises', methods=['POST'])
def create_exercise():
    data = request.json
    new_exercise = Exercises(name=data['name'])

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
        exercise.Name = data.get('name', exercise.name)
        # exercise.Link_video = data.get('Link_video', exercise.Link_video)
        # exercise.Id_musclegroup = data.get('Id_musclegroup', exercise.Id_musclegroup)
        db.session.commit()
        return jsonify({"message": "Exercise updated successfully", "exercise_id": exercise.Id_exercise}), 200
    except NoResultFound:
        raise APIException('Exercise not found', status_code=404)

# Endpoint para eliminar un ejercicio por su ID
@api.route('/exercises/<int:exercise_id>', methods=['DELETE'])
def delete_exercise(exercise_id):
    try:
        exercise = Exercises.query.filter_by(id=exercise_id).one()
        db.session.delete(exercise)
        db.session.commit()
        return jsonify({"message": "Exercise deleted successfully", "exercise_id": exercise_id}), 200
    except NoResultFound:
        raise APIException('Exercise not found', status_code=404)

# Endpoint para obtener todos los grupos musculares
@api.route('/muscle-groups', methods=['GET'])
def get_muscle_groups():
    muscle_groups = MuscleGroup.query.all()
    serialized_muscle_groups = [group.serialize() for group in muscle_groups]
    return jsonify(serialized_muscle_groups), 200

# Endpoint para obtener un grupo muscular específico por su ID
@api.route('/muscle-groups/<int:group_id>', methods=['GET'])
def get_muscle_group(group_id):
    try:
        muscle_group = MuscleGroup.query.filter_by(id=group_id).one()
        return jsonify(muscle_group.serialize()), 200
    except NoResultFound:
        raise APIException('Muscle group not found', status_code=404)

# Endpoint para crear un nuevo grupo muscular
@api.route('/muscle-groups', methods=['POST'])
def create_muscle_group():
    data = request.json
    if 'name' not in data:  # Validate required fields
        return jsonify({"error": "Field 'name' is required"}), 400

    new_muscle_group = MuscleGroup(name=data['name'])

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
        muscle_group = MuscleGroup.query.filter_by(id=group_id).one()
        muscle_group.name = data.get('name', muscle_group.name)

        db.session.commit()
        return jsonify({"message": "Muscle group updated successfully", "group_id": muscle_group.Id_musclegroup}), 200
    except NoResultFound:
        raise APIException('Muscle group not found', status_code=404)

# Endpoint para eliminar un grupo muscular por su ID
@api.route('/muscle-groups/<int:group_id>', methods=['DELETE'])
def delete_muscle_group(group_id):
    try:
        muscle_group = MuscleGroup.query.filter_by(id=group_id).one()
        db.session.delete(muscle_group)
        db.session.commit()
        return jsonify({"message": "Muscle group deleted successfully", "group_id": group_id}), 200
    except NoResultFound:
        raise APIException('Muscle group not found', status_code=404)
    
    
#BODY MEASUREMENTS
# Endpoint para obtener todas las mediciones corporales de un usuario
@api.route('/users/<int:user_id>/body-measurements', methods=['GET'])
def get_user_body_measurements(user_id):
    body_measurements = BodyMeasurement.query.filter_by(user_id=user_id).all()
    serialized_measurements = [measurement.serialize() for measurement in body_measurements]
    return jsonify(serialized_measurements), 200

# Endpoint para obtener una medición corporal específica de un usuario por su ID
@api.route('/users/<int:user_id>/body-measurements/<int:measurement_id>', methods=['GET'])
def get_user_body_measurement(user_id, measurement_id):
    try:
        body_measurement = BodyMeasurement.query.filter_by(user_id=user_id, id=measurement_id).one()
        return jsonify(body_measurement.serialize()), 200
    except NoResultFound:
        return jsonify({'error': 'Body measurement not found'}), 404

# Endpoint para crear una nueva medición corporal para un usuario
@api.route('/users/<int:user_id>/body-measurements', methods=['POST'])
def create_user_body_measurement(user_id):
    data = request.json
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    new_measurement = BodyMeasurement(
        user_id=user_id,
        height=data['height'],
        weight=data['weight'],
        neck=data['neck'],
        relaxed_arm=data['relaxed_arm'],
        flexed_arm=data['flexed_arm'],
        waist=data['waist'],
        calves=data['calves'],
        chest=data['chest'],
        hips=data['hips'],
        thighs=data['thighs'],
        shoulders=data['shoulders']
    )

    try:
        db.session.add(new_measurement)
        db.session.commit()
        return jsonify({"message": "Body measurement created successfully", "id": new_measurement.id}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Error creating body measurement'}), 400

# Endpoint para actualizar una medición corporal existente de un usuario por su ID
@api.route('/users/<int:user_id>/body-measurements/<int:measurement_id>', methods=['PUT'])
def update_user_body_measurement(user_id, measurement_id):
    data = request.json

    try:
        body_measurement = BodyMeasurement.query.filter_by(user_id=user_id, id=measurement_id).one()
        body_measurement.height = data.get('height', body_measurement.height)
        body_measurement.weight = data.get('weight', body_measurement.weight)
        body_measurement.neck = data.get('neck', body_measurement.neck)
        body_measurement.relaxed_arm = data.get('relaxed_arm', body_measurement.relaxed_arm)
        body_measurement.flexed_arm = data.get('flexed_arm', body_measurement.flexed_arm)
        body_measurement.waist = data.get('waist', body_measurement.waist)
        body_measurement.calves = data.get('calves', body_measurement.calves)
        body_measurement.chest = data.get('chest', body_measurement.chest)
        body_measurement.hips = data.get('hips', body_measurement.hips)
        body_measurement.thighs = data.get('thighs', body_measurement.thighs)
        body_measurement.shoulders = data.get('shoulders', body_measurement.shoulders)

        db.session.commit()
        return jsonify({"message": "Body measurement updated successfully", "id": body_measurement.id}), 200
    except NoResultFound:
        return jsonify({'error': 'Body measurement not found'}), 404

# Endpoint para eliminar una medición corporal de un usuario por su ID
@api.route('/users/<int:user_id>/body-measurements/<int:measurement_id>', methods=['DELETE'])
def delete_user_body_measurement(user_id, measurement_id):
    try:
        body_measurement = BodyMeasurement.query.filter_by(user_id=user_id, id=measurement_id).one()
        db.session.delete(body_measurement)
        db.session.commit()
        return jsonify({"message": "Body measurement deleted successfully", "id": measurement_id}), 200
    except NoResultFound:
        return jsonify({'error': 'Body measurement not found'}), 404