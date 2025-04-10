from app import app
from models import db, Restaurant, MenuItem, FoodItem

with app.app_context():
    #delete all restaurants before seeding the new ones
    db.session.query(Restaurant).delete()
    db.session.commit()

    #create a list of restaurants
    restaurants = [
        Restaurant(name="Dau Swahili Restaurant", location="Nairobi, Kingari Rd"),
        Restaurant(name="KFC", location="Nairobi, along Ngong Road"),
        Restaurant(name="Khum Indian Cuisine", location="Nairobi, along Waiyaki Way"),
        Restaurant(name="Java Restaurant", location="Nairobi, Westlands"),
        Restaurant(name="Exodus Restaurant", location="Nairobi, Plaza Jay"),
    ]

    db.session.add_all(restaurants)
    db.session.commit()

    print("Restaurants added successfully!")

    #mapping of restaurants to their respective menu items
    restaurants_with_foods = {
        "Dau Swahili Restaurant": [
            ("Pilau", 250), ("Chapati Ndengu", 200), ("Biriani", 300), ("Samaki wa Kupaka", 400),
            ("Viazi Karai", 150), ("Mandazi", 50), ("Matoke", 200), ("Wali wa Nazi", 250),
            ("Mahamri", 60), ("Mchuzi wa Pweza", 450)
        ],
        "KFC": [
            ("Zinger Burger", 550), ("Twister Combo", 650), ("Chicken Bucket", 1200), ("Wings", 450),
            ("Popcorn Chicken", 400), ("Crispy Strips", 500), ("Masala Fries", 250), ("Soft Drink", 150),
            ("Coleslaw", 100), ("Cheesy Chips", 300)
        ],
        "Khum Indian Cuisine": [
            ("Butter Chicken", 500), ("Naan", 100), ("Paneer Tikka", 450), ("Chicken Biryani", 500),
            ("Samosa", 100), ("Masala Chai", 80), ("Lamb Curry", 600), ("Tandoori Chicken", 550),
            ("Aloo Gobi", 350), ("Gulab Jamun", 150)
        ],
        "Java Restaurant": [
            ("Java Burger", 700), ("Cappuccino", 300), ("Chicken Sandwich", 600), ("Milkshake", 350),
            ("Beef Wrap", 650), ("Tea", 150), ("Spicy Fries", 250), ("Salad", 200),
            ("Muffin", 180), ("Pancakes", 250)
        ],
        "Exodus Restaurant": [
            ("Fried Fish", 400), ("Ugali Sukuma", 200), ("Chapati Beans", 180), ("Pilau", 250),
            ("Sausage", 100), ("Githeri", 150), ("Matumbo", 250), ("Rice Beef", 300),
            ("Soda", 100), ("Mandazi", 50)
        ]
    }

    #add menu items to the db
    for restaurant in restaurants:
        food_list = restaurants_with_foods.get(restaurant.name, [])
        for food_name, price in food_list:
            menu_item = MenuItem(name=food_name, price=price, restaurant_id=restaurant.id)
            db.session.add(menu_item)

    db.session.commit()
    print("Menu items added successfully!")

    menu_items = MenuItem.query.all()

    for item in menu_items:
        existing = FoodItem.query.filter_by(name=item.name, restaurant_id=item.restaurant_id).first()
        if not existing:
            food_item = FoodItem(
                name=item.name,
                price=item.price,
                restaurant_id=item.restaurant_id
            )
            db.session.add(food_item)

    db.session.commit()
    print(" Menu items copied to food_items table successfully!")
