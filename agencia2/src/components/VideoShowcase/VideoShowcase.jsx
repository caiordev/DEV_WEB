import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const VideoSection = styled.section`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 100vh;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/lagoa-azul/lagoa-azul-por-do-sol.jpeg');
  background-size: cover;
  background-position: center;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 128, 128, 0.7), rgba(0, 64, 64, 0.9));
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    &::before {
      background: linear-gradient(rgba(0, 128, 128, 0.7), rgba(0, 64, 64, 0.95));
    }
  }
`;

const ContentContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 3;
  
  @media (max-width: 992px) {
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    padding: 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    justify-content: center;
  }
`;

const TextContent = styled.div`
  flex: 1;
  color: white;
  padding-right: 2rem;
  
  @media (max-width: 992px) {
    padding-right: 0;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 0;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #FF9800;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
  
  @media (max-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 2.5rem;
    max-width: 90%;
  }
`;

const VideoButton = styled(motion.button)`
  background-color: #FF9800;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: #F57C00;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    display: none; /* Hide this button on mobile as we'll use the big play button instead */
  }
`;

const VideoPreview = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const PlayButtonWrapper = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 152, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  svg {
    color: white;
    font-size: 1.8rem;
    margin-left: 5px; /* Slight offset for the play icon */
  }
  
  &:hover {
    transform: scale(1.1);
    background-color: #FF9800;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.5);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    70% {
      transform: scale(1.3);
      opacity: 0;
    }
    100% {
      transform: scale(1.3);
      opacity: 0;
    }
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    
    svg {
      font-size: 2.2rem;
    }
    
    &::before {
      width: 130px;
      height: 130px;
      border: 3px solid rgba(255, 255, 255, 0.5);
    }
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16/9;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const MobilePlayText = styled.p`
  font-size: 0.9rem;
  color: white;
  margin-top: 1rem;
  font-weight: 500;
  text-align: center;
  max-width: 200px;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const VideoShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <VideoSection id="video-showcase">
      <BackgroundImage />
      <ContentContainer>
        <TextContent>
          <Subtitle>Assista à Nossa Jornada em Vídeo</Subtitle>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Uma Imersão Audiovisual nos Encantos Naturais dos Lençóis Maranhenses
          </Title>
          <Description>
            Mergulhe nas maravilhas dos Lençóis Maranhenses através de nossa incrível coleção de vídeos. Deixe-se envolver pela serenidade das lagoas, pelas dunas douradas e pela energia única dessa região espetacular. Nossa coleção de vídeos é uma prévia envolvente do que aguarda você em uma experiência real com a Rota Turismo.
          </Description>
          <VideoButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
          >
            <FontAwesomeIcon icon={faPlay} /> Aperte o Play e Desperte Sua Aventura!
          </VideoButton>
        </TextContent>
        <VideoPreview>
          <PlayButtonWrapper
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openModal}
          >
            <FontAwesomeIcon icon={faPlay} />
          </PlayButtonWrapper>
          <MobilePlayText>
            Aperte o Play e Desperte Sua Aventura! Assista ao Vídeo
          </MobilePlayText>
        </VideoPreview>
      </ContentContainer>
      
      {isModalOpen && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          <VideoContainer>
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Lençóis Maranhenses Video Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoContainer>
        </Modal>
      )}
    </VideoSection>
  );
};

export default VideoShowcase;
