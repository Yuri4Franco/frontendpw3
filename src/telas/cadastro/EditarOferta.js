import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarOferta = () => {
  const { ofertaId } = useParams();
  const navigate = useNavigate();
  const [oferta, setOferta] = useState({
    tipo: '',
    valor: '',
  });

  useEffect(() => {
    const fetchOferta = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ofertas/${ofertaId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOferta(response.data);
      } catch (error) {
        console.error('Erro ao buscar oferta:', error);
      }
    };

    fetchOferta();
  }, [ofertaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOferta((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/ofertas/${ofertaId}/valor`, null, {
        params: { valor: oferta.valor },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Oferta atualizada com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao atualizar oferta:', error);
      alert('Erro ao atualizar oferta!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Oferta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">Tipo</label>
          <input
            type="text"
            className="form-control"
            id="tipo"
            name="tipo"
            value={oferta.tipo}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="valor" className="form-label">Valor</label>
          <input
            type="number"
            className="form-control"
            id="valor"
            name="valor"
            value={oferta.valor}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Atualizar Oferta</button>
      </form>
    </div>
  );
};

export default EditarOferta;
