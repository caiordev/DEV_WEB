import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ComparisonSection = styled.section`
  padding: 6rem 0;
  background-color: #ffffff;
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
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
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

const ComparisonTable = styled.div`
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  background-color: white;
  
  @media (max-width: 768px) {
    overflow-x: auto;
    border-radius: 10px;
  }
`;

const TableContent = styled.div`
  min-width: 900px;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
`;

const HeaderCell = styled.div`
  padding: 1.5rem;
  text-align: center;
  font-weight: 600;
  color: white;
  background: ${props => props.highlight ? 'linear-gradient(135deg, #FF9800, #F57C00)' : '#333'};
  position: relative;
  
  ${props => props.highlight && `
    &::after {
      content: 'Recomendado';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #FF9800;
      color: white;
      font-size: 0.8rem;
      padding: 0.3rem 1rem;
      border-radius: 20px;
    }
  `}
  
  h3 {
    font-size: 1.3rem;
    margin: 0 0 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    opacity: 0.8;
    margin: 0;
  }
`;

const FeatureRow = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  border-bottom: 1px solid #eee;
  
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const FeatureCell = styled.div`
  padding: 1.2rem 1.5rem;
  display: flex;
  align-items: center;
  
  &:first-child {
    font-weight: 500;
    color: #333;
  }
  
  &:not(:first-child) {
    justify-content: center;
    color: ${props => props.highlight ? '#FF9800' : '#666'};
    font-weight: ${props => props.highlight ? '600' : '400'};
  }
`;

const PriceRow = styled(FeatureRow)`
  background-color: #f5f5f5 !important;
  border-bottom: none;
`;

const PriceCell = styled(FeatureCell)`
  &:not(:first-child) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.highlight ? '#FF9800' : '#333'};
`;

const OriginalPrice = styled.div`
  font-size: 1rem;
  text-decoration: line-through;
  color: #999;
`;

const ActionRow = styled(FeatureRow)`
  background-color: white !important;
  border-bottom: none;
`;

const ActionCell = styled(FeatureCell)`
  padding: 1.5rem;
  
  &:first-child {
    border-bottom-left-radius: 15px;
  }
  
  &:last-child {
    border-bottom-right-radius: 15px;
  }
`;

const ActionButton = styled.button`
  background: ${props => props.highlight ? 'linear-gradient(135deg, #FF9800, #F57C00)' : 'white'};
  color: ${props => props.highlight ? 'white' : '#FF9800'};
  border: 2px solid ${props => props.highlight ? 'transparent' : '#FF9800'};
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.highlight ? 'linear-gradient(135deg, #F57C00, #FF9800)' : '#FF9800'};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 152, 0, 0.2);
  }
`;

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
  </svg>
);

const MobileToggle = styled.div`
  display: none;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const ToggleButton = styled.button`
  background: ${props => props.active ? '#FF9800' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 2px solid ${props => props.active ? '#FF9800' : '#ddd'};
  padding: 0.8rem 1.5rem;
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
`;

