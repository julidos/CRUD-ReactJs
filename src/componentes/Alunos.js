import React from "react";
import { Table, Button, Form } from "react-bootstrap";

class Alunos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            email: '',
            curso: '',
            alunos: []
        }
    }

    componentDidMount() {
        this.buscarAluno();
    }

    componentWillUnmount() {

    }

    buscarAluno = () => {
        fetch("http://localhost:5001/alunos")
            .then(res => res.json())
            .then(dados => {
                this.setState({ alunos: dados })
            })
    }

    deletarAluno(id) {
        fetch("http://localhost:5001/alunos/" + id, { method: 'DELETE' })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarAluno();
                }
                else {
                    alert("Aluno não encontrado")
                }
            })
    }

    cadastraAluno(aluno) {
        fetch("http://localhost:5001/alunos/",
            { method: 'POST' ,
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(aluno)
        })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarAluno();
                } else{
                    alert('Não foi possivel adicionar o aluno !')
                }
            })
    }

    renderTabela() {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Curso</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.alunos.map((aluno) =>
                            <tr>
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td>{aluno.curso}</td>
                                <td>
                                    <Button variant="success">Alterar</Button>
                                    <Button variant="danger" onClick={() => this.deletarAluno(aluno.id)}>Excluir</Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }

    atualizaNome = (e) => {
        this.setState(
            {
                nome: e.target.value
            }
        )
    }

    atualizaEmail = (e) => {
        this.setState(
            {
                email: e.target.value
            }
        )
    }

    atualizaCurso = (e) => {
        this.setState(
            {
                curso: e.target.value
            }
        )
    }

    submit() {
        const aluno = {
            id: 0,
            nome: this.state.nome,
            email: this.state.email,
            curso: this.state.curso
        }

        this.cadastraAluno(aluno)
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="nomeAluno">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Digite o nome do aluno" value={this.state.nome} onChange={this.atualizaNome} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="emailAluno">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="Digite o email do aluno" value={this.state.email} onChange={this.atualizaEmail} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cursoAluno">
                        <Form.Label>Curso</Form.Label>
                        <Form.Control type="text" placeholder="Digite o curso do aluno" value={this.state.curso} onChange={this.atualizaCurso} />
                    </Form.Group>
                    <Button className="mb-3" variant="primary" type="submit">
                        Salvar
                    </Button>
                </Form>
                {this.renderTabela()};
            </div>
        )
    }
}

export default Alunos;