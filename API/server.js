const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());

server.listen(5001, () => {
    console.log("Servidor ativo.")
});

server.get('/alunos', (req, res) => {
    res.json(alunos);
});

const alunos = [
    { "nome": "Ana", "email": "ana@email.com", "curso": "Matemática" },
    { "nome": "João", "email": "joao@email.com", "curso": "História" },
    { "nome": "Maria", "email": "maria@email.com", "curso": "Biologia" },
];
