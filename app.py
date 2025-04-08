from flask import Flask, jsonify, request
from models import db, bcrypt, User, Restaurant, Order, MenuItem, OrderFoodItem
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
    
#get all restaurants
@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify([
        {"id": r.id, "name": r.name, "location": r.location}
        for r in restaurants
    ])

#get single resturant by id
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
    
    
#create an order
# Create an order
@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    items = data.get('items')  #expected format: [{'food_id': 1, 'quantity': 2}, ...]

    #create the order
    order = Order(user_id=user_id, status='Pending', total_price=0)
    db.session.add(order)
    db.session.commit()

    total_price = 0
    for item in items:
        food_id = item['food_id']  
        quantity = item['quantity']  
        
        food_item = MenuItem.query.get(food_id)
        
        if not food_item:
            return jsonify({"message": f"Food item with ID {food_id} not found"}), 404
        
        #calculate total price for this item
        total_price += food_item.price * quantity
        
        # Add the food item to the order
        order_food_item = OrderFoodItem(order_id=order.id, food_id=food_id, quantity=quantity)
        db.session.add(order_food_item)
    
    #update the total price in the order
    order.total_price = total_price
    db.session.commit()

    return jsonify({"message": "Order placed successfully", "order_id": order.id}), 201
@app.route('/')
def home():
    return{"message": "Food Delivery API is running"}


if __name__ == "__main__":
    app.run(debug=True)