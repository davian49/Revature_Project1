const app = require('./server')
const {retrieveUserName, checkPassword, registerUser} = require('../repository/userDAO');
const { insertTicket } = require('../repository/ticketDAO');
const { generateAccessToken, verifyAccessToken} = require('./util/jwt-util');
const User = require('../model/User');
const Ticket = require('../model/Ticket');

// 1. Can use a username and password to log in
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
                data: {
                    username: data.Item.username,
                    id: data.Item.id
                }
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
    // endpoint for managers only, must have valid JWT in req.body
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


// 2. Can register a new account with username and password
app.post('/register', async (req, res) => {
    // username and password from request body
    const username = req.body.username;
    const password = req.body.password;
    // retieve username from DynamoDB
    const data = await retrieveUserName(username)


// 3. Will notify the user if the username is unavailable
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


// 4. Can submit new reimbursement tickets
    // endpoint for employees only, must have valid JWT AND Ticket
app.post('/submit', (req, res) => {
 
    // Get token value to the json body
    const token = req.body.token;
    // If the token is present
    if(token){
 
        // Verify the token using jwt.verify method
        const decode = verifyAccessToken(token)
        if (decode.role === "employee") {
            // if there is a ticket
            if (req.body.ticket) {
                // Create new ticket 
                let ticket = new Ticket(req.body.ticket.amount, req.body.ticket.description, req.body.data.id)
                insertTicket(ticket);
                // and add to database
                res.json({
                    submit: true,
                    data: ticket
                });


// 5. Will make sure the reimbursement ticket author provides a description and amount during submission
            } else {
                res.status(400).send({
                    "message": "invalid ticket request"
                })
            }
            
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

// 6. Pending tickets are in a queue/list that can only be seen by Managers


// 7. Tickets can be processed (approved or denied) by Managers


// 8. Employees can see a list of their previous submissions

/**
 * Optional Stretch Features:
 * 1. Reimbursement Types Features • Employees can add Reimbursement Types 
 *  i. Travel, Lodging, Food, Other 
 *  ii. Employees can view previous requests filtered by type
 * 2. Change Roles Feature • Managers can change other users’ roles 
 *  i. Employee to Manager or back to Employee
 * 3. Upload Receipts Feature • Employees can add images of receipts to their reimbursement requests 
 *  i. Upload and store images (in SQL or cloud storage)
 * 4. User Accounts Feature • Track additional user information (name, address, etc.) 
 *  i. Users can edit their account 
 *  ii. Users can add a profile pictur
 */

module.exports = app