const ticketDAO = require('./server')
const Ticket = require('../model/Ticket');





// CRUD Operations on DynamoDB (put, get, update, delete)
// CREATE User
/**
 * Create ticket in DynamoDB table with uniqid
 * @param {Ticket} newTicket 
 */
function insertTicket(newTicket) {
    // Params for DynamoDB "put"
    const params = {
        TableName: 'tickets',
        Item: {
            id: newTicket.id,
            amount: newTicket.amount,
            description: newTicket.description,
            ownerID: newTicket.ownerID,
            status: newTicket.status
        }
    };
    ticketDAO.put(params, (err) =>{
        if(err) {
            console.log(err)
        } else {
            console.log(`Successfully added ticket: ${params.Item.id} \n amount: $${params.Item.amount} \n description: "${params.Item.description}" 
            ownerID: ${params.Item.ownerID} \n status: "${params.Item.status}"`)
        }
    })
};
// READ Ticket
// UPDATE Ticket
// DELETE Ticket

module.exports = {
    insertTicket
}