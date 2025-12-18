import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AvailablePlaces.css';

const places = [
  {
    id: 1,
    name: 'Lagoa Azul',
    description: 'A mais famosa lagoa dos Lençóis Maranhenses',
    duration: '4h',
    minPeople: '2 pessoas',
    image: '/Lencois-1.jpg'
  },
  {
    id: 2,
    name: 'Lagoa Bonita',
    description: 'Águas cristalinas em meio às dunas',
    duration: '3h',
    minPeople: '2 pessoas',
    image: '/lencois-maranhenses-hurb-2839.jpeg'
  },
  {
    id: 3,
    name: 'Passeio de Caiaque',
    description: 'Aventura nas águas cristalinas',
    duration: '6h',
    minPeople: '4 pessoas',
    image: '/caiaque6.jpeg'
  },
  {
    id: 4,
    name: 'Parque Nacional',
    description: 'Passeio pelo Parque Nacional dos Lençóis Maranhenses',
    duration: '6h',
    minPeople: '4 pessoas',
    image: '/parque-nacional-dos-lencois.jpg'
  }
];

const AvailablePlaces = () => {
  const navigate = useNavigate();

  const handleSaibaMais = (placeId) => {
    window.scrollTo(0, 0);
    navigate(`/place/${placeId}`);
  };

  return (
    <section className="available-places">
      <h2>Lugares Disponíveis</h2>
      <div className="places-grid">
        {places.map((place) => (
          <div key={place.id} className="place-card">
            <div className="place-image" style={{ backgroundImage: `url(${place.image})` }}>
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </div>
            <div className="place-info">
              <div className="info-item">
                <span className="icon">⏱</span>
                <span>Duração: {place.duration}</span>
              </div>
              <div className="info-item">
                <span className="icon">👥</span>
                <span>Mín: {place.minPeople}</span>
              </div>
            </div>
            <button className="saiba-mais" onClick={() => handleSaibaMais(place.id)}>Saiba Mais</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvailablePlaces;
