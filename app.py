from flask import Flask, jsonify, request
from models import db, bcrypt, User, Restaurant, Order, MenuItem, OrderFoodItem, FoodItem
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
@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    items = data.get('items')  

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
        order_food_item = OrderFoodItem(order_id=order.id, food_item_id=food_id, quantity=quantity)
        db.session.add(order_food_item)
    
#update the total price in the order
    order.total_price = total_price
    db.session.commit()

    return jsonify({"message": "Order placed successfully", "order_id": order.id}), 201


#view past orders
@app.route('/users/<int:user_id>/orders', methods=['GET'])
def get_user_orders(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    orders = Order.query.filter_by(user_id=user_id).all()
    result = []

    for order in orders:
        order_items = OrderFoodItem.query.filter_by(order_id=order.id).all()
        item_list = []
        for order_item in order_items:
            
            food = FoodItem.query.get(order_item.food_item_id)
            
            if food:
                item_list.append({
                    "food_name": food.name,
                    "quantity": order_item.quantity,
                    "price": food.price,
                    "subtotal": food.price * order_item.quantity
                })
            else:
                item_list.append({
                    "food_name": "Unknown",  
                    "quantity": order_item.quantity,
                    "price": 0,
                    "subtotal": 0
                })

        result.append({
            "order_id": order.id,
            "status": order.status,
            "total_price": order.total_price,
            "timestamp": order.timestamp,
            "items": item_list
        })

    return jsonify(result), 200


#update order status
app.route('/orders/<int:order_id>/status', methods=['PATCH'])
def update_order_status(order_id):
    data = request.get_json()
    new_status = data.get("status")
    
    order = Order.query.get(order_id)
    
    if not order:
        return jsonify({"message": "Order not Found"}), 404
    
    if not new_status:
        return jsonify({"message": "News status is required"}), 400
    
    order.status  = new_status
    db.session.commit()
    
    return jsonify({
        "message" : f"Order {order.id} status updated to {new_status}"
    }), 200
    
#get all menu items for each restaurant 
@app.route('/restaurant/<int:restaurant_id>/menu', methods=['GET'])
def get_menu_for_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        return jsonify({"message": "Restaurant not found"}), 404
    
    menu_items = MenuItem.query.filter_by(restaurant_id=restaurant_id).all()
    
    if not menu_items:
        return jsonify({"message": "No menu items found for this restaurant"}), 404

    menu_data = [
        {"id": item.id, "name": item.name, "price": item.price}
        for item in menu_items
    ]
    
    return jsonify(menu_data), 200

    
    
#delete order
@app.route('/orders/<int:order_id>', methods = ['DELETE'])
def delete_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"message" : "Order not found"}), 404
    db.session.delete(order)
    db.session.commit()
    return jsonify({"message": f"Order {order_id} deleted sucessfully!"}), 200

#home page
@app.route('/')
def home():
    return{"message": "Food Delivery API is running"}


if __name__ == "__main__":
    app.run(debug=True)