/**
 * User can login to Employee Reimbursement System
 * 
 */
class User {
    /**
     * @param {Number} id unique ID 
     * @param {String} username
     * @param {String} password
     * @property {String} role manager, employee, or default user
     */
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = "user"
    }
}


module.exports = User