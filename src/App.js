import './App.css';
import Sobre from './componentes/Sobre'
import Home from './componentes/Home'
import Alunos from './componentes/Alunos'
import {BrowserRouter,Routes,Link,Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <h1>Meu projeto ReactJs</h1>
      <BrowserRouter>
        <ul>
          <li> <Link to="/">Página Inicial</Link> </li>
          <li> <Link to="/alunos">Cadastro de Alunos</Link> </li>
          <li> <Link to="/sobre">Sobre</Link> </li>
        </ul>

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
