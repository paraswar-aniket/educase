

# Educase API

This is a RESTful API built with Node.js, Express, and MySQL that allows users to sign up, log in, and manage schools based on geographic location.

Base URL:
[https://educase-bniw.onrender.com](https://educase-bniw.onrender.com)

Features:

* User signup & login with JWT authentication
* Add new schools (protected route)
* Get list of schools sorted by distance from a given location

Authentication:
JWT-based authentication is used. You must sign up and log in to receive a token. This token is required to access protected routes.

\===========================

1. SIGNUP USER

Method: POST
URL: [https://educase-bniw.onrender.com/api/auth/signup](https://educase-bniw.onrender.com/api/auth/signup)
Description: Register a new user.

Headers:
Content-Type: application/json

Body (raw JSON):
{
"name": "John Doe",
"email": "[john@example.com](mailto:john@example.com)",
"password": "securePassword123"
}

Success Response (201):
{
"message": "Signup successful."
}

Error Responses:
400 - Missing fields
{
"message": "All fields are required."
}

400 - Email already exists
{
"message": "Email already registered."
}

500 - Server error
{
"message": "Error during signup",
"error": ""
}

\===========================
2\. LOGIN USER

Method: POST
URL: [https://educase-bniw.onrender.com/api/auth/login](https://educase-bniw.onrender.com/api/auth/login)
Description: Authenticate user and return JWT token.

Headers:
Content-Type: application/json

Body (raw JSON):
{
"email": "[john@example.com](mailto:john@example.com)",
"password": "securePassword123"
}

Success Response (200):
{
"message": "Login successful",
"token": "<JWT Token>"
}

Error Responses:
400 - Missing fields
{
"message": "Email and password are required."
}

400 - Invalid credentials
{
"message": "Invalid email or password."
}

500 - Server error
{
"message": "Error during login",
"error": ""
}

\===========================
3\. ADD SCHOOL (Protected)

Method: POST
URL: [https://educase-bniw.onrender.com/api/schools/addSchool](https://educase-bniw.onrender.com/api/schools/addSchool)
Description: Add a new school to the database. Requires Bearer token (JWT from login).

Headers:
Content-Type: application/json
Authorization: Bearer <JWT Token>

Body (raw JSON):
{
"name": "Podar International School",
"address": "Santacruz West, Mumbai",
"latitude": 19.0790,
"longitude": 72.8378
}

Success Response (201):
{
"message": "School added successfully."
}

Error Responses:
400 - Missing fields
{
"message": "All fields are required."
}

401 - Missing or invalid token
{
"message": "Unauthorized"
}

500 - Server error
{
"message": "Error adding school",
"error": ""
}

\===========================
4\. LIST SCHOOLS NEAR A LOCATION

Method: GET
URL: [https://educase-bniw.onrender.com/api/schools/listSchools?latitude=19.0760\&longitude=72.8777](https://educase-bniw.onrender.com/api/schools/listSchools?latitude=19.0760&longitude=72.8777)
Description: Returns all schools sorted by distance from the given latitude and longitude.

Headers:
Content-Type: application/json

Success Response (200):
\[
{
"id": 1,
"name": "Podar International School",
"address": "Santacruz West, Mumbai",
"latitude": 19.0790,
"longitude": 72.8378,
"distance": 4.2
},
...
]

Error Responses:
400 - Missing query parameters
{
"message": "Latitude and longitude are required."
}

500 - Server error
{
"message": "Error listing schools",
"error": ""
}

