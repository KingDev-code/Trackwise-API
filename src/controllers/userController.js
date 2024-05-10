const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getUserProfile = async (req, res) => {
    try {
        // O ID do usuário é recuperado do objeto de requisição, que foi populado pelo middleware de autenticação
        const userId = req.user.id;

        // Busca o usuário no banco de dados usando o ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }

        // Prepare uma resposta segura, excluindo informações sensíveis como senha
        const userProfile = {
            id: user.id,
            email: user.email,
            // inclua outros campos conforme necessário
        };

        return res.status(200).send(userProfile);
    } catch (error) {
        console.error('Erro ao buscar perfil do usuário:', error);
        return res.status(500).send({ message: 'Erro interno ao buscar informações do usuário.' });
    }
}

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).send({ user: newUser.id });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send('Senha inválida');
        }

        // Assumindo que a chave secreta está armazenada em uma variável de ambiente
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });

        console.log('Usuário logado com sucesso!');
        res.json({
            message: "Usuário logado com sucesso!",
            token: token
        });        
        } catch (error) {
            console.error("Erro no processo de login:", error);
            return res.status(500).send({ message: "Erro interno do servidor", error: error.message });
        }
};