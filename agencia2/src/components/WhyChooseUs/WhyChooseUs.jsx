import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faPencilRuler, faLeaf } from '@fortawesome/free-solid-svg-icons';

const WhyChooseSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255, 152, 0, 0.3), transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255, 152, 0, 0.3), transparent);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;

const Subtitle = styled(motion.p)`
  color: #FF9800;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  max-width: 700px;
  margin: 0 auto;
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 0;
    background: linear-gradient(to bottom, #FF9800, #FFCA28);
    transition: height 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    
    &::before {
      height: 100%;
    }
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFF8E1, #FFECB3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  svg {
    color: #FF9800;
    font-size: 2rem;
    transition: all 0.3s ease;
  }
  
  ${Card}:hover & {
    background: linear-gradient(135deg, #FF9800, #FFCA28);
    transform: scale(1.1) rotate(5deg);
    
    svg {
      color: white;
    }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
  
  ${Card}:hover & {
    color: #FF9800;
  }
`;

const CardText = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CardButton = styled(motion.a)`
  color: #FF9800;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  margin-top: auto;
  position: relative;
  padding-bottom: 5px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #FF9800;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const WhyChooseUs = () => {
  const features = [
    {
      icon: faMapMarkedAlt,
      title: 'Experiência Local',
      description: 'Nossa equipe local oferece insights exclusivos e acesso a lugares secretos, enriquecendo sua jornada com autenticidade.',
      buttonText: 'Saiba Mais'
    },
    {
      icon: faPencilRuler,
      title: 'Roteiros Personalizados',
      description: 'Criamos roteiros sob medida, adaptados aos seus interesses, garantindo uma experiência verdadeiramente memorável.',
      buttonText: 'Saiba Mais'
    },
    {
      icon: faLeaf,
      title: 'Sustentabilidade',
      description: 'Minimizando nosso impacto no ecossistema dos Lençóis Maranhenses para preservar sua beleza única.',
      buttonText: 'Saiba Mais'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <WhyChooseSection id="why-choose-us">
      <Container>
        <SectionHeader>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            DESCUBRA A DIFERENÇA
          </Subtitle>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Por que Escolher a Rota Turismo?
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Roteiros incríveis valem conhecer. Descubra o que torna nossa agência a escolha ideal para sua aventura nos Lençóis Maranhenses.
          </Description>
        </SectionHeader>

        <CardsContainer
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <Card key={index} variants={itemVariants}>
              <IconWrapper>
                <FontAwesomeIcon icon={feature.icon} />
              </IconWrapper>
              <CardTitle>{feature.title}</CardTitle>
              <CardText>{feature.description}</CardText>
              <CardButton 
                href="#"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {feature.buttonText}
              </CardButton>
            </Card>
          ))}
        </CardsContainer>
      </Container>
    </WhyChooseSection>
  );
};

export default WhyChooseUs;
