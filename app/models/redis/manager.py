import redis
from app.config import Config


class RedisManager:
    def __init__(self, host, port, password=None):
        self.host = host
        self.port = port
        self.password = password
        self.connection = self._create_connection()

    def _create_connection(self):
        return redis.StrictRedis(
            host=self.host,
            port=self.port,
            password=self.password,
            decode_responses=True
        )

    def get_connection(self):
        return self.connection


redis_host = Config.REDIS_HOST
redis_port = Config.REDIS_PORT
redis_password = Config.REDIS_PASSWORD
redis_manager = RedisManager(redis_host, redis_port, redis_password)
