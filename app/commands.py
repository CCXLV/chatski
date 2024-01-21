from flask.cli import with_appcontext
from app.extensions import db
import click

from app.models import User

TEST_USERS = [
    {"username": "ccxlv", "email": "ccxlv@gmail.com", "password": "merebagio"},
    {"username": "test", "email": "test@gmail.com", "password": "merebagio"}
]

@click.command("init_db")
@with_appcontext
def init_db():
    click.echo("Database is being created")
    
    db.drop_all()
    db.create_all()

    click.echo("Database was created")


@click.command("populate_db")
@with_appcontext
def populate_db():
    click.echo("Starting populating the database")

    for user in TEST_USERS:
        u = User(
            username=user["username"],
            email=user["email"],
            password=user["password"]
        )
        u.create()
    
    click.echo("Database was populated")

