/**
 * Ticket with ID, amount, description, ownerID, and default status of Pending
 * @property {String} default status of Pending
 */
class Ticket {
    /**
     * 
     * @param {Number} id unique identifier
     * @param {Number} amount expense amount in $
     * @param {Number} ownerID ID from Employee/creator of ticket
     * @param {String} description 
     */
    constructor(id, amount, ownerID, description) {
        this.id = id;
        this.amount = amount;
        this.description = description;
        this.ownerID = ownerID;
        this.status = "Pending";
    }
}



module.exports = Ticket