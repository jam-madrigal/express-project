// If our file is named server.js, it will automatically run without having to add it as a script in package.json when npm start is ran
// Express is very valuable, because after using node's default http, and having to add a lot of status codes manually, and code how to respond requests and responses adn serve or post data at a more precise level, we can see that express handles the most common status codes for us by default, and we can send data in the res.send() function. The handlers are also simplified, and we can simply use app.[methodtypehere] and then add our endpoints and callback functions, instead of having to set up more specific handlers with conditionals and server classes manually.
const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Bingbong");
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