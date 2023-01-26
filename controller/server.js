const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');
// start express server
const server = express();
// Necessary middleware to gather data from request body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }))
//server.use(cors());

module.exports = server