# Marketplace Project

This project is a full-stack web application that simulates an online marketplace, featuring items, categories, user authentication, orders, and feedback.

## Technologies Used

- **Frontend**:
  - React.js
  - JavaScript
  - HTML/CSS

- **Backend**:
  - Flask
  - SQLAlchemy
  - Flask-RESTful
  - Flask-Migrate
  - Flask-Marshmallow
  - Flask-CORS
  - Flask-Bcrypt
  - Flask-JWT-Extended

- **Database**:
  - SQLite (development)
  - Potentially configured for other databases in production

## Features

- **User Authentication**:
  - Sign up
  - Login
  - Logout

- **Items**:
  - Create
  - Read
  - Purchase
  - Categorized under different categories

- **Categories**:
  - Manage categories for items

- **Orders**:
  - Place orders
  - View order history
  - Track order status (pending, shipped, delivered, cancelled)

- **Feedback**:
  - Provide feedback on purchased items
  - View feedback left by others

- **API Endpoints**:
  - `/signup`, `/login`: User authentication
  - `/current_user`: Get current user details
  - `/users`, `/items`, `/categories`, `/feedbacks`, `/orders`: Fetch lists of users, items, categories, feedbacks, and orders
  - CRUD operations for items (`/api/items`), including retrieving, adding, updating, and deleting items
  - Secure endpoints with JWT authentication

## Setup Instructions

1. **Clone the repository**:

    ```bash
    git clone <repository_url>
    ```

2. **Setup Backend**:

    ```bash
    cd server
    pipenv install
    pipenv shell
    python server/app.py
    ```

3. **Setup Frontend**:

    ```bash
    npm install --prefix client
    npm start --prefix client
    ```

4. **Access the Application**:

    Open your browser and go to `http://localhost:3000` to view the application.

## Contributors

- Joseph Maina
- Emmanuel Leakono
- Laura Chepkemoi
- Carl Ngovi
- Adnan Victor
- Kudzaishe Muzata

# TadersHub

TadersHub is a web application designed to manage items and customer feedback for a store. The app includes functionalities for user authentication, viewing categories and items, submitting feedback, and creating new items.

## Features

- **User Authentication**: Login and signup functionalities.
- **Item Management**: View items and create new items.
- **Customer Feedback**: Submit and view feedback from customers.
- **Item Details**: View detailed information about each item.

## Technologies Used

- React
- CSS
- Fetch API

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/otundoMjoseph/TadersHub.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd TadersHub
    ```

3. **Install dependencies**:

    ```bash
    npm install --prefix client
    ```

4. **Start the development server**:

    ```bash
    npm start --prefix client
    ```


