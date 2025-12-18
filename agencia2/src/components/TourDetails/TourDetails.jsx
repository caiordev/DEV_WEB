import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  margin: 0 auto;
  padding: 0;
  background-color: #ffffff;
  min-height: 100vh;
  max-width: 100%;
  overflow-x: hidden;
  animation: fadeIn 0.8s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Header = styled.header`
  position: relative;
  height: 60vh;
  overflow: hidden;
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  animation: slideDown 0.8s ease-out;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .header-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    z-index: 10;
    background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
    animation: fadeIn 1s ease-out 0.3s both;
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    img {
      width: 120px;
      height: auto;
      object-fit: contain;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    }

    h1 {
      font-size: 2.5rem;
      margin: 0;
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .back-button {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      backdrop-filter: blur(5px);
      transition: all 0.3s ease;
      font-weight: 500;
      
      &:hover {
        background: rgba(255,255,255,0.3);
        transform: translateY(-2px);
      }
      
      &:active {
        transform: translateY(0);
      }
      
      &::before {
        content: '←';
        font-size: 1.2rem;
      }
    }
  }

  @media (max-width: 768px) {
    height: 40vh;
    border-radius: 15px;

    .header-top {
      padding: 1rem;

      .logo-container {
        gap: 0.5rem;
      }

      img {
        width: 80px;
      }

      h1 {
        font-size: 1.5rem;
      }

      .back-button {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
      }
    }
  }
`;

