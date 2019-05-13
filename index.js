const fs = require('fs');
const https = require('https')
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();

app.use(bodyParser.raw({
    limit: '0.25GB',
    type: '*/*',
}));

app.use(router);

const port = 8443;

const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
};

https.createServer(options, app).listen(port);
