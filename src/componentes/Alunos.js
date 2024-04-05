import React from "react";
import {Table} from "react-bootstrap";

class Alunos extends React.Component { 

    constructor(props){
        super(props);

        this.state = {
            alunos : []
        }
    }

    componentDidMount(){
        fetch("")
            .then(resposta => resposta.json())
    }

    componentWillUnmount(){
        
    }

    render(){ 
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
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
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td>{aluno.curso}</td>
                                <td>Atualizar Excluir</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }

}

export default Alunos;