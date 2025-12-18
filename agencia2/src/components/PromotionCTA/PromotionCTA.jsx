import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CTASection = styled.section`
  background: linear-gradient(135deg, #FF9800, #F57C00);
  padding: 4rem 2rem;
  margin: 4rem 0;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(255, 152, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    margin: 3rem 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/public/pattern.png');
    opacity: 0.1;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled(motion.h2)`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  max-width: 700px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const CTAButton = styled(motion.button)`
  background-color: white;
  color: #FF9800;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 2rem;
  }
`;

const TimerContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeValue = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    width: 60px;
    height: 60px;
  }
`;

const TimeLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const AvailabilityBadge = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #4CAF50;
    border-radius: 50%;
    margin-right: 8px;
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
    }
  }
`;

const PromotionCTA = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 8,
    minutes: 45,
    seconds: 30
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                // Reset timer when it reaches zero
                days = 3;
                hours = 8;
                minutes = 45;
                seconds = 30;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleCTAClick = () => {
    // Scroll to contact form or booking section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <CTASection>
      <Container>
        <AvailabilityBadge
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span></span> Apenas 5 vagas restantes para Julho
        </AvailabilityBadge>
        
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Oferta Especial de Temporada
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Reserve seu passeio com 15% de desconto e ganhe um tour exclusivo ao pôr do sol. Oferta válida por tempo limitado!
        </Subtitle>
        
        <TimerContainer>
          <TimeUnit>
            <TimeValue>{timeLeft.days}</TimeValue>
            <TimeLabel>Dias</TimeLabel>
          </TimeUnit>
          <TimeUnit>
            <TimeValue>{timeLeft.hours}</TimeValue>
            <TimeLabel>Horas</TimeLabel>
          </TimeUnit>
          <TimeUnit>
            <TimeValue>{timeLeft.minutes}</TimeValue>
            <TimeLabel>Minutos</TimeLabel>
          </TimeUnit>
          <TimeUnit>
            <TimeValue>{timeLeft.seconds}</TimeValue>
            <TimeLabel>Segundos</TimeLabel>
          </TimeUnit>
        </TimerContainer>
        
        <CTAButton
          onClick={handleCTAClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Garantir Minha Vaga
        </CTAButton>
      </Container>
    </CTASection>
  );
};

export default PromotionCTA;
