import React from 'react';
import styled from 'styled-components';

const ReviewsSection = styled.section`
  padding: 80px 0;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 50px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #007bff;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding: 1rem 0;
    gap: 1rem;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const ReviewCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;

  @media (max-width: 768px) {
    flex: 0 0 280px;
    scroll-snap-align: start;
    margin-right: 1rem;
    padding: 20px;
    
    &:last-child {
      margin-right: 20px;
    }
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: #e1e1e1;
  font-size: 24px;
  &:before {
    content: '"';
    font-size: 48px;
    font-family: Georgia, serif;
  }

  @media (max-width: 768px) {
    top: 15px;
    left: 15px;
    &:before {
      font-size: 36px;
    }
  }
`;

const ReviewContent = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 20px 0;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin: 15px 0;
  }
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const ReviewerDetails = styled.div`
  flex: 1;
`;

const ReviewerName = styled.h4`
  color: #333;
  margin: 0;
  font-size: 1.1rem;
`;

const ReviewDate = styled.span`
  color: #999;
  font-size: 0.9rem;
  display: block;
  margin-top: 5px;
`;

const Stars = styled.div`
  color: #ffd700;
  margin-top: 5px;
  font-size: 14px;
`;

const reviews = [
  {
    id: 1,
    name: 'Maria Silva',
    date: 'Dezembro 2023',
    rating: 5,
    content: 'Experiência incrível! O passeio pelos Lençóis Maranhenses superou todas as expectativas. O guia foi muito atencioso e profissional.'
  },
  {
    id: 2,
    name: 'João Santos',
    date: 'Janeiro 2024',
    rating: 5,
    content: 'Serviço de primeira qualidade. O transfer foi pontual e confortável, e os passeios foram muito bem organizados.'
  },
  {
    id: 3,
    name: 'Ana Costa',
    date: 'Janeiro 2024',
    rating: 5,
    content: 'Melhor agência de turismo da região! Profissionais muito preparados e lugares incríveis. Voltarei com certeza!'
  }
];

const Reviews = () => {
  return (
    <ReviewsSection id="reviews">
      <Container>
        <Title>O Que Nossos Clientes Dizem</Title>
        <ReviewsGrid>
          {reviews.map((review) => (
            <ReviewCard key={review.id}>
              <QuoteIcon />
              <ReviewContent>{review.content}</ReviewContent>
              <ReviewerInfo>
                <ReviewerDetails>
                  <ReviewerName>{review.name}</ReviewerName>
                  <ReviewDate>{review.date}</ReviewDate>
                  <Stars>{'★'.repeat(review.rating)}</Stars>
                </ReviewerDetails>
              </ReviewerInfo>
            </ReviewCard>
          ))}
        </ReviewsGrid>
      </Container>
    </ReviewsSection>
  );
};

export default Reviews;
