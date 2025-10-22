const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // suas rotas
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

//Conectando ao MongoDB
mongoose.connect('mongodb+srv://devjsousa:010516@cluster0.qizitqp.mongodb.net/votacao?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('✅ Conectado ao MongoDB');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    })
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

//Rotas
app.use('/api', authRoutes);
