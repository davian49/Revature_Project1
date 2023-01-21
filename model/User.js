let uniqid = require('uniqid'); 
const bcrypt = require('bcrypt');
const salt = 13;
/**
 * User can login to Employee Reimbursement System
 * @property {String} role manager, or employee by default
 */
class User {
    /**
     * 
     * @param {String} username 
     * @param {String} password 
     */
    constructor(username, password) {
        this.id = uniqid();
        this.username = username;
        this.password = hash(password);
        this.role = "employee"
    }
}

/**
 * Hashes password with bcrypt
 * @param {String} password to be encrypted
 * @return {String} encrypted password
 */
function hash(password) {return bcrypt.hashSync(password, salt);} 

module.exports = User