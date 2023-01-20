const app = require('./server')
const {retrieveUserName, checkPassword, createUser} = require('../repository/userDAO');
const { generateAccessToken } = require('./util/jwt-util');
const User = require('../model/User');

// READ
app.post('/login', async (req, res) => {
    // username and password from request body
    const username = req.body.username;
    const password = req.body.password;
    // retieve username from DynamoDB
    const data = await retrieveUserName(username)
    // if username exists
    if (data) {
        // compare password and DynamoDB password with bcrypt
        if (checkPassword(password, data.Item.password)) {
            // Create JSON Web Token to send back
            const token = generateAccessToken(username, data.Item.role)
            res.json(token)
        }  else {
            // if username and password dont match the database
            res.status(404).send({
                "message": "Wrong username or password"
            })
        }    
    } else {
        res.status(500).send({
            "message": "Something else is wrong"
        })
    }
});

// CREATE
app.post('/register', async (req, res) => {
    // username and password from request body
    const username = req.body.username;
    const password = req.body.password;
    // retieve username from DynamoDB
    const data = await retrieveUserName(username)
    // if username exists
    if (data.Item) {
        res.status(400).send({
            "message": `"${username}" is in use, please choose another username`
        });       
    } else {
        // Create User object
        let user = new User(username, password)
        // pass User object to userDAO to put in DynamoDB
        await createUser(user)
        .then(
            res.status(200).send({
                "message": `Successfully registered ${username}`
            })
        );      
    };
});

module.exports = app