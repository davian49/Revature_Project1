const User = require("./User");
const Ticket = require("./ticket");
const TicketSystem = require("./TicketSystem");
/**
 * Employees can submit a new reimbursement ticket and view past tickets
 * @property {Array<Ticket>} tickets of past submitted tickets
 */
class Employee extends User {
    /**
     * 
     * @param {Number} id
     * @param {String} email
     * @param {String} password
     */
    constructor(id, email, password) {
        super(id, email, password);
    }
}
/**
 * Creates new @Type {Ticket} and submits to system for review
 * @param {TicketSystem} ticketSystem
 * @param {Number} amount 
 * @param {String} description 
 */
Employee.prototype.submitTicket = function(ticketSystem, amount, description) {
    let ticketID = ticketSystem.history.length;
    let ticket = new Ticket(ticketID, amount, this.id, description)
    ticketSystem.submitTicket(ticket);
};
/**
 * Returns all submitted Tickets by Employee
 * @param {TicketSystem} ticketSystem
 * @returns {Array<Ticket>}
 */
Employee.prototype.viewTickets = function(ticketSystem) {
    let list = ticketSystem.viewTickets();
    let tickets = [];
    for (let i=0; i < list.length; i++) {
        if (list[i].ownerID === this.id) {
            tickets.push(list[i]);
        };
    };
    return tickets;
};
/**
 * Filter Tickets by status
 * @param {TicketSystem} ticketSystem
 * @param {String} status "Pending" "Approved" "Denied"
 * @returns {Array<Ticket>}
 */
Employee.prototype.filterTickets = function(ticketSystem, status) {
    let list = this.viewTickets(ticketSystem)
    let tickets = [];
    for (let i=0; i < list.length; i++) {
        // If this User ID matches ticket ownerID
        if (list[i].status === status) {
            // add ticket to list
            tickets.push(list[i]);
        };
    };
    return tickets;
}

module.exports = Employee