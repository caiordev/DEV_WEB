import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  overflow: hidden;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 40%, rgba(255, 152, 0, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(0, 96, 100, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  
  @media (max-width: 1240px) {
    max-width: 95%;
  }
`;

const TagLine = styled(motion.div)`
  color: #FF9800;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
`;

const Title = styled(motion.h2)`
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #333 0%, #FF9800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  max-width: 800px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  
  @media (max-width: 576px) {
    gap: 2rem;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  height: 520px;
  
  @media (max-width: 992px) {
    height: 480px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: 420px;
  }
  
  @media (max-width: 576px) {
    height: 340px;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    height: 300px;
  }
`;

const ImageWrapper = styled(motion.div)`
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  position: relative;
  height: 100%;
  width: 100%;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.18);
  }

  &:hover img {
    transform: scale(1.08);
  }
`;

const Content = styled.div`
  p {
    font-size: 1rem;
    color: #666;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .highlight {
    color: #FF9800;
    font-weight: 600;
  }
`;

const Button = styled(motion.a)`
  display: inline-block;
  background: linear-gradient(135deg, #006064 0%, #00838f 100%);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 96, 100, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
    transition: width 0.4s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 25px rgba(0, 96, 100, 0.4);
  }

  &:hover:before {
    width: 100%;
  }
`;

const StatsContainer = styled.div`
  background: linear-gradient(135deg, #FFF8E1 0%, #FFE082 100%);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  margin-top: 0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 576px) {
    padding: 1.25rem 1.5rem;
    flex-direction: column;
    text-align: center;
  }
`;

const StatsContent = styled.div`
  flex: 1;
`;

const StatsIcon = styled.div`
  background: linear-gradient(135deg, #FFCA28 0%, #FFB74D 100%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  color: white;
  font-size: 1.8rem;
  flex-shrink: 0;
  transition: all 0.4s ease;

  ${StatsContainer}:hover & {
    transform: scale(1.1) rotate(8deg);
    box-shadow: 0 8px 20px rgba(255, 202, 40, 0.4);
  }

  @media (max-width: 576px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const StatsNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #FF9800 0%, #E65100 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  letter-spacing: -0.02em;
`;

const StatsLabel = styled.div`
  font-size: 1rem;
  color: #666;
  margin-top: 0.5rem;
`;

const Icon = styled.span`
  display: inline-block;
  margin-right: 1rem;
  vertical-align: middle;
  color: #FF9800;
  font-size: 1.2rem;
`;

const StatsGrid = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const About = () => {
  return (
    <AboutSection id="about-section">
      <Container>
        <ContentGrid>
          <ImageGrid>
            <ImageWrapper
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <img src="/public/02.png" alt="Pôr do sol nos Lençóis Maranhenses" />
            </ImageWrapper>
          </ImageGrid>
          
          <Content>
            <TagLine
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              CONHEÇA NOSSA HISTÓRIA
            </TagLine>
            
            <Title
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              Sua Aventura nos Lençóis Maranhenses Começa Aqui
            </Title>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Icon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
              </Icon>
              Somos uma agência de turismo especializada em proporcionar experiências inesquecíveis nos Lençóis Maranhenses. Com mais de uma década de experiência, nossa equipe conhece cada canto deste paraíso natural e está pronta para guiar você nas melhores aventuras.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Icon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 4.5 3.75c1.5 0 2.5-.5 3.5-1.5s1.5-2.5 1.5-4.5c0-2.5-1.5-4.5-4.5-4.5S4 9 4 11.5 5.5 16 8 16c1.5 0 2.5-.5 3.5-1.5s1.5-2.5 1.5-4.5c0-2.5-1.5-4.5-4.5-4.5z" fill="currentColor"/>
                </svg>
              </Icon>
              Nossos passeios são cuidadosamente planejados para oferecer o equilíbrio perfeito entre aventura, conforto e sustentabilidade, sempre respeitando o meio ambiente e as comunidades locais. Cada jornada é uma oportunidade de mergulhar nas dunas de areia dourada e se maravilhar com a serenidade de Atins.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Icon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21c-1.39 0-2.78-.47-4-1.32-.85.43-1.75.68-2.66.68s-1.81-.25-2.66-.68C6.78 20.53 5.39 21 4 21s-2.78-.47-4-1.32V19c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v.68c-1.22.85-2.61 1.32-4 1.32zM20 2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor"/>
                </svg>
              </Icon>
              Para aqueles que buscam uma experiência exclusiva, disponibilizamos emocionantes passeios de lancha privativa. Descubra a magia dos Lençóis Maranhenses conosco e crie memórias que durarão para sempre.
            </motion.p>
            
            <Button
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Entre em Contato
            </Button>
            
            <StatsGrid>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <StatsContainer>
                <StatsIcon>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                  </svg>
                </StatsIcon>
                <StatsContent>
                  <StatsNumber>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      10+
                    </motion.span>
                  </StatsNumber>
                  <StatsLabel>Anos de Experiência</StatsLabel>
                </StatsContent>
              </StatsContainer>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <StatsContainer>
                <StatsIcon>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                  </svg>
                </StatsIcon>
                <StatsContent>
                  <StatsNumber>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      50+
                    </motion.span>
                  </StatsNumber>
                  <StatsLabel>Destinos Explorados</StatsLabel>
                </StatsContent>
              </StatsContainer>
            </motion.div>
            </StatsGrid>
          </Content>
        </ContentGrid>
      </Container>
    </AboutSection>
  );
};

export default About;
