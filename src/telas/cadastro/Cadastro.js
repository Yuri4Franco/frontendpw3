import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notifyError } from '../../utils/ToastUtil';

const Cadastro = () => {
  const [nome, setNome] = useState('Testador gratuíto');
  const [email, setEmail] = useState('teste@gmail.com');
  const [password, setPassword] = useState('1234');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8080/public/register', {
        nome,
        email,
        password,
      });
      alert('Cadastro realizado com sucesso!');

      navigate('/login');

    } catch (error) {
      notifyError('Erro ao registrar');
      console.error('Erro de cadastro:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="card w-100" style={{ maxWidth: '420px' }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Cadastro de Usuário</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
          </form>
          <p className="mt-3">
            Já tem conta <Link to="/login" className="link-primary">Entrar no sistema</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
