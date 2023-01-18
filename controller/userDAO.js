let uniqid = require('uniqid'); 
const userDAO = require('./server')
const bcrypt = require('bcrypt');
const salt = 10;

/**
 * Hashes password with bcrypt
 * @param {String} password to be encrypted
 * @return {bcrypt} encrypted password
 */
function hash(password) {return bcrypt.hashSync(password, salt);} 


// CRUD Operations on DynameDB (put, get, update, delete)
// CREATE User
/**
 * Create user in DynameDB table with uniqid
 * @property {uniqid} id a prefixed unique identifier based on the current time
 * @param {String} username 
 * @param {String} password
 * @property {String} role employee by default
 */
function createUser(username, password) {
    // Params for DynamoDB "put"
    const params = {
        TableName: 'users',
        Item: {
            id: uniqid(),
            username: username,
            password: hash(password),
            role: "employee"
        }
    };
    userDAO.put(params, (err) =>{
        if(err) {
            console.log(err)
        } else {
            console.log(`Successfully added ${params.Item.username} with id: ${params.Item.id} and role: "${params.Item.role}" to table ${params.TableName}`)
        }
    })
};

/**
 * Check and compare input with password from DynamoDB
 * @param {*} password input
 * @param {*} dbPassword Load hash from your password DB.
 * @return {Boolean} 
 */
function checkPassword(password, dbPassword) {
    return bcrypt.compareSync(password, dbPassword);
}
/**
 * Check DynamoDB for username using query 
 * Time complexity O(1)
 * @param {String} username 
 */
function checkUserName(username) {
    const params = {
        TableName: 'users',
        // IndexName: 'username',
        KeyConditionExpression: '#u = :value',
        ExpressionAttributeNames: {
            "#u": "username"
        },
        ExpressionAttributeValues: {
            ":value": username
        }
    };
    
    userDAO.query(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data) {
                console.log(`Username "${username}" found.`)
            } else {
                console.log(`Username "${username}" not found. Have you registered an account ?`)
            }
            
        }
    });
}
/**
 * Login to DynamoDB with user input
 * @param {String} username 
 * @param {String} password to be compared to DynamoDB useer password 
 */
function loginUser(username, password) {
    const params = {
        TableName: 'users',
        Key: {
            username: username
        }
    };
    
    userDAO.get(params, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data.Item &&  checkPassword(password, data.Item.password)) {
               console.log(`Successfully logged in as ${username}`) 
            } else {
                console.log("Wrong username or password")
            }
            
        }
    })
}

// ADD User
// UPDATE User
// DELETE User

module.exports = {
    createUser,
    loginUser,
    checkUserName
}