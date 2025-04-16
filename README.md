# Food Delivery App

A full-stack food delivery application inspired by Glovo, built with Flask (Python) backend and React (JavaScript) frontend.

![App Screenshot](./globo/src/images/Screenshot%20from%202025-04-16%2002-29-23.png) 

## Features

### Backend (Flask)
- JWT-based user authentication
- Restaurant & menu management
- Order processing system
- RESTful API endpoints
- Error handling & validations
- SQLite database (can be swapped for PostgreSQL)

### Frontend (React)
- Restaurant browsing interface
- Interactive menu system
- Real-time shopping cart
- Order checkout flow
- Responsive mobile-first design
- Loading states & error handling
- Redux state management

## Technologies

**Backend**
- Flask
- Flask-SQLAlchemy
- Flask-JWT-Extended
- Flask-Migrate
- Python-dotenv

**Frontend**
- React 18
- Redux Toolkit
- React Router 6
- Axios
- Tailwind CSS

**Database**
- SQLite (Development)
- PostgreSQL (Production-ready)

## Installation

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm 8+

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Initialize database
flask db upgrade
python seed.py

# Start server
flask run
```

### Frontend setup

```bash
cd frontend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env to point to your backend

# Start development server
npm run dev
```

### Usage

- Register a new account

- Browse restaurants

- Select items from restaurant menu

- Review your cart

- Checkout and track order status

### Authors

Leo Muraya, Victor Ngae, Elvis Kuria, Salma Hagi, Mitch Kamau, Daniel Mutembei

### Contributing
- Fork the project

- Create your feature branch (git checkout -b feature/amazing-feature)

- Commit your changes (git commit -m 'Add some amazing feature')

- Push to the branch (git push origin feature/amazing-feature)

- Open a Pull Request

### License

Distributed under the MIT License. See LICENSE for more information.

### Acknowledgements

- Inspired by Glovo/UberEats food delivery systems

- Built with guidance from various software architecture patterns

- Test data from Nairobi restaurant scene
