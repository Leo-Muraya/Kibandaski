from app import app
from models import db, Restaurant, FoodItem, User

with app.app_context():
    # ✅ Ensure all tables are created before seeding
    db.create_all()

    # Check if the user already exists before adding
    existing_user = User.query.filter_by(email="john@example.com").first()
    if not existing_user:
        user = User(username="john", email="john@example.com")
        user.set_password("1234")
        db.session.add(user)
        db.session.commit()
        print("User 'john@example.com' added successfully!")
    else:
        print("User 'john@example.com' already exists.")

    # Delete all restaurants and food items before seeding new ones
    db.session.query(FoodItem).delete()
    db.session.query(Restaurant).delete()
    db.session.commit()

    # Add restaurants
    restaurants = [
        Restaurant(name="Dau Swahili Restaurant", location="Nairobi, Kingari Rd", rating=4.5, image="https://tb-static.uber.com/prod/image-proc/processed_images/98b402e3194a38ac4afe58443aaa9776/9e31c708e4cf73b6e3ea1bd4a9b6e16b.webp"),
        Restaurant(name="KFC", location="Nairobi, along Ngong Road", rating=3.8, image="https://tb-static.uber.com/prod/image-proc/processed_images/6832b9add2695d876619c4c2d5924ffc/30be7d11a3ed6f6183354d1933fbb6c7.jpeg"),
        Restaurant(name="Khum Indian Cuisine", location="Nairobi, along Waiyaki Way", rating=4.2, image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvOobWnO7wbRjjfA-wGdAdnrPlULCZ6k0L2w&s"),
        Restaurant(name="Java Restaurant", location="Nairobi, Westlands", rating=4.0, image="https://media.cafejavas.co.ug/categoryImages/1722067976.png"),
        Restaurant(name="Exodus Restaurant", location="Nairobi, Plaza Jay", rating=3.9, image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYuMCo40occCxwUnXVHOkHYKoynmrGf_0jZA&s"),
    ]

    db.session.add_all(restaurants)
    db.session.commit()
    print("Restaurants added successfully!")

    # Food items
    restaurants_with_foods = {
        "Dau Swahili Restaurant": [("Pilau", 250), ("Chapati Ndengu", 200), ("Biriani", 300), ("Samaki wa Kupaka", 400),
                                   ("Viazi Karai", 150), ("Mandazi", 50), ("Matoke", 200), ("Wali wa Nazi", 250),
                                   ("Mahamri", 60), ("Mchuzi wa Pweza", 450)],
        "KFC": [("Zinger Burger", 550), ("Twister Combo", 650), ("Chicken Bucket", 1200), ("Wings", 450),
                ("Popcorn Chicken", 400), ("Crispy Strips", 500), ("Masala Fries", 250), ("Soft Drink", 150),
                ("Coleslaw", 100), ("Cheesy Chips", 300)],
        "Khum Indian Cuisine": [("Butter Chicken", 500), ("Naan", 100), ("Paneer Tikka", 450), ("Chicken Biryani", 500),
                                ("Samosa", 100), ("Masala Chai", 80), ("Lamb Curry", 600), ("Tandoori Chicken", 550),
                                ("Aloo Gobi", 350), ("Gulab Jamun", 150)],
        "Java Restaurant": [("Java Burger", 700), ("Cappuccino", 300), ("Chicken Sandwich", 600), ("Milkshake", 350),
                            ("Beef Wrap", 650), ("Tea", 150), ("Spicy Fries", 250), ("Salad", 200),
                            ("Muffin", 180), ("Pancakes", 250)],
        "Exodus Restaurant": [("Fried Fish", 400), ("Ugali Sukuma", 200), ("Chapati Beans", 180), ("Pilau", 250),
                              ("Sausage", 100), ("Githeri", 150), ("Matumbo", 250), ("Rice Beef", 300),
                              ("Soda", 100), ("Mandazi", 50)],
    }

    for restaurant in restaurants:
        food_list = restaurants_with_foods.get(restaurant.name, [])
        for food_name, price in food_list:
            existing = FoodItem.query.filter_by(name=food_name, restaurant_id=restaurant.id).first()
            if not existing:
                food_item = FoodItem(
                    name=food_name,
                    price=price,
                    restaurant_id=restaurant.id
                )
                db.session.add(food_item)

    db.session.commit()
    print("Food items added successfully!")
