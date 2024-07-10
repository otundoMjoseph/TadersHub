from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# contains definitions of tables and associated schema constructs
# read more about Metadata using the link at the bottom of the page
metadata = MetaData()

# create the Flask SQLAlchemy extension
db = SQLAlchemy(metadata=metadata)

# Models go here!

class Users(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False )
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)


class Categorys(db.Model):
    __tablename__ = "category"

    id = db.Column(db.Integer, primary_key=True)
    name =db.Column(db.String, unique=True, nullable=False) 

    def __repr__(self):
        return f'<Category {self.id}, {self.name}>'


class Items(db.Model):
    __tablename__ = "item"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)

    #Add relationships to display the user from id and the category of the item and feedback(one to many)


    def __repr__(self):
        return f'<Item {self.id}, {self.title}, {self.description}, {self.price}>'


class Orders(db.Model):
    __tablename__ = "order"

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String, nullable=False)

    #Add relationships to display the user and the item from id to display it on the order

    def __repr__(self):
        return f'<Order {self.id}, {self.quantity}, {self.status}>'


class Feedbacks(db.Model):
    __tablename__ = "feedback"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    feedback = db.Column(db.String, nullable=False)

    #Get product name from other class

    def __repr__(self):
        return f'<Feedback {self.id}, {self.email}, {self.rating}, {self.feedback}>'