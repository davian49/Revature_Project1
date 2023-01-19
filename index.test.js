const udao = require('./controller/userDAO')
const prompt = require('prompt-sync')();
const tdao = require('./controller/ticketDAO')
const Ticket = require('./model/ticket')



// const name = prompt('Enter a username: ');
// const pass = prompt('Enter a password: ');
// dao.loginUser(name, pass);


// dao.loginUser(name, pass); // Successfully logged in as user3

let input = prompt('Please Enter a Ticket amount: ');
let amount = input
input = prompt('Please Enter a description of expense: ');
let desc = input


let ticket = new Ticket(Number(amount),desc, "10vnfnff3")

tdao.insertTicket(ticket)

// Successfully added ticket: 4ssivctsld36az9w 
//  amount: $45
//  description: "parking ticket"
//             ownerID: 10vnfnff3
//  status: "Pending"
