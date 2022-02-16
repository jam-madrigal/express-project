const express = require('express');
const charactersController = require('../controllers/characters.controller');

// Using express's router method to simplify our endpoints and help keep the different routes in the application separate
const charactersRouter = express.Router();
charactersRouter.post('/', charactersController.postCharacter);
charactersRouter.get('/', charactersController.getCharacters);

// How to parameterize a url in express, be sure to validate the user input parameter :characterId
charactersRouter.get('/:characterId', charactersController.getCharacter);

module.exports = charactersRouter;