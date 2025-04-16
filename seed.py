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
        Restaurant(name="Khum Indian Cuisine", location="Nairobi, along Waiyaki Way", rating=4.2, image="https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M="),
        Restaurant(name="Java Restaurant", location="Nairobi, Westlands", rating=4.0, image="https://www.firsttable.co.nz/_next/image?url=https%3A%2F%2Fimages.firsttable.net%2F1292x800%2Fpublic%2Frestaurant%2F5bff3c291a%2FJAVA-Indonesian-Street-Food.jpg&w=3840&q=60"),
        Restaurant(name="Exodus Restaurant", location="Nairobi, Plaza Jay", rating=3.9, image="https://resizer.otstatic.com/v2/photos/wide-large/4/43621675.jpg"),
    ]

    db.session.add_all(restaurants)
    db.session.commit()
    print("Restaurants added successfully!")

    # Food items with image URLs
    restaurants_with_foods = {
        "Dau Swahili Restaurant": [
            ("Pilau", 250, "https://img-global.cpcdn.com/recipes/e16e61be3886271d/1200x630cq70/photo.jpg"),
            ("Chapati Ndengu", 200, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEqSmrS7M4iuMY3oaMMrUfb9rHaYdXq21P9Q&s"),
            ("Biriani", 300, "https://www.shutterstock.com/image-photo/biriani-basmoti-rice-meat-chicken-600w-1523949098.jpg"),
            ("Samaki wa Kupaka", 400, "https://i.ytimg.com/vi/8-a1mp9yAA0/maxresdefault.jpg"),
            ("Viazi Karai", 150, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW43WqTyv45ctYBe4DPihe2eCaOfA16S_u3A&s"),
            ("Mandazi", 50, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxaa5w8_5PUwG6Pi0f91Kpg3k9hgDkTlJpXA&s"),
            ("Matoke", 200, "https://jozzys.net/wp-content/uploads/2022/01/matoke2.jpg"),
            ("Wali wa Nazi", 250, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa_7U4JM-Chm63vDHoLd57MuXPE4DT2T2Z9A&s"),
            ("Mahamri", 60, "https://assets.bonappetit.com/photos/608f0c83e84aa5ebc05ff63f/1:1/w_2560%2Cc_limit/Go-Live-Mandazi-.jpg"),
            ("Mchuzi wa Pweza", 450, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl7NyHNepwEFhNmalhvYlGI0Y_Zh6rN5tvYw&s"),
        ],
        "KFC": [
            ("Zinger Burger", 550, "https://www.masala.tv/wp-content/uploads/2017/08/chaska-7.jpg"),
            ("Twister Combo", 650, "https://cdn.tictuk.com/04d917c0-7bcd-6ced-acad-3e4db2bcbfd5/menus/TWISTERCBO.jpg"),
            ("Chicken Bucket", 1200, "https://chopbeta.org.ng/wp-content/uploads/2021/11/8-pcs.jpeg"),
            ("Wings", 450, "https://www.foodandwine.com/thmb/1C-tlvQnBZ_JJRhrdBIr-sh0Uh4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Kentucky-Fried-Wings-FT-BLOG1019-b9eb0bd740f1478bb14a207010678a25.jpg"),
            ("Popcorn Chicken", 400, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe3TCndsL-hwQw4Z7sMzEI_rKtqrMq5KqNLg&s"),
            ("Crispy Strips", 500, "https://cdn.uengage.io/uploads/45893/image-275921-1712997091.jpeg"),
            ("Masala Fries", 250, "https://desicooking.pk/storage/2024/02/KFC-masala-fries-1024x768.webp"),
            ("Soft Drink", 150, "https://www.fastfoodclub.com/wp-content/uploads/2024/03/KFCs-New-Blackberry-Add-In-Shakes-Up-Soda-Choices.png"),
            ("Coleslaw", 100, "https://www.jolene.nyc/wp-content/uploads/2024/12/KFC-Coleslaw-Portion-Sizes-1024x585.jpg"),
            ("Cheesy Chips", 300, "https://eatbook.sg/wp-content/uploads/2019/03/KFC-Cheese-Fries-1.95-Cheese-Fries.jpg"),
        ],
        "Khum Indian Cuisine": [
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
        "Java Restaurant": [
            ("Java Burger", 700, "https://media-cdn.tripadvisor.com/media/photo-s/14/06/95/de/java-lava-burger.jpg"),
            ("Cappuccino", 300, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5-Bw696xHgriG1Sz9qVWsffiJtZH2PDWxpw&s"),
            ("Chicken Sandwich", 600, "https://ethansrestaurant.com/wp-content/uploads/2023/10/grilled-sandwich-with-bacon-fried-egg-tomato-lettuce-served-wooden-cutting-board_1150-42571.jpg"),
            ("Milkshake", 350, "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/milkshake_19447_16x9.jpg"),
            ("Beef Wrap", 650, "https://img.hellofresh.com/f_auto,fl_lossy,h_300,q_auto,w_450/hellofresh_s3/image/greek-style-beef-wraps-05c041aa.jpg"),
            ("Tea", 150, "https://cdn-allef.nitrocdn.com/srVCBWNuegbwocAiOJUUWBFJUXMzFNKm/assets/images/optimized/rev-2b96033/www.tea-and-coffee.com/wp-content/uploads/2019/06/Health-Benefits-of-Chai-Tea-.jpg"),
            ("Spicy Fries", 250, "https://example.com/images/spicy_fries.jpg"),
            ("Salad", 200, "https://example.com/images/salad.jpg"),
            ("Muffin", 180, "https://example.com/images/muffin.jpg"),
            ("Pancakes", 250, "https://example.com/images/pancakes.jpg"),
        ],
        "Exodus Restaurant": [
            ("Fried Fish", 400, "https://example.com/images/fried_fish.jpg"),
            ("Ugali Sukuma", 200, "https://example.com/images/ugali_sukuma.jpg"),
            ("Chapati Beans", 180, "https://example.com/images/chapati_beans.jpg"),
            ("Pilau", 250, "https://example.com/images/pilau.jpg"),
            ("Sausage", 100, "https://example.com/images/sausage.jpg"),
            ("Githeri", 150, "https://example.com/images/githeri.jpg"),
            ("Matumbo", 250, "https://example.com/images/matumbo.jpg"),
            ("Rice Beef", 300, "https://example.com/images/rice_beef.jpg"),
            ("Soda", 100, "https://example.com/images/soda.jpg"),
            ("Mandazi", 50, "https://example.com/images/mandazi.jpg"),
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
