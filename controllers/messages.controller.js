// When using a function outside of as a parameter in another function, it is usually better to not use anonymous/arrow functions, of course. This helps it easier to find errors since node can specify the name of the function going wrong.
function getMessages(req, res) {
    res.send('<ul><li>Big witch soup</li></ul>');
}

function postMessage(req, res) {
    console.log('Updating messages...');
}

module.exports = {
    getMessages,
    postMessage
}