const ImageGallery = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 80vh;
  max-height: 700px;
  animation: fadeIn 0.8s ease-out 0.5s both;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .gallery-container {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  img {
    width: 100%;
    flex-shrink: 0;
    object-fit: cover;
    height: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const GalleryArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: translateY(-50%) scale(1.1);
  }

  &::before {
    content: ${props => props.direction === 'left' ? '"❮"' : '"❯"'};
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  }
`;

const GalleryDots = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
`;

const Dot = styled.button`
  width: ${props => props.active ? '30px' : '10px'};
  height: 10px;
  border-radius: 10px;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: white;
    transform: ${props => props.active ? 'scale(1)' : 'scale(1.2)'};
  }
`;

const TimelineTime = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border: 4px solid #3498db;
    border-radius: 50%;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  span {
    background: linear-gradient(135deg, #3498db, #1abc9c);
    color: white;
    padding: 8px 16px;
    border-radius: 30px;
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 3px 10px rgba(52, 152, 219, 0.2);
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-right: 0;
    margin-bottom: 1rem;
    
    &::after {
      left: -40px;
      right: auto;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(0.2s * var(--item-index, 1));
  
  @keyframes fadeInUp {
    to { opacity: 1; transform: translateY(0); }
  }
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    .timeline-content {
      text-align: right;
      margin-right: 2rem;
      margin-left: 0;
      
      &::before {
        right: -12px;
        left: auto;
        border-width: 10px 0 10px 12px;
        border-color: transparent transparent transparent white;
      }
    }
    
    .timeline-time {
      justify-content: flex-start;
      margin-left: 2rem;
      margin-right: 0;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 50px;
    
    &:nth-child(odd) {
      .timeline-content {
        text-align: left;
        margin-right: 0;
        margin-left: 0;
        
        &::before {
          left: -12px;
          right: auto;
          border-width: 10px 12px 10px 0;
          border-color: transparent white transparent transparent;
        }
      }
      
      .timeline-time {
        justify-content: flex-start;
        margin-left: 0;
        margin-right: 0;
      }
    }
  }
`;

const TourInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
  padding: 0 2rem;
  animation: slideUp 0.8s ease-out 0.3s both;
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const InfoCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  margin: 4rem auto;
  max-width: 1200px;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
    gap: 1.5rem;
  }
`;

const InfoCard = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }

  &:nth-child(1) {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 6px;
      height: 60px;
      background: linear-gradient(to bottom, #3498db, #1abc9c);
      border-radius: 0 0 10px 0;
    }
  }
  
  &:nth-child(2) {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 6px;
      height: 60px;
      background: linear-gradient(to bottom, #e74c3c, #f39c12);
      border-radius: 0 0 10px 0;
    }
  }

  h3 {
    color: #222;
    margin-top: 0;
    margin-bottom: 1.8rem;
    font-size: 1.6rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    position: relative;
    padding-bottom: 10px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(to right, #3498db, #1abc9c);
      border-radius: 2px;
    }

    span {
      margin-left: 0.5rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.8rem 0;
      display: flex;
      align-items: center;
      font-size: 1.05rem;
      color: #444;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      transition: all 0.2s ease;
      
      &:last-child {
        border-bottom: none;
      }
      
      &:hover {
        transform: translateX(5px);
        color: #222;
      }

      &:before {
        content: '\u2713';
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background: linear-gradient(135deg, #3498db, #1abc9c);
        color: white;
        border-radius: 50%;
        margin-right: 1rem;
        font-size: 0.9rem;
        flex-shrink: 0;
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    
    h3 {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
    }
    
    ul li {
      font-size: 1rem;
      padding: 0.6rem 0;
      
      &:before {
        width: 20px;
        height: 20px;
        margin-right: 0.8rem;
      }
    }
  }
`;

const TimelineContent = styled.div`
  flex: 1;
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  position: relative;
  margin-left: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    border-style: solid;
    border-width: 10px 12px 10px 0;
    border-color: transparent white transparent transparent;
  }
  
  p {
    margin: 0;
    color: #444;
    font-size: 1.05rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    
    &::before {
      left: -12px;
      top: 15px;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const Description = styled.div`
  h2 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    line-height: 1.8;
    margin: 0;
    font-size: 1.05rem;
    text-align: justify;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    
    h2 {
      font-size: 1.6rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const Details = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 60px;
    background: linear-gradient(to bottom, #e74c3c, #f39c12);
    border-radius: 0 0 10px 0;
  }

  h3 {
    color: #222;
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
    font-weight: 700;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      color: #666;

      svg {
        margin-right: 1rem;
        color: #007bff;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    
    h3 {
      font-size: 1.4rem;
    }
  }
`;

const Timeline = styled.div`
  margin: 4rem auto;
  max-width: 900px;
  padding: 0 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 80px;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #3498db, #1abc9c);
    transform: translateX(-50%);
    border-radius: 2px;
    z-index: 0;
  }

  h2 {
    color: #222;
    margin-bottom: 3rem;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    position: relative;
    display: inline-block;
    padding-bottom: 10px;
    margin-left: 50%;
    transform: translateX(-50%);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60%;
      height: 4px;
      background: linear-gradient(to right, #3498db, #1abc9c);
      border-radius: 2px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    
    &::before {
      left: 30px;
    }
    
    h2 {
      font-size: 1.6rem;
    }
  }
`;

const VideoSection = styled.div`
  margin: 4rem auto;
  max-width: 1000px;
  padding: 0 2rem;

  h2 {
    color: #222;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    position: relative;
    display: inline-block;
    padding-bottom: 10px;
    margin-left: 50%;
    transform: translateX(-50%);
  iframe {
    border-radius: 15px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 4rem 0;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    margin: 3rem 0;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(37, 211, 102, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #128c7e, #25d366);
    transition: opacity 0.3s ease;
    opacity: 0;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(37, 211, 102, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
  
  i {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    
    i {
      font-size: 1.2rem;
    }
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  animation: bounce 1.5s infinite;
  pointer-events: none;

  @keyframes bounce {
    0%, 100% {
      transform: translateY(-50%) translateX(0);
    }
    50% {
      transform: translateY(-50%) translateX(5px);
    }
  }

  &::after {
    content: '→';
    font-size: 20px;
    color: #333;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    right: 15px;
    
    &::after {
      font-size: 16px;
    }
  }
`;

const tourData = {
  'lagoa-azul': {
    name: 'Lagoa Azul',
    rating: 5.0,
    mainImage: '/lencois-maranhenses.jpg',
    description: 'Saíremos em um veículo 4x4 em direção ao Parque Nacional. Nossa aventura começa percorrendo estradas de areia, com duração de aproximadamente 45 minutos, até chegarmos ao circuito da Lagoa Azul. A partir daí, caminharemos pelas dunas, passando por várias outras lagoas (durante a época de cheia). Visitaremos a Lagoa Azul, a Lagoa da Esmeralda e a Lagoa dos Toyoteiros. Poderemos tomar um maravilhoso banho nas lagoas e apreciar a beleza dos Lençóis Maranhenses. Por volta das 12:00 horas, retornaremos ao veículo para voltar a Barreirinhas, chegando na cidade entre 13:00 horas.',
    details: {
      duration: '4 horas',
      difficulty: 'Moderada',
      included: ['Transfer 4x4', 'Guia local'],
      recommendations: ['Protetor solar', 'Roupas de banho', 'Toalha', 'Câmera', 'Água', 'Repelente']
    },
    gallery: [
      '/Lencois-1.jpg',
      '/lencois-maranhenses.jpg',
      '/lencois-maranhenses-hurb-2839.jpeg',
      '/parque-nacional-dos-lencois.jpg'
    ],
    itinerary: [
      {
        time: '09:00',
        activity: 'Saída do hotel em veículo 4x4'
      },
      {
        time: '10:00',
        activity: 'Chegada na Lagoa Azul'
      },
      {
        time: '12:00',
        activity: 'Tempo livre para banho e fotos'
      },
      {
        time: '12:00',
        activity: 'Início do retorno'
      },
      {
        time: '13:00',
        activity: 'Chegada ao hotel'
      }
    ]
  },
  'lagoa-bonita': {
    name: 'Lagoa Bonita',
    rating: 5.0,
    mainImage: '/circuito-lagoa-bonita.webp',
    description: 'Seguiremos em direção ao Parque Nacional em um veículo 4x4. Vamos para o Circuito da Lagoa Bonita, onde teremos a sensação de estar em meio a um grande deserto, um deserto muito especial e cheio de lagoas (durante a época de cheia). Após deliciosos banhos e um agradável entardecer, retornaremos para Barreirinhas.',
    details: {
      duration: '3 horas',
      difficulty: 'Fácil',
      included: ['Transporte de barco', 'Guia local'],
      recommendations: ['Protetor solar', 'Chapéu/boné', 'Câmera']
    },
    gallery: [
      '/lagoa-bonita/lagoabonita2.png',
      '/lagoa-bonita/lagoabonita4.webp',
      '/lagoa-bonita/lagoabonita1.webp'
    ],
    itinerary: [
      {
        time: '09:00 ou 14:00',
        activity: 'Saída do hotel em veículo 4x4'
      },
      {
        time: '10:30 ou 15:30',
        activity: 'Início da caminhada pelas dunas'
      },
      {
        time: '12:00 ou 17:00',
        activity: 'Tempo livre para banho e fotos'
      },
      {
        time: '12:00 ou 18:00',
        activity: 'Início do retorno'
      },
      {
        time: '13:30 ou 19:30',
        activity: 'Chegada ao hotel'
      }
    ]
  },

  'lagoa-azul-bonito': {
    name: 'Lagoa Azul + Lagoa Bonita',
    rating: 5.0,
    mainImage: '/lagoa-azul-bonita.jpeg',
    description: 'Após o café da manhã, iniciaremos nossa jornada em um veículo 4x4 rumo ao Parque Nacional dos Lençóis Maranhenses. A aventura começa atravessando estradas de areia até o circuito da Lagoa Azul. Lá, iniciaremos uma caminhada pelas imponentes dunas, contemplando diversas lagoas ao longo do caminho (presentes durante a época da cheia). Seguiremos em direção à Lagoa Bonita, com uma parada estratégica em um restaurante local para saborear um almoço típico e recarregar as energias. Após um breve descanso, continuaremos até a Lagoa Bonita, um cenário único que transmite a sensação de estar em um vasto deserto repleto de lagoas cristalinas. Aproveitaremos deliciosos banhos e um inesquecível pôr do sol antes de retornar para Barreirinhas, fechando o dia com memórias encantadoras desse paraíso natural.',
    details: {
      duration: '4 horas',
      difficulty: 'Moderada',
      included: ['Transfer 4x4', 'Guia local'],
      recommendations: ['Protetor solar', 'Roupas de banho', 'Toalha', 'Câmera']
    },
    gallery: [
      '/Lencois-1.jpg',
      '/lencois-maranhenses.jpg',
      '/lencois-maranhenses-hurb-2839.jpeg',
      '/parque-nacional-dos-lencois.jpg'
    ],
    itinerary: [
      {
        time: '09:00',
        activity: 'Saída do hotel em veículo 4x4'
      },
      {
        time: '10:00',
        activity: 'Início da caminhada pelas dunas'
      },
      {
        time: '12:00',
        activity: 'Tempo livre para banho e fotozs'
      },
      {
        time: '12:00',
        activity: 'Saída para o almoço'
      },
      {
        time: '14:30',
        activity: 'Retorno às lagoas'
      }
      ,
      {
        time: '18:00',
        activity: 'Início de retorno'
      },
      {
        time: '19:30',
        activity: 'Retorno ao hotel'
      }
    ]
  },
  'atins': {
    name: 'Atins - Parque Nacional - Canto do Atins',
    rating: 5.0,
    mainImage: '/lencois-maranhenses.jpg',
    description: 'Após o café da manhã, sairemos em um veículo 4x4 até o Parque Nacional dos Lençóis Maranhenses, desta vez mais próximos ao mar. Passamos inicialmente pela Praia de Atins e, de lá, seguimos ao início das dunas do parque. Paramos o veículo, e sobre uma das inúmeras dunas teremos uma linda vista do parque, que se estende até o Canto do Atins e o mar. Seguimos então à Praia dos Lençóis, onde as dunas se aproximam do mar. Aqui, podemos tomar um banho de mar. Na época das chuvas, veremos uma pequena cachoeira que se forma junto ao mar. Seguimos então para as lagoas do Gavião, do Kite e outras lagoas mais, que nos permitem escolher em qual delas queremos desfrutar de deliciosos banhos. Agora já é hora de recompor as energias com um delicioso almoço no Canto do Atins. Luzia ou Antônio, em qual das duas barracas iremos comer aquele camarão fresco ou o peixe pescado há pouco? Difícil escolha... À tarde, lembrando que estamos no Nordeste, onde o dia é sempre quente, seguimos à Lagoa Tropical e à Lagoa da Esmeralda para mais alguns mergulhos deliciosos. No final do dia, voltamos ao nosso hotel. Horário: das 08:30 às 17:00, chegando na cidade.',
    details: {
      duration: '4 horas',
      difficulty: 'Moderada',
      included: ['Transfer 4x4', 'Guia local'],
      recommendations: ['Protetor solar', 'Roupas de banho', 'Toalha', 'Câmera']
    },
    gallery: [
      '/Lencois-1.jpg',
      '/lencois-maranhenses.jpg',
      '/lencois-maranhenses-hurb-2839.jpeg',
      '/parque-nacional-dos-lencois.jpg'
    ],
    itinerary: [
      {
        time: '08:30',
        activity: 'Saída do hotel em veículo 4x4'
      },
      {
        time: '10:00',
        activity: 'Início da chegada ao atrativos'
      },
      {
        time: '12:00',
        activity: 'Parada para o almoço'
      },
      {
        time: '15:30',
        activity: 'Tempo livre para banho e fotos'
      },
      {
        time: '15:30',
        activity: 'Início do retorno'
      },
      {
        time: '17:30',
        activity: 'Chegada ao hotel'
      }
    ]
  },
  'vassouras-mandacaru-caburé': {
    name: 'Vassouras, Mandacaru e Caburé',
    rating: 5.0,
    mainImage: '/mandacaru.webp',
    description: 'Após o café da manhã, sairemos em voadeira Rio Preguiças abaixo em direção ao povoado do Atins. No caminho, paramos em Vassouras, Pequenos Lençóis, Área de Proteção Ambiental. Caminhamos pelas dunas, tomamos banho nas lagoas (na época da cheia) e podemos ainda saborear uma água de coco em uma barraquinha beira rio. Poderemos ainda ver os macacos prego que habitam o mangue do entorno. Continuamos navegando e em alguns minutos estamos no Caburé. É aqui que os pescadores passam o primeiro semestre do ano, quando as condições climáticas favorecem a pesca. Oportunidade de banho de mar. Em seguida cruzaremos o rio até o Mandacaru, um povoado de uma centena de casas que se originou a partir do Farol do Preguiças. Quando a entrada no mesmo está liberada, a sugestão é subir o farol e apreciar a vista do alto, podendo-se ver até o Parque Nacional e o mar.',
    details: {
      duration: '4 horas',
      difficulty: 'Moderada',
      included: ['Transfer 4x4', 'Guia local'],
      recommendations: ['Protetor solar', 'Roupas de banho', 'Toalha', 'Câmera']
    },
    gallery: [
      '/Lencois-1.jpg',
      '/lencois-maranhenses.jpg',
      '/lencois-maranhenses-hurb-2839.jpeg',
      '/parque-nacional-dos-lencois.jpg'
    ],
    itinerary: [
      {
        time: '08:30',
        activity: 'Saída de barco voadeira'
      },
      {
        time: '09:30',
        activity: 'Parada em vassouras'
      },
      {
        time: '11:00',
        activity: 'Chegada ao Mandacaru'
      },
      {
        time: '12:00',
        activity: 'Chegada ao Caburé'
      },
      {
        time: '14:30',
        activity: 'Início do retorno'
      },
      {
        time: '15:30',
        activity: 'Chegada ao hotel'
      }
    ]
  },
  'pequenos-lencois': {
    name: 'Pequenos Lençóis',
    rating: 5.0,
    mainImage: '/pequenos-lencois.jpg',
    description: 'passeio de Quadriciclo, saída as 09:00hs. Destino para os pequenos lençóis, Parque eólico, lá você vai pilotar o quadriciclo, cruzando as dunas dos pequenos lençóis. Parada nas lagoas de água doce aonde se pode mergulhar a vontade na lagoa do Alazão, Caités, próxima parada praia do caburé parada para o almoço e banho na praia, estamos de volta as 16hs.',
    details: {
      duration: '4 horas',
      difficulty: 'Moderada',
      included: ['Transfer 4x4', 'Guia local'],
      recommendations: ['Protetor solar', 'Roupas de banho', 'Toalha', 'Câmera']
    },
    gallery: [
      '/pequenos-lencois/foto3.jpeg',
      '/pequenos-lencois/foto4.jpeg',
      '/pequenos-lencois/foto5.jpeg',
    ],
    itinerary: [
      {
        time: '08:30',
        activity: 'Recepção e instruções sobre o quadriciclo'
      },
      {
        time: '10:30',
        activity: 'Chegada ao Alazão'
      },
      {
        time: '12:00',
        activity: 'Chegada ao caburé'
      },
      {
        time: '14:30',
        activity: 'Início do retorno'
      },
      {
        time: '17:00',
        activity: 'Chegada ao hotel'
      }
    ]
  },
  'cardosa': {
    name: 'Cardosa',
    rating: 5.0,
    mainImage: '/cardosa.webp',
    description: 'Partiremos de Barreirinhas em um veículo 4x4 em direção ao povoado de Cardosa, o primeiro trecho é via asfalto por 10km e depois por uma estrada carroçal(piçarra) em uma viagem de aproximadamente 1 hora. Ao chegar, encontraremos o Rio Formiga, um rio de águas cristalinas com correntes calmas e temperatura muito agradável. Lá, faremos uma descida em boias infláveis durante 1 hora para uma conteplação da natureza, acompanhados de guias locais.',
    details: {
      duration: '4 horas',
      difficulty: 'Moderada',
      included: ['Transfer 4x4', 'Guia local'],
      recommendations: ['Protetor solar', 'Roupas de banho', 'Toalha', 'Câmera']
    },
    gallery: [
      '/Lencois-1.jpg',
      '/lencois-maranhenses.jpg',
      '/lencois-maranhenses-hurb-2839.jpeg',
      '/parque-nacional-dos-lencois.jpg'
    ],
    itinerary: [
      {
        time: '08:30',
        activity: 'Saída do hotel em veículo 4x4'
      },
      {
        time: '10:00',
        activity: 'Chegada à Cardosa'
      },
      {
        time: '11:30',
        activity: 'Início do retorno'
      },
      {
        time: '13:00',
        activity: 'Chegada ao hotel'
      }
    ]
  },
  'passeio-caiaque': {
    name: 'Aventura de Caiaque',
    rating: 5.0,
    mainImage: '/caiaque6.jpeg',
    description: 'Passeio de caiaque pelo Rio Preguiças, com duração de aproximadamente 4 horas. Durante o passeio, exploraremos a natureza de perto, passando por manguezais e apreciando a fauna e flora locais.',
    details: {
      duration: '4 horas',
      difficulty: 'Moderada',
      included: ['Transfer 4x4', 'Guia local'],
      recommendations: ['Protetor solar', 'Roupas de banho', 'Toalha', 'Câmera', 'Água']
    },
    gallery: [
      '/caiaque/caiaque1.jpeg',
      '/caiaque/caiaque2.jpeg',
      '/caiaque/caiaque3.jpeg',
      '/caiaque/caiaque4.jpeg'
    ],
    videoUrl: 'https://youtube.com/shorts/XKfCEsUyISQ?feature=share',
    itinerary: [
      {
        time: '08:30',
        activity: 'Saída do hotel em veículo 4x4'
      },
      {
        time: '09:30',
        activity: 'Chegada ao ponto de partida no Sobradinho'
      },
      {
        time: '09:30',
        activity: 'Início da descida de caiaque'
      },
      {
        time: '11:00',
        activity: 'Parada para o lanche e descanço'
      },
      {
        time: '12:00',
        activity: 'Chegada ao Balneário do Recanto'
      },
      {
        time: '12:30',
        activity: 'Início do retorno'
      },
      {
        time: '13:00',
        activity: 'Chegada ao hotel'
      }
    ]
  },
  
};

const TourDetails = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showIndicator, setShowIndicator] = useState(true);
  const { id } = useParams();
  const tour = tourData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hide indicator after first scroll
  const handleScroll = (e) => {
    if (e.target.scrollLeft > 0) {
      setShowIndicator(false);
    }
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % tour.gallery.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length);
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
      // Swiped left, go to next image
      nextImage();
    } else {
      // Swiped right, go to previous image
      prevImage();
    }

    // Reset touch positions
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleReservar = (tourName) => {
    const phoneNumber = "5598991333370";
    const message = `Olá! Gostaria de mais informações sobre o passeio: ${tourName}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!tour) return <div>Tour não encontrado</div>;

  return (
    <DetailsContainer>
      <Header>
        <ImageGallery>
          <div 
            className="gallery-container" 
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {tour.gallery.map((image, index) => (
              <img key={index} src={image} alt={`${tour.name} - Imagem ${index + 1}`} />
            ))}
          </div>
          <GalleryArrow direction="left" onClick={prevImage} />
          <GalleryArrow direction="right" onClick={nextImage} />
          <GalleryDots>
            {[...Array(tour.gallery.length)].map((_, index) => (
              <Dot 
                key={index} 
                active={currentImage === index} 
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </GalleryDots>
          {showIndicator && tour.gallery.length > 0 && <ScrollIndicator />}
        </ImageGallery>
        <div className="header-top">
          <div className="logo-container">
            <img src="/logo-removebg-preview.png" alt="Logo" />
            <h1>{tour.name}</h1>
          </div>
          <button className="back-button" onClick={() => window.history.back()}>Voltar</button>
        </div>
      </Header>

      <InfoSection>
        <Description>
          <h2>Sobre o Passeio</h2>
          <p>{tour.description}</p>
        </Description>
        
        <TourInfo>
          <h3>Informações</h3>
          <div className="info-item">
            <div className="icon">⏱️</div>
            <div className="info">
              <p className="label">Duração</p>
              <p className="value">{tour.details.duration}</p>
            </div>
          </div>
          <div className="info-item">
            <div className="icon">🚌</div>
            <div className="info">
              <p className="label">Transporte</p>
              <p className="value">{tour.details.transport}</p>
            </div>
          </div>
          <div className="info-item">
            <div className="icon">👥</div>
            <div className="info">
              <p className="label">Grupo</p>
              <p className="value">{tour.details.groupSize}</p>
            </div>
          </div>
          <div className="info-item">
            <div className="icon">📍</div>
            <div className="info">
              <p className="label">Ponto de Encontro</p>
              <p className="value">{tour.details.meetingPoint}</p>
            </div>
          </div>
        </TourInfo>
      </InfoSection>

      {tour.videoUrl && (
        <VideoSection>
          <h2>Vídeo do Passeio</h2>
          <iframe
            width="100%"
            height="400"
            src={tour.videoUrl.replace('shorts/', 'embed/').replace('?feature=share', '')}
            title={`Vídeo do passeio ${tour.name}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoSection>
      )}

      <Timeline>
        <h2>Roteiro do Passeio</h2>
        {tour.itinerary.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineTime>
              <span>{item.time}</span>
            </TimelineTime>
            <TimelineContent>
              <p>{item.activity}</p>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <InfoCards>
        <InfoCard>
          <h3>
            <span>O que está incluso</span>
          </h3>
          <ul>
            {tour.details.included.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </InfoCard>
        <InfoCard>
          <h3>
            <span>O que levar</span>
          </h3>
          <ul>
            {tour.details.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </InfoCard>
      </InfoCards>

      {selectedImage && (
        <Modal onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Tour" onClick={(e) => e.stopPropagation()} />
        </Modal>
      )}

      <ButtonContainer>
        <Button onClick={() => handleReservar(tour.name)}>
          <i className="fab fa-whatsapp"></i>
          Reservar este passeio
        </Button>
      </ButtonContainer>
    </DetailsContainer>
  );
};

export default TourDetails;
