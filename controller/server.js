const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;

const server = express();
server.use(bodyParser.json());

module.exports = server