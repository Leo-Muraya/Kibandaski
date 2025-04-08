from app import app
from models import db, Restaurant, MenuItem

with app.app_context():
    db.create_all()  #creates tables in the db in case they do not exist

    #create a list of restaurants
    restaurants = [
        Restaurant(name="Dau Swahili Restaurant", location="Nairobi, Kingari Rd"),
        Restaurant(name="KFC", location="Nairobi, along Ngong Road"),
        Restaurant(name="Khum Indian Cuisine", location="Nairobi, along Waiyaki Way"),
        Restaurant(name="Mama Ugali Restaurant", location="Nairobi, CBD Puji Plaza"),
        Restaurant(name="Galitos", location="Nairobi, along Ngong Road"),
        Restaurant(name="Pizza Inn", location="Nairobi, along Ngong Road"),
        Restaurant(name="Chicken Inn", location="Nairobi, along Mbagathi Way"),
        Restaurant(name="Choma Bite", location="Nairobi, Naivasha Rd"),
        Restaurant(name="Majid Restaurant", location="Nairobi, CBD Plaza Jay"),
        Restaurant(name="Exodus Restaurant", location="Nairobi, Plaza Jay"),
        Restaurant(name="Java Restaurant", location="Nairobi, Westlands"),
        Restaurant(name="Tang Zi Ni Restaurant", location="Nairobi, along Kingari Rd"),
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
        "Mama Ugali Restaurant": [
            ("Ugali Sukuma", 150), ("Ugali Nyama", 300), ("Ugali Fish", 350), ("Matumbo", 250),
            ("Githeri", 150), ("Beans & Ugali", 180), ("Ugali Omena", 200), ("Kachumbari", 50),
            ("Chips Mayai", 200), ("Boiled Maize", 100)
        ],
        "Galitos": [
            ("Grilled Chicken", 500), ("Chicken Wrap", 400), ("Spicy Chicken", 550), ("Rice & Chicken", 450),
            ("Fries", 200), ("Coleslaw", 100), ("Burger", 350), ("Chicken Wings", 400),
            ("Soft Drink", 150), ("Garlic Bread", 180)
        ],
        "Pizza Inn": [
            ("Pepperoni Pizza", 850), ("Hawaiian Pizza", 800), ("BBQ Chicken Pizza", 950), ("Veggie Pizza", 750),
            ("Cheese Pizza", 700), ("Meat Deluxe", 1000), ("Margherita", 700), ("Sausage Pizza", 850),
            ("Garlic Bread", 200), ("Soft Drink", 150)
        ],
        "Chicken Inn": [
            ("2-Piece Chicken", 350), ("Chicken & Chips", 400), ("Fried Chicken", 300), ("Chicken Bites", 250),
            ("Chips", 150), ("Coleslaw", 100), ("Wrap", 300), ("Combo Meal", 550),
            ("Soda", 150), ("Apple Pie", 180)
        ],
        "Choma Bite": [
            ("Nyama Choma", 600), ("Kachumbari", 50), ("Ugali Beef", 300), ("Sausages", 150),
            ("Mutura", 100), ("Mbuzi Choma", 700), ("Gizzards", 250), ("Chips", 150),
            ("Chapati", 50), ("Mursik", 100)
        ],
        "Majid Restaurant": [
            ("Beef Samosa", 100), ("Pilau", 250), ("Beef Stew", 350), ("Mandazi", 60),
            ("Mishkaki", 400), ("Fries", 150), ("Chapati", 50), ("Mutton Stew", 450),
            ("Rice & Beans", 200), ("Juice", 120)
        ],
        "Exodus Restaurant": [
            ("Fried Fish", 400), ("Ugali Sukuma", 200), ("Chapati Beans", 180), ("Pilau", 250),
            ("Sausage", 100), ("Githeri", 150), ("Matumbo", 250), ("Rice Beef", 300),
            ("Soda", 100), ("Mandazi", 50)
        ],
        "Java Restaurant": [
            ("Java Burger", 700), ("Cappuccino", 300), ("Chicken Sandwich", 600), ("Milkshake", 350),
            ("Beef Wrap", 650), ("Tea", 150), ("Spicy Fries", 250), ("Salad", 200),
            ("Muffin", 180), ("Pancakes", 250)
        ],
        "Tang Zi Ni Restaurant": [
            ("Sweet and Sour Chicken", 600), ("Egg Fried Rice", 400), ("Spring Rolls", 200), ("Chow Mein", 450),
            ("Beef Stir Fry", 500), ("Dumplings", 300), ("Kung Pao Chicken", 550), ("Steamed Rice", 200),
            ("Wonton Soup", 350), ("Green Tea", 150)
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
