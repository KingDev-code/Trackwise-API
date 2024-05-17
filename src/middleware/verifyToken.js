const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const publicKey = fs.readFileSync(path.resolve(__dirname, '../../keys/public.pem'), 'utf8');  // Public key used to verify the token

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Split "Bearer <token>"

    if (token == null) {
        return res.sendStatus(401);  // If there's no token, unauthorized
    }

    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, user) => {
        if (err) {
            return res.sendStatus(403);  // Returns an error if the token is invalid
        }

        req.user = user;  // Adds the decoded user to the request object
        next();  // Passes to the next middleware or route
    });
};

module.exports = verifyToken;