// If our file is named server.js, it will automatically run without having to add it as a script in package.json when npm start is ran
// Express is very valuable, because after using node's default http, and having to add a lot of status codes manually, and code how to respond requests and responses adn serve or post data at a more precise level, we can see that express handles the most common status codes for us by default, and we can send data in the res.send() function. The handlers are also simplified, and we can simply use app.[methodtypehere] and then add our endpoints and callback functions, instead of having to set up more specific handlers with conditionals and server classes manually. It will also choose the 'Content-type' automatically.
const { json } = require('express');
const express = require('express');

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

// Middleware to parse json during post requests, which is built into express. It should go below our timer middleware, so the latter captures as much info happening after it as possible. It looks at the content type, and sets the content body to json when the 'Content-type' is 'application/json'. This means we don't have to convert the request to json every single time ourselves.
app.use(express.json());

app.post('/characters', (req, res) => {
    // Validate the request to make sure there is a name, using a 400 error for a client error. Error code 400 is a generic bad request, which is suitable here and often most appropriate. Make sure you return here when we shouldn't be trying to post a request anyway, otherwise the code will continue and cause an error about not being able to set http headers after they are already sent to the client. If there is no return, it would try to send a .json() more than once, when express can only send one thing. 
    if (!req.body.name || !req.body.profession) {
        return res.status(400).json({
            error: 'Missing character name or profession'
        });
    }
    const newCharacter = {
        // To make the ID auto-increment, since the .length of an array will always be one higher than the indexes, we can use that to keep the new ID one ahead of the previous ID, since our IDs start at 0 just like an array
        id: characters.length,
        'name': req.body.name,
        'profession': req.body.profession
    }
    characters.push(newCharacter);

    res.json(newCharacter);
});

app.get('/characters', (req, res) => {
    // Express will automatically make this 'Content-type' to 'application/json', res.json() will give it extra insurance to do so over res.send()
    res.json(characters);
});

// How to parameterize a url in express, be sure to validate the user input parameter :characterId
app.get('/characters/:characterId', (req, res) => {
    // Convert the characterId to a number since it will be a string if taken from the request url. Can also be done by wrapping it in Number();
    const characterId = +req.params.characterId;
    // Assigning a variable to select the character from our array based on the parameter
    const character = characters[characterId];
    // If the characterId exists in our array, send it to the client
    if (character) {
        // Just using res.json is fine here because express will handle it for us, but res.status makes it explicit. We still have to convert it to json to send a json back
        res.status(200).json(character);
    } else {
        // Here, we do need to be explicit and change the status to 404 if our character doesn't exist, because otherwise, the endpoint already does technically exist even if it fails to find a character. Again, res.send() would also work here, but we are explicit with res.json()
        res.status(404).json({
            error: "Character does not exist."
        });
    }
});

app.get('/messages', (req, res) => {
    res.send('<ul><li>Big witch soup</li></ul>');
});

app.post('/messages', (req, res) => {
    console.log('Updating messages...');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});