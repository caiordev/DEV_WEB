import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaEye, FaWhatsapp, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './OurTours.css';

const OurTours = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar viagens do backend
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJhZ2VuY3lJZCI6MSwic3ViIjoiYWRtaW4iLCJpYXQiOjE3NjU5MjI1NjQsImV4cCI6MTc2NjAwODk2NH0.ODGt0LaWqezJE-PIBrqiGdRFDkejl8H1-m_kCkjUZzA';
        
        const response = await fetch('http://localhost:8082/trips', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          // Mapear dados da API para o formato esperado pelo componente
          const mappedTours = data.map(trip => ({
            id: trip.id,
            name: trip.destination,
            description: trip.description || 'Passeio incrível',
            image: trip.imageUrl || '/public/rota03.jpg',
            rating: 5.0,
            price: trip.pricePerPerson,
            location: trip.location
          }));
          setTours(mappedTours);
        } else {
          console.error('Erro ao buscar viagens');
        }
      } catch (error) {
        console.error('Erro ao conectar com o backend:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleVerMais = (tourId) => {
    window.scrollTo(0, 0);
    navigate(`/tour/${tourId}`);
  };

  const handleReservar = (tourName) => {
    const phoneNumber = "5598991333370"; 
    const message = `Olá! Gostaria de mais informações sobre o passeio: ${tourName}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    }
  };

  return (
    <section className="our-tours" id="tours">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Nossos Passeios
      </motion.h2>
      {loading ? (
        <div className="loading-message">Carregando passeios...</div>
      ) : tours.length === 0 ? (
        <div className="no-tours-message">Nenhum passeio disponível no momento.</div>
      ) : (
        <motion.div 
          className="tours-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {tours.map((tour, index) => (
          <motion.div 
            key={tour.id} 
            className="tour-card"
            variants={cardVariants}
            whileHover={{ y: -12, transition: { duration: 0.3 } }}
          >
            <div className="tour-image" style={{ backgroundImage: `url(${tour.image})` }}>
              <motion.div 
                className="price-tag"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
              >
                R$ {tour.price} <span>/pessoa</span>
              </motion.div>
              <motion.div 
                className="tour-badge"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
              >
                <FaClock /> Passeio
              </motion.div>
              <div className="tour-content">
                <h3>{tour.name}</h3>
                <div className="rating">
                  {'★'.repeat(5)} <span>{tour.rating.toFixed(1)}</span>
                </div>
                <div className="tour-location">
                  <FaMapMarkerAlt /> {tour.location || 'Barreirinhas, MA'}
                </div>
                <p>{tour.description}</p>
                {tour.highlights && (
                  <ul className="highlights">
                    {tour.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
                <div className="tour-buttons">
                  <motion.button 
                    className="btn-ver-mais"
                    onClick={() => handleVerMais(tour.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEye /> <span>Ver Detalhes</span>
                  </motion.button>
                  <motion.button 
                    className="btn-reservar"
                    onClick={() => handleReservar(tour.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaWhatsapp /> <span>Reservar</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default OurTours;
