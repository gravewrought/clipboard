const fs = require('fs');
const express = require('express');
const router = express.Router();

const directory = './data';

router.get('/:file', function(request, response) {
    if (!(/^[A-Za-z0-9\.]+$/).test(request.params.file)) {
        response.send(400).send();
        return;

    }

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);

    }

    if (!fs.existsSync(directory)) {
        response.send(500).send();
        return;
        
    }

    const path = `${directory}/${request.params.file}`;

    if (!fs.existsSync(path)) {
        response.send(404).send();
        return;

    }

    response.send(fs.readFileSync(path));

});

router.post('/:file', function(request, response) {
    if (!fs.existsSync(directory)) {
        response.send(404).send();
        return;

    }

    if (!(/^[A-Za-z0-9\.]+$/).test(request.params.file)) {
        response.send(400).send();
        return;

    }

    const path = `${directory}/${request.params.file}`;

    if (!fs.writeFileSync(path, request.body)) {
        console.log('error! failed to write file?');

    }

    response.status(202).send();

});

module.exports = router;
