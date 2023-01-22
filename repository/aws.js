const AWS = require('aws-sdk')
// Configure Amazon region
AWS.config.update({region: "us-east-1",});

module.exports = AWS