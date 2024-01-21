from app.extensions import socketio

from app.models.redis import RedisUserPresence
from app.models import FriendList


def emit_user_status(user_id, status):
    user_presence_table = RedisUserPresence("user_presence")
    user_presence_table.set_user_presence(user_id, status)

    user_status_list = user_presence_table.get_all_users()
    friends_ids = FriendList.get_friends_id(user_id)

    friends_status_list = [
        {'user_id': user_id, 'friend_id': friend["friend_id"], 'status': user_status["status"]} 
        for user_status in user_status_list for friend in friends_ids if friend["friend_id"] == user_status["user_id"]
    ]
    friends_status_list.append(
        {'user_id': '', 'friend_id': user_id, 'status': status} 
    )

    socketio.emit("friends_status",  friends_status_list)

def chat_togle(user_id, friend_id):
    socketio.emit("chat_togle", {"user_id": user_id, "friend_id": friend_id})