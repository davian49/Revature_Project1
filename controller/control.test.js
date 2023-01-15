const dao = require('./userDAO')

//createLocalServer()
console.log(dao.checkUser("user@ers.com")) // true
console.log(dao.login("user@ers.com", "fail")) // fail
console.log(dao.login("user@ers.com", "pass")) // pass