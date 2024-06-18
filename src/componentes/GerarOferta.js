import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GerarOferta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tipoOferta, setTipoOferta] = useState('');
  const [valor, setValor] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const usuarioId = localStorage.getItem('usuario_id'); // Supondo que o userId está armazenado no localStorage
      const response = await axios.post(`http://localhost:8080/ofertas`, {
        tipoOferta,
        valor,
      }, {
        params: {
          imovelId: id,
          usuarioId: usuarioId,
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Oferta gerada com sucesso');
        navigate('/dashboard'); // Redirecionar para a página inicial ou qualquer outra página desejada
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erro ao gerar oferta:', error);
      alert('Erro ao gerar oferta');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Gerar Oferta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tipoOferta" className="form-label">Tipo de Oferta</label>
          <select
            className="form-control"
            id="tipoOferta"
            value={tipoOferta}
            onChange={(e) => setTipoOferta(e.target.value)}
            required
          >
            <option value="">Selecione o tipo de oferta</option>
            <option value="1">Aluguel</option>
            <option value="2">Venda</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="valor" className="form-label">Valor</label>
          <input
            type="number"
            className="form-control"
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Gerar Oferta</button>
      </form>
    </div>
  );
};

export default GerarOferta;
