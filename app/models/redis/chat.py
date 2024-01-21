import json
from datetime import datetime

from .manager import redis_manager
from app.utils.id_generator import IdGenerator

class RedisUserChat:
    def __init__(self, table_name='user_chats'):
        self.redis = redis_manager.get_connection()
        self.table_name = table_name
        self.id_generator = IdGenerator()

    def set_user_chat(self, user_id, user_username, friend_id, message):
        date = datetime.now().isoformat()
        message_id = self.id_generator.generate_id()
        chat_data = {"author_id": user_id, "author_username": user_username, "friend_id": friend_id, "message_id": message_id, "message": message, "date": date}
        serialized_data = json.dumps(chat_data)

        self.redis.rpush(self.table_name + f":{user_id}:{friend_id}", serialized_data)

        return message_id, date

    def get_user_chat(self, user_id, friend_id):
        serialized_data_list = self.redis.lrange(self.table_name + f":{user_id}:{friend_id}", 0, -1)

        chat_data_list = []
        for serialized_data in serialized_data_list:
            chat_data = json.loads(serialized_data)
            chat_data_list.append(chat_data)

        return chat_data_list
        
    def delete_user_chat(self, user_id, friend_id, message_id):
        key = f"{user_id}:{friend_id}"

        current_values = self.redis.lrange(self.table_name + f":{key}", 0, -1)

        new_values = [value for value in current_values if message_id not in value]

        self.redis.delete(self.table_name + f":{key}")

        for value in new_values:
            self.redis.rpush(self.table_name + f":{key}", value)

        result = len(current_values) - len(new_values)

        print("Result:", result)

        if result > 0:
            return True
        else:
            return False








