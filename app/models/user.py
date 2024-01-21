from werkzeug.security import generate_password_hash, check_password_hash

from app.models.base import BaseModel
from app.extensions import db

import uuid


class User(BaseModel):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    _user_id = db.Column(db.String, default=lambda: str(uuid.uuid4())[:8])
    username = db.Column(db.String)
    email = db.Column(db.String)
    _password = db.Column(db.String)

    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    role = db.relationship('Role', backref="user")


    @property
    def password(self):
        return self._password
    
    @password.setter
    def password(self, psw):
        self._password = generate_password_hash(psw)

    def check_password(self, psw):
        return check_password_hash(self.password, psw)
    
    def is_admin(self):
        return self.role and self.role.name == 'admin'
    
    @property
    def user_id(self):
        return self._user_id
    
    def get_data(self):
        user_data = {
            "user_id": self._user_id,
            "username": self.username,
            "email": self.email
        }

        return user_data
    
    @classmethod
    def get_user_data(cls, user_id):
        result = cls.query.filter_by(_user_id=user_id).all()

        data = {}
        for r in result:
            data['user_id'] = r._user_id
            data['username'] = r.username
        
        return data
    

class Role(BaseModel):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __repr__(self):
        return f'{self.name}'
    