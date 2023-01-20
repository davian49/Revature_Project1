// This is a file that will contain useful functions for dealing with JWTs
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// get config vars
dotenv.config();
/**
 * Creates JSON Web Token with signature
 * @param {*} username 
 * @param {*} role "employee" or "manager"
 * @returns {String} JSON Web Token
 */
function generateAccessToken(username, role) {
    return jwt.sign({username, role}, process.env.TOKEN_SECRET, {expiresIn: '1d'});
}

module.exports = {
    generateAccessToken
}
