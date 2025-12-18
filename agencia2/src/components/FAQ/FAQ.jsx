import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const FAQSection = styled.section`
  padding: 5rem 0;
  background: #ffffff;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;

  h2 {
    font-size: 2.2rem;
    color: #1a1a1a;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #eaeaea;
`;

const Question = styled.div`
  padding: 1.5rem 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  h3 {
    font-size: 1.1rem;
    color: ${props => props.isOpen ? '#007AFF' : '#1a1a1a'};
    margin: 0;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .icon {
    color: ${props => props.isOpen ? '#007AFF' : '#1a1a1a'};
    font-size: 0.9rem;
    transition: color 0.2s ease;
  }

  &:hover h3 {
    color: #007AFF;
  }

  &:hover .icon {
    color: #007AFF;
  }
`;

const Answer = styled.div`
  height: ${props => props.isOpen ? 'auto' : '0'};
  overflow: hidden;
  padding-bottom: ${props => props.isOpen ? '1.5rem' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all 0.3s ease;

  p {
    color: #666;
    line-height: 1.7;
    margin: 0;
    font-size: 1rem;
  }
`;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      question: 'Qual a melhor época para visitar os Lençóis Maranhenses?',
      answer: 'A melhor época para visitar os Lençóis Maranhenses é entre junho e setembro. Neste período, as lagoas estão cheias após as chuvas e o clima está mais ameno, proporcionando a melhor experiência para os visitantes.'
    },
    {
      question: 'Como chegar a Barreirinhas?',
      answer: 'Você pode chegar a Barreirinhas através do aeroporto de São Luís, seguido de transfer terrestre (4 horas), ou de carro particular. Nossa equipe oferece serviço de transfer e pode auxiliar com todo o planejamento da sua chegada.'
    },
    {
      question: 'Quais documentos são necessários?',
      answer: 'É necessário apresentar documento de identificação com foto (RG ou CNH). Para menores de idade, é necessária autorização dos pais ou responsáveis legais. Recomendamos também levar o cartão do plano de saúde.'
    },
    {
      question: 'O que devo levar para os passeios?',
      answer: 'Recomendamos: protetor solar, óculos de sol, chapéu/boné, roupas leves, roupa de banho, toalha, água, câmera fotográfica e repelente. Para passeios nas lagoas, leve uma muda de roupa extra.'
    },
    {
      question: 'Os passeios são seguros?',
      answer: 'Sim, todos os passeios são realizados com guias credenciados e experientes, seguindo rigorosos protocolos de segurança. Nossos veículos e equipamentos passam por manutenção regular e oferecemos seguro-viagem.'
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos cartões de crédito e débito das principais bandeiras, PIX e transferência bancária. Para grupos, oferecemos condições especiais de pagamento. Entre em contato para mais informações.'
    }
  ];

  return (
    <FAQSection id="faq">
      <Container>
        <SectionTitle>
          <h2>Dúvidas Frequentes</h2>
          <p>Encontre respostas para as principais dúvidas sobre nossos serviços</p>
        </SectionTitle>
        <FAQContainer>
          {faqItems.map((item, index) => (
            <FAQItem key={index}>
              <Question
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3>{item.question}</h3>
                <FontAwesomeIcon 
                  icon={openIndex === index ? faMinus : faPlus} 
                  className="icon"
                />
              </Question>
              <Answer isOpen={openIndex === index}>
                <p>{item.answer}</p>
              </Answer>
            </FAQItem>
          ))}
        </FAQContainer>
      </Container>
    </FAQSection>
  );
};

export default FAQ;
