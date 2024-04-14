import React from "react";
import { Table, Button, Form, FloatingLabel, Modal } from "react-bootstrap";

class Alunos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            nome: '',
            email: '',
            curso: '',
            alunos: [],
            modalAberta: false,
            confirmaExcluir: false
        };
        this.apiUrl = 'http://localhost:5001/alunos';
    }

    componentDidMount() {
        this.buscarAlunos();
    }

    buscarAlunos = () => {
        fetch(this.apiUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({ alunos: data });
            })
            .catch(error => console.error('Erro ao buscar alunos:', error));
    }

    deletarAluno = (id) => {
        fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarAlunos();
                } else {
                    alert("Aluno não encontrado");
                }
            })
            .catch(error => console.error('Erro ao deletar aluno:', error));
        this.resetCampos();
    }

    carregarDados = (id) => {
        fetch(`${this.apiUrl}/${id}`)
            .then(resposta => resposta.json())
            .then(aluno => {
                this.setState({
                    id: aluno.id,
                    nome: aluno.nome,
                    email: aluno.email,
                    curso: aluno.curso
                });
            })
            .catch(error => console.error('Erro ao carregar dados do aluno:', error));
    }

    cadastraAluno = (aluno) => {
        console.log('Enviando solicitação para adicionar aluno:', aluno);
        fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        })
            .then(resposta => {
                if (resposta.ok) {
                    console.log('Aluno adicionado com sucesso!');
                    // Após adicionar o aluno com sucesso, buscamos novamente a lista de alunos
                    this.buscarAlunos();
                } else {
                    console.error("Erro ao adicionar aluno. Status:", resposta.status);
                    alert("Não foi possível adicionar o aluno");
                }
            })
            .catch(error => console.error('Erro ao cadastrar aluno:', error));
        this.resetCampos();
    }


    atualizarAluno = (aluno) => {
        fetch(`${this.apiUrl}/${aluno.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarAlunos();
                } else {
                    alert("Não foi possível atualizar os dados do aluno");
                }
            })
            .catch(error => console.error('Erro ao atualizar aluno:', error));
        this.resetCampos();
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

    salvar = () => {
        const { id, nome, email, curso } = this.state;
        const aluno = { id, nome, email, curso };

        if (id === 0) {
            this.cadastraAluno(aluno);
        } else {
            this.atualizarAluno(aluno);
        }
        this.resetCampos();
    }

    resetCampos = () => {
        this.setState({
            id: 0,
            nome: '',
            email: '',
            curso: ''
        });
    }

    toggleConfirmacaoExclusao = () => {
        this.setState(prevState => ({
            confirmaExcluir: !prevState.confirmaExcluir
        }));
    }

    abrirModal = () => {
        this.setState({
            modalAberta: true
        });
    }

    fecharModal = () => {
        this.setState({
            modalAberta: false
        });
    }


    renderTabela() {
        return (
            <Table striped bordered hover className="ms-2">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Curso</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.alunos.map(aluno => (
                        <tr key={aluno.id}>
                            <td>{aluno.id}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.email}</td>
                            <td>{aluno.curso}</td>
                            <td>
                                <Button variant="success" onClick={() => { this.carregarDados(aluno.id); this.abrirModal(); }}>Atualizar</Button>
                                <Button className="ms-1" variant="danger" onClick={() => { this.setState({ id: aluno.id }); this.toggleConfirmacaoExclusao(); }}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }

    confirmarExclusao() {
        return (
            <Modal
                show={this.state.confirmaExcluir}
                onHide={this.toggleConfirmacaoExclusao} // Updated onHide to toggleConfirmacaoExclusao
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tem certeza disso ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Você quer mesmo excluir o aluno?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleConfirmacaoExclusao}>
                        Não
                    </Button>
                    <Button className="ms-1" variant="danger" onClick={() => { this.deletarAluno(this.state.id); this.toggleConfirmacaoExclusao(); }}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    renderModal() {
        return (
            <Modal
                show={this.state.modalAberta}
                onHide={this.fecharModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Aluno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FloatingLabel label="ID" className="mb-2 ms-2 ">
                            <Form.Control type="text" placeholder="Id" value={this.state.id} readOnly={true} />
                        </FloatingLabel>
                        <FloatingLabel label="Nome" className="mb-2 ms-2 ">
                            <Form.Control type="text" placeholder="Nome Sobrenome" value={this.state.nome} onChange={this.atualizaNome} />
                        </FloatingLabel>
                        <FloatingLabel label="Email" className="mb-2 ms-2">
                            <Form.Control type="email" placeholder="nome@exemplo.com" value={this.state.email} onChange={this.atualizaEmail} />
                        </FloatingLabel>
                        <FloatingLabel label="Curso" className="mb-2 ms-2">
                            <Form.Control type="text" placeholder="Curso" value={this.state.curso} onChange={this.atualizaCurso} />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.fecharModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={() => { this.fecharModal(); this.salvar(); }}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        return (
            <div>
                <Button className="mb-2 ms-2" variant="primary" onClick={this.abrirModal}>
                    Adicionar Aluno
                </Button>
                {this.renderModal()}
                {this.confirmarExclusao()}
                {this.renderTabela()}
            </div>
        )
    }
}

export default Alunos;
