#from flask import Flask, jsonify, request
from models import db,User, Category, Item, Order, Feedback
#import os

#app = Flask(__name__)
#!/usr/bin/env python3
from flask_migrate import Migrate
from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource
from sqlalchemy import MetaData
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os

# Init
app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE_URI = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'app.db')}")


app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False


migrate = Migrate(app, db)
db.init_app(app)
ma = Marshmallow(app)

@app.route('/')
def index():
    return "Welcome to the API"

# Schemas for serialization/deserialization
class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Item

item_schema = ItemSchema()
items_schema = ItemSchema(many=True)

# routes to
@app.route('/api/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return items_schema.jsonify(items)

@app.route('/api/items/<int:id>', methods=['GET'])
def get_item(id):
    item = Item.query.get_or_404(id)
    return item_schema.jsonify(item)

@app.route('/api/items', methods=['POST'])
def add_item():
    data = request.get_json()
    new_item = Item(
        title=data['title'],
        description=data['description'],
        price=data['price'],
        imageurl=data['imageurl'],
        category_id=data['category_id']
    )
    db.session.add(new_item)
    db.session.commit()
    return item_schema.jsonify(new_item)

@app.route('/api/items/<int:id>', methods=['PUT'])
def update_item(id):
    item = Item.query.get_or_404(id)
    data = request.get_json()
    item.title = data.get('title', item.title)
    item.description = data.get('description', item.description)
    item.price = data.get('price', item.price)
    item.imageurl = data.get('imageurl', item.imageurl)
    item.category_id = data.get('category_id', item.category_id)
    db.session.commit()
    return item_schema.jsonify(item)

@app.route('/api/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    item = Item.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return '', 204

# If error
@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404




if __name__ == "__main__":
    app.run(port=5559, debug=True)
