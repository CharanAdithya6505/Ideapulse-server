# Backend Project

This project provides a REST API for user authentication and blog management using **Node.js**, **Express**, **Prisma ORM** with a **MySQL** database, and **JWT** for authentication.

## Prerequisites

- **Node.js** (>=14.x)
- **MySQL** database
- **npm** package manager

## Project Setup

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd backend-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the project root and add the following:

   ```env
   PORT=3002
   DATABASE_URL="mysql://<username>:<password>@localhost:3306/<database_name>"
   JWT_SECRET="your_jwt_secret_key"
   ```

4. **Database setup with Prisma**:
   Run the following command to set up the database:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the server**:
   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:3002`.

---

## API Endpoints

### User Authentication

#### Register User

- **Endpoint**: `/register`
- **Method**: `POST`
- **Description**: Registers a new user with a hashed password and generates a JWT token.
- **Request Body**:

  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```

- **Response**:

  - **Success (201)**:
    ```json
    {
      "token": "jwt_token",
      "userId": 1
    }
    ```

  - **Error (400)**: Missing fields or invalid email format.
    ```json
    {
      "message": "Fields are missing!"
    }
    ```

  - **Error (500)**:
    ```json
    {
      "message": "Error registering user",
      "error": "Error details"
    }
    ```

#### Login User

- **Endpoint**: `/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:

  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```

- **Response**:

  - **Success (200)**:
    ```json
    {
      "token": "jwt_token",
      "userId": 1
    }
    ```

  - **Error (400)**: Invalid credentials.
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

---

### Blog Management

All blog routes require JWT authentication for `POST`, `PUT`, and `DELETE` methods. Attach the token in the `Authorization` header as `Bearer <token>`.

#### Create Blog

- **Endpoint**: `/blogs`
- **Method**: `POST`
- **Description**: Creates a new blog post.
- **Request Body**:

  ```json
  {
    "title": "My Blog Title",
    "content": "Blog content here...",
    "author": "John Doe",
    "image": "image_url",
    "category": "Tech",
    "authorPic": "author_pic_url",
    "matter": "Additional information",
    "tags": ["Tech", "Programming"]
  }
  ```

- **Response**:

  - **Success (201)**:
    ```json
    {
      "id": 1,
      "title": "My Blog Title",
      "content": "Blog content here...",
      "author": "John Doe",
      ...
    }
    ```

  - **Error (400)**: Missing required fields or duplicate title.
    ```json
    {
      "message": "Title, content, author, and category are required"
    }
    ```

  - **Error (409)**: Duplicate title.
    ```json
    {
      "message": "A blog with this title already exists"
    }
    ```

  - **Error (500)**:
    ```json
    {
      "message": "An error occurred while creating the blog",
      "error": "Error details"
    }
    ```

#### Get All Blogs

- **Endpoint**: `/blogs`
- **Method**: `GET`
- **Description**: Retrieves all blogs.
- **Response**:

  - **Success (200)**:
    ```json
    [
      {
        "id": 1,
        "title": "My Blog Title",
        ...
      },
      ...
    ]
    ```

  - **Error (500)**:
    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get a Single Blog

- **Endpoint**: `/blog/:id`
- **Method**: `GET`
- **Description**: Retrieves a blog by its ID.
- **Response**:

  - **Success (200)**:
    ```json
    {
      "id": 1,
      "title": "My Blog Title",
      ...
    }
    ```

  - **Error (404)**: Blog not found.
    ```json
    {
      "message": "Blog not found"
    }
    ```

#### Update Blog

- **Endpoint**: `/blog/:id`
- **Method**: `PUT`
- **Description**: Updates a blog by its ID.
- **Request Body**:

  ```json
  {
    "title": "Updated Title",
    "content": "Updated content..."
  }
  ```

- **Response**:

  - **Success (200)**:
    ```json
    {
      "message": "Blog updated"
    }
    ```

  - **Error (400)**: Blog not found.
    ```json
    {
      "message": "Blog not found"
    }
    ```

  - **Error (500)**:
    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Delete Blog

- **Endpoint**: `/blog/:id`
- **Method**: `DELETE`
- **Description**: Deletes a blog by its ID.
- **Response**:

  - **Success (200)**:
    ```json
    {
      "message": "Deleted successfully"
    }
    ```

  - **Error (400)**: Blog not found.
    ```json
    {
      "message": "Blog not found"
    }
    ```

  - **Error (500)**:
    ```json
    {
      "message": "Internal server error"
    }
    ```

---

## Database Schema

- **User**: Stores user details (id, name, email, password).
- **Blogs**: Stores blog details (id, title, content, author, category, image, publishedDate).
- **Tags**: Stores tag details associated with blogs.

---

## Additional Notes

- **JWT Authentication**: Protects certain routes. Provide the token in the `Authorization` header.
- **Error Handling**: Uses try-catch blocks for async functions to handle errors gracefully.

---

## License

This project is licensed under the MIT License.

---
