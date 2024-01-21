from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, current_user
from app.extensions import socketio

from app.models.redis import RedisUserChat

class ChatApi(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("friend_id", required=False, type=str)
    parser.add_argument("message", required=False, type=str)
    parser.add_argument("room_id", required=False, type=str)
    parser.add_argument("author_username", required=False, type=str)

    @jwt_required()
    def post(self):
        if current_user:
            request_parser = self.parser.parse_args()

            redis_user_chat = RedisUserChat()
            user_messages = redis_user_chat.get_user_chat(current_user._user_id, request_parser["friend_id"])
            friend_messages= redis_user_chat.get_user_chat(request_parser["friend_id"], current_user._user_id)

            chat_messages = user_messages + friend_messages 
            # redis_user_chat.delete_user_chat(current_user._user_id, request_parser["friend_id"], "7154585891451699201")
            
            # redis_user_chat.delete_user_chat(current_user._user_id, request_parser["friend_id"], "7154457306103545857")
            # socketio.emit(f"user_chat_{current_user._user_id}_{request_parser['friend_id']}", users_chat)

            return chat_messages, 200

        return "User not found", 400
    
    @jwt_required()
    def put(self):
        if current_user:
            request_parser = self.parser.parse_args()

            redis_user_chat = RedisUserChat()
            message_id, date = redis_user_chat.set_user_chat(current_user._user_id, request_parser["author_username"], request_parser["friend_id"], request_parser["message"])

            # users_chat = redis_user_chat.get_user_chat(current_user._user_id, request_parser["friend_id"])
            socketio.emit("recieve_message", {"author_id": current_user._user_id, "friend_id": request_parser["friend_id"], "author_username": request_parser["author_username"], "message": request_parser["message"], "message_id": message_id, "date": date}, room=request_parser["room_id"])

            return "Successfully put messages into database", 200

        return "User not found", 400