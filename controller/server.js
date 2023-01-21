const express = require('express');
const bodyParser = require('body-parser');

const server = express();
// Necessary middleware to gather data from request body
server.use(bodyParser.json());


module.exports = server