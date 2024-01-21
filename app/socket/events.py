from app.socket.event_functions import emit_user_status, chat_togle


def on_connect(user_id):
    emit_user_status(user_id, "online")

def on_disconnect(user_id):
    emit_user_status(user_id, "offline")

def on_chat_togle(user_id, friend_id):
    chat_togle(user_id, friend_id)


