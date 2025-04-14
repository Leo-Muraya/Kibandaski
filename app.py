from flask import Flask, jsonify, request
<<<<<<< HEAD
<<<<<<< HEAD
from models import db, bcrypt, User, Restaurant, Order, MenuItem, OrderFoodItem, FoodItem
=======
from models import db, bcrypt, User, Restaurant, Order, OrderFoodItem, FoodItem
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
=======
from models import db, bcrypt, User, Restaurant, Order, FoodItem, OrderFoodItem, Review  # Updated import
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity
import jwt
import datetime
<<<<<<< HEAD
<<<<<<< HEAD
=======
import os
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
=======
import os
from functools import wraps
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c

app = Flask(__name__)
CORS(app)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///food_delivery.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
<<<<<<< HEAD
<<<<<<< HEAD
app.config['SECRET_KEY'] = 'your_secret_key'  # You can change this to a more secure key
=======
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your_secret_key')
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
=======
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your_secret_key')
app.config['JWT_SECRET_KEY'] = app.config['SECRET_KEY']  # for flask_jwt_extended
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=1)
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c

# Init extensions
db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)
jwt_manager = JWTManager(app)  # Was causing conflict as 'jwt'

# ---------------- AUTH DECORATOR ----------------

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(" ")[1]
        
        if not token:
            return jsonify({"message": "Token is missing!"}), 401
            
        try:
            data = jwt_manager._decode_token(token)  # Use JWTManager's decoding
            current_user = User.query.get(data['sub'])
                
            if not current_user:
                raise ValueError("User not found")
                
        except Exception as e:
            print(f"JWT Error: {str(e)}")
            return jsonify({"message": "Token is invalid!"}), 401
            
        return f(current_user, *args, **kwargs)
    return decorator

<<<<<<< HEAD
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
# Signup route
=======
# ---------------- ROUTES ----------------

# Signup
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
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
<<<<<<< HEAD
    # Check if the username or email already exists
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
=======
    if User.query.filter((User.username == username) | (User.email == email)).first():
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
=======
    # Check if the username or email already exists
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
        return jsonify({"message": "Username or email already taken"}), 400

    # Create a new user
    user = User(username=username, email=email)
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
    user.set_password(password)  # Hash the password using bcrypt

    # Save the user to the database
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        print(f"Error saving user: {str(e)}")  # Log the error
        return jsonify({"message": f"Error: {str(e)}"}), 500
<<<<<<< HEAD
=======
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
=======
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c

    # Return a success message with user data
    return jsonify({"message": "User created successfully", "user": {"username": user.username, "email": user.email}}), 201

<<<<<<< HEAD
<<<<<<< HEAD
=======
# Login route
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
=======
# Login
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Log the received data for debugging
    app.logger.debug("Login request data: %s", data)

    # Check if email or username and password are provided
    identifier = data.get('email') or data.get('username')  # Check if either email or username is provided
    password = data.get('password')

    # Log a warning if email/username or password are missing
    if not identifier or not password:
        app.logger.warning("Missing identifier or password. Identifier: %s, Password: %s", identifier, password)
        return jsonify({"message": "Email/Username and password are required"}), 400

    # Query user by email or username
    user = User.query.filter((User.email == identifier) | (User.username == identifier)).first()

    if user and user.check_password(password):
<<<<<<< HEAD
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
        
=======
        access_token = create_access_token(identity=user.id)
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
        return jsonify({
            "token": access_token,
            "user_id": user.id,
            "username": user.username,
            "message": "Login successful"
        }), 200
    else:
        return jsonify({"error": "Invalid email/username or password"}), 401


