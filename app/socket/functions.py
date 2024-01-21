from app.socket.events import on_connect, on_disconnect, on_chat_togle
from flask_socketio import join_room, leave_room


def register_event_handlers(socketio):
    @socketio.on("user_logged")
    def user_logged(data):
        if data["user_id"]:
            on_connect(data["user_id"])
        
    @socketio.on("user_left")
    def user_left(data):
        if data["user_id"]:
            on_disconnect(data["user_id"])

    @socketio.on("user_chat")
    def user_chat_on(data):
        if data["user_id"] and data["friend_id"]:
            on_chat_togle(data["user_id"], data["friend_id"])

    @socketio.on("join_room")
    def handle_roin_room(data):
        join_room(data["room"])
    

    # @socketio.on("send_message")
    # def handle_recieve_messages(data):
    #     socketio.emit("recieve_message", {"sender_id": data["user_id"], "message": data["message"]}, room=data["room_id"])