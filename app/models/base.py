from app.extensions import db


class BaseModel(db.Model):
    __abstract__ = True

    def save(self):
        db.session.commit()

    def create(self, commit=True):
        db.session.add(self)

        if commit:
            self.save()   

    def delete(self):
        db.session.delete(self)
        db.session.commit()