const express = require('express');
const router = express.Router();
const User = require('../data/user'); // Model Mongoose

// Cadastro
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        // Retorna o usuário (sem a senha)
        res.json({
            message: 'Login realizado com sucesso',
            user: {
                id: user._id,
                name: user.name, // 👈 pega o nome do banco
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }
});


module.exports = router;
