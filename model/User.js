/**
 * User can login to Employee Reimbursement System
 */
class User {
    /**
     * @param {Number} id
     * @param {String} email
     * @param {String} password
     */
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
}
/**
 * Get User ID number
 * @returns {Number} User ID
 */
User.prototype.getID = function() {
    return this.id;
}
/**
 * Returns login info for User
 * @returns {Array<String, String>} email and password
 */
User.prototype.login = function() {
    return [this.email, this.password]
}
/**
 * Get User email
 * @returns {String} email
 */
User.prototype.getEmail = function() {
    return this.email;
}
/**
 * Get User password
 * @returns password
 */
User.prototype.getPassword = function() {
    return this.password;
}
/**
 * Changes User email to newEmail
 * @param {String} newEmail
 */
User.prototype.setEmail = function(newEmail) {
    this.email = newEmail;
}
/**
 * Changes User password to newPassword
 * @param {String} newPassword 
 */
User.prototype.setPassword = function(newPassword) {
    this.password = newPassword;
}

module.exports = User