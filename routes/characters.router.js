const express = require('express');
const charactersController = require('../controllers/characters.controller');

// Using express's router method to simplify our endpoints and help keep the different routes in the application separate
const charactersRouter = express.Router();

// An example of middleware, let's say we want to log the IP of every machine making a request on the characters route. Again, remember to call next() so the response is actually sent and doesn't hang.
charactersRouter.use((req, res, next) => {
    console.log('ip address:', req.ip);
    next();
});

charactersRouter.post('/', charactersController.postCharacter);
charactersRouter.get('/', charactersController.getCharacters);

// How to parameterize a url in express, be sure to validate the user input parameter :characterId
charactersRouter.get('/:characterId', charactersController.getCharacter);

module.exports = charactersRouter;