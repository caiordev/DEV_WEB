import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeSection = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const SlideContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => props.translate}%);
`;

const SlideItem = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(${props => props.image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%);
  }
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  text-align: left;
  color: white;
  z-index: 1;
  width: 50%;
  max-width: 700px;
  
  @media (max-width: 768px) {
    width: 80%;
    left: 10%;
  }
`;

const Subtitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #FF9800;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 700;
  line-height: 1.2;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }
`;

const Button = styled.button`
  padding: 15px 35px;
  background: #FF9800;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);

  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 1rem;
  }

  &:hover {
    background: #F57C00;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
`;

const NavigationDots = styled.div`
  position: absolute;
  bottom: 30px;
  right: 50px;
  display: flex;
  gap: 10px;
  z-index: 2;
  
  @media (max-width: 768px) {
    right: 50%;
    transform: translateX(50%);
    bottom: 20px;
  }
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#FF9800' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  margin: 0 5px;

  &:hover {
    transform: scale(1.2);
    background: ${props => props.active ? '#FF9800' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  ${props => props.direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
`;

const LoginButtonFixed = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #FF9800;
  border: 2px solid #FF9800;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 0.5px;
  z-index: 1000;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    padding: 8px 16px;
    font-size: 0.8rem;
  }

  &:hover {
    background: #FF9800;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
  }
`;

const slides = [
  {
    id: 'lencois-maranhenses',
    image: '/public/Imagem-do-WhatsApp-de-2023-10-19-as-15.42.33_228f6e29.jpg',
    subtitle: 'Bem-Vindo à Rota Turismo',
    name: 'Descubra a Magia dos Lençóis com a Rota Turismo',
    description: 'Explorando as Belezas Naturais de Lagoa em Lagoa!'
  },
  {
    id: 'mandacaru',
    image: '/public/Imagem-do-WhatsApp-de-2023-10-19-as-15.42.33_228f6e29.jpg',
    subtitle: 'Experiências Únicas',
    name: 'Explorando as Maravilhas Naturais',
    description: 'Bem-vindo aos Lençóis Maranhenses, um paraíso de dunas e lagoas que encanta todos os sentidos.'
  },
  {
    id: 'atins',
    image: '/public/Imagem-do-WhatsApp-de-2023-10-19-as-15.41.50_1446e67f.jpg',
    subtitle: 'Destinos Exclusivos',
    name: 'Atins: O Paraíso Escondido',
    description: 'Explore as praias desertas e a natureza selvagem deste refúgio intocado.'
  },
  {
    id: 'pequenos-lencois',
    image: '/public/Imagem-do-WhatsApp-de-2023-10-19-as-15.41.50_1446e67f.jpg',
    subtitle: 'Aventuras Inesquecíveis',
    name: 'Pequenos Lençóis: Grandes Experiências',
    description: 'Navegue pelas águas tranquilas e conheça a natureza exuberante desta região única.'
  },
  {
    id: 'cardosa',
    image: '/public/Imagem-do-WhatsApp-de-2023-10-19-as-15.41.50_1446e67f.jpg',
    subtitle: 'Cultura Local',
    name: 'Povoado Cardosa: Tradição e Beleza',
    description: 'Conheça a cultura local e as paisagens deslumbrantes deste charmoso povoado.'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideInterval = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    startSlideShow();
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  const startSlideShow = () => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide(current => (current + 1) % slides.length);
    }, 5000);
  };

  const handleExplore = () => {
    navigate(`/region/${slides[currentSlide].id}`);
  };

  const handleLogin = () => {
    window.location.href = 'http://localhost:5174/login';
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      // Swiped left, go to next slide
      setCurrentSlide(current => (current + 1) % slides.length);
    } else {
      // Swiped right, go to previous slide
      setCurrentSlide(current => (current - 1 + slides.length) % slides.length);
    }

    // Reset touch positions
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <HomeSection id="home">
      <LoginButtonFixed onClick={handleLogin}>Login</LoginButtonFixed>
      <SlideContainer 
        translate={-currentSlide * 100}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <SlideItem key={index} image={slide.image}>
            <Content>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Subtitle>{slide.subtitle}</Subtitle>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Title>{slide.name}</Title>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Description>{slide.description}</Description>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <ButtonContainer>
                  <Button onClick={handleExplore}>Reserve sua Aventura Agora</Button>
                </ButtonContainer>
              </motion.div>
            </Content>
          </SlideItem>
        ))}
      </SlideContainer>

      <ArrowButton direction="left" onClick={() => setCurrentSlide(current => (current - 1 + slides.length) % slides.length)}>
        ‹
      </ArrowButton>
      <ArrowButton direction="right" onClick={() => setCurrentSlide(current => (current + 1) % slides.length)}>
        ›
      </ArrowButton>

      <NavigationDots>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={currentSlide === index}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </NavigationDots>
    </HomeSection>
  );
};

export default Home;
