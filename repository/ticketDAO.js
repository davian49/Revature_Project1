const AWS = require('./aws')
const Ticket = require('../model/Ticket');

// Initialize DynamoDB DAO
const ticketDAO = new AWS.DynamoDB.DocumentClient()

// CRUD Operations on DynamoDB (put, get, update, delete)
// CREATE Ticket
/**
 * Create ticket in DynamoDB table
 * @param {Ticket} newTicket 
 */
ticketDAO.insertTicket = function (newTicket) {
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
// READ Tickets
// retrieveAllTickets()
// Retrieves all tickets from the table
// You can utilize scan for this
ticketDAO.retrieveAllTickets = async function () {
    const params = {
        TableName: 'tickets'
    }

    return await ticketDAO.scan(params).promise();
}
// Smart approach (efficient O(1))
ticketDAO.retrieveTicketsByOwner = function (ownerID) {
    const params = {
        TableName: 'tickets',
        IndexName: 'ownerID-index',
        KeyConditionExpression: '#id = :value',
        ExpressionAttributeNames: {
            '#id': 'ownerID'
        },
        ExpressionAttributeValues: {
            ':value': ownerID
        }
    };

    return ticketDAO.query(params).promise();
}

ticketDAO.retrieveTicketByID = function (id) {
    const params = {
        TableName: 'tickets',
        Key: {
            "id": id
        }
    }

    return ticketDAO.get(params).promise();
}
// UPDATE Ticket
// DELETE Ticket

module.exports = { ticketDAO }


    