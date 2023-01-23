// Console based version of Employee Reimbursement System
const prompt = require('prompt-sync')();
const { userDAO } = require('./repository/userDAO');
const User = require('./model/User');
const { ticketDAO } = require('./repository/ticketDAO');

// Console version does not need express, using the app would be considered secure access. 
// This is why native apps are more secure than web applications

// If login successful, returns view() to console
login()
// viewTickets()

// trick to work with Promise( <Pending> ) using try, catch
async function viewTickets(id) {
    let tickets;
    try {
        tickets = await ticketDAO.retrieveTicketsByOwner(id) 
    } catch(error) {
        console.log(error)
    } finally {
        return tickets
    }
}

async function getTickets () {
    let tickets;
    try {
        tickets = await ticketDAO.retrieveAllTickets() 
    } catch(error) {
        console.log(error)
    } finally {
        return tickets
    }
}



async function login() {
    const username = prompt('Enter a username: ');
    const password = prompt('Enter a password: ');
    const data = await userDAO.retrieveUserName(username)
    // if username exists (data is not empty)
        if (!(JSON.stringify(data) === '{}')) {
            // compare password and DynamoDB password with bcrypt
            if (userDAO.checkPassword(password, data.Item.password)) {
                // if login matches, send back data
                console.log(`Login accepted:
                    id: ${data.Item.id} 
                    username: ${data.Item.username}
                    role: ${data.Item.role}`);
                view(data.Item.id, data.Item.username, data.Item.role)
                return
            }  else {
                // if username and password dont match the database
                console.log('please check username or password.');
                login();
                return
            }    
        } else {               
            console.log(`${username} does not exist, please register`);
            register();
            return
        }
    }

    
async function register() {
    const input = prompt('Would you like to register an account (please enter "yes" or "no") ?');
    if (input === "no" || input === "No" || input === "n") {
        await login()
        return
    }
    const username = prompt('Please enter a new username: ');
    const data = await userDAO.retrieveUserName(username)
    // if username exists
    if (data.Item) {
        console.log(`"${username}" is in use, please choose another username`);
        register()
        return
    } else {
        // Create User object
        const password = prompt('Enter a password: ');
        let user = new User(username, password)
        // pass User object to userDAO to put in DynamoDB
        await userDAO.registerUser(user)
        console.log(`Successfully registered new user: 
            id: ${user.id}
            username: ${user.username} 
            role: ${user.role}`)  
        login()
        return
    }
}


async function view(id, username, role) {
    console.clear()
    console.log(`Welcome to ERS v1.2.0 \t\t ${new Date()}\n
    id: ${id}
    username: ${username} 
    role: ${role}\n `)
    let data;
    if (role === "manager") {
        let input = prompt('Would you like to view employee reimbursement tickets ? (please enter "yes" or "no")');
        if (input === "yes" || input === "Yes" || input === "y") {
            data = await getTickets()
            // console.log(data)
            // console.log(data.Item)
            // console.log(data.Items)
            
            if (data) {
                console.log(data);
            } else {
                console.log(`${data} did not retrieve any tickets`)
            }
        }
    } else {
        // role === employee
        data = await viewTickets(id)
        if (data) {
            console.log(data);
        } else {
            console.log(`${data} did not retrieve any tickets`)
        }
        let input = prompt('Would you like to submit a reimbursement ticket ? (please enter "yes" or "no")');
        if (input === "yes" || input === "Yes" || input === "y") {
            console.log("Submit Ticket Coming Soon")
        }
    }
    
}