const app = require('./server')
const {retrieveUserName, checkPassword, registerUser} = require('../repository/userDAO');
const { generateAccessToken, verifyAccessToken} = require('./util/jwt-util');
const User = require('../model/User');

// READ
app.post('/login', async (req, res) => {
    // username and password from request body
    const username = req.body.username;
    const password = req.body.password;
    // retieve username from DynamoDB
    const data = await retrieveUserName(username)
    // if username exists (data is not empty)
    if (!(JSON.stringify(data) === '{}')) {
        // compare password and DynamoDB password with bcrypt
        if (checkPassword(password, data.Item.password)) {
            // Create JSON Web Token to send back
            const token = generateAccessToken(username, data.Item.role)
            res.json({
                login: true,
                token: token,
                data: data.Item.username
            })
        }  else {
            // if username and password dont match the database
            res.json({
                login: false,
                error: 'please check name and password.'
            })
        }    
    } else {
        res.status(404).send({
            "message": "User does not exist, please register"
        })
    }
});


// endpoint for employees only, must have valid JWT in req.body
app.get('/employee', (req, res) => {
 
    // Get token value to the json body
    const token = req.body.token;
    console.log(req.body)
    console.log(req.body.token)
    // If the token is present
    if(token){
 
        // Verify the token using jwt.verify method
        const decode = verifyAccessToken(token)
        if (decode.role === "employee") {
            res.json({
                login: true,
                data: decode
            });
        } else {
            res.status(404).send({
                "message": "User does not have privelages"
            })
        }
        //  Return response with decode data        
    } else {

        // Return response with error
        res.json({
            login: false,
            data: 'error'
        });
    }
});

// endpoint for employees only, must have valid JWT in req.body
app.get('/manager', (req, res) => {
 
    // Get token value to the json body
    const token = req.body.token;
    console.log(req.body)
    console.log(req.body.token)
    // If the token is present
    if(token){
 
        // Verify the token using jwt.verify method
        const decode = verifyAccessToken(token)
        if (decode.role === "manager") {
            res.json({
                login: true,
                data: decode
            });
        } else {
            res.status(404).send({
                "message": "User does not have privelages"
            })
        }
        //  Return response with decode data        
    } else {

        // Return response with error
        res.json({
            login: false,
            data: 'error'
        });
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
        await registerUser(user)
        .then(
            res.status(200).send({
                "message": `Successfully registered ${username}`
            })
        );      
    };
});

module.exports = app