import './App.css';
import Sobre from './componentes/Sobre'
import Home from './componentes/Home'
import Alunos from './componentes/Alunos'
import {BrowserRouter,Routes,Link,Route } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>Meu projeto ReactJs</h1>
      <BrowserRouter>
        <Nav variant="pills" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link as={Link} to="/">Página Inicial</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/alunos">Cadastro de Alunos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
          </Nav.Item>
        </Nav>

        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/alunos" element={<Alunos/>}></Route>
          <Route path="/sobre" element={<Sobre/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
