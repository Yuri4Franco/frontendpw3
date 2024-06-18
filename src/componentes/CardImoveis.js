import React, { useContext } from 'react';
import { FaBed, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../auth/AuthContext';

const ImovelCard = ({ imovel, fetchImoveis }) => {
  const { descricao, quartos, vagas, imagem, id, ofertas, contratos } = imovel;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleViewContract = () => {
    navigate(`/ver-contrato/${contratos[0].id}`);
  };

  const handleGenerateContract = () => {
    navigate(`/gerar-contrato/${id}`);
  };

  const handleGenerateOffer = () => {
    if (ofertas && ofertas.length > 0) {
      navigate(`/editar-oferta/${ofertas[0].id}`);
    } else {
      navigate(`/gerar-oferta/${id}`);
    }
  };

  const handleGenerateDiscount = (ofertaId) => {
    navigate(`/gerar-desconto/${ofertaId}`);
  };

  const handleEdit = () => {
    navigate(`/editar-imovel/${id}`);
  };

  const handleDelete = async () => {
    const confirmation = window.confirm('Você tem certeza que deseja deletar este imóvel?');
    if (confirmation) {
      try {
        const response = await axios.delete(`http://localhost:8080/imoveis/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        if (response.status === 204) {
          alert('Imóvel deletado com sucesso');
          fetchImoveis(); // Atualiza a lista de imóveis após a exclusão
        } else {
          alert('Erro ao deletar imóvel');
        }
      } catch (error) {
        console.error('Erro ao deletar imóvel:', error);
        alert('Erro ao deletar imóvel');
      }
    }
  };

  const calculateDiscountedValue = (oferta, desconto) => {
    if (desconto.tipoDesconto === 'PORCENTAGEM') {
      return oferta.valor - (oferta.valor * (desconto.valor / 100));
    } else {
      return oferta.valor - desconto.valor;
    }
  };

  return (
    <div className="card" style={{ width: '18rem', margin: '10px' }}>
      <img src={imagem} className="card-img-top" alt="Imagem do imóvel" />
      <div className="card-body">
        <h5 className="card-title">{descricao}</h5>
        <p className="card-text">
          <FaBed /> {quartos} Quartos
        </p>
        <p className="card-text">
          <FaUser /> {vagas} Vagas
        </p>
        {ofertas && ofertas.length > 0 && (
          <div>
            <h6>Ofertas:</h6>
            {ofertas.map((oferta) => (
              <div key={oferta.id}>
                {oferta.descontos && oferta.descontos.length > 0 ? (
                  <p className="card-text">
                    {oferta.tipo}: <span style={{ textDecoration: 'line-through' }}>
                      {parseFloat(oferta.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>{' '}
                    {parseFloat(calculateDiscountedValue(oferta, oferta.descontos[0])).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                ) : (
                  <p className="card-text">
                    {oferta.tipo}: {parseFloat(oferta.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                )}
                <button className="btn btn-secondary" onClick={() => handleGenerateDiscount(oferta.id)}>
                  Gerar Desconto
                </button>
              </div>
            ))}
          </div>
        )}
        {contratos && contratos.length > 0 ? (
          <button className="btn btn-primary" onClick={handleViewContract}>
            Ver Contrato
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleGenerateContract} disabled={!ofertas || ofertas.length === 0}>
            Gerar Contrato
          </button>
        )}
        <button className="btn btn-primary" onClick={handleGenerateOffer}>
          {ofertas && ofertas.length > 0 ? 'Editar Oferta' : 'Gerar Oferta'}
        </button>
        {user && user.isAdmin && (
          <>
            <button className="btn btn-primary" onClick={handleEdit}>
              Editar Imóvel
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Deletar Imóvel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImovelCard;
