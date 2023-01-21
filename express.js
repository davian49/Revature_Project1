const express = require('express'); // npm install express
const bodyParser = require('body-parser'); // npm install body-parser
const PORT = 3000;

// start express server
const server = express();
// Necessary middleware to gather data from request body
server.use(bodyParser.json());

// test endpoint for Postman
server.get('/employee', async (req,res) => {
    // we dont have to set req.method because express does this for us in the background on top of http
    // .get('/endpoint', (request, response)) express already set req.method as GET
    res.status(200).send("Employees only, how did you get here?")
})
// start express server to listen for HTTP requests. If server hears a "GET" request, it will automatically run .get('/endpoint', (req,res))
// then send back response, as long as the server is listening
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});