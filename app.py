from flask import Flask, jsonify, request
from models import db, bcrypt, User, Restaurant, Order, MenuItem, OrderFoodItem, FoodItem
from flask_cors import CORS
from flask_migrate import Migrate
import jwt
import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///food_delivery.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # You can change this to a more secure key

db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)

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

    if not username or not email or not password:
        return jsonify({"message": "All fields (username, email, password) are required"}), 400

    # Check if the username or email already exists
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({"message": "Username or email already taken"}), 400

    # Create a new user
    user = User(username=username, email=email)
    user.set_password(password)  # Hash the password using bcrypt

    # Save the user to the database
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        print(f"Error saving user: {str(e)}")  # Log the error
        return jsonify({"message": f"Error: {str(e)}"}), 500

    # Return a success message with user data
    return jsonify({"message": "User created successfully", "user": {"username": user.username, "email": user.email}}), 201

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
@app.route('/homepage', methods=['GET'])
def homepage():
    token = request.headers.get('Authorization')

    # Log the received token for debugging
    app.logger.debug("Received token for homepage access: %s", token)

    if not token:
        app.logger.warning("Token is missing from request")
        return jsonify({"error": "Token is missing"}), 401
    
    try:
        # Decode the token to get user information
        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = decoded_token['user_id']
        app.logger.debug("Decoded token successfully. User ID: %s", user_id)

        # Fetch the user to confirm if the token is valid
        user = User.query.get(user_id)
        if not user:
            app.logger.warning("User not found. User ID: %s", user_id)
            return jsonify({"error": "User not found"}), 404

        return jsonify({"message": f"Welcome {user.username} to the Food Delivery homepage!"}), 200

    except jwt.ExpiredSignatureError:
        app.logger.error("Token has expired")
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError as e:
        app.logger.error("Invalid token: %s", str(e))
        return jsonify({"error": "Invalid token"}), 401

# Home page route for the API
@app.route('/')
def home():
    app.logger.info("Home route accessed.")
    return jsonify({"message": "Food Delivery API is running"})

if __name__ == "__main__":
    app.run(debug=True)
