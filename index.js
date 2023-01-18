const dao = require('./controller/userDAO')
const prompt = require('prompt-sync')();



const name = prompt('Enter a username: ');
const pass = prompt('Enter a password: ');
dao.createUser(name, pass)

dao.loginUser("user3", "pass"); // Successfully logged in as user3



