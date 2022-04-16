import datetime
import hashlib
from bson import ObjectId
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'JanuszPawlacz2137'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)

client = MongoClient('mongodb+srv://admin:admin@cluster0.ab4vr.mongodb.net/slp_todo?retryWrites=true&w=majority')
db = client["slp_todo"]
users_collection = db['users']
tasks_collection = db['tasks']


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route("/api/v1/register", methods=["POST"])
def register():
    new_user = request.get_json()
    new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest()
    doc = users_collection.find_one({"username": new_user["username"]})
    if not doc:
        users_collection.insert_one(new_user)
        return jsonify({'username': new_user['username']}), 201
    else:
        return jsonify({'msg': 'Username already exists'}), 409


@app.route("/api/v1/login", methods=["POST"])
def login():
    login_details = request.get_json()
    user_from_db = users_collection.find_one({'username': login_details['login']})
    if not user_from_db:
        user_from_db = users_collection.find_one({'email': login_details['login']})
    if user_from_db:
        encrpted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()
        if encrpted_password == user_from_db['password']:
            nickname = user_from_db['username']
            access_token = create_access_token(identity=nickname)
            return jsonify(token=access_token, username=nickname), 200

    return jsonify({'msg': 'The username or password is incorrect'}), 401


@app.route("/api/v1/user", methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user_from_db = users_collection.find_one({'username': current_user})
    if user_from_db:
        del user_from_db['_id'], user_from_db['password']
        return jsonify({'profile': user_from_db}), 200
    else:
        return jsonify({'msg': 'Profile not found'}), 404


@app.route("/api/v1/tasks", methods=["GET"])
@jwt_required()
def tasks():
    current_user = get_jwt_identity()
    user_from_db = users_collection.find_one({'username': current_user})
    if user_from_db:
        tasks_from_db = tasks_collection.find({'user_id': str(user_from_db['_id'])})
        tasks = []
        for task in tasks_from_db:
            task['_id'] = str(task['_id'])
            tasks.append(task)
        return jsonify({'tasks': tasks}), 200
    else:
        return jsonify({'msg': 'Profile not found'}), 404


@app.route("/api/v1/tasks", methods=["POST"])
@jwt_required()
def add_task():
    current_user = get_jwt_identity()
    user_from_db = users_collection.find_one({'username': current_user})
    if user_from_db:
        new_task = request.get_json()
        new_task['user_id'] = str(user_from_db['_id'])
        tasks_collection.insert_one(new_task)
        return jsonify({'msg': 'Task added successfully'}), 201
    else:
        return jsonify({'msg': 'Profile not found'}), 404


@app.route("/api/v1/tasks/<task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    current_user = get_jwt_identity()
    user_from_db = users_collection.find_one({'username': current_user})
    if user_from_db:
        tasks_collection.delete_one({'_id': ObjectId(task_id)})
        return jsonify({'msg': 'Task deleted successfully'}), 200
    else:
        return jsonify({'msg': 'Profile not found'}), 404


# todo: change method to PUT
@app.route("/api/v1/tasks/duplicate/<task_id>", methods=["GET"])
@jwt_required()
def duplicate_task(task_id):
    current_user = get_jwt_identity()
    user_from_db = users_collection.find_one({'username': current_user})
    if user_from_db:
        finded = tasks_collection.find_one({'_id': ObjectId(task_id)})
        if finded:
            del finded['_id']
            tasks_collection.insert_one(finded)
            return jsonify({'msg': 'Task duplicated successfully'}), 200
        else:
            return jsonify({'msg': 'Task not found'}), 404
    else:
        return jsonify({'msg': 'Profile not found'}), 404


# @app.route("/api/v1/tasks/<task_id>", methods=["GET"])
# @jwt_required()
# def get_task_by_id(task_id):
#     # current_user = get_jwt_identity()
#     # user_from_db = users_collection.find_one({'username': current_user})
#     # if user_from_db:
#     print(task_id)
#     task = tasks_collection.find_one(ObjectId(task_id))
#     if task:
#         task['_id'] = str(task['_id'])
#         return jsonify({'task': task}), 200
#     else:
#         return jsonify({'msg': 'Task not found'}), 404
#     # else:
#     #     return jsonify({'msg': 'Profile not found'}), 404


@app.route("/api/v1/tasks/<task_id>", methods=["PATCH"])
@jwt_required()
def update_task(task_id):
    current_user = get_jwt_identity()
    user_from_db = users_collection.find_one({'username': current_user})
    if user_from_db:
        updated_task = request.get_json()
        tasks_collection.update_one({'_id': task_id}, {'$set': updated_task})
        return jsonify({'msg': 'Task updated successfully'}), 200
    else:
        return jsonify({'msg': 'Profile not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)
