import React from "react";
import { Table, Button, Form, FloatingLabel } from "react-bootstrap";

class Alunos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            nome: '',
            email: '',
            curso: '',
            alunos: [],
        };
        this.salvar = this.salvar.bind(this);
    }

    componentDidMount() {
        this.buscarAluno();
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

    cadastraAluno = (aluno) => {
        fetch('http://localhost:5001/alunos/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        }).then((resposta) => {

            if (resposta.ok) {
                this.buscarAluno();
            } else {
                alert("Não foi possivel adicionar o aluno");
            }
        }).catch(console.log);
    }


    atualizaNome = (e) => {
        this.setState({
            nome: e.target.value
        });
    }

    atualizaEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    atualizaCurso = (e) => {
        this.setState({
            curso: e.target.value
        });
    }

    renderTabela() {
        return (
            <Table striped bordered hover className="ms-2">
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
                            <tr key={aluno.id}>
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td>{aluno.curso}</td>
                                <td>
                                    <Button variant="success">Atualizar</Button>
                                    <Button className="ms-1" variant="danger" onClick={() => this.deletarAluno(aluno.id)}>Excluir</Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }

    salvar = () => {
        const aluno = {
            id: 0,
            nome: this.state.nome,
            email: this.state.email,
            curso: this.state.curso

        }

        this.cadastraAluno(aluno);

        this.setState({
            nome: '',
            email: '',
            curso: ''
        });
    }

    render() {
        return (
            <div>
                <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Nome"
                        className="mb-2 ms-2 "
                    >
                        <Form.Control type="text" placeholder="Nome Sobrenome" value={this.state.nome} onChange={this.atualizaNome} />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-2 ms-2"
                    >
                        <Form.Control type="email" placeholder="nome@exemplo.com" value={this.state.email} onChange={this.atualizaEmail} />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Curso"
                        className="mb-2 ms-2"
                    >
                        <Form.Control type="text" placeholder="Curso" value={this.state.curso} onChange={this.atualizaCurso} />
                    </FloatingLabel>
                    <Button className="mb-2 ms-2" variant="primary" onClick={this.salvar} >
                        Salvar
                    </Button>
                </Form>
                {this.renderTabela()};
            </div>
        )
    }
}

export default Alunos;