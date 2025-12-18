import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const EducationalSection = styled.section`
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
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tab = styled.button`
  background-color: ${props => props.active ? '#FF9800' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 2px solid ${props => props.active ? '#FF9800' : '#ddd'};
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  
  &:hover {
    background-color: ${props => props.active ? '#FF9800' : 'rgba(255, 152, 0, 0.1)'};
    border-color: #FF9800;
    color: ${props => props.active ? 'white' : '#FF9800'};
  }
  
  @media (max-width: 576px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const ArticleImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ArticleCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ArticleContent = styled.div`
  padding: 1.5rem;
`;

const ArticleCategory = styled.div`
  color: #FF9800;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ArticleTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const ArticleExcerpt = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ReadMoreButton = styled.a`
  color: #FF9800;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: #F57C00;
    
    svg {
      transform: translateX(5px);
    }
  }
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
`;

const DownloadGuide = styled.div`
  margin-top: 4rem;
  background: linear-gradient(135deg, #006064, #00838f);
  border-radius: 15px;
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem;
    gap: 2rem;
  }
`;

const GuideContent = styled.div``;

const GuideTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: white;
`;

const GuideDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const GuideForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GuideInput = styled.input`
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
`;

const GuideButton = styled(motion.button)`
  background-color: #FF9800;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #F57C00;
  }
`;

const GuideImage = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const articles = {
  dicas: [
    {
      id: 1,
      title: 'Melhor época para visitar os Lençóis Maranhenses',
      excerpt: 'Descubra qual é o período ideal para conhecer as famosas lagoas cristalinas formadas entre as dunas de areia branca dos Lençóis Maranhenses.',
      category: 'Dicas de Viagem',
      image: '/public/melhor-epoca.jpg'
    },
    {
      id: 2,
      title: 'O que levar na mochila para os Lençóis Maranhenses',
      excerpt: 'Lista completa com itens essenciais para garantir conforto e segurança durante sua aventura pelos Lençóis Maranhenses.',
      category: 'Dicas de Viagem',
      image: '/public/o-que-levar.jpg'
    },
    {
      id: 3,
      title: '5 dicas para fotografar os Lençóis Maranhenses como um profissional',
      excerpt: 'Aprenda técnicas simples para capturar imagens deslumbrantes das paisagens únicas dos Lençóis Maranhenses.',
      category: 'Fotografia',
      image: '/public/dicas-fotografia.jpg'
    }
  ],
  cultura: [
    {
      id: 4,
      title: 'A cultura e tradições das comunidades dos Lençóis Maranhenses',
      excerpt: 'Conheça os costumes, gastronomia e modo de vida das comunidades que habitam a região dos Lençóis Maranhenses.',
      category: 'Cultura Local',
      image: '/public/cultura-local.jpg'
    },
    {
      id: 5,
      title: 'Festas tradicionais do Maranhão que você precisa conhecer',
      excerpt: 'Do Bumba Meu Boi ao Tambor de Crioula, descubra as manifestações culturais que fazem do Maranhão um estado único.',
      category: 'Cultura Local',
      image: '/public/festas-tradicionais.jpg'
    },
    {
      id: 6,
      title: 'Gastronomia maranhense: sabores que você precisa experimentar',
      excerpt: 'Um guia completo sobre os pratos típicos do Maranhão que você não pode deixar de provar durante sua visita.',
      category: 'Gastronomia',
      image: '/public/gastronomia.jpg'
    }
  ],
  natureza: [
    {
      id: 7,
      title: 'Como se formam as lagoas dos Lençóis Maranhenses',
      excerpt: 'Entenda o fenômeno natural que cria as famosas lagoas de água cristalina entre as dunas de areia branca.',
      category: 'Meio Ambiente',
      image: '/public/formacao-lagoas.jpg'
    },
    {
      id: 8,
      title: 'Flora e fauna dos Lençóis Maranhenses: um ecossistema único',
      excerpt: 'Descubra as espécies de plantas e animais que conseguem sobreviver neste ambiente desafiador.',
      category: 'Biodiversidade',
      image: '/public/flora-fauna.jpg'
    },
    {
      id: 9,
      title: 'Turismo sustentável: como visitar os Lençóis Maranhenses preservando a natureza',
      excerpt: 'Dicas práticas para minimizar seu impacto ambiental durante sua visita a este paraíso natural.',
      category: 'Sustentabilidade',
      image: '/public/turismo-sustentavel.jpg'
    }
  ]
};

const EducationalContent = () => {
  const [activeTab, setActiveTab] = useState('dicas');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <EducationalSection id="blog">
      <Container>
        <SectionHeader>
          <SectionTitle>Blog de Viagem</SectionTitle>
          <SectionDescription>
            Conheça mais sobre os Lençóis Maranhenses através do nosso conteúdo exclusivo, com dicas, curiosidades e informações para enriquecer sua experiência.
          </SectionDescription>
        </SectionHeader>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'dicas'} 
            onClick={() => handleTabChange('dicas')}
          >
            Dicas de Viagem
          </Tab>
          <Tab 
            active={activeTab === 'cultura'} 
            onClick={() => handleTabChange('cultura')}
          >
            Cultura Local
          </Tab>
          <Tab 
            active={activeTab === 'natureza'} 
            onClick={() => handleTabChange('natureza')}
          >
            Natureza e Meio Ambiente
          </Tab>
        </TabContainer>
        
        <ContentGrid>
          {articles[activeTab].map((article, index) => (
            <ArticleCard
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <ArticleImage>
                <img src={article.image} alt={article.title} />
              </ArticleImage>
              <ArticleContent>
                <ArticleCategory>{article.category}</ArticleCategory>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleExcerpt>{article.excerpt}</ArticleExcerpt>
                <ReadMoreButton href="#">
                  Ler mais
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" fill="currentColor" />
                  </svg>
                </ReadMoreButton>
              </ArticleContent>
            </ArticleCard>
          ))}
        </ContentGrid>
        
        <DownloadGuide>
          <GuideContent>
            <GuideTitle>Guia Completo dos Lençóis Maranhenses</GuideTitle>
            <GuideDescription>
              Baixe gratuitamente nosso e-book com 50 páginas de conteúdo exclusivo sobre os Lençóis Maranhenses, incluindo mapas, roteiros, dicas de hospedagem e muito mais!
            </GuideDescription>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
              >
                <p style={{ margin: 0 }}>
                  Obrigado! O guia foi enviado para seu email.
                </p>
              </motion.div>
            ) : (
              <GuideForm onSubmit={handleSubmit}>
                <GuideInput
                  type="email"
                  placeholder="Digite seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <GuideButton
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Enviando...' : 'Baixar Guia Gratuito'}
                </GuideButton>
              </GuideForm>
            )}
          </GuideContent>
          
          <GuideImage>
            <img src="/public/ebook-cover.jpg" alt="Guia Completo dos Lençóis Maranhenses" />
          </GuideImage>
        </DownloadGuide>
      </Container>
    </EducationalSection>
  );
};

export default EducationalContent;
