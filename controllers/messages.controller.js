// Requiring the built in path module that can help work with paths on any type of operating system. We will be using the join function from this module.
const path = require('path');

// When using a function outside of as a parameter in another function, it is usually better to not use anonymous/arrow functions, of course. This helps it easier to find errors since node can specify the name of the function going wrong.
function getMessages(req, res) {
    // res.send('<ul><li>Big witch soup</li></ul>');
    // __dirname is a built in variable that will grab the folder we're currently in. path.join will properly create a path from these directory and filenames using the appropriate backslashes or whatever any other operating system will use to make absolute paths. Expression automatically knows to change the content type depending on our filename as well. Very efficient.
    res.sendFile(path.join(__dirname, '..', 'public', 'darkmeyer_by_SOFKAVODKA.png'));
}

function postMessage(req, res) {
    console.log('Updating messages...');
}

module.exports = {
    getMessages,
    postMessage
}