# Get all restaurants
@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify([{
        "id": r.id, 
        "name": r.name, 
        "location": r.location,
        # "image": r.image,   # Assuming you have an `image` field in your Restaurant model
        # "status": r.status, # Assuming you have a `status` field in your Restaurant model
        "rating": r.rating  # Assuming you have a `rating` field in your Restaurant model
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
    restaurant_id = data.get('restaurant_id')

    if not items or not restaurant_id:
        return jsonify({"message": "Items and restaurant_id are required"}), 400

    # Check that all food items belong to the same restaurant
    for item in items:
        food_item = FoodItem.query.get(item.get('food_id'))
        if not food_item:
            return jsonify({"message": f"Food item with ID {item.get('food_id')} not found"}), 404
        if food_item.restaurant_id != restaurant_id:
            return jsonify({"message": f"Food item ID {food_item.id} does not belong to restaurant ID {restaurant_id}"}), 400

    # Create the order with restaurant_id
    order = Order(user_id=current_user.id, restaurant_id=restaurant_id, status='Pending', total_price=0)
    db.session.add(order)
    db.session.commit()

    # Calculate total and create order items
    total = 0
    for item in items:
        food_item = FoodItem.query.get(item.get('food_id'))
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

# Add these routes if missing
@app.route('/orders/<int:order_id>/items/<int:item_id>', methods=['PATCH', 'DELETE'])
@token_required
def handle_order_item(current_user, order_id, item_id):
    order = Order.query.filter_by(id=order_id, user_id=current_user.id).first()
    if not order:
        return jsonify({"error": "Order not found"}), 404

    item = OrderFoodItem.query.filter_by(id=item_id, order_id=order.id).first()
    if not item:
        return jsonify({"error": "Item not found in order"}), 404

    if request.method == 'PATCH':
        quantity = request.json.get('quantity', 1)
        if quantity < 1:
            return jsonify({"error": "Invalid quantity"}), 400
            
        item.quantity = quantity
        db.session.commit()
        
        # Recalculate total
        order.total_price = sum(i.quantity * i.food_item.price for i in order.food_items)
        db.session.commit()
        
        return jsonify({"message": "Quantity updated"}), 200

    elif request.method == 'DELETE':
        db.session.delete(item)
        db.session.commit()
        
        # Recalculate total
        order.total_price = sum(i.quantity * i.food_item.price for i in order.food_items)
        db.session.commit()
        
        return jsonify({"message": "Item removed"}), 200

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

<<<<<<< HEAD
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
=======
@app.route('/cart', methods=['GET'])
@token_required
def get_cart(current_user):
    """Get active cart with items"""
    cart = Order.query.filter_by(
        user_id=current_user.id,
        status='cart'
    ).first()

    if not cart:
        return jsonify({"message": "Cart is empty"}), 200

    return jsonify({
        "id": cart.id,
        "items": [{
            "id": item.id,
            "food_item_id": item.food_item_id,
            "name": item.food_item.name,
            "price": item.food_item.price,
            "quantity": item.quantity
        } for item in cart.food_items],
        "total": cart.total_price,
        "restaurant": {
            "id": cart.restaurant.id,
            "name": cart.restaurant.name
        } if cart.restaurant else None
    })

@app.route('/cart/items', methods=['POST'])
@token_required
def add_to_cart(current_user):
    """Add item to cart"""
    data = request.json
    food_item_id = data.get('food_item_id')
    quantity = data.get('quantity', 1)

    food_item = FoodItem.query.get_or_404(food_item_id)
    
    # Get or create cart
    cart = Order.query.filter_by(
        user_id=current_user.id,
        status='cart'
    ).first()

    if not cart:
        cart = Order(
            user_id=current_user.id,
            restaurant_id=food_item.restaurant_id,
            status='cart',
            total_price=0
        )
        db.session.add(cart)
        db.session.commit()

    # Check restaurant consistency
    if cart.restaurant_id != food_item.restaurant_id:
        return jsonify({
            "error": "Cannot mix restaurants in cart. Clear cart first."
        }), 400

    # Update existing item or add new
    existing = next((i for i in cart.food_items 
                   if i.food_item_id == food_item_id), None)
    
    if existing:
        existing.quantity += quantity
    else:
        cart.food_items.append(OrderFoodItem(
            food_item_id=food_item_id,
            quantity=quantity
        ))

    # Update total
    cart.total_price = sum(
        item.quantity * item.food_item.price 
        for item in cart.food_items
    )
    db.session.commit()

    return jsonify({
        "message": "Item added to cart",
        "cart_id": cart.id
    }), 201

@app.route('/cart/items/<int:item_id>', methods=['DELETE'])
@token_required
def remove_cart_item(current_user, item_id):
    """Remove item from cart"""
    cart = Order.query.filter_by(
        user_id=current_user.id,
        status='cart'
    ).first_or_404()

    item = next((i for i in cart.food_items 
               if i.id == item_id), None)
    
    if not item:
        return jsonify({"error": "Item not found in cart"}), 404

    db.session.delete(item)
    
    # Update total
    cart.total_price = sum(
        item.quantity * item.food_item.price 
        for item in cart.food_items
    )
    db.session.commit()

    return jsonify({"message": "Item removed"}), 200

# ================= PROFILE ROUTES =================
@app.route('/profile', methods=['GET', 'PATCH'])
@token_required
def user_profile(current_user):
    if request.method == 'GET':
        return jsonify({
            "id": current_user.id,
            "username": current_user.username,
            "email": current_user.email,
            "join_date": current_user.join_date.isoformat() if current_user.join_date else None
        })
    
    if request.method == 'PATCH':
        data = request.get_json()
        updates = {}
        
        if 'username' in data:
            if User.query.filter(User.username == data['username']).first():
                return jsonify({"error": "Username already taken"}), 400
            updates['username'] = data['username']
            
        if 'email' in data:
            if User.query.filter(User.email == data['email']).first():
                return jsonify({"error": "Email already in use"}), 400
            updates['email'] = data['email']
            
        if 'password' in data:
            current_user.set_password(data['password'])
            
        try:
            User.query.filter_by(id=current_user.id).update(updates)
            db.session.commit()
            return jsonify({"message": "Profile updated successfully"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

# ================= REVIEW ROUTES =================
@app.route('/reviews', methods=['POST'])
@token_required
def create_review(current_user):
    data = request.get_json()
    required_fields = ['content', 'rating', 'food_item_id']
    
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        review = Review(
            content=data['content'],
            rating=data['rating'],
            user_id=current_user.id,
            food_item_id=data['food_item_id']
        )
        db.session.add(review)
        db.session.commit()
        
        return jsonify({
            "message": "Review created",
            "review": {
                "id": review.id,
                "content": review.content,
                "rating": review.rating,
                "timestamp": review.timestamp.isoformat()
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/reviews/food/<int:food_item_id>')
def get_food_reviews(food_item_id):
    reviews = Review.query.filter_by(food_item_id=food_item_id).all()
    return jsonify([{
        "id": r.id,
        "content": r.content,
        "rating": r.rating,
        "user": {
            "id": r.user.id,
            "username": r.user.username
        },
        "timestamp": r.timestamp.isoformat()
    } for r in reviews])

@app.route('/reviews/<int:review_id>', methods=['DELETE'])
@token_required
def delete_review(current_user, review_id):
    review = Review.query.get_or_404(review_id)
    
    if review.user_id != current_user.id:
        return jsonify({"error": "Unauthorized to delete this review"}), 403
    
    try:
        db.session.delete(review)
        db.session.commit()
        return jsonify({"message": "Review deleted"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# ================= ADMIN ROUTES =================
def admin_required(f):
    @wraps(f)
    def decorator(current_user, *args, **kwargs):
        if not current_user.is_admin:
            return jsonify({"error": "Admin privileges required"}), 403
        return f(current_user, *args, **kwargs)
    return decorator

@app.route('/admin/restaurants', methods=['POST'])
@token_required
@admin_required
def admin_create_restaurant(current_user):
    data = request.get_json()
    required_fields = ['name', 'location']
    
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        restaurant = Restaurant(
            name=data['name'],
            location=data['location'],
            rating=data.get('rating', 0),
            image=data.get('image')
        )
        db.session.add(restaurant)
        db.session.commit()
        
        return jsonify({
            "message": "Restaurant created",
            "restaurant": {
                "id": restaurant.id,
                "name": restaurant.name,
                "location": restaurant.location
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Add similar implementations for other admin routes
@app.route('/admin/restaurants/<int:restaurant_id>', methods=['PATCH', 'DELETE'])
@token_required
@admin_required
def admin_manage_restaurant(current_user, restaurant_id):
    restaurant = Restaurant.query.get_or_404(restaurant_id)
    
    if request.method == 'PATCH':
        data = request.get_json()
        updates = {}
        
        if 'name' in data:
            updates['name'] = data['name']
        if 'location' in data:
            updates['location'] = data['location']
        if 'rating' in data:
            updates['rating'] = data['rating']
        if 'image' in data:
            updates['image'] = data['image']
            
        try:
            Restaurant.query.filter_by(id=restaurant_id).update(updates)
            db.session.commit()
            return jsonify({"message": "Restaurant updated"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
    
    if request.method == 'DELETE':
        try:
            db.session.delete(restaurant)
            db.session.commit()
            return jsonify({"message": "Restaurant deleted"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

# ================= SEARCH ROUTE =================
@app.route('/search')
def search_restaurants():
    query = request.args.get('q', '')
    if not query:
        return jsonify({"error": "Missing search query"}), 400
    
    results = Restaurant.query.filter(
        Restaurant.name.ilike(f'%{query}%') | 
        Restaurant.location.ilike(f'%{query}%')
    ).all()
    
    return jsonify([{
        "id": r.id,
        "name": r.name,
        "location": r.location,
        "rating": r.rating,
        "image": r.image
    } for r in results])

# ================= TOKEN VERIFICATION =================
@app.route('/verify-token')
@token_required
def verify_token_route(current_user):
    return jsonify({
        "valid": True,
        "user": {
            "id": current_user.id,
            "username": current_user.username
        }
    })

>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
@app.route('/')
def home():
    app.logger.info("Home route accessed.")
    return jsonify({"message": "Food Delivery API is running"})

if __name__ == "__main__":
    app.run(debug=True)
