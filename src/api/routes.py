from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from flask_cors import CORS

auth = Blueprint('auth', __name__)


CORS(auth)

@auth.route('/signup', methods=['POST'])
def signup():
    request_data = request.get_json()
    
    email = request_data.get('email', None)
    password = request_data.get('password', None)
    
    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400
    
    # Check if user already exists
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "User already exists"}), 400
    
    # Create new user
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify({"msg": "User created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error creating user: {str(e)}"}), 500

@auth.route('/login', methods=['POST'])
def login():
    request_data = request.get_json()
    
    # Check if email and password are provided
    email = request_data.get('email', None)
    password = request_data.get('password', None)
    
    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400
    
    # Check if user exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    # Check if password is correct
    if not user.check_password(password):
        return jsonify({"msg": "Wrong password"}), 401
    
    # Create access token
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        "msg": "Login successful",
        "user": user.serialize(),
        "token": access_token
    }), 200

@auth.route('/validate', methods=['GET'])
@jwt_required()
def validate_token():
    # Get the identity of the current user
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    return jsonify({
        "msg": "Token is valid",
        "user": user.serialize()
    }), 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


