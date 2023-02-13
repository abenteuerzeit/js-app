# Basic app template

1. nodemon to watch for changes and restart the server
2. Babel to enable JavaScript feature not enabled in Node.js
3. Dotenv to load environment variables from a .env file
4. Express for backend
5. Middleware
    1. CORS to enable cross-origin requests
    2. Custom middleware for routes

## User and Messages

1. User
    1. username
    2. email
    3. name
    4. phone
    5. birthday
    6. password
2. Message
    1. text
    2. user_id

## Route Examples

### GET

    curl -X GET http://localhost:3000/users
    curl -X GET http://localhost:3000/users/1
    curl -X GET http://localhost:3000/messages
    curl -X GET http://localhost:3000/messages/1

### POST

    curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d 
    `{    
        "username": "newuser",
        "email": "PostUser@postman.com",
        "name": "Post User",
        "phone": "+1(800)123-1234",
        "birthday": "1950-01-20T00:00:00.000Z",
        "password": "dVmMyp@55word"
    }`

    curl -X POST http://localhost:3000/messages -H "Content-Type: application/json" -d 
    `{    
        "text": "This is a message",
    }`

### PUT

    curl -X PUT http://localhost:3000/users/2 -H "Content-Type: application/json" -d 
    `{    
        "username": "newuser",
        "email": "newEmail@github.com"
    }`

    curl -X PUT http://localhost:3000/messages/2 -H "Content-Type: application/json" -d 
    `{    
        "text": "This is a new message",
    }` 

### DELETE

    curl -X DELETE http://localhost:3000/users/2
    curl -X DELETE http://localhost:3000/messages/2
