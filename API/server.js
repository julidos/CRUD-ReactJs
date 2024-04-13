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

server.delete("/alunos/:id", (req, res) => {

    const id = req.params.id;

    const index = alunos.findIndex(aluno => aluno.id === parseInt(id));
    alunos.splice(index, 1);
    res.status(200).json({ mensagem: "Aluno excluído com sucesso" });
});


const alunos = [
    { "id": 1, "nome": "Ana", "email": "ana@email.com", "curso": "Matemática" },
    { "id": 2, "nome": "João", "email": "joao@email.com", "curso": "História" },
    { "id": 3, "nome": "Maria", "email": "maria@email.com", "curso": "Biologia" },
];
