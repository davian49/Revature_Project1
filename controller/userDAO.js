const fs = require('fs');
const User = require('../model/User');
const path = './repository/users.json'
const users = JSON.parse(fs.readFileSync(path, 'utf-8'))

// CREATE
/**
 * Register new user to database, returns true if successful
 * @param {String} email
 * @param {String} password
 * @returns true if User registered successfully
 */
function register(email, password) {
    let id = JSON.parse(fs.readFileSync(path, 'utf-8')).length;
    if (!checkUser(email)) {
        let newUser = new User(id, email, password)
        users.push(newUser)
        let data = JSON.stringify(users)
        fs.writeFileSync(path, data)
        return true
    }; 
    return false;       
};
// READ
/**
 * Checks User database for existing user, returns true if successful
 * @param {String} email
 * @param {String} password
 * @returns true if User is in database
 */
function login(email, password) {
    //let users = JSON.parse(fs.readFileSync(path, 'utf-8'));
    for (let i = 0; i < users.length; i++) {
        if(users[i].email === email && users[i].password === password) {
            return true;
        } else {
            return false;    
        };
    };        
};

function checkUser(email) {
    let users = JSON.parse(fs.readFileSync(path, 'utf-8'));
    for (let i = 0; i < users.length; i++) {
        if(users[i].email === email) {
            return true; 
        };
    };
    return false
}

module.exports = {
    register,
    login,
    checkUser
}