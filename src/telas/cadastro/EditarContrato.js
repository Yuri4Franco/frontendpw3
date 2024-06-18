import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarContrato = () => {
  const { contratoId } = useParams();
  const navigate = useNavigate();
  const [contrato, setContrato] = useState({
    tipo: '',
    valor: '',
    dataFim: '',
    dataInicio: '',
    indiceReajuste: '',
    dataAssinatura: '',
    clienteId: '',
    imovelId: '',
    usuarioId: localStorage.getItem('usuario_id'),
  });

  useEffect(() => {
    const fetchContrato = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/contratos/${contratoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContrato(response.data);
      } catch (error) {
        console.error('Erro ao buscar contrato:', error);
        alert('Erro ao buscar contrato!');
      }
    };

    fetchContrato();
  }, [contratoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContrato((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/contratos/${contratoId}`, contrato, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Contrato atualizado com sucesso!');
      navigate(`/ver-contrato/${contratoId}`);
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error);
      alert('Erro ao atualizar contrato!');
    }
  };

  console.log("contratoId:", contratoId);
  return (
    <div className="container mt-5">
      <h2>Editar Contrato</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">Tipo</label>
          <select
            className="form-control"
            id="tipo"
            name="tipo"
            value={contrato.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o tipo de contrato</option>
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
            name="valor"
            value={contrato.valor}
            onChange={handleChange}
            required
          />
        </div>
        {contrato.tipo === '1' && (
          <>
            <div className="mb-3">
              <label htmlFor="dataInicio" className="form-label">Data de Início</label>
              <input
                type="date"
                className="form-control"
                id="dataInicio"
                name="dataInicio"
                value={contrato.dataInicio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dataFim" className="form-label">Data de Fim</label>
              <input
                type="date"
                className="form-control"
                id="dataFim"
                name="dataFim"
                value={contrato.dataFim}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="indiceReajuste" className="form-label">Índice de Reajuste</label>
              <input
                type="text"
                className="form-control"
                id="indiceReajuste"
                name="indiceReajuste"
                value={contrato.indiceReajuste}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        {contrato.tipo === '2' && (
          <div className="mb-3">
            <label htmlFor="dataAssinatura" className="form-label">Data de Assinatura</label>
            <input
              type="date"
              className="form-control"
              id="dataAssinatura"
              name="dataAssinatura"
              value={contrato.dataAssinatura}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">Atualizar Contrato</button>
      </form>
    </div>
  );
};

export default EditarContrato;
