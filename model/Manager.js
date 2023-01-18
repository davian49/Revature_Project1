const Ticket = require("./ticket");
const User = require("./User");
const TicketSystem = require("./TicketSystem");
// Need to add ability to change role, and documentation for this object
/**
 */
class Manager extends User {
    /**
     * 
     * @param {Number} id
     * @param {String} username
     * @param {String} password
     */
    constructor(id, username, password) {
        super(id, username, password);
        this.role = "manager"
    };
};
/**
 * 
 * @param {TicketSystem} ticketSystem
 * @return {Array<Ticket>} history
 */
Manager.prototype.viewTickets = function(ticketSystem) {
    return ticketSystem.history;
};
/**
 * 
 * @param {TicketSystem} ticketSystem
 */
Manager.prototype.pullTicket = function(ticketSystem) {
    return ticketSystem.pullTicket();
};
/**
 * Update status of ticket to approved or denied
 * @param {TicketSystem} ticketSystem
 * @param {Ticket} ticket
 * @param {String} status
 */
Manager.prototype.processTicket = function(ticketSystem, ticket, status) {
    ticketSystem.processTicket(ticket, status)
};

/**
 * Filter ticket by status
 * @param {TicketSystem} ticketSystem
 * @param {String} status "Pending" "Approved" "Denied"
 * @return {Array<Ticket>} tickets by status
 */
Manager.prototype.filterTickets = function(ticketSystem, status) {
    
    let list = [];
    let tickets = this.viewTickets(ticketSystem);
    for (let i=0; i < tickets.length; i++) {
        // If this User ID matches ticket ownerID
        if (tickets[i].status === status) {
            // add ticket to list
            list.push(tickets[i]);
        };
    };
    return list;
    
};
module.exports = Manager;