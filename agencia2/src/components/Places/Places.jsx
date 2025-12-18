import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PlacesSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e8f4fe 100%);
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #2196f3, #64b5f6);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  position: relative;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #1565c0;
  margin-bottom: 1rem;
  position: relative;
  padding: 0 20px;

  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #2196f3, #64b5f6);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 1rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: #546e7a;
  font-size: 1.1rem;
  margin: 2rem auto 3rem;
  max-width: 600px;
  padding: 0 20px;
  line-height: 1.6;
`;

const PlacesContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0;

  &:before, &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 2;
    pointer-events: none;
  }

  &:before {
    left: 0;
    background: linear-gradient(90deg, rgba(248, 249, 250, 1) 0%, rgba(248, 249, 250, 0) 100%);
  }

  &:after {
    right: 0;
    background: linear-gradient(-90deg, rgba(248, 249, 250, 1) 0%, rgba(248, 249, 250, 0) 100%);
  }
`;

const PlacesGrid = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 15px;
    padding: 1rem;
  }
`;

const PlaceCard = styled.div`
  flex: 0 0 300px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(33, 150, 243, 0.1);
  transition: all 0.3s ease;
  position: relative;
  scroll-snap-align: start;
  border: 1px solid rgba(33, 150, 243, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(33, 150, 243, 0.2);
    border-color: rgba(33, 150, 243, 0.2);

    img {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    flex: 0 0 280px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
  }

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const PlaceContent = styled.div`
  padding: 1.5rem;
  background: linear-gradient(to bottom, #fff, #f8f9fa);
  border-top: 2px solid #2196f3;
`;

const PlaceName = styled.h3`
  font-size: 1.3rem;
  color: #1565c0;
  margin-bottom: 0.5rem;
`;

const PlaceDescription = styled.p`
  color: #546e7a;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const PlaceButton = styled.button`
  background: linear-gradient(90deg, #2196f3, #64b5f6);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateX(5px);
    background: linear-gradient(90deg, #1976d2, #2196f3);
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 0;' : 'right: 0;'}
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Places = () => {
  const placesGridRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = (direction) => {
    const container = placesGridRef.current;
    const scrollAmount = 400;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSaibaMais = (placeId) => {
    window.scrollTo(0, 0); // Adiciona o scroll para o topo
    navigate(`/place/${placeId}`);
  };

  const places = [
    {
      id: 'lencois-maranhenses',
      name: 'Lençóis Maranhenses',
      description: 'Explore as majestosas dunas brancas e lagoas cristalinas dos Lençóis Maranhenses.',
      image: '/lencois-maranhenses.jpg'
    },
    {
      id: 'farol-mandacaru',
      name: 'Farol de Mandacaru',
      description: 'Vista panorâmica deslumbrante do encontro do Rio Preguiças com o mar.',
      image: '/barreirinhas-ma-passeio-de-barco-farol-mandacaru-2.webp'
    },
    {
      id: 'rio-preguicas',
      name: 'Rio Preguiças',
      description: 'Navegue por um dos mais belos rios do Maranhão, cercado por natureza exuberante.',
      image: '/BarreirinhasPortal.jpg'
    },
    {
      id: 'pequenos-lencois',
      name: 'Pequenos Lençóis',
      description: 'Uma versão mais íntima dos Lençóis, com dunas e lagoas igualmente deslumbrantes.',
      image: '/pequenos-lencois.jpg'
    },
    {
      id: 'atins',
      name: 'Atins',
      description: 'Vila de pescadores com praias desertas e ponto de partida para aventuras nas dunas.',
      image: '/atins.jpg'
    }
  ];

  return (
    <PlacesSection id="places">
      <Container>
        <SectionTitle>Conheça Nossos Destinos</SectionTitle>
        <SectionSubtitle>
          Descubra as maravilhas naturais do Maranhão, cada lugar com sua própria história e beleza única.
        </SectionSubtitle>
        <PlacesContainer>
          <ScrollButton
            direction="left"
            onClick={() => handleScroll('left')}
          >
            &#8249;
          </ScrollButton>
          <PlacesGrid ref={placesGridRef}>
            {places.map(place => (
              <PlaceCard key={place.id}>
                <ImageContainer>
                  <PlaceImage src={place.image} alt={place.name} />
                </ImageContainer>
                <PlaceContent>
                  <PlaceName>{place.name}</PlaceName>
                  <PlaceDescription>
                    {place.description}
                  </PlaceDescription>
                  <PlaceButton onClick={() => handleSaibaMais(place.id)}>
                    Saiba Mais
                  </PlaceButton>
                </PlaceContent>
              </PlaceCard>
            ))}
          </PlacesGrid>
          <ScrollButton
            direction="right"
            onClick={() => handleScroll('right')}
          >
            &#8250;
          </ScrollButton>
        </PlacesContainer>
      </Container>
    </PlacesSection>
  );
};

export default Places;
