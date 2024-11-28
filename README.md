Here's the content converted to Markdown:

# Key Management API Endpoints

## Create a New Key
- **Endpoint:** `POST {{baseUrl}}/key`
- **Request Body:**
  ```json
  {
    "name": "random",
    "userId": "b0e5e328-0756-4aa7-a086-5c449423e4a0",
    "expirationDate": "2024-11-30T23:59:59"
  }
  ```
- **Description:** Creates a new key for a specific user with an optional expiration date.

- **Curl Command:**
  ```bash
  curl -X POST {{baseUrl}}/key \
  -H "Content-Type: application/json" \
  -d '{ "name": "random", "userId": "b0e5e328-0756-4aa7-a086-5c449423e4a0", "expirationDate": "2024-11-30T23:59:59" }'
  ```

- **Responses:**
  - `201 Created`: Key created successfully
  - `400 Bad Request`: Validation error

## Retrieve Keys for a User
- **Endpoint:** `GET {{baseUrl}}/key/`
- **Request Query Parameters:**
  ```json
  {
    "userId": "b0e5e328-0756-4aa7-a086-5c449423e4a0"
  }
  ```
- **Description:** Retrieves all keys associated with the specified user.

- **Curl Command:**
  ```bash
  curl -X GET "{{baseUrl}}/key/?userId=b0e5e328-0756-4aa7-a086-5c449423e4a0"
  ```

- **Responses:**
  - `200 OK`: Returns a list of keys
  - `404 Not Found`: No keys found for the user

## Delete a Key
- **Endpoint:** `DELETE {{baseUrl}}/key/`
- **Request Body:**
  ```json
  {
    "id": "8069a604-809c-4077-8909-fd5bfe2c5869"
  }
  ```
- **Description:** Deletes a specific key based on its unique identifier.

- **Curl Command:**
  ```bash
  curl -X DELETE {{baseUrl}}/key/ \
  -H "Content-Type: application/json" \
  -d '{ "id": "8069a604-809c-4077-8909-fd5bfe2c5869" }'
  ```

- **Responses:**
  - `200 OK`: Key deleted successfully
  - `404 Not Found`: Key not found

## Validate a Key
- **Endpoint:** `POST {{baseUrl}}/key/validate`
- **Query Parameters:** 
  - `key`: The key to validate
  - **Example:** `POST {{baseUrl}}/key/validate?key=cts_9ff1c7f7ce549a12c2afa10b6a58b53e0687317c6c32ef6df85a6f5b673bba07`

- **Description:** Validates a specific key to determine its status (active, expired, invalid, etc.).

- **Curl Command:**
  ```bash
  curl -X POST "{{baseUrl}}/key/validate?key=cts_9ff1c7f7ce549a12c2afa10b6a58b53e0687317c6c32ef6df85a6f5b673bba07"
  ```