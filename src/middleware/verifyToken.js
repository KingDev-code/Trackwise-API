const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const publicKey = fs.readFileSync(path.resolve(__dirname, '../../keys/public.pem'), 'utf8');  // Chave pública usada para verificar o token

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Dividir "Bearer <token>"

    if (token == null) {
        return res.sendStatus(401);  // Se não há token, não autorizado
    }

    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, user) => {
        if (err) {
            return res.sendStatus(403);  // Retorna um erro se o token é inválido
        }

        req.user = user;  // Adiciona a decodificação do usuário ao objeto de requisição
        next();  // Passa para o próximo middleware ou rota
    });
};

module.exports = verifyToken;
