import React from "react";
import { Table, Button, Forms } from "react-bootstrap";

class Alunos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
    render() {
        return (
            <div>
                {this.renderTabela()};
            </div>
        )
    }
}

export default Alunos;