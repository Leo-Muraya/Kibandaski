from app import app
from models import db, Restaurant, FoodItem, User

with app.app_context():
    # Ensure all tables are created before seeding
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

    # Food items with image URLs
    restaurants_with_foods = {
        "Dau Swahili Restaurant": [
            ("Pilau", 250, "globo/src/images/download (37).jpeg"),
            ("Chapati Ndengu", 200, "globo/src/images/download (1).jpeg"),
            ("Mandazi", 200, "globo/src/images/download.jpeg"),
            ("Viazi Karai", 150, "globo/src/images/download.jpeg")
            ("Matoke", 200, "globo/src/images/download (2).jpeg"),
            ("Wali wa Nazi", 250, "globo/src/images/download (3).jpeg"),
            ("Mahamri", 60, "globo/src/images/download (4).jpeg"),
            ("Mchuzi wa Pweza", 450, "globo/src/images/download (5).jpeg")
        "KFC": [
            ("Zinger Burger", 550, "globo/src/images/download (6).jpeg"),
            ("Twister Combo", 650, "globo/src/images/download (7).jpeg"),
            ("Chicken Bucket", 1200, "globo/src/images/download (8).jpeg"),
            ("Wings", 450, "globo/src/images/download (9).jpeg"),
            ("Popcorn Chicken", 400, "globo/src/images/download (10).jpeg"),
            ("Crispy Strips", 500, "globo/src/images/download (11).jpeg"),
            ("Masala Fries", 250, "globo/src/images/download (12).jpeg"),
            ("Soft Drink", 150, "globo/src/images/download (13).jpeg"),
            ("Coleslaw", 100, "globo/src/images/download (14).jpeg"),
            ("Cheesy Chips", 300, "globo/src/images/download (14).jpeg"),
        ],
        "Khum Indian Cuisine": [
            ("Butter Chicken", 500, "globo/src/images/download (16).jpeg"),
            ("Naan", 100, "globo/src/images/download (17).jpeg"),
            ("Paneer Tikka", 450, "globo/src/images/download (18).jpeg"),
            ("Chicken Biryani", 500, "globo/src/images/download (19).jpeg"),
            ("Samosa", 100, "globo/src/images/download (20).jpeg"),
            ("Masala Chai", 80, "globo/src/images/download (21).jpeg"),
            ("Lamb Curry", 600, "globo/src/images/download (22).jpeg"),
            ("Tandoori Chicken", 550, "globo/src/images/download (23).jpeg"),
            ("Aloo Gobi", 350, "globo/src/images/download (24).jpeg"),
            ("Gulab Jamun", 150, "globo/src/images/download (25).jpeg")
        "Java Restaurant": [
            ("Java Burger", 700, "globo/src/images/download (26).jpeg"),
            ("Cappuccino", 300, "globo/src/images/download (27).jpeg"),
            ("Chicken Sandwich", 600, "globo/src/images/download (28).jpeg"),
            ("Milkshake", 350, "globo/src/images/download (29).jpeg"),
            ("Beef Wrap", 650, "globo/src/images/download (30).jpeg"),
            ("Tea", 150, "globo/src/images/download (21).jpeg"),
            ("Spicy Fries", 250, "globo/src/images/download (12).jpeg"),
            ("Salad", 200, "globo/src/images/download (31).jpeg"),
            ("Muffin", 180, "globo/src/images/download (32).jpeg"),
            ("Pancakes", 250, "globo/src/images/download (33).jpeg"),
        ],
        "Exodus Restaurant": [
            ("Fried Fish", 400, "globo/src/images/download (34).jpeg"),
            ("Ugali Sukuma", 200, "globo/src/images/download (35).jpeg"),
            ("Chapati Beans", 180, "globo/src/images/download (36).jpeg"),
            ("Pilau", 250, "globo/src/images/download (37).jpeg"),
            ("Sausage", 100, "globo/src/images/download (38).jpeg"),
            ("Githeri", 150, "globo/src/images/download (39).jpeg"),
            ("Matumbo", 250, "globo/src/images/download (40).jpeg"),
            ("Rice Beef", 300, "globo/src/images/download (41).jpeg"),
            ("Soda", 100, "globo/src/images/download (13).jpeg"),
            ("Mandazi", 50, "globo/src/images/download (4).jpeg"),
        ],
    }

    for restaurant in restaurants:
        food_list = restaurants_with_foods.get(restaurant.name, [])
        for food_name, price, image in food_list:
            existing = FoodItem.query.filter_by(name=food_name, restaurant_id=restaurant.id).first()
            if not existing:
                food_item = FoodItem(
                    name=food_name,
                    price=price,
                    image=image,  # Add the image URL here
                    restaurant_id=restaurant.id
                )
                db.session.add(food_item)

    db.session.commit()
    print("Food items with images added successfully!")
