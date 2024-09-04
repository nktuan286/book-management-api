# Overview
The Book Management API is a Node.js application built using Express, MongoDB, and JWT for authentication. This API allows users to manage a collection of books, including adding, updating, and deleting books, as well as retrieving book details

# Features
<ul>
  <li>User Authentication: Users must be authenticated to access protected routes (POST, PUT, DELETE).</li>
  <li>Book Management: Create, update, delete and retrieve books.</li>
  <li>Category Management: Create and retrieve categories.</li>
</ul>

# Technology Stacks
<ul>
  <li>NodeJS, Express, MongoDB, Mongoose, JWT, Nodemon, Swagger</li>
</ul>

# Project Structure
```
  book-management-api/
  │
  ├── controllers/
  │   ├── authController.js
  │   ├── bookController.js
  |   ├── categoryController.js
  ├── models/
  │   ├── book.js
  │   ├── category.js
  │   ├── user.js
  ├── routes/
  │   ├── authRoutes.js
  │   ├── bookRoutes.js
  │   ├── categoryRoutes.js
  ├── middleware/
  │   ├── auth.js
  ├── config/
  │   ├── database.js
  ├── .env
  ├── index.js
  ├── README.md
  ├── package.json
  └── docs/
      └── books.yaml
      └── categories.yaml
      └── auth.yaml
      └── swagger.js

```

# Installation
Ensure you have the following installed:

- Node.js (v18.x or higher)
- MongoDB (Local or Cloud)

# Setup
1. Clone repository:
   
    ```sh
   git clone https://github.com/nktuan286/book-management-api
    cd book-management-api
   ```
2. Install dependencies:
   
    ```sh
     npm install
    ```
3. Environment Variables:
   ```sh
    PORT=4000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
   ```
5. Run the Application:
   ```sh
    npm run dev
   ```

This will start the server on http://localhost:4000

# API documentation
API documentation on http://localhost:4000/api-docs
