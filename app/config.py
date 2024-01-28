from os import path, sep, pardir
from datetime import timedelta


class Config(object):
    SECRET_KEY = '7d6eaf201c8b13a9f65e91d40615b902'
    BASE_DIRECTORY = path.abspath(path.dirname(__file__))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + path.join(BASE_DIRECTORY, 'database.db')

    JWT_SECRET_KEY = "jwtsecretkey"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=10)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(seconds=30)

    REDIS_HOST = "127.0.0.1"
    REDIS_PORT = 6379
    REDIS_PASSWORD = None
