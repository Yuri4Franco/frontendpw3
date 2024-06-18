import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Estilize conforme necessário
import AuthContext from '../auth/AuthContext';

const Sidebar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className={`sidebar ${isHidden ? 'hidden' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isHidden ? '>' : '<'}
      </button>
      <Link to="/dashboard">Dashboard</Link>
      {user && user.isAdmin && (
        <>
          <Link to="/cadastroImoveis">Cadastrar Imóvel</Link>
        </>
      )}
      <Link to="/cadastroCliente">Cadastrar Cliente</Link>
    </div>
  );
};

export default Sidebar;
