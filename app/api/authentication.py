from flask import jsonify
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

from app.models import User


class RegistrationApi(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("username", required=True, type=str)
    parser.add_argument("email", required=True, type=str)
    parser.add_argument("password", required=True, type=str)


    def post(self):
        request_parser = self.parser.parse_args()
        taken_email = User.query.filter_by(email=request_parser["email"]).first()
        taken_username = User.query.filter_by(username=request_parser["username"]).first()  

        if taken_username:
            return "Username is already taken", 400

        if not taken_email and not taken_username:        
            user = User(
                username=request_parser["username"],
                email=request_parser["email"],
                password=request_parser["password"]
            )
            user.create()

            return "Success", 200
        else:
            return "User already exists", 400


class AuthorizationApi(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("email", required=True, type=str)
    parser.add_argument("password", required=True, type=str)


    def post(self):
        request_parser = self.parser.parse_args()
        
        user: User = User.query.filter_by(email=request_parser["email"]).first()

        if user and user.check_password(request_parser["password"]):
            access_token = create_access_token(identity=user)
            refresh_token = create_refresh_token(identity=user)
            response = {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user_id": user.user_id,
                "username": user.username
            }  
            
            return response
        else:
            return "Email or Password is invalid.", 400
        

class AccessTokenApi(Resource):

    @jwt_required(refresh=True)
    def post(self):
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity)

        return jsonify(access_token=access_token)