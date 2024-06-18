import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';

const EditarImovel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [quartos, setQuartos] = useState(0);
  const [vagas, setVagas] = useState(0);
  const [imagem, setImagem] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('usuario_id');
    if (!token || !storedUserId) {
      alert('Usuário não autenticado. Por favor, faça login.');
      navigate('/login');
    } else {
      setUsuarioId(storedUserId);
    }
  }, [id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!descricao || !quartos || !vagas || !usuarioId) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setSpinner(true);
      const formData = new FormData();
      formData.append('id', id); // Inclui o ID no formData
      formData.append('descricao', descricao);
      formData.append('quartos', parseInt(quartos, 10));
      formData.append('vagas', parseInt(vagas, 10));
      if (imagem) {
        formData.append('imagem', imagem);
      }
      formData.append('usuario_id', usuarioId);

      const response = await axios.put('http://localhost:8080/imoveis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      console.log(response.status);

      if (response.status == 201) {
        alert('Imóvel atualizado com sucesso');
        navigate('/dashboard');
      } else {
        alert('Erro ao atualizar imóvel');
      }
    } catch (error) {
      console.error('Erro ao atualizar imóvel:', error);
      alert('Erro ao atualizar imóvel');
    } finally {
      setSpinner(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="card w-100" style={{ maxWidth: '420px' }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Editar Imóvel</h5>
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
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Atualizar</button>
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

export default EditarImovel;
