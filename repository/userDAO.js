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
function createUser(user) {
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
 * @param {String} password input
 * @param {String} dbPassword Load hash from your password DB.
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
    }).promise();
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
    }).promise()
}

// ADD User
// UPDATE User
// DELETE User

module.exports = {
    createUser,
    loginUser,
    checkUserName
}