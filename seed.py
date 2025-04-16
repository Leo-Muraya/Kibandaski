from app import app
<<<<<<< HEAD
from models import db, Restaurant, MenuItem, FoodItem

with app.app_context():
    #delete all restaurants before seeding the new ones
    db.session.query(Restaurant).delete()
    db.session.commit()
=======
from models import db, Restaurant, FoodItem, User

with app.app_context():
    # Ensure all tables are created before seeding
    db.create_all()
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c

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
<<<<<<< HEAD
        Restaurant(name="Dau Swahili Restaurant", location="Nairobi, Kingari Rd"),
        Restaurant(name="KFC", location="Nairobi, along Ngong Road"),
        Restaurant(name="Khum Indian Cuisine", location="Nairobi, along Waiyaki Way"),
        Restaurant(name="Java Restaurant", location="Nairobi, Westlands"),
        Restaurant(name="Exodus Restaurant", location="Nairobi, Plaza Jay"),
=======
        Restaurant(name="Dau Swahili Restaurant", location="Nairobi, Kingari Rd", rating=4.5, image="https://tb-static.uber.com/prod/image-proc/processed_images/98b402e3194a38ac4afe58443aaa9776/9e31c708e4cf73b6e3ea1bd4a9b6e16b.webp"),
        Restaurant(name="KFC", location="Nairobi, along Ngong Road", rating=3.8, image="https://tb-static.uber.com/prod/image-proc/processed_images/6832b9add2695d876619c4c2d5924ffc/30be7d11a3ed6f6183354d1933fbb6c7.jpeg"),
        Restaurant(name="Khum Indian Cuisine", location="Nairobi, along Waiyaki Way", rating=4.2, image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvOobWnO7wbRjjfA-wGdAdnrPlULCZ6k0L2w&s"),
        Restaurant(name="Java Restaurant", location="Nairobi, Westlands", rating=4.0, image="https://media.cafejavas.co.ug/categoryImages/1722067976.png"),
        Restaurant(name="Exodus Restaurant", location="Nairobi, Plaza Jay", rating=3.9, image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYuMCo40occCxwUnXVHOkHYKoynmrGf_0jZA&s"),
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c
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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
            ("Butter Chicken", 500, "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2024-12-butter-chicken%2Fbutter-chicken-323"),
            ("Naan", 100, "https://i0.wp.com/binjalsvegkitchen.com/wp-content/uploads/2015/04/Stuffed-Cheesy-Spinach-Naan-H2-WT.jpg?resize=600%2C900&ssl=1"),
            ("Paneer Tikka", 450, "https://www.cookwithmanali.com/wp-content/uploads/2015/07/Restaurant-Style-Recipe-Paneer-Tikka-500x500.jpg"),
            ("Chicken Biryani", 500, "https://img-global.cpcdn.com/recipes/bc808d8b27b805e3/400x400cq70/photo.jpg"),
            ("Samosa", 100, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDyWt0EKC6Awgr3IqO1cR-zqgJ6Nd7-3e4lJ13QFA0cvM6GmmeTdut8i9jx0CjtYlUzEc&usqp=CAU"),
            ("Masala Chai", 80, "https://www.teaforturmeric.com/wp-content/uploads/2021/11/Masala-Chai-Tea-Recipe-Card.jpg"),
            ("Lamb Curry", 600, "https://myfoodstory.com/wp-content/uploads/2020/02/Slow-Cooker-Lamb-Curry-3.jpg"),
            ("Tandoori Chicken", 550, "https://www.allrecipes.com/thmb/ygY1JXP8_IkDSjPPW5VH2dTiMMU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/50347-indian-tandoori-chicken-DDMFS-4x3-3035-205e98c80b2f4275b5bd010c396d9149.jpg"),
            ("Aloo Gobi", 350, "https://www.slimmingeats.com/blog/wp-content/uploads/2020/01/aloo-gobi-27-720x720.jpg"),
            ("Gulab Jamun", 150, "https://www.spiceupthecurry.com/wp-content/uploads/2020/08/gulab-jamun-recipe-2.jpg"),
        ],
=======
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
>>>>>>> 453fa833bbf633ee9f340402585ddfdf9ed17305
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
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c
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
<<<<<<< HEAD
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
=======
    print("Food items with images added successfully!")
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c
