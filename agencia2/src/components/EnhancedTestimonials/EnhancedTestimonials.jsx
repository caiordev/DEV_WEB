import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TestimonialsSection = styled.section`
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

const TestimonialStats = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #FF9800;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 1rem;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #f0f0f0;
  font-size: 4rem;
  line-height: 1;
  font-family: Georgia, serif;
  z-index: 0;
`;

const TestimonialContent = styled.div`
  position: relative;
  z-index: 1;
`;

const TestimonialText = styled.p`
  color: #555;
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  border: 3px solid #f5f5f5;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h4`
  color: #333;
  margin: 0 0 0.3rem;
  font-size: 1.1rem;
`;

const AuthorTrip = styled.p`
  color: #888;
  margin: 0 0 0.3rem;
  font-size: 0.9rem;
`;

const Rating = styled.div`
  color: #FFC107;
  font-size: 1rem;
  margin-top: 0.3rem;
`;

const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: #E8F5E9;
  color: #4CAF50;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  
  svg {
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
`;

const ViewMoreButton = styled(motion.button)`
  background-color: transparent;
  color: #FF9800;
  border: 2px solid #FF9800;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 3rem auto 0;
  display: block;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #FF9800;
    color: white;
  }
`;

const testimonials = [
  {
    id: 1,
    text: "Nossa viagem aos Lençóis Maranhenses foi simplesmente incrível! O passeio à Lagoa Azul superou todas as expectativas. A água cristalina contrastando com as dunas brancas criou um cenário de tirar o fôlego. Nosso guia Paulo foi extremamente atencioso e conhecedor da região, compartilhando histórias fascinantes sobre a formação do parque. Recomendo fortemente esta experiência!",
    author: "Maria Silva",
    image: "/public/testimonial-1.jpg",
    trip: "Passeio Lagoa Azul",
    rating: 5,
    date: "Janeiro 2024",
    verified: true
  },
  {
    id: 2,
    text: "Fizemos o passeio para Atins e foi uma experiência única! O transfer foi pontual e confortável, e o motorista muito simpático. Quando chegamos ao Canto do Atins, ficamos maravilhados com a beleza do lugar. O almoço de frutos do mar servido nas barracas locais foi um dos melhores que já experimentei. Vale cada centavo investido nesta aventura!",
    author: "João Santos",
    image: "/public/testimonial-2.jpg",
    trip: "Passeio Atins",
    rating: 5,
    date: "Fevereiro 2024",
    verified: true
  },
  {
    id: 3,
    text: "Contratei o pacote completo para minha família e foi a melhor decisão! Visitamos a Lagoa Bonita no pôr do sol e foi mágico. As crianças adoraram brincar nas dunas e nadar nas lagoas. A equipe foi muito atenciosa com nossa segurança e conforto durante todo o passeio. Já estamos planejando voltar no próximo ano!",
    author: "Ana Costa",
    image: "/public/testimonial-3.jpg",
    trip: "Pacote Completo",
    rating: 5,
    date: "Dezembro 2023",
    verified: true
  },
  {
    id: 4,
    text: "Sou fotógrafo profissional e escolhi o passeio para os Pequenos Lençóis especificamente para capturar imagens. O guia entendeu perfeitamente minhas necessidades e me levou aos melhores pontos para fotografia. O resultado foram fotos espetaculares e uma experiência inesquecível. A agência realmente entende as necessidades específicas de cada cliente.",
    author: "Roberto Mendes",
    image: "/public/testimonial-4.jpg",
    trip: "Pequenos Lençóis",
    rating: 5,
    date: "Março 2024",
    verified: true
  },
  {
    id: 5,
    text: "Viajei sozinha e estava um pouco apreensiva, mas a equipe me deixou super confortável e segura. O passeio de caiaque pelo Rio Preguiças foi tranquilo e revigorante. Conheci outras pessoas no grupo e fizemos amizade. A paisagem dos manguezais é de uma beleza única. Recomendo para quem quer uma experiência mais tranquila em meio à natureza.",
    author: "Carla Oliveira",
    image: "/public/testimonial-5.jpg",
    trip: "Aventura de Caiaque",
    rating: 5,
    date: "Janeiro 2024",
    verified: true
  },
  {
    id: 6,
    text: "Eu e minha esposa celebramos nosso aniversário de casamento com o passeio para Lagoa Azul + Lagoa Bonita. Foi perfeito! A agência preparou uma surpresa especial para nós durante o pôr do sol, com champanhe e petiscos. Um momento que ficará para sempre em nossas memórias. O profissionalismo e atenção aos detalhes fizeram toda a diferença.",
    author: "Marcelo Lima",
    image: "/public/testimonial-6.jpg",
    trip: "Lagoa Azul + Lagoa Bonita",
    rating: 5,
    date: "Fevereiro 2024",
    verified: true
  }
];

const EnhancedTestimonials = () => {
  const [visibleTestimonials, setVisibleTestimonials] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const showMoreTestimonials = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setVisibleTestimonials(testimonials.length);
      setIsAnimating(false);
    }, 300);
  };
  
  return (
    <TestimonialsSection id="testimonials">
      <Container>
        <SectionHeader>
          <SectionTitle>O Que Nossos Clientes Dizem</SectionTitle>
          <SectionDescription>
            Descubra por que centenas de viajantes escolhem nossa agência para explorar os Lençóis Maranhenses e têm experiências inesquecíveis.
          </SectionDescription>
        </SectionHeader>
        
        <TestimonialStats>
          <StatItem>
            <StatValue>98%</StatValue>
            <StatLabel>Satisfação</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>5.000+</StatValue>
            <StatLabel>Clientes Atendidos</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>4.9</StatValue>
            <StatLabel>Avaliação Média</StatLabel>
          </StatItem>
        </TestimonialStats>
        
        <TestimonialGrid>
          {testimonials.slice(0, visibleTestimonials).map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <QuoteIcon>"</QuoteIcon>
              <TestimonialContent>
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>
                  <AuthorImage>
                    <img src={testimonial.image} alt={testimonial.author} />
                  </AuthorImage>
                  <AuthorInfo>
                    <AuthorName>
                      {testimonial.author}
                      {testimonial.verified && (
                        <VerifiedBadge>
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                          Verificado
                        </VerifiedBadge>
                      )}
                    </AuthorName>
                    <AuthorTrip>{testimonial.trip} • {testimonial.date}</AuthorTrip>
                    <Rating>{"★".repeat(testimonial.rating)}</Rating>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialContent>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
        
        {visibleTestimonials < testimonials.length && (
          <ViewMoreButton 
            onClick={showMoreTestimonials}
            disabled={isAnimating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Mais Depoimentos
          </ViewMoreButton>
        )}
      </Container>
    </TestimonialsSection>
  );
};

export default EnhancedTestimonials;
