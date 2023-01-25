const app = require('./server')
const { userDAO } = require('../repository/userDAO');
const { ticketDAO } = require('../repository/ticketDAO');
const { jwt } = require('./util/jwt-util');
const User = require('../model/User');
const Ticket = require('../model/Ticket');

// 1. Can use a username and password to log in
app.post('/login', async (req, res) => {
    // gather username and password from request body
    const username = req.body.username;
    const password = req.body.password;
    // retieve username from DynamoDB with DAO
    const data = await userDAO.retrieveUserName(username)
    // if username exists (data retrieved is not empty)
    if (!(JSON.stringify(data) === '{}')) {
        // compare password and DynamoDB password with bcrypt
        if (userDAO.checkPassword(password, data.Item.password)) {
            // Create JSON Web Token to send back
            const token = jwt.generateAccessToken(username, data.Item.id, data.Item.role)
            res.json({
                login: true,
                token: token,
                data: {
                    username: data.Item.username,
                    id: data.Item.id,
                    role: data.Item.role
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
        const decode = jwt.verifyAccessToken(token)
        if (decode.role === "employee") {
            res.json({
                login: true,
                token: token,
                data: decode
            });
        } else {
            res.status(404).send({
                "message": `Access denied ${decode.username}
                ${decode.id}
                ${decode.role}`
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
        const decode = jwt.verifyAccessToken(token)
        if (decode.role === "manager") {
            res.json({
                login: true,
                token: token,
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
    const data = await userDAO.retrieveUserName(username)


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
        await userDAO.registerUser(user)
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
        const decode = jwt.verifyAccessToken(token)
        if (decode.role === "employee") {
            // if there is a ticket
            if (req.body.ticket) {
                // Create new ticket 
                let ticket = new Ticket(req.body.ticket.amount, req.body.ticket.description, req.body.data.id)
                ticketDAO.insertTicket(ticket);
                // and add to database
                res.json({
                    login: true,
                    submit: true,
                    token: token,
                    data: ticket
                });


// 5. Will make sure the reimbursement ticket author provides a description and amount during submission
            } else {
                res.status(400).send({
                    "message": "invalid ticket request, must have an amount and a description"
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
// 8. Employees can see a list of their previous submissions
    // endpoint for employees or managers only, must have valid JWT in req.body
app.get('/view', async (req, res) => {
    // Get token value to the json body
    const token = req.body.token;
    console.log(req.body)
    console.log(req.body.token)
    // If the token is present
    if(token){
        // Verify the token using jwt.verify method
        const decode = jwt.verifyAccessToken(token)
        if (decode.role === "manager" || decode.role === "employee") {
            // if role === manager or employee, return view
            let tickets;
            if (decode.role === "manager") {
                tickets = await ticketDAO.retrieveAllTickets()
                res.json({
                    login: true,
                    view: true,
                    token: token,
                    role: decode.role,
                    data: tickets
                });
            }
            if (decode.role === "employee") {
                tickets = await ticketDAO.retrieveTicketsByOwner(decode.id)
                res.json({
                    login: true,
                    view: true,
                    token: token,
                    role: decode.role,
                    data: tickets
                });
            }
        } else {
            res.status(404).send({
                "message": "View access denied"
            })
        }
        //  Return response with decode data        
    } else {
        // Return response with error
        res.json({
            login: false,
            token: false,
            view: false,
            data: 'error'
        });
    }
});

app.get('/pending', async (req, res) => {
    // Get token value to the json body
    const token = req.body.token;
    // If the token is present
    if(token){
        // Verify the token using jwt.verify method
        const decode = jwt.verifyAccessToken(token)
        if (decode.role === "manager") {
            // if role === manager or employee, return view
            let tickets = await ticketDAO.retrievePendingTickets()
            res.json({
                    login: true,
                    view: true,
                    token: token,
                    role: decode.role,
                    data: tickets
            });
        } else {
            res.status(404).send({
                "message": "View access denied"
            })
        }
        //  Return response with decode data        
    } else {
        // Return response with error
        res.json({
            login: false,
            token: false,
            view: false,
            data: 'error',
            message: 'Invalid Token'
        });
    }
});

// 7. Tickets can be processed (approved or denied) by Managers

app.get('/pop', async (req, res) => {
    // Get token value to the json body
    const token = req.body.token;
    console.log(req.body)
    console.log(req.body.token)
    // If the token is present
    if(token){
        // Verify the token using jwt.verify method
        const decode = jwt.verifyAccessToken(token)
        if (decode.role === "manager") {
            // if role === manager, pull ticket from queue
            let queue = await ticketDAO.popTicket();
            if (queue) {
                // Return token, role, and ticket
                res.json({
                    login: true,
                    pop: true,
                    token: token,
                    role: decode.role,
                    ticket: queue.Items[0]
                });
            } else {
            res.status(404).send({
                "message": "View access denied"
            })
        }
        //  Return response with decode data        
    } else {
        // Return response with error
        res.json({
            login: false,
            token: false,
            pull: false,
            data: 'error'
        });
    }
}
});

app.post('/process', async (req, res) => {
    // Get token value to the json body
    const token = req.body.token;
    // If the token is present
    if(token){
        // Verify the token using jwt.verify method
        const decode = jwt.verifyAccessToken(token)
        if (decode.role === "manager") {
            // if role === manager, pull ticket from request body
            let ticket = req.body.ticket;
            console.log(ticket)
            if (ticket.status === "Approved" || ticket.status === "Denied") {
                // updateticket to new status
                ticketDAO.processTicketByID(ticket.id, ticket.status)
                res.json({
                    login: true,
                    processed: true,
                    token: token,
                    role: decode.role,
                    data: ticket
                });
            } else {
                res.json({
                    login: true,
                    processed: false,
                    token: token,
                    role: decode.role,
                    message: 'Ticket status must be processed to "Approved" or "Denied"\nPlease re-submit ticket'
                })
            }
        } else {
            res.status(404).send({
                "message": "View access denied"
            })
        }
        //  Return response with decode data        
    } else {
        // Return response with error
        res.json({
            login: false,
            token: false,
            data: 'error',
            message: 'invalid token'
        });
    }
});



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