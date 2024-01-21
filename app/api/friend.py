from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, current_user
from app.extensions import socketio

from app.models import FriendRequest, User, FriendList


class FriendRequestApi(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("req_user_id", required=False, type=str)
    parser.add_argument("req_username", required=False, type=str)

    @jwt_required()
    def get(self):
        if current_user:
            friend_requests_data = FriendRequest.get_friend_requests_data()

            return friend_requests_data, 200

        return "User not found", 400
    
    @jwt_required()
    def post(self):
        if current_user:
            request_parser = self.parser.parse_args()

            if request_parser["req_user_id"] != current_user._user_id:
                requester = User.query.filter_by(_user_id=request_parser["req_user_id"]).first()
                if requester:
                    already_existed_request = FriendRequest.existed_friend_request(request_parser["req_user_id"], current_user._user_id)
                    if not already_existed_request:
                        friend_request = FriendRequest(
                            user_id = request_parser["req_user_id"],
                            req_user_id = current_user._user_id,
                            req_user_username = current_user.username
                        )
                        friend_request.create()

                        friend_requests_data = FriendRequest.get_friend_requests_data()

                        socketio.emit("friend_request_data", friend_requests_data)

                        return "Friend request was sent", 200
                    else:
                        return "Friend request is pending", 400
                else:
                    return "User doesn't exist", 400
            else:
                return "That's your ID", 400
        
        return "User not found", 400
    
    @jwt_required()
    def delete(self):
        if current_user:
            request_parser = self.parser.parse_args()

            friend_request = FriendRequest.query.filter_by(user_id=current_user._user_id, req_user_username=request_parser["req_username"]).first()
            if friend_request:
                friend_request.delete()
            
                friend_requests_data = FriendRequest.get_friend_requests_data()

                socketio.emit("friend_request_data", friend_requests_data)
                
                return "Friend request was deleted", 200
            else:
                return "Friend request wasn't found", 400
        
        return "User not found", 400
    

class FriendListApi(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("req_user_id", required=False, type=str)
    parser.add_argument("req_username", required=False, type=str)

    @jwt_required()
    def get(self):
        if current_user:
            friends_list = FriendList.get_friend_list(current_user.user_id)

            return friends_list, 200
        
        return "User not found", 400

    @jwt_required()
    def put(self):
        if current_user:
            request_parser = self.parser.parse_args()

            friend_request = FriendRequest.query.filter_by(user_id=current_user._user_id, req_user_username=request_parser["req_username"]).first()
            if friend_request:
                friend = User.query.filter_by(username=request_parser["req_username"]).first()
                new_friend = FriendList(
                    user_id = current_user._user_id,
                    friend_id = friend._user_id,
                    user_username = current_user.username,
                    friend_username = friend.username
                )
                new_friend.create()
                friend_request.delete()
            
                friend_requests_data = FriendRequest.get_friend_requests_data()

                socketio.emit("friends_list", )
                socketio.emit("friend_request_data", friend_requests_data)
                
                return "Friend request was deleted", 200
            else:
                return "Friend request wasn't found", 400

        return "User not found", 400