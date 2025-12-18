import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GuaranteesSection = styled.section`
  padding: 5rem 0;
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

const GuaranteesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const GuaranteeCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    border-color: #FF9800;
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF9800, #F57C00);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 20px rgba(255, 152, 0, 0.2);
  
  svg {
    width: 40px;
    height: 40px;
    color: white;
  }
`;

const GuaranteeTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const GuaranteeDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
`;

const PolicySection = styled.div`
  margin-top: 5rem;
  background-color: #f9f9f9;
  border-radius: 15px;
  padding: 3rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const PolicyTitle = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const PolicyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PolicyItem = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PolicyItemTitle = styled.h4`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  svg {
    width: 20px;
    height: 20px;
    color: #FF9800;
    margin-right: 0.5rem;
  }
`;

const PolicyItemDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
`;

const SealContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Seal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 150px;
`;

const SealImage = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SealText = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const Guarantees = () => {
  return (
    <GuaranteesSection id="guarantees">
      <Container>
        <SectionHeader>
          <SectionTitle>Nossas Garantias</SectionTitle>
          <SectionDescription>
            Oferecemos garantias exclusivas para que você possa reservar sua aventura com total tranquilidade e confiança.
          </SectionDescription>
        </SectionHeader>
        
        <GuaranteesGrid>
          <GuaranteeCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <IconContainer>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor" />
              </svg>
            </IconContainer>
            <GuaranteeTitle>Garantia de Segurança</GuaranteeTitle>
            <GuaranteeDescription>
              Todos os nossos passeios seguem rigorosos protocolos de segurança, com guias credenciados e equipamentos de qualidade certificada.
            </GuaranteeDescription>
          </GuaranteeCard>
          
          <GuaranteeCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <IconContainer>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM9.5 16.5L16.5 12L9.5 7.5V16.5Z" fill="currentColor" />
              </svg>
            </IconContainer>
            <GuaranteeTitle>Garantia de Experiência</GuaranteeTitle>
            <GuaranteeDescription>
              Se por algum motivo você não ficar satisfeito com a experiência, oferecemos um novo passeio sem custo adicional.
            </GuaranteeDescription>
          </GuaranteeCard>
          
          <GuaranteeCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <IconContainer>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.5 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z" fill="currentColor" />
              </svg>
            </IconContainer>
            <GuaranteeTitle>Garantia de Melhor Preço</GuaranteeTitle>
            <GuaranteeDescription>
              Se encontrar o mesmo passeio com preço menor em outra agência local, cobrimos a oferta e oferecemos 5% de desconto adicional.
            </GuaranteeDescription>
          </GuaranteeCard>
        </GuaranteesGrid>
        
        <PolicySection>
          <PolicyTitle>Políticas Transparentes</PolicyTitle>
          <PolicyGrid>
            <PolicyItem>
              <PolicyItemTitle>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V5H19V19ZM17 12H7V14H17V12ZM13 16H7V18H13V16ZM7 8H13V10H7V8Z" fill="currentColor" />
                </svg>
                Política de Cancelamento
              </PolicyItemTitle>
              <PolicyItemDescription>
                Cancelamentos com até 7 dias de antecedência: reembolso de 100%. Entre 7 e 3 dias: reembolso de 70%. Menos de 3 dias: reembolso de 50%. Em caso de condições climáticas adversas, oferecemos reagendamento sem custos.
              </PolicyItemDescription>
            </PolicyItem>
            
            <PolicyItem>
              <PolicyItemTitle>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="currentColor" />
                </svg>
                Política de Reagendamento
              </PolicyItemTitle>
              <PolicyItemDescription>
                Reagendamentos podem ser feitos sem custo adicional com até 48 horas de antecedência, sujeito à disponibilidade. Para alterações de última hora, uma taxa administrativa de 10% pode ser aplicada.
              </PolicyItemDescription>
            </PolicyItem>
            
            <PolicyItem>
              <PolicyItemTitle>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor" />
                </svg>
                Seguro Viagem
              </PolicyItemTitle>
              <PolicyItemDescription>
                Todos os passeios incluem seguro-viagem básico. Recomendamos a contratação de seguro adicional para cobertura mais ampla. Consulte-nos sobre as opções disponíveis para garantir sua total tranquilidade.
              </PolicyItemDescription>
            </PolicyItem>
            
            <PolicyItem>
              <PolicyItemTitle>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM9.5 16.5L16.5 12L9.5 7.5V16.5Z" fill="currentColor" />
                </svg>
                Condições Climáticas
              </PolicyItemTitle>
              <PolicyItemDescription>
                Em caso de condições climáticas adversas que impossibilitem a realização do passeio, oferecemos reagendamento sem custos ou reembolso integral, conforme preferência do cliente.
              </PolicyItemDescription>
            </PolicyItem>
          </PolicyGrid>
        </PolicySection>
        
        <SealContainer>
          <Seal>
            <SealImage>
              <img src="/public/seal-safety.png" alt="Selo de Segurança" />
            </SealImage>
            <SealText>Certificado de Segurança em Turismo de Aventura</SealText>
          </Seal>
          
          <Seal>
            <SealImage>
              <img src="/public/seal-sustainable.png" alt="Selo de Turismo Sustentável" />
            </SealImage>
            <SealText>Turismo Sustentável e Responsável</SealText>
          </Seal>
          
          <Seal>
            <SealImage>
              <img src="/public/seal-quality.png" alt="Selo de Qualidade" />
            </SealImage>
            <SealText>Excelência em Atendimento ao Cliente</SealText>
          </Seal>
        </SealContainer>
      </Container>
    </GuaranteesSection>
  );
};

export default Guarantees;
