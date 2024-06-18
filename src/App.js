import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './telas/dashboard/Dashboard';
import Cadastro from './telas/cadastro/Cadastro';
import Login from './telas/login/Login';
import CadastroImoveis from './telas/cadastro/CadastroImoveis';
import CadastroCliente from './telas/cadastro/CadastroCliente';
import GerarContrato from './componentes/GerarContrato';
import EditarImovel from './telas/cadastro/EditarImovel';
import GerarOferta from './componentes/GerarOferta';
import GerarDesconto from './componentes/GerarDesconto';  
import VerContrato from './telas/dashboard/VerContrato';
import EditarOferta from './telas/cadastro/EditarOferta';
import EditarContrato from './telas/cadastro/EditarContrato';
import { AuthProvider } from './auth/AuthContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LayoutBar from './componentes/Layoutbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<LayoutBar><Dashboard /></LayoutBar>} />
          <Route path="/cadastroImoveis" element={<LayoutBar><CadastroImoveis /></LayoutBar>} />
          <Route path="/cadastroCliente" element={<LayoutBar><CadastroCliente /></LayoutBar>} />
          <Route path="/gerar-contrato/:imovelId" element={<GerarContrato />} />
          <Route path='/editar-imovel/:id' element={<EditarImovel />} />
          <Route path="/gerar-oferta/:id" element={<GerarOferta />} />
          <Route path="/gerar-desconto/:ofertaId" element={<GerarDesconto />} />
          <Route path="/ver-contrato/:contratoId" element={<VerContrato />} />
          <Route path="/editar-contrato/:contratoId" element={<EditarContrato />} />
          <Route path="/editar-oferta/:ofertaId" element={<EditarOferta />} />
        </Routes>
      </Router>
    </AuthProvider>
  );

  
}

export default App;
