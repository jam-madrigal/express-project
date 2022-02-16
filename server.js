// If our file is named server.js, it will automatically run without having to add it as a script in package.json when npm start is ran
// Express is very valuable, because after using node's default http, and having to add a lot of status codes manually, and code how to respond requests and responses adn serve or post data at a more precise level, we can see that express handles the most common status codes for us by default, and we can send data in the res.send() function. The handlers are also simplified, and we can simply use app.[methodtypehere] and then add our endpoints and callback functions, instead of having to set up more specific handlers with conditionals and server classes manually. It will also choose the 'Content-type' automatically.
const { json } = require('express');
const express = require('express');

const messagesController = require('./controllers/messages.controller');
const characterController = require('./controllers/characters.controller');

const app = express();

const PORT = 3000;

const characters = [
    {
        id: 0,
        'name': 'witch',
        'profession': 'sorcerer'
    },
    {   id: 1,
        'name': 'king',
        'profession': 'cattle'
    },
    {   id: 2,
        'name': 'queen',
        'profession': 'shepherd'
    }
]

// Writing some middleware to log our requests and tell us how long it takes them to complete. It will run for every request to our server.
app.use((req, res, next) => {
    const start = Date.now();
    // Calling the next function to ensure that this function is not an endpoint and is passed to the correct handler. If you comment out next(); express will hang and timeout, never sending a response. Try this out with postman.
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url} ${delta}ms`);
});

// Middleware to parse json during post requests, which is built into express. It should go below our timer middleware, so the latter captures as much info happening after it as possible. It looks at the content type, and sets the content body to json when the 'Content-type' is 'application/json'. This means we don't have to convert the request to json every single time ourselves. If you try running a POST request without this, it's likely you'll get an error saying one of the key value pairs in the request is undefined.
app.use(express.json());

app.post('/characters', characterController.getCharacters);

app.get('/characters', characterController.getCharacters);

// How to parameterize a url in express, be sure to validate the user input parameter :characterId
app.get('/characters/:characterId', characterController.getCharacter);

app.get('/messages', messagesController.getMessages);

app.post('/messages', messagesController.postMessage);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});