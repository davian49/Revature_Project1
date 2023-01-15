const dao = require('./controller/userDAO')


console.log(dao.checkUser("user@ers.com")) // true
console.log(dao.login("user@ers.com", "fail")) // fail
console.log(dao.login("user@ers.com", "pass")) // pass

// createLocalServer() coming soon
// Need to setup HTTP endpoints
// Need to setup RequestHandler
// Need to add ticket Repository

// Need DAO for Manager, Employee
// Change ID values to String for better scaling unique IDs and linking to other tables
