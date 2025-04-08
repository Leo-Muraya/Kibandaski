from flask import Flask, jsonify, request
from models import db, bcrypt, User, Restaurant
from flask_migrate import Migrate


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///food_delivery.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
bcrypt.init_app(app)
migrate =Migrate(app, db)

#sign up route
@app.route('/signup', methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    
    
    if not username or not email or not password:
        return jsonify({"message" : "All fields (username, email, password) are required"}), 400
    
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({"message" : "Username or email already taken"}), 400
    
    
    user = User(username=username, email=email)
    user.set_password(password)
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"message" : "User created successfully"}), 201

#login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username_or_email = data.get('username')
    password = data.get('password')   
    
    user  = User.query.filter((User.username == username_or_email) | (User.email == username_or_email)).first()
    
    if user and user.check_password(password):
        return jsonify({"message": f"Welcome {user.username}!"}), 200
    else:
        return jsonify({"error": "Invalid username/email or password"}), 401
    
    
@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify([
        {"id": r.id, "name": r.name, "location": r.location}
        for r in restaurants
    ])


@app.route('/restaurants/<int:id>', methods=['GET'])
def get_restaurant_by_id(id):
    restaurant = Restaurant.query.get(id)
    
    if restaurant:
        return jsonify({
            "id": restaurant.id,
            "name": restaurant.name,
            "location": restaurant.location
        }), 200
    else:
        return jsonify({"message": "Restaurant not found"}), 404
@app.route('/')
def home():
    return{"message": "Food Delivery API is running"}


if __name__ == "__main__":
    app.run(debug=True)