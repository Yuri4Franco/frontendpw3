import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../auth/AuthContext';
import ImovelCard from '../../componentes/CardImoveis';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const admin = localStorage.getItem('admin');

  const [imoveis, setImoveis] = useState([]);

  const fetchImoveis = async () => {
    try {
      const response = await axios.get('http://localhost:8080/imoveis', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const imoveisComOfertas = await Promise.all(response.data.map(async (imovel) => {
        try {
          const ofertasResponse = await axios.get(`http://localhost:8080/ofertas/imovel/${imovel.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return { ...imovel, ofertas: ofertasResponse.data };
        } catch (error) {
          console.error(`Erro ao buscar ofertas para o imóvel ${imovel.id}:`, error);
          return { ...imovel, ofertas: [] };
        }
      }));

      setImoveis(imoveisComOfertas);
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
    }
  };

  useEffect(() => {
    fetchImoveis();
  }, [token]);


  return (
    <div className="container mt-5">
      <div className="row">
        {imoveis.map((imovel) => (
          <div className="col-md-4" key={imovel.id}>
            <ImovelCard imovel={imovel} fetchImoveis={fetchImoveis} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
