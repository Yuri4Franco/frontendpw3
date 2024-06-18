import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GerarContrato = () => {
  const { imovelId } = useParams();
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [contrato, setContrato] = useState({
    tipo: '',
    valor: '',
    dataFim: '',
    dataInicio: '',
    indiceReajuste: '',
    dataAssinatura: '',
    clienteId: '',
    imovelId: imovelId,
    usuarioId: localStorage.getItem('usuario_id'),
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContrato((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const contratoPayload = {
        ...contrato,
        clienteModel: { id: contrato.clienteId },
        userModel: { id: contrato.usuarioId },
        imovelModel: { id: contrato.imovelId },
      };
      console.log('Contrato a ser enviado:', contratoPayload);
      await axios.post('http://localhost:8080/contratos', contratoPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Contrato gerado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao gerar contrato:', error);
      alert('Erro ao gerar contrato!');
    }
  };
  console.log('imovelId:', imovelId);
  console.log('Cliente selecionado:', contrato.clienteId);
  console.log('UsuarioId:', contrato.usuarioId);

  return (
    
    <div className="container mt-5">
      <h2>Gerar Contrato</h2>
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
        <div className="mb-3">
          <label htmlFor="clienteId" className="form-label">Cliente</label>
          <select
            className="form-control"
            id="clienteId"
            name="clienteId"
            value={contrato.clienteId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Gerar Contrato</button>
      </form>
    </div>
  );
};

export default GerarContrato;
