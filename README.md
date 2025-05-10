# Educase API

A REST API for managing user authentication and school data with geolocation features.

## Base URL

All endpoints are relative to:

```

https://educase-bniw.onrender.com/api

```

## Authentication

Protected routes require a JWT token obtained from the login endpoint. Include it in the `Authorization` header:

```

Authorization: Bearer <YOUR_TOKEN>

```

## Usage

### Signup

**Request:**

POST /auth/signup

Content-Type: application/json

```

{

"name": "John Doe",

"email": "john@example.com",

"password": "securePassword123"

}

```

**Response (201 Created):**

```json

{ "message": "Signup successful." }

```

**Errors:**

- 400 Bad Request (Missing fields):

```json

{ "message": "All fields are required." }

```

- 400 Bad Request (Email exists):

```json

{ "message": "Email already registered." }

```

- 500 Server Error:

```json

{ "message": "Error during signup", "error": "..." }

```

### Login

**Request:**

POST /auth/login

Content-Type: application/json

```

{

"email": "john@example.com",

"password": "securePassword123"

}

```

**Response (200 OK):**

```json

{ "message": "Login successful", "token": "..." }

```

**Errors:**

- 400 Bad Request (Missing fields):

```json

{ "message": "Email and password are required." }

```

- 400 Bad Request (Invalid credentials):

```json

{ "message": "Invalid email or password." }

```

- 500 Server Error:

```json

{ "message": "Error during login", "error": "..." }

```

### Add School (Protected)

**Request:**


POST /schools/addSchool

Content-Type: application/json

Authorization: Bearer <YOUR_TOKEN>

```

{

"name": "Podar International School",

"address": "Santacruz West, Mumbai",

"latitude": 19.0790,

"longitude": 72.8378

}

```

**Response (201 Created):**

```json

{ "message": "School added successfully." }

```

**Errors:**

- 400 Bad Request (Missing fields):

```json

{ "message": "All fields are required." }

```

- 401 Unauthorized:

```json

{ "message": "Unauthorized" }

```

- 500 Server Error:

```json

{ "message": "Error adding school", "error": "..." }

```

### List Schools Near Location

**Request:**

GET

```
/schools/listSchools?latitude=19.0760&longitude=72.8777

```

**Response (200 OK):**

```json

[

{

"id": 1,

"name": "Podar International School",

"address": "Santacruz West, Mumbai",

"latitude": 19.0790,

"longitude": 72.8378,

"distance": 4.2

}

]

```

**Errors:**

- 400 Bad Request (Missing parameters):

```json

{ "message": "Latitude and longitude are required." }

```

- 500 Server Error:

```json

{ "message": "Error listing schools", "error": "..." }

```
