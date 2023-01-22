const AWS = require('./aws')

// Create an SQS service object
var sqs = new AWS.SQS();

var params = {};

// Create
sqs.createQueues(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrls);
  }
});


// Read
sqs.listQueues(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrls);
  }
});

// Update
sqs.makeRequest(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.QueueUrls);
    }
});

// Delete
sqs.deleteQueue(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.QueueUrls);
    }
});
