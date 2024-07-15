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
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os,random

# Init
app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE_URI = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'app.db')}")


app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
app.config["JWT_SECRET_KEY"] = "fsbdgfnhgvjnvhmvh"+str(random.randint(1,1000000000000)) 
app.config["SECRET_KEY"] = "JKSRVHJVFBSRDFV"+str(random.randint(1,1000000000000))
bcrypt = Bcrypt(app)
jwt = JWTManager(app)



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

# Login endpoint for both users and Coach
@app.route('/signup', methods=['POST'])
def signup():
    name = request.json.get('name', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not name or not email or not password:
        return jsonify({"message": "Name, email, and password are required"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(username=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)
    return jsonify({"access_token": access_token, "user": {"id": new_user.id, "username": new_user.username, "email": new_user.email}}), 200

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token, "user": {"id": user.id, "username": user.username, "email": user.email}}), 200

@app.route('/current_user', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({"id": user.id, "username": user.username, "email": user.email}), 200



# Get all user
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list =[]
    for user in users:
        user_list.append({"id": user.id, "name": user.username, "email": user.email})

    return jsonify(user_list),200

# Get all items
@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    item_list =[]
    for item in items:
        item_list.append({"id": item.id, "name": item.title, "description": item.description, "price": item.price, "category id":item.category_id, "image link": item.imageurl})

    return jsonify(item_list),200

# Get all categories
@app.route('/categories', methods=['GET'])
def get_categories():
    categorys = Category.query.all()
    category_list =[]
    for category in categorys:
        category_list.append({"id": category.id, "name": category.name})

    return jsonify(category_list),200

# Get all feedbacks
@app.route('/feedbacks', methods=['GET'])
def get_feedbacks():
    feedbacks = Feedback.query.all()
    feedback_list =[]
    for feedback in feedbacks:
        feedback_list.append({"id": feedback.id, "name": feedback.name, "email": feedback.email, "feedback": feedback.feedback, "item bought": feedback.item_id})

    return jsonify(feedback_list),200

# Get all orders
@app.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    order_list =[]
    for order in orders:
        order_list.append({"id": order.id, "quantity": order.quantity, "status": order.status, "user": order.user_id})

    return jsonify(order_list),200


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

@app.route('/addorders', methods=['POST'])
@jwt_required()
def add_order():
    data = request.get_json()
    quantity = data.get('quantity', None)
    status = data.get('status', 'pending')
    item_ids = data.get('items', [])

    if not quantity or not item_ids:
        return jsonify({"message": "Quantity and items are required"}), 400

    try:
        user_id = get_jwt_identity()
        new_order = Order(quantity=quantity, status=status, user_id=user_id)

        for item_id in item_ids:
            item = Item.query.get(item_id)
            if item:
                new_order.items.append(item)

        db.session.add(new_order)
        db.session.commit()

        return jsonify({"message": "Order placed successfully", "order": {
            "id": new_order.id,
            "quantity": new_order.quantity,
            "status": new_order.status,
            "items": [{"id": item.id, "title": item.title, "description": item.description,
                       "price": item.price, "category_id": item.category_id,
                       "imageurl": item.imageurl} for item in new_order.items]
        }}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Failed to place order: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(port=5559, debug=True)
