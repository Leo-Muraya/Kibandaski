from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime

db = SQLAlchemy()
bcrypt = Bcrypt()

class OrderFoodItem(db.Model):
    __tablename__ = "order_food_items"
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    food_item_id = db.Column(db.Integer, db.ForeignKey("food_items.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)

# User model
class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    join_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    orders = db.relationship("Order", backref="user", cascade="all, delete-orphan")
    reviews = db.relationship("Review", backref="user", cascade="all, delete-orphan")
    
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

# Restaurant model
class Restaurant(db.Model):
    __tablename__ = "restaurants"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120))
    rating = db.Column(db.Float) 
    image = db.Column(db.String(200), nullable=True)

    food_items = db.relationship("FoodItem", backref="restaurant", cascade="all, delete-orphan")
    orders = db.relationship("Order", backref="restaurant", cascade="all, delete-orphan")  

# FoodItem model
class FoodItem(db.Model):
    __tablename__ = "food_items"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))
    image = db.Column(db.String)

    order_items = db.relationship("OrderFoodItem", backref="food_item", cascade="all, delete-orphan")
    reviews = db.relationship("Review", backref="food_item", cascade="all, delete-orphan")

# Order model
class Order(db.Model):
    __tablename__ = "orders"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False) 
    status = db.Column(db.String(50), default="Preparing")
    total_price = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    food_items = db.relationship("OrderFoodItem", backref="order", cascade="all, delete-orphan")

# Review model
class Review(db.Model):
    __tablename__ = "reviews"
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)  
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    food_item_id = db.Column(db.Integer, db.ForeignKey("food_items.id"), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
