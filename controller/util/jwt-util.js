// This is a file that will contain useful functions for dealing with JWTs
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// get config vars
dotenv.config();
/**
 * Creates JSON Web Token with signature
 * @param {String} username taken from User object
 * @param {String} id unique user ID
 * @param {String} role "employee" or "manager"
 * @returns {String} JSON Web Token
 */
jwt.generateAccessToken = function (username, id, role) {
    return jwt.sign({username, id, role}, process.env.TOKEN_SECRET, {expiresIn: '3d'});
}
/**
 * Verify Access Token using JWT
 * @param {String} token generated with JWT
 * @returns jwt verified token
 */
jwt.verifyAccessToken = function (token) {
    // verify token and return payload
    return jwt.verify(token, process.env.TOKEN_SECRET)
}

module.exports = { jwt }
