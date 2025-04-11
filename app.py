from flask import Flask, jsonify, request
<<<<<<< HEAD
from models import db, bcrypt, User, Restaurant, Order, MenuItem, OrderFoodItem, FoodItem
=======
from models import db, bcrypt, User, Restaurant, Order, OrderFoodItem, FoodItem
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
from flask_cors import CORS
from flask_migrate import Migrate
import jwt
import datetime
<<<<<<< HEAD
=======
import os
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///food_delivery.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
<<<<<<< HEAD
app.config['SECRET_KEY'] = 'your_secret_key'  # You can change this to a more secure key
=======
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your_secret_key')
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94

db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)

<<<<<<< HEAD
=======
def token_required(f):
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

>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
# Signup route
@app.route('/signup', methods=["POST"])
def signup():
    data = request.get_json()

    # Log the received data for debugging
    print("Received data:", data)  # This will log the data to the console
    
    # Ensure that username, email, and password are provided
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not all([username, email, password]):
        return jsonify({"message": "All fields are required"}), 400

<<<<<<< HEAD
    # Check if the username or email already exists
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
=======
    if User.query.filter((User.username == username) | (User.email == email)).first():
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
        return jsonify({"message": "Username or email already taken"}), 400

    # Create a new user
    user = User(username=username, email=email)
<<<<<<< HEAD
    user.set_password(password)  # Hash the password using bcrypt

    # Save the user to the database
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        print(f"Error saving user: {str(e)}")  # Log the error
        return jsonify({"message": f"Error: {str(e)}"}), 500
=======
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94

    # Return a success message with user data
    return jsonify({"message": "User created successfully", "user": {"username": user.username, "email": user.email}}), 201

<<<<<<< HEAD
=======
# Login route
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Log the received data for debugging
    app.logger.debug("Login request data: %s", data)

    email = data.get('email')  # Only use email for login
    password = data.get('password')

    # Check if the required fields are missing
    if not email or not password:
        app.logger.warning("Missing email or password. Email: %s, Password: %s", email, password)
        return jsonify({"message": "Email and password are required"}), 400

    # Query user by email only
    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
<<<<<<< HEAD
        # Generate a JWT token for the user
        token = jwt.encode(
            {'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
            app.config['SECRET_KEY'],
            algorithm='HS256'
        )

        # Log the success and token generation
        app.logger.info("User logged in successfully. Username: %s, Token: %s", user.username, token)

        # Returning the token in the response to the frontend
        return jsonify({"message": f"Welcome {user.username}!", "token": token}), 200
    else:
        app.logger.warning("Invalid login attempt. Email: %s", email)
        return jsonify({"error": "Invalid email or password"}), 401


# Protecting the homepage route using the JWT token
# @app.route('/homepage', methods=['GET'])
# def homepage():
    # token = request.headers.get('Authorization')

    # Log the received token for debugging
    # app.logger.debug("Received token for homepage access: %s", token)

    # if not token:
        # app.logger.warning("Token is missing from request")
        # return jsonify({"error": "Token is missing"}), 401
    
    # try:
    #     # Decode the token to get user information
    #     decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    #     user_id = decoded_token['user_id']
    #     app.logger.debug("Decoded token successfully. User ID: %s", user_id)

    #     # Fetch the user to confirm if the token is valid
    #     user = User.query.get(user_id)
    #     if not user:
    #         app.logger.warning("User not found. User ID: %s", user_id)
    #         return jsonify({"error": "User not found"}), 404

    #     return jsonify({"message": f"Welcome {user.username} to the Food Delivery homepage!"}), 200

    # except jwt.ExpiredSignatureError:
    #     app.logger.error("Token has expired")
    #     return jsonify({"error": "Token has expired"}), 401
    # except jwt.InvalidTokenError as e:
    #     app.logger.error("Invalid token: %s", str(e))
    #     return jsonify({"error": "Invalid token"}), 401

# Home page route for the API
=======
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

# Get restaurant menu
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

# Create order
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
            continue  # or return error

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

# Get user orders
@app.route('/orders', methods=['GET'])
@token_required
def get_user_orders(current_user):
    orders = Order.query.filter_by(user_id=current_user.id).all()
    
    result = []
    for order in orders:
        items = [{
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

# Update order status
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

>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
@app.route('/')
def home():
    app.logger.info("Home route accessed.")
    return jsonify({"message": "Food Delivery API is running"})

if __name__ == "__main__":
    app.run(debug=True)