from app import app
from models import db, Restaurant

with app.app_context():
    db.create_all() 

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

    print(" Restaurants added successfully!")
