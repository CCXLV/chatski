from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required,  current_user

from app.models import User

class UserApi(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("user_id", required=True, type=str)


    @jwt_required()
    def get(self):
        if current_user:
            user_data = current_user.get_data()

            return user_data, 200

        return "User not found", 400

    @jwt_required()
    def post(self):
        if current_user:
            request_parser = self.parser.parse_args()

            user_data = User.get_user_data(request_parser["user_id"])

            return user_data, 200

        return "User not found", 400