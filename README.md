# Food Delivery App

A full-stack food delivery application inspired by Glovo, built with Flask (Python) backend and React (JavaScript) frontend.

![App Screenshot](screenshot.png) <!-- Add actual screenshot later -->

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
