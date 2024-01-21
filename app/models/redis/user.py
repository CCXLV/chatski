from .manager import redis_manager


class RedisUserPresence:
    def __init__(self, table_name='user_presence'):
        self.redis = redis_manager.get_connection()
        self.table_name = table_name

    def set_user_presence(self, user_id, presence):
        self.redis.hset(self.table_name, user_id, presence)

    def get_user_presence(self, user_id):
        return self.redis.hget(self.table_name, user_id)

    def get_all_users(self):
        user_data =  self.redis.hgetall(self.table_name)
        result = [{'user_id': user_id, 'status': presence} for user_id, presence in user_data.items()]

        return result