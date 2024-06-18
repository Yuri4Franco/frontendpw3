import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { notifyError } from '../../utils/ToastUtil';
import AuthContext from '../../auth/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('teste@gmail.com');
  const [password, setPassword] = useState('1234');
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const { login } = React.useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSpinner(true);
      const response = await axios.post('http://localhost:8080/public/login', {
        email: email,
        password: password
      });
      const { token, userId, admin } = response.data;

      if (token) {
        login(userId, token, admin);
        navigate('/dashboard');
      }
    } catch (error) {
      notifyError('Erro ao realizar login');
      console.error('Erro de login:', error.response ? error.response.data : error.message);
      alert('dados inválidos');
    } finally {
      setSpinner(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="card w-100" style={{ maxWidth: '420px' }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Login</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div id="emailHelp" className="form-text">Não se preocupe, o seu e-mail está muito seguro 🫠</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>

          {spinner &&
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#0d6efd"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          }

          <p className="mt-3">
            Não tem uma conta? <Link to="/cadastro" className="link-primary">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
