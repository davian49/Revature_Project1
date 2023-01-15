const Ticket = require("./ticket");
/**
 * 4. Ticketing System Feature
The ticketing system feature is meant to act as the primary interface for internal 
managers. Managers will use this interface to process the pending reimbursement 
request tickets and either approve or deny these requests. Here is the user story:
• Managers can process tickets submitted by employees 
i. Tickets can be Approved or Denied 
ii. Tickets cannot change status after processing 
• Pending tickets should be added to a queue or list that managers can see 
i. Tickets should be removed from the list, or queue, once processed 
(approved/denied) by a manager
5. View Previous Tickets Feature
The view previous tickets feature is meant for employees to see their request 
submission history. Employees will leverage this to see outstanding pending tickets 
along with tickets that have been processed by managers. Here is the user story:
• As an Employee, I should be able to view all previous reimbursement ticket 
submissions. 
i. Employees should be able to filter by status (pending, approved, or denied)
• Previous tickets should also show the details of submission.
 */

/**
 * Managers use this interface to process the pending reimbursement 
request tickets and either approve or deny these requests.
Employees us all this to view previous reimbursement ticket submissions. 
Managers and Employees should be able to filter by status (pending, approved, or denied)
• Previous tickets should also show the details of submission.
* @property {Array<Ticket>} history previous reimbursement ticket submissions. 
* @property {Array<Ticket>} pending reimbursement request tickets
* @property {Array<Ticket>} processed approved, or denied request tickets
 */
class TicketSystem {   
    constructor() {
        this.history = []
        this.pending = [];
        this.processed = [];
    }
}
/**
 * Submit reimbursement request ticket to system
 * @param {Ticket} ticket 
 */
TicketSystem.prototype.submitTicket = function(ticket) {
    this.history.push(ticket)
    this.pending.push(ticket)
}
/**
 * View request tickets to system
 * @param {String} role Manager or Employee
 * @return {Array<Ticket>} ticket 
 */
TicketSystem.prototype.viewTickets = function() {
    return this.history;
}
/**
 * Pull ticket from system for review
 * @returns {Ticket} ticket from Pending list
 */
TicketSystem.prototype.pullTicket = function() {
    return this.pending.shift();
}
/**
 * 
 * @param {Ticket} ticket 
 * @param {String} status "Approved" or "Denied"
 */
TicketSystem.prototype.processTicket = function(ticket, status) {
    ticket.status = status
    this.processed.push(ticket)
}

module.exports = TicketSystem