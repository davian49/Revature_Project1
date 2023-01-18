const AWS = require('aws-sdk')
// Configure Amazon region
AWS.config.update({region: "us-east-1",});
// Initialize DynameDB DAO
const DynamoDB = new AWS.DynamoDB.DocumentClient()

module.exports = DynamoDB