const PackageComparison = () => {
  const [mobilePackage, setMobilePackage] = useState('completo');
  
  const handleBookNow = (packageName) => {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <ComparisonSection id="compare">
      <Container>
        <SectionHeader>
          <SectionTitle>Compare os Pacotes</SectionTitle>
          <SectionDescription>
            Veja lado a lado as diferenças entre nossos pacotes e escolha o que melhor atende às suas necessidades para explorar os Lençóis Maranhenses.
          </SectionDescription>
        </SectionHeader>
        
        <MobileToggle>
          <ToggleButton 
            active={mobilePackage === 'essencial'} 
            onClick={() => setMobilePackage('essencial')}
          >
            Essencial
          </ToggleButton>
          <ToggleButton 
            active={mobilePackage === 'completo'} 
            onClick={() => setMobilePackage('completo')}
          >
            Completo
          </ToggleButton>
          <ToggleButton 
            active={mobilePackage === 'premium'} 
            onClick={() => setMobilePackage('premium')}
          >
            Premium
          </ToggleButton>
        </MobileToggle>
        
        <ComparisonTable>
          <TableContent>
            <TableHeader>
              <HeaderCell>Características</HeaderCell>
              <HeaderCell>Pacote Essencial</HeaderCell>
              <HeaderCell highlight>Pacote Completo</HeaderCell>
              <HeaderCell>Pacote Premium</HeaderCell>
            </TableHeader>
            
            <FeatureRow>
              <FeatureCell>Duração</FeatureCell>
              <FeatureCell>3 dias</FeatureCell>
              <FeatureCell highlight>5 dias</FeatureCell>
              <FeatureCell>7 dias</FeatureCell>
            </FeatureRow>
            
            <FeatureRow>
              <FeatureCell>Lagoa Azul</FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
              <FeatureCell highlight><CheckIcon /></FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
            </FeatureRow>
            
            <FeatureRow>
              <FeatureCell>Lagoa Bonita</FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
              <FeatureCell highlight><CheckIcon /></FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
            </FeatureRow>
            
            <FeatureRow>
              <FeatureCell>Pequenos Lençóis</FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
              <FeatureCell highlight><CheckIcon /></FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
            </FeatureRow>
            
            <FeatureRow>
              <FeatureCell>Atins - Canto do Atins</FeatureCell>
              <FeatureCell><XIcon /></FeatureCell>
              <FeatureCell highlight><CheckIcon /></FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
            </FeatureRow>
            
            <FeatureRow>
              <FeatureCell>Vassouras, Mandacaru e Caburé</FeatureCell>
              <FeatureCell><XIcon /></FeatureCell>
              <FeatureCell highlight><CheckIcon /></FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
            </FeatureRow>
            
            <FeatureRow>
              <FeatureCell>Aventura de Caiaque</FeatureCell>
              <FeatureCell><XIcon /></FeatureCell>
              <FeatureCell highlight><CheckIcon /></FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
            </FeatureRow>
            
            <FeatureRow>
              <FeatureCell>Transfer aeroporto-hotel-aeroporto</FeatureCell>
              <FeatureCell><XIcon /></FeatureCell>
              <FeatureCell highlight><XIcon /></FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
            </FeatureRow>
            
            <FeatureRow>
              <FeatureCell>Hospedagem incluída</FeatureCell>
              <FeatureCell><XIcon /></FeatureCell>
              <FeatureCell highlight><XIcon /></FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
            </FeatureRow>
            
            <FeatureRow>
              <FeatureCell>Passeio exclusivo para fotografar o pôr do sol</FeatureCell>
              <FeatureCell><XIcon /></FeatureCell>
              <FeatureCell highlight><XIcon /></FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
            </FeatureRow>
            
            <FeatureRow>
              <FeatureCell>Jantar especial com frutos do mar</FeatureCell>
              <FeatureCell><XIcon /></FeatureCell>
              <FeatureCell highlight><XIcon /></FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
            </FeatureRow>
            
            <FeatureRow>
              <FeatureCell>Guia especializado</FeatureCell>
              <FeatureCell>Compartilhado</FeatureCell>
              <FeatureCell highlight>Compartilhado</FeatureCell>
              <FeatureCell>Exclusivo</FeatureCell>
            </FeatureRow>
            
            <FeatureRow>
              <FeatureCell>Almoço nos dias de passeio</FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
              <FeatureCell highlight><CheckIcon /></FeatureCell>
              <FeatureCell><CheckIcon /></FeatureCell>
            </FeatureRow>
            
            <PriceRow>
              <PriceCell>Investimento por pessoa</PriceCell>
              <PriceCell>
                <Price>R$ 450</Price>
                <OriginalPrice>R$ 550</OriginalPrice>
              </PriceCell>
              <PriceCell highlight>
                <Price highlight>R$ 750</Price>
                <OriginalPrice>R$ 900</OriginalPrice>
              </PriceCell>
              <PriceCell>
                <Price>R$ 990</Price>
                <OriginalPrice>R$ 1.200</OriginalPrice>
              </PriceCell>
            </PriceRow>
            
            <ActionRow>
              <ActionCell></ActionCell>
              <ActionCell>
                <ActionButton onClick={() => handleBookNow('Pacote Essencial')}>
                  Reservar
                </ActionButton>
              </ActionCell>
              <ActionCell>
                <ActionButton highlight onClick={() => handleBookNow('Pacote Completo')}>
                  Reservar Agora
                </ActionButton>
              </ActionCell>
              <ActionCell>
                <ActionButton onClick={() => handleBookNow('Pacote Premium')}>
                  Reservar
                </ActionButton>
              </ActionCell>
            </ActionRow>
          </TableContent>
        </ComparisonTable>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          style={{ marginTop: '3rem', textAlign: 'center' }}
        >
          <SectionDescription>
            Todos os pacotes podem ser personalizados de acordo com suas preferências. 
            Entre em contato conosco para criar uma experiência sob medida para você.
          </SectionDescription>
        </motion.div>
      </Container>
    </ComparisonSection>
  );
};

export default PackageComparison;
