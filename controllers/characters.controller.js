function getCharacters(req, res) {
    // Express will automatically make this 'Content-type' to 'application/json', res.json() will give it extra insurance to do so over res.send()
    res.json(characters);
}

function getCharacter(req, res) {
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
}

function postCharacter(req, res) {
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
}

module.exports = {
    getCharacters,
    getCharacter,
    postCharacter
}