import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerContrato = () => {
  const { contratoId } = useParams();
  const navigate = useNavigate();
  const [contrato, setContrato] = useState(null);

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

  const handleDelete = async () => {
    const confirmation = window.confirm('Você tem certeza que deseja deletar este contrato?');
    if (confirmation) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8080/contratos/${contratoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Contrato deletado com sucesso!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Erro ao deletar contrato:', error);
        alert('Erro ao deletar contrato!');
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/editar-contrato/${contratoId}`);
  };

  if (!contrato) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Detalhes do Contrato</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Contrato {contrato.id}</h5>
          <p className="card-text">Tipo: {contrato.tipo === 1 ? 'Aluguel' : 'Venda'}</p>
          <p className="card-text">Valor: {parseFloat(contrato.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          {contrato.tipo === 1 && (
            <>
              <p className="card-text">Data de Início: {new Date(contrato.dataInicio).toLocaleDateString()}</p>
              <p className="card-text">Data de Fim: {new Date(contrato.dataFim).toLocaleDateString()}</p>
              <p className="card-text">Índice de Reajuste: {contrato.indiceReajuste}</p>
            </>
          )}
          {contrato.tipo === 2 && (
            <p className="card-text">Data de Assinatura: {new Date(contrato.dataAssinatura).toLocaleDateString()}</p>
          )}
          <p className="card-text">Cliente ID: {contrato.clienteId}</p>
          <p className="card-text">Usuário ID: {contrato.usuarioId}</p>
          <button className="btn btn-primary" onClick={handleUpdate}>
            Atualizar Contrato
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Deletar Contrato
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerContrato;
