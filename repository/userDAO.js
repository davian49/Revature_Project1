const userDAO = require('./dynamoDB')
const bcrypt = require('bcrypt');
const User = require('../model/User');
const salt = 10;

// CRUD Operations on DynamoDB (put, get, update, delete)
// CREATE User
/**
 * Create user in DynamoDB table
 * @param {User} user 
 */
async function createUser(user) {
    // Params for DynamoDB "put"
    const params = {
        TableName: 'users',
        Item: {
            id: user.id,
            username: user.username,
            password: user.password,
            role: user.role
        }
    };
    userDAO.put(params, async (err) =>{
        if(err) {
            console.log(err)
        } else {
            console.log(`Successfully added ${params.Item.username} with id: ${params.Item.id} and role: "${params.Item.role}" to table ${params.TableName}`)
        }
    }).promise()
};

/**
 * Check and compare input with password from DynamoDB
 * @param {String} password input
 * @param {String} dbPassword Load hash from your password DB.
 * @return {Boolean} 
 */
function checkPassword(password, dbPassword) {
    return bcrypt.compareSync(password, dbPassword);
}
/**
 * Check DynamoDB for username using get
 * @param {String} username 
 */
async function retrieveUserName(username, password) {
    const params = {
        TableName: 'users',
        // IndexName: 'username',
        Key: {
            username
        }
    };
    let data = await userDAO.get(params).promise().then()
    
    return data ;
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
    // Get user from DynamoDB
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
    }).promise()
}

// ADD User
// UPDATE User
// DELETE User

module.exports = {
    createUser,
    loginUser,
    retrieveUserName,
    checkPassword
}