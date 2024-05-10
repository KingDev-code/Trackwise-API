const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

// Rotas que não requerem autenticação
router.post('/signup', userController.createUser);
router.post('/login', userController.userLogin);

// Rotas que requerem autenticação
router.get('/profile', authenticate, userController.getUserProfile);


module.exports = router;