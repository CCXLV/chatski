from flask import Flask
from app.config import Config
from app.extensions import db, migrate, jwt, cors, socketio
from app.commands import init_db, populate_db
from app.api import api
from app.models import User
from app.socket import register_event_handlers

COMMANDS = [
    init_db, populate_db
]

allowed_origins = [
    "http://localhost:3000"
]


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    register_extensions(app)
    register_commands(app)
    register_event_handlers(socketio)

    return app


def register_extensions(app):
    # Flask-SQLAlchemy
    db.init_app(app)

    # Flask-Migrate
    migrate.init_app(app, db)

    # Flak-RESTful
    api.init_app(app)
    
    # Flask-JWT-Extended
    jwt.init_app(app)

    # Flask-CORS
    cors.init_app(app, resources={r"/api/*": {"origins": allowed_origins}})

    # Flask-SocketIO
    socketio.init_app(app, cors_allowed_origins="http://localhost:3000")

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        try:
            return user.email
        except AttributeError:
            return user

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        user_email = jwt_data["sub"]
        
        return User.query.filter(User.email == user_email).first()
    

def register_commands(app):
    for command in COMMANDS:
        app.cli.add_command(command)
