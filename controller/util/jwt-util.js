// This is a file that will contain useful functions for dealing with JWTs
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// get config vars
dotenv.config();
/**
 * Creates JSON Web Token with signature
 * @param {String} username 
 * @param {String} role "employee" or "manager"
 * @returns {String} JSON Web Token
 */
function generateAccessToken(username, role) {
    return jwt.sign({username, role}, process.env.TOKEN_SECRET, {expiresIn: '1d'});
}

function verifyAccessToken(token) {
    // verify token and return payload
    return jwt.verify(token, process.env.TOKEN_SECRET)
}


module.exports = {
    generateAccessToken,
    verifyAccessToken
}
