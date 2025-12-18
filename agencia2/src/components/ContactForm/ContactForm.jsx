import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactSection = styled.section`
  padding: 6rem 0;
  background: radial-gradient(1200px 600px at 15% 20%, rgba(255, 152, 0, 0.18) 0%, rgba(255, 152, 0, 0) 60%),
              radial-gradient(1000px 520px at 85% 30%, rgba(0, 96, 100, 0.14) 0%, rgba(0, 96, 100, 0) 55%),
              linear-gradient(135deg, #f7f9fc 0%, #eef2f7 100%);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4.5rem 0;
  }
  
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

  &::after {
    content: '';
    position: absolute;
    inset: -40px;
    background:
      radial-gradient(circle at 20% 25%, rgba(255, 152, 0, 0.10) 0%, transparent 55%),
      radial-gradient(circle at 80% 60%, rgba(0, 96, 100, 0.10) 0%, transparent 55%);
    filter: blur(18px);
    opacity: 0.9;
    z-index: 0;
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FormContent = styled.div`
  max-width: 520px;

  @media (max-width: 992px) {
    max-width: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(135deg, #0f172a 0%, #FF9800 55%, #006064 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  color: rgba(15, 23, 42, 0.72);
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.2rem;
  
  svg {
    color: #FF9800;
    margin-right: 1rem;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }
  
  span {
    color: rgba(15, 23, 42, 0.72);
    font-size: 1.05rem;
    line-height: 1.5;
  }
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.85);
  border-radius: 18px;
  padding: 2.25rem;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: #0f172a;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
`;

const FormSubtitle = styled.p`
  color: rgba(15, 23, 42, 0.72);
  font-size: 1rem;
  margin-bottom: 1.25rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(15, 23, 42, 0.78);
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  font-size: 1rem;
  color: #0f172a;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  box-shadow: 0 1px 0 rgba(15, 23, 42, 0.02);
  outline: none;

  &::placeholder {
    color: rgba(15, 23, 42, 0.45);
  }

  &:hover {
    border-color: rgba(15, 23, 42, 0.18);
  }
  
  &:focus {
    border-color: rgba(255, 152, 0, 0.65);
    box-shadow: 0 0 0 4px rgba(255, 152, 0, 0.18);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  font-size: 1rem;
  color: #0f172a;
  transition: all 0.3s ease;
  appearance: none;
  background-color: rgba(255, 255, 255, 0.9);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  outline: none;

  &:hover {
    border-color: rgba(15, 23, 42, 0.18);
  }
  
  &:focus {
    border-color: rgba(255, 152, 0, 0.65);
    box-shadow: 0 0 0 4px rgba(255, 152, 0, 0.18);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  font-size: 1rem;
  color: #0f172a;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  min-height: 120px;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: rgba(15, 23, 42, 0.45);
  }

  &:hover {
    border-color: rgba(15, 23, 42, 0.18);
  }
  
  &:focus {
    border-color: rgba(255, 152, 0, 0.65);
    box-shadow: 0 0 0 4px rgba(255, 152, 0, 0.18);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #FF9800 0%, #F57C00 45%, #006064 120%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 12px 30px rgba(255, 152, 0, 0.22);
  letter-spacing: 0.2px;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(255, 152, 0, 0.22), 0 16px 36px rgba(15, 23, 42, 0.18);
  }
  
  &:hover {
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.18);
  }
  
  &:disabled {
    background: rgba(15, 23, 42, 0.25);
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const FormFooter = styled.p`
  color: rgba(15, 23, 42, 0.55);
  font-size: 0.85rem;
  margin-top: 1.5rem;
  text-align: center;
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(34, 197, 94, 0.12);
  color: #166534;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  border: 1px solid rgba(34, 197, 94, 0.18);
  
  svg {
    margin-right: 0.8rem;
    flex-shrink: 0;
  }
`;

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
  </svg>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          interest: '',
          message: ''
        });
      }, 5000);
    }, 1500);
  };
  
  return (
    <ContactSection id="contact">
      <Container>
        <FormContainer>
          <FormContent>
            <SectionTitle>Planeje Sua Aventura Agora</SectionTitle>
            <SectionSubtitle>
              Estamos prontos para criar uma experiência inesquecível nos Lençóis Maranhenses especialmente para você.
            </SectionSubtitle>
            
            <BenefitsList>
              <BenefitItem>
                <CheckIcon />
                <span>Orçamento personalizado em até 2 horas</span>
              </BenefitItem>
              <BenefitItem>
                <CheckIcon />
                <span>Atendimento exclusivo com consultores especializados</span>
              </BenefitItem>
              <BenefitItem>
                <CheckIcon />
                <span>Flexibilidade para adaptar roteiros às suas necessidades</span>
              </BenefitItem>
              <BenefitItem>
                <CheckIcon />
                <span>Desconto especial para grupos a partir de 4 pessoas</span>
              </BenefitItem>
              <BenefitItem>
                <CheckIcon />
                <span>Garantia de melhor preço da região</span>
              </BenefitItem>
            </BenefitsList>
          </FormContent>
          
          <Form onSubmit={handleSubmit}>
            <FormTitle>Solicite um Orçamento</FormTitle>
            <FormSubtitle>Preencha o formulário e receba uma proposta personalizada</FormSubtitle>
            
            {isSubmitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                </svg>
                <span>Sua solicitação foi enviada com sucesso! Em breve entraremos em contato.</span>
              </SuccessMessage>
            )}
            
            <FormGroup>
              <Label htmlFor="name">Nome completo*</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Digite seu nome completo"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="phone">Telefone/WhatsApp*</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="(00) 00000-0000"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="interest">Passeio de interesse*</Label>
              <Select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um passeio</option>
                <option value="lagoa-azul">Lagoa Azul</option>
                <option value="lagoa-bonita">Lagoa Bonita</option>
                <option value="lagoa-azul-bonita">Lagoa Azul + Lagoa Bonita</option>
                <option value="atins">Atins - Parque Nacional - Canto do Atins</option>
                <option value="vassouras-mandacaru-cabure">Vassouras, Mandacaru e Caburé</option>
                <option value="pequenos-lencois">Pequenos Lençóis</option>
                <option value="cardosa">Cardosa</option>
                <option value="passeio-caiaque">Aventura de Caiaque</option>
                <option value="pacote-completo">Pacote Completo</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Mensagem (opcional)</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Conte-nos mais sobre suas expectativas ou dúvidas..."
              />
            </FormGroup>
            
            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar Orçamento Gratuito'}
            </SubmitButton>
            
            <FormFooter>
              Seus dados estão seguros conosco. Não compartilhamos suas informações com terceiros.
            </FormFooter>
          </Form>
        </FormContainer>
      </Container>
    </ContactSection>
  );
};

export default ContactForm;
