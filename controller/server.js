const express = require('express');
const bodyParser = require('body-parser');
// start express server
const server = express();
// Necessary middleware to gather data from request body
server.use(bodyParser.json());

module.exports = server