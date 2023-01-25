
/**
 * Ticket with ID, amount, description, ownerID, and default status of "Pending"
 * @property {Date} id unique identifier
 * @property {String} status default of Pending
 */
class Ticket {
    /**
     * @param {Number} amount expense amount in $
     * @param {String} description 
     * @param {String} ownerID ID from Employee/creator of ticket
     */
    constructor(amount, description, ownerID) {
        this.id = Date.now();
        this.amount = amount;
        this.description = description;
        this.ownerID = ownerID;
        this.status = "Pending";
    }
}

module.exports = Ticket