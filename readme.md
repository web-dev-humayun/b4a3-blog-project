# Blogging Platform Backend

This project provides the backend for a blogging platform. It is developed using **TypeScript**, **Node.js**, **Express.js**, and **MongoDB with Mongoose**. The platform supports user authentication, role-based access control, and public APIs for managing blogs with features like search, sort, and filter.

---

## Features

### 1. Roles and Permissions
- **Admin**:
  - Can delete any blog.
  - Can block users by updating the **isBlocked** property.
  - Cannot update any blog.
- **User**:
  - Can register and log in.
  - Can create, update, and delete their own blogs.
  - Cannot perform admin actions.

---

### 2. Authentication and Authorization
- **Authentication**:
  - Users must log in to perform actions like creating, updating, or deleting blogs.
- **Authorization**:
  - Role-based access ensures that Admin and User permissions are securely separated.

---

### 3. Blog API Features
- Publicly accessible API for:
  - **Search**: Find blogs by keywords in the title or content.
  - **Sort**: Sort blogs by fields like `createdAt` or `title`.
  - **Filter**: Filter blogs based on author IDs or other criteria.

---

# Authentication 
---
###  Register User
---

Endpoint : POST **/api/auth/register**

Description: Registers a new user with the platform. It validates user data and saves it to the database.

example
```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```


###  Login User
---

Endpoint : POST **/api/auth/login**

Description: Authenticates a user with their email and password and generates a JWT token.

example
```
{
  "email": "john@example.com",
  "password": "securepassword"
}
```


# Authentication 
---
###  Create Blog
---

Endpoint : POST **/api/blogs**

Description: Allows a logged-in user to create a blog by providing a title and content.

example
```
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```
###  Update Blog
---

Endpoint : PATCH **/api/blogs/:id**

Description: Allows a logged-in user to update their own blog by its ID.

example
```
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```
###   Delete Blog
---

Endpoint : DELETE **/api/blogs/:id**

Description: Allows a logged-in user to delete their own blog by its ID.


###  Get All Blogs (Public)
---

Endpoint : PATCH **/api/blogs**

Description: Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

**Query Parameters:**

- search: Search blogs by title or content (e.g., search=blogtitle).
- sortBy: Sort blogs by specific fields such as createdAt or - title (e.g., sortBy=title).
- sortOrder: Defines the sorting order. Accepts values asc (ascending) or desc (descending). (e.g., sortOrder=desc).
- filter: Filter blogs by author ID (e.g., author=authorId).


**Example Request URL:**
```
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```


# Admin Actions
---

### Block User
---

Endpoint : PATCH **/api/admin/users/:userId/block**

Description: Allows an admin to block a user by updating the isBlocked property to true .
### Delete Blog
---

Endpoint : DELETE **/api/admin/blogs/:id**

Description: Allows an admin to delete any blog by its ID.

### Types of Errors Handled
- Zod Validation Error (ZOD_ERROR): Errors arising from invalid data inputs based on Zod schema validation.
- Not Found Error (NOT_FOUND_ERROR): When requested resources (e.g., a user, item, or page) are not found.
- Validation Error (VALIDATION_ERROR): General validation errors (e.g., incorrect data format, missing required fields).
- Authentication Error (AUTH_ERROR): Issues related to failed authentication (e.g., invalid token or expired session).
- Authorization Error (AUTHORIZATION_ERROR): When the user lacks the necessary permissions to access a resource.
- Internal Server Error (INTERNAL_SERVER_ERROR): Unhandled errors or unexpected server issues.

## Installation
 Clone the repository:

```
git clone https://github.com/web-dev-humayun/b4a3-blog-project.git
```
Navigate to the project folder and install packages :

```
npm install
```
Create a .env file with the following:

- PORT: The server port (e.g., 5000).
- MONGO_URI: MongoDB connection string.
- JWT_SECRET: Secret key for JWT.
- BCRYPT_SALT_ROUNDS : your round value
- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET
- JWT_ACCESS_EXPIRES_IN
- JWT_REFRESH_EXPIRES_IN
  

Run the server:

```
npm run start:dev
```
