from app.models.base import BaseModel
from app.extensions import db


class FriendRequest(BaseModel):
    __tablename__ = "friend_requests"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey("users._user_id"))
    req_user_id = db.Column(db.String)
    req_user_username = db.Column(db.String)

    @classmethod
    def get_friend_requests_data(cls):
        requests_data = cls.query.all()

        friend_requests_data = [
            {
                "id": request.id,
                "user_id": request.user_id,
                "req_user_id": request.req_user_id,
                "req_user_username": request.req_user_username
            }
            for request in requests_data
        ]

        return friend_requests_data
    
    @classmethod
    def existed_friend_request(cls, user_id, req_user_id):
        friend_request = cls.query.filter_by(user_id=user_id, req_user_id=req_user_id).first()

        return friend_request
    

class FriendList(BaseModel):
    __tablename__ = "friends_list"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String)
    friend_id = db.Column(db.String)

    user_username = db.Column(db.String, db.ForeignKey("users.username"))
    friend_username = db.Column(db.String, db.ForeignKey("users.username"))
    
    @classmethod
    def get_friend_list(cls, user_id):
        user_ = cls.query.filter_by(user_id=user_id).first()
        friend_ = cls.query.filter_by(friend_id=user_id).first()

        friends_list = []
        if user_:
            friends = cls.query.filter_by(user_id=user_id).all()

            for friend in friends:
                data = {
                    "user_id": friend.user_id,
                    "friend_id": friend.friend_id,
                    "friend_username": friend.friend_username
                }
                friends_list.append(data)

        if friend_:
            friends = cls.query.filter_by(friend_id=user_id).all()

            for friend in friends:
                data = {
                    "user_id": friend.friend_id,
                    "friend_id": friend.user_id,
                    "user_username": friend.user_username
                }
                friends_list.append(data)

        return friends_list
    
    @classmethod
    def get_friends_id(cls, user_id):
        user_ = cls.query.filter_by(user_id=user_id).first()
        friend_ = cls.query.filter_by(friend_id=user_id).first()

        friends_list = []
        if user_:
            friends = cls.query.filter_by(user_id=user_id).all()


            for friend in friends:
                data = {
                    "user_id": friend.user_id,
                    "friend_id": friend.friend_id,
                }
                friends_list.append(data)

        if friend_:
            friends = cls.query.filter_by(friend_id=user_id).all()

            for friend in friends:
                data = {
                    "user_id": friend.friend_id,
                    "friend_id": friend.user_id,
                }
                friends_list.append(data)

        return friends_list