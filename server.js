// If our file is named server.js, it will automatically run without having to add it as a script in package.json when npm start is ran
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