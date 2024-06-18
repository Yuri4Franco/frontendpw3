import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import AuthContext from '../../auth/AuthContext';

const CadastroImoveis = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [spinner, setSpinner] = useState(false);
  const [descricao, setDescricao] = useState('Casa');
  const [quartos, setQuartos] = useState(1);
  const [vagas, setVagas] = useState(2);
  const [imagem, setImagem] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    if (!user || !user.token) {
      alert('Usuário não autenticado. Por favor, faça login.');
      navigate('/login');
    } else if (!user.isAdmin) {
      alert('Acesso negado. Somente administradores podem cadastrar imóveis.');
      navigate('/dashboard');
    } else {
      setUsuarioId(user.user_id);
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!descricao || !quartos || !vagas || !usuarioId || !imagem) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setSpinner(true);
      const formData = new FormData();
      formData.append('descricao', descricao);
      formData.append('quartos', parseInt(quartos, 10));
      formData.append('vagas', parseInt(vagas, 10));
      formData.append('imagem', imagem);
      formData.append('usuario_id', usuarioId);

      console.log('Enviando dados:', {
        descricao,
        quartos: parseInt(quartos, 10),
        vagas: parseInt(vagas, 10),
        usuario_id: usuarioId,
        imagem: imagem.name
      });

      const response = await axios.post('http://localhost:8080/imoveis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`
        },
      });

      if (response.status === 201) {
        alert('Imóvel cadastrado com sucesso');
        navigate('/dashboard');
      } else {
        alert('Erro ao cadastrar imóvel');
      }
    } catch (error) {
      console.error('Erro ao cadastrar imóvel:', error);
      alert('Erro ao cadastrar imóvel');
    } finally {
      setSpinner(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="card w-100" style={{ maxWidth: '420px' }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Cadastrar Imóvel</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição:</label>
              <input
                type="text"
                className="form-control"
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quartos" className="form-label">Quartos:</label>
              <input
                type="number"
                className="form-control"
                id="quartos"
                value={quartos}
                onChange={(e) => setQuartos(parseInt(e.target.value, 10))}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="vagas" className="form-label">Vagas:</label>
              <input
                type="number"
                className="form-control"
                id="vagas"
                value={vagas}
                onChange={(e) => setVagas(parseInt(e.target.value, 10))}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imagem" className="form-label">Fotos:</label>
              <input
                type="file"
                className="form-control"
                id="imagem"
                onChange={(e) => setImagem(e.target.files[0])}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
          </form>

          {spinner && (
            <div className="d-flex justify-content-center mt-4">
              <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#0d6efd"
                ariaLabel="tail-spin-loading"
                radius="1"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CadastroImoveis;
