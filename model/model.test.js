const Employee = require('./Employee');
const Manager = require('./Manager');
//const Ticket = require('./ticket');
const TicketSystem = require('./TicketSystem');

let id = 0;
let joe = new Employee(id++,"joemontana@gmail.com", 'pass');
let jill = new Employee(id++,"jillscott@gmail.com", 'password');
let bob = new Manager(id++, "bobiger@ers.com", "shoppa")
let system = new TicketSystem();


joe.submitTicket(system,23,"need cash")
jill.submitTicket(system,100,"subscription service")
joe.submitTicket(system,212,"accidental coverage")
jill.submitTicket(system,75,"testing the system")

let ticket = bob.pullTicket(system)
bob.processTicket(system, ticket, "Approved")

console.log(jill.filterTickets(system, "Pending"));
console.log(bob.filterTickets(system, 'Denied'))

console.log(system.history)
console.log(system.pending)
console.log(system.processed)