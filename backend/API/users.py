import hashlib
from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from DB.DB import users_collection, tasks_collection

users = Blueprint('users', __name__)


@users.route("/api/v1/register", methods=["POST"])
def register():
    new_user = request.get_json()
    new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest()
    doc = users_collection.find_one({"username": new_user["username"]})
    if not doc:
        users_collection.insert_one(new_user)
        return jsonify({'username': new_user['username']}), 201
    else:
        return jsonify({'msg': 'Username already exists'}), 409


@users.route("/api/v1/login", methods=["POST"])
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


@users.route("/api/v1/user", methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user_from_db = users_collection.find_one({'username': current_user})
    if user_from_db:
        del user_from_db['_id'], user_from_db['password']
        return jsonify({'profile': user_from_db}), 200
    else:
        return jsonify({'msg': 'Profile not found'}), 404


@users.route("/api/v1/user", methods=["DELETE"])
@jwt_required()
def delete_user():
    current_user = get_jwt_identity()
    user_from_db = users_collection.find_one({'username': current_user})
    if user_from_db:
        users_collection.delete_one({'username': current_user})
        tasks_collection.delete_many({'username': current_user})
        return jsonify({'msg': 'User deleted'}), 200
    else:
        return jsonify({'msg': 'User not found'}), 404

