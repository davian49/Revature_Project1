const udao = require('./repository/userDAO')
const prompt = require('prompt-sync')();
const tdao = require('./repository/ticketDAO')
const Ticket = require('./model/ticket');
const User = require('./model/User');


const name = prompt('Enter a username: ');
const pass = prompt('Enter a password: ');
let user = new User(name,pass)
udao.createUser(user) // Successfully added name with id: 4ssivga0ld36tc0b and role: "employee" to table users
