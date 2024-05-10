const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ message: 'Token de acesso requerido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // prossegue para o proximo middleware ou rota
    } catch (error) {
        return res.status(401).send({ message: 'Token inválido.' });
    }
};

module.exports = authenticate;