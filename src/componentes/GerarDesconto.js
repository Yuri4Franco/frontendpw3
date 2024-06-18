import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GerarDesconto = () => {
  const { ofertaId } = useParams();
  const navigate = useNavigate();
  const [desconto, setDesconto] = useState({
    tipoDesconto: '',
    valor: '',
    dataExpiracao: '',
    ofertaId: ofertaId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDesconto((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const descontoPayload = {
        ...desconto,
        tipoDesconto: parseInt(desconto.tipoDesconto), // Enviar o código do enum
        ofertaModel: { id: desconto.ofertaId },
      };
      console.log('Desconto a ser enviado:', descontoPayload);
      await axios.post('http://localhost:8080/descontos', descontoPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Desconto gerado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao gerar desconto:', error);
      alert('Erro ao gerar desconto!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Gerar Desconto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tipoDesconto" className="form-label">Tipo de Desconto</label>
          <select
            className="form-control"
            id="tipoDesconto"
            name="tipoDesconto"
            value={desconto.tipoDesconto}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o tipo de desconto</option>
            <option value="0">Valor</option>
            <option value="1">Porcentagem</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="valor" className="form-label">Valor</label>
          <input
            type="number"
            className="form-control"
            id="valor"
            name="valor"
            value={desconto.valor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dataExpiracao" className="form-label">Data de Expiração</label>
          <input
            type="date"
            className="form-control"
            id="dataExpiracao"
            name="dataExpiracao"
            value={desconto.dataExpiracao}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Gerar Desconto</button>
      </form>
    </div>
  );
};

export default GerarDesconto;
