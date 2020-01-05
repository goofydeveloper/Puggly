const jwt = require('jsonwebtoken')
const config = require('config')

// middleware functions has access to req, res objects
// next is callback to move to next middleware
module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');
    
    // Check if not token
    if(!token) {
        return res.status(401).json({msg: 'No token, access denied'})
    }

    // Verify/decode token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //used for future routes
        req.user = decoded.user //payload set in user.js
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}