from flask_restful import Api
from app.api.authentication import RegistrationApi, AuthorizationApi
from app.api.user import UserApi
from app.api.friend import FriendRequestApi, FriendListApi
from app.api.chat import ChatApi

api = Api()
api.add_resource(RegistrationApi, "/api/registration")
api.add_resource(AuthorizationApi, "/api/authorization")
api.add_resource(UserApi, "/api/user")
api.add_resource(FriendRequestApi, "/api/friend_requests")
api.add_resource(FriendListApi, "/api/friends")
api.add_resource(ChatApi, "/api/chat")