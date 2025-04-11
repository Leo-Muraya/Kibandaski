from flask import Flask, jsonify, request
from models import db, bcrypt, User, Restaurant, Order, OrderFoodItem, FoodItem
from flask_cors import CORS
from flask_migrate import Migrate
import jwt
import datetime
import os
from functools import wraps

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///food_delivery.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your_secret_key')

db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({"message": "Token is missing!"}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({"message": "Token is invalid!"}), 401
        return f(current_user, *args, **kwargs)
    return decorator

# Signup
@app.route('/signup', methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not all([username, email, password]):
        return jsonify({"message": "All fields are required"}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"message": "Username or email already taken"}), 400

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

# Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username_or_email = data.get('username')
    password = data.get('password')   

    user = User.query.filter((User.username == username_or_email) | (User.email == username_or_email)).first()

    if user and user.check_password(password):
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'])

        return jsonify({
            "message": f"Welcome {user.username}!",
            "token": token,
            "user_id": user.id
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401

# Get all restaurants
@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify([{
        "id": r.id, 
        "name": r.name, 
        "location": r.location
    } for r in restaurants])

# Get menu
@app.route('/restaurants/<int:restaurant_id>/menu', methods=['GET'])
def get_restaurant_menu(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        return jsonify({"message": "Restaurant not found"}), 404

    menu_items = FoodItem.query.filter_by(restaurant_id=restaurant_id).all()
    return jsonify([{
        "id": item.id,
        "name": item.name,
        "price": item.price
    } for item in menu_items])

# Create new order
@app.route('/orders', methods=['POST'])
@token_required
def create_order(current_user):
    data = request.get_json()
    items = data.get('items')

    if not items:
        return jsonify({"message": "Items are required"}), 400

    order = Order(user_id=current_user.id, status='Pending', total_price=0)
    db.session.add(order)
    db.session.commit()

    total = 0
    for item in items:
        food_item = FoodItem.query.get(item.get('food_id'))
        if not food_item:
            continue

        quantity = item.get('quantity', 1)
        total += food_item.price * quantity

        order_item = OrderFoodItem(
            order_id=order.id,
            food_item_id=food_item.id,
            quantity=quantity
        )
        db.session.add(order_item)

    order.total_price = total
    db.session.commit()

    return jsonify({
        "message": "Order created",
        "order_id": order.id,
        "total": total
    }), 201

# Get all user orders
@app.route('/orders', methods=['GET'])
@token_required
def get_user_orders(current_user):
    orders = Order.query.filter_by(user_id=current_user.id).all()

    result = []
    for order in orders:
        items = [{
            "food_id": item.food_item_id,
            "food_name": item.food_item.name,
            "quantity": item.quantity,
            "price": item.food_item.price,
            "subtotal": item.quantity * item.food_item.price
        } for item in order.food_items]

        result.append({
            "id": order.id,
            "status": order.status,
            "total": order.total_price,
            "items": items,
            "timestamp": order.timestamp
        })

    return jsonify(result)

# Remove item from an order (cart)
@app.route('/orders/<int:order_id>/items/<int:item_id>', methods=['DELETE'])
@token_required
def remove_item_from_order(current_user, order_id, item_id):
    order = Order.query.filter_by(id=order_id, user_id=current_user.id).first()
    if not order:
        return jsonify({"message": "Order not found"}), 404

    item = OrderFoodItem.query.filter_by(order_id=order.id, food_item_id=item_id).first()
    if not item:
        return jsonify({"message": "Item not found in order"}), 404

    db.session.delete(item)
    db.session.commit()

    # Update total price after item removal
    total = sum(i.quantity * i.food_item.price for i in order.food_items)
    order.total_price = total
    db.session.commit()

    return jsonify({"message": "Item removed", "updated_total": total})

# Update order status (e.g. to Delivered)
@app.route('/orders/<int:order_id>', methods=['PATCH'])
def update_order_status(order_id):
    data = request.get_json()
    order = Order.query.get(order_id)

    if not order:
        return jsonify({"message": "Order not found"}), 404

    if status := data.get('status'):
        order.status = status
        db.session.commit()

    return jsonify({
        "message": "Order updated",
        "status": order.status
    })

@app.route('/')
def home():
    return {"message": "Food Delivery API is running"}

if __name__ == "__main__":
    app.run(debug=True)
