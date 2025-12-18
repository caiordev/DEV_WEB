import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PricingContainer = styled.section`
  padding: 6rem 0;
  background-color: #f9f9f9;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/public/pattern-light.png');
    opacity: 0.05;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #FF9800, #F57C00);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 2rem auto 0;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Tab = styled.button`
  background-color: ${props => props.active ? '#FF9800' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 2px solid ${props => props.active ? '#FF9800' : '#ddd'};
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:first-child {
    border-radius: 8px 0 0 8px;
  }
  
  &:last-child {
    border-radius: 0 8px 8px 0;
  }
  
  &:hover {
    background-color: ${props => props.active ? '#FF9800' : 'rgba(255, 152, 0, 0.1)'};
    border-color: #FF9800;
    color: ${props => props.active ? 'white' : '#FF9800'};
  }
  
  @media (max-width: 576px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  
  ${props => props.popular && `
    &::before {
      content: 'Mais Popular';
      position: absolute;
      top: 20px;
      right: -35px;
      background: #FF9800;
      color: white;
      padding: 0.5rem 3rem;
      font-size: 0.8rem;
      font-weight: 600;
      transform: rotate(45deg);
      z-index: 1;
    }
    
    border: 2px solid #FF9800;
  `}
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  background: ${props => props.popular ? 'linear-gradient(135deg, #FF9800, #F57C00)' : '#f5f5f5'};
  padding: 2rem;
  text-align: center;
  color: ${props => props.popular ? 'white' : '#333'};
`;

const PackageTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const PackageSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  
  span {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.8;
  }
`;

const Discount = styled.div`
  display: inline-block;
  background-color: ${props => props.popular ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 152, 0, 0.1)'};
  color: ${props => props.popular ? 'white' : '#FF9800'};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.5rem;
  
  span {
    text-decoration: line-through;
    margin-right: 0.5rem;
    opacity: 0.8;
  }
`;

const CardBody = styled.div`
  padding: 2rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
`;

const Feature = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: #555;
  font-size: 1rem;
  
  svg {
    color: #4CAF50;
    margin-right: 0.8rem;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }
`;

const BookButton = styled.button`
  background: ${props => props.popular ? 'linear-gradient(135deg, #FF9800, #F57C00)' : 'white'};
  color: ${props => props.popular ? 'white' : '#FF9800'};
  border: 2px solid ${props => props.popular ? 'transparent' : '#FF9800'};
  padding: 1rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.popular ? 'linear-gradient(135deg, #F57C00, #FF9800)' : '#FF9800'};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 152, 0, 0.2);
  }
`;

const PaymentInfo = styled.div`
  margin-top: 4rem;
  background-color: white;
  border-radius: 15px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const PaymentTitle = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentSection = styled.div``;

const PaymentSectionTitle = styled.h4`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.8rem;
    color: #FF9800;
  }
`;

const PaymentOptionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PaymentOption = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 50px;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const PaymentText = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
`;

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
  </svg>
);

const individualTours = [
  {
    id: 1,
    title: 'Lagoa Azul',
    subtitle: 'Tour Básico',
    price: 'R$ 120',
    originalPrice: 'R$ 150',
    popular: false,
    features: [
      'Transporte 4x4',
      'Guia local especializado',
      'Visita à Lagoa Azul',
      'Tempo para banho e fotos',
      'Duração: 4 horas'
    ]
  },
  {
    id: 2,
    title: 'Lagoa Azul + Lagoa Bonita',
    subtitle: 'Tour Completo',
    price: 'R$ 180',
    originalPrice: 'R$ 220',
    popular: true,
    features: [
      'Transporte 4x4',
      'Guia local especializado',
      'Visita às duas principais lagoas',
      'Almoço típico incluído',
      'Tempo para banho e fotos',
      'Duração: 8 horas'
    ]
  },
  {
    id: 3,
    title: 'Atins - Canto do Atins',
    subtitle: 'Tour Exclusivo',
    price: 'R$ 220',
    originalPrice: 'R$ 250',
    popular: false,
    features: [
      'Transporte 4x4',
      'Guia local especializado',
      'Visita à Praia de Atins',
      'Visita ao Canto do Atins',
      'Almoço típico incluído',
      'Duração: 8 horas'
    ]
  }
];

const packageTours = [
  {
    id: 1,
    title: 'Pacote Essencial',
    subtitle: '3 dias de aventura',
    price: 'R$ 450',
    originalPrice: 'R$ 550',
    popular: false,
    features: [
      'Lagoa Azul',
      'Lagoa Bonita',
      'Pequenos Lençóis',
      'Transporte 4x4 em todos os passeios',
      'Guias especializados',
      'Almoço nos dias de passeio'
    ]
  },
  {
    id: 2,
    title: 'Pacote Completo',
    subtitle: '5 dias de aventura',
    price: 'R$ 750',
    originalPrice: 'R$ 900',
    popular: true,
    features: [
      'Lagoa Azul + Lagoa Bonita',
      'Atins - Canto do Atins',
      'Vassouras, Mandacaru e Caburé',
      'Pequenos Lençóis',
      'Aventura de Caiaque',
      'Transporte 4x4 em todos os passeios',
      'Guias especializados',
      'Almoço nos dias de passeio'
    ]
  },
  {
    id: 3,
    title: 'Pacote Premium',
    subtitle: '7 dias de aventura',
    price: 'R$ 990',
    originalPrice: 'R$ 1.200',
    popular: false,
    features: [
      'Todos os passeios do Pacote Completo',
      'Transfer aeroporto-hotel-aeroporto',
      'Hospedagem em pousada categoria superior',
      'Passeio exclusivo para fotografar o pôr do sol',
      'Jantar especial com frutos do mar',
      'Guia exclusivo'
    ]
  }
];

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState('individual');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleBookNow = (packageTitle) => {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <PricingContainer id="pricing">
      <Container>
        <SectionHeader>
          <SectionTitle>Investimento</SectionTitle>
          <SectionDescription>
            Escolha o passeio ou pacote que melhor se adapta às suas necessidades e prepare-se para uma experiência inesquecível nos Lençóis Maranhenses.
          </SectionDescription>
        </SectionHeader>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'individual'} 
            onClick={() => handleTabChange('individual')}
          >
            Passeios Individuais
          </Tab>
          <Tab 
            active={activeTab === 'package'} 
            onClick={() => handleTabChange('package')}
          >
            Pacotes Completos
          </Tab>
        </TabContainer>
        
        <PricingGrid>
          {activeTab === 'individual' ? (
            individualTours.map((tour, index) => (
              <PricingCard 
                key={tour.id}
                popular={tour.popular}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <CardHeader popular={tour.popular}>
                  <PackageTitle>{tour.title}</PackageTitle>
                  <PackageSubtitle>{tour.subtitle}</PackageSubtitle>
                  <Price>
                    {tour.price} <span>/ pessoa</span>
                  </Price>
                  <Discount popular={tour.popular}>
                    <span>{tour.originalPrice}</span> Economize 20%
                  </Discount>
                </CardHeader>
                <CardBody>
                  <FeatureList>
                    {tour.features.map((feature, idx) => (
                      <Feature key={idx}>
                        <CheckIcon />
                        <span>{feature}</span>
                      </Feature>
                    ))}
                  </FeatureList>
                  <BookButton 
                    popular={tour.popular}
                    onClick={() => handleBookNow(tour.title)}
                  >
                    Reservar Agora
                  </BookButton>
                </CardBody>
              </PricingCard>
            ))
          ) : (
            packageTours.map((tour, index) => (
              <PricingCard 
                key={tour.id}
                popular={tour.popular}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <CardHeader popular={tour.popular}>
                  <PackageTitle>{tour.title}</PackageTitle>
                  <PackageSubtitle>{tour.subtitle}</PackageSubtitle>
                  <Price>
                    {tour.price} <span>/ pessoa</span>
                  </Price>
                  <Discount popular={tour.popular}>
                    <span>{tour.originalPrice}</span> Economize 20%
                  </Discount>
                </CardHeader>
                <CardBody>
                  <FeatureList>
                    {tour.features.map((feature, idx) => (
                      <Feature key={idx}>
                        <CheckIcon />
                        <span>{feature}</span>
                      </Feature>
                    ))}
                  </FeatureList>
                  <BookButton 
                    popular={tour.popular}
                    onClick={() => handleBookNow(tour.title)}
                  >
                    Reservar Agora
                  </BookButton>
                </CardBody>
              </PricingCard>
            ))
          )}
        </PricingGrid>
        
        <PaymentInfo>
          <PaymentTitle>Condições de Pagamento</PaymentTitle>
          <PaymentGrid>
            <PaymentSection>
              <PaymentSectionTitle>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="currentColor" />
                </svg>
                Formas de Pagamento
              </PaymentSectionTitle>
              <PaymentOptionsList>
                <PaymentOption>
                  <img src="/public/visa.png" alt="Visa" />
                </PaymentOption>
                <PaymentOption>
                  <img src="/public/mastercard.png" alt="Mastercard" />
                </PaymentOption>
                <PaymentOption>
                  <img src="/public/pix.png" alt="Pix" />
                </PaymentOption>
                <PaymentOption>
                  <img src="/public/boleto.png" alt="Boleto" />
                </PaymentOption>
              </PaymentOptionsList>
              <PaymentText>
                Aceitamos cartões de crédito em até 12x (com juros), PIX com 5% de desconto e transferência bancária com 3% de desconto.
              </PaymentText>
            </PaymentSection>
            
            <PaymentSection>
              <PaymentSectionTitle>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.5 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z" fill="currentColor" />
                </svg>
                Condições Especiais
              </PaymentSectionTitle>
              <PaymentText>
                <strong>Grupos:</strong> Desconto de 10% para grupos a partir de 6 pessoas.<br /><br />
                <strong>Reserva antecipada:</strong> 15% de desconto para reservas com mais de 30 dias de antecedência.<br /><br />
                <strong>Pacotes personalizados:</strong> Entre em contato para montarmos um roteiro exclusivo que atenda às suas necessidades.
              </PaymentText>
            </PaymentSection>
          </PaymentGrid>
        </PaymentInfo>
      </Container>
    </PricingContainer>
  );
};

export default PricingSection;
