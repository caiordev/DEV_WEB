import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const PopupContainer = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: #999;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    color: #333;
    transform: rotate(90deg);
  }
`;

const PopupContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PopupImage = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  min-height: 200px;
  
  @media (min-width: 768px) {
    min-height: auto;
  }
`;

const PopupForm = styled.div`
  padding: 2rem;
`;

const PopupTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const PopupSubtitle = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #FF9800;
    box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.1);
    outline: none;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #FF9800, #F57C00);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(255, 152, 0, 0.2);
  
  &:hover {
    box-shadow: 0 6px 15px rgba(255, 152, 0, 0.3);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const FormFooter = styled.p`
  color: #888;
  font-size: 0.8rem;
  margin-top: 1rem;
  text-align: center;
`;

const SuccessMessage = styled(motion.div)`
  background-color: #E8F5E9;
  color: #2E7D32;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.8rem;
    flex-shrink: 0;
  }
`;

const ExitIntentPopup = styled(PopupContainer)`
  max-width: 600px;
`;

const ExitIntentContent = styled.div`
  padding: 2.5rem;
  text-align: center;
`;

const ExitIntentTitle = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ExitIntentDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const OfferBadge = styled.div`
  background-color: #FFF3E0;
  color: #FF9800;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1.5rem;
`;

const LeadPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    // Show popup after 30 seconds
    const popupTimer = setTimeout(() => {
      if (!localStorage.getItem('popupShown')) {
        setShowPopup(true);
        localStorage.setItem('popupShown', 'true');
      }
    }, 30000);
    
    // Setup exit intent detection
    const handleMouseLeave = (e) => {
      // If the mouse leaves the top of the page
      if (e.clientY <= 0 && !localStorage.getItem('exitIntentShown') && !showPopup) {
        setShowExitIntent(true);
        localStorage.setItem('exitIntentShown', 'true');
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      clearTimeout(popupTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showPopup]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Close popup after success
      setTimeout(() => {
        setShowPopup(false);
        setEmail('');
        setName('');
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  const handleExitIntentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Close popup after success
      setTimeout(() => {
        setShowExitIntent(false);
        setEmail('');
        setName('');
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <PopupOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PopupContainer
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <CloseButton onClick={() => setShowPopup(false)}>×</CloseButton>
              <PopupContent>
                <PopupImage image="/public/popup-image.jpg" />
                <PopupForm>
                  <PopupTitle>Ganhe 10% de Desconto</PopupTitle>
                  <PopupSubtitle>
                    Cadastre-se para receber dicas exclusivas sobre os Lençóis Maranhenses e um cupom de 10% de desconto no seu primeiro passeio.
                  </PopupSubtitle>
                  
                  {isSubmitted && (
                    <SuccessMessage
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                      </svg>
                      <span>Obrigado! Seu cupom foi enviado para seu email.</span>
                    </SuccessMessage>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Input
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="email"
                        placeholder="Seu melhor email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <SubmitButton
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? 'Enviando...' : 'Quero Meu Desconto'}
                    </SubmitButton>
                  </form>
                  
                  <FormFooter>
                    Prometemos não enviar spam. Você pode cancelar a inscrição a qualquer momento.
                  </FormFooter>
                </PopupForm>
              </PopupContent>
            </PopupContainer>
          </PopupOverlay>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showExitIntent && (
          <PopupOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ExitIntentPopup
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <CloseButton onClick={() => setShowExitIntent(false)}>×</CloseButton>
              <ExitIntentContent>
                <OfferBadge>Oferta Exclusiva</OfferBadge>
                <ExitIntentTitle>Espere! Não perca esta oportunidade!</ExitIntentTitle>
                <ExitIntentDescription>
                  Antes de sair, que tal garantir um desconto especial de 15% em qualquer passeio? 
                  Cadastre-se abaixo e receba seu cupom exclusivo diretamente no seu email.
                </ExitIntentDescription>
                
                {isSubmitted && (
                  <SuccessMessage
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                    </svg>
                    <span>Obrigado! Seu cupom de 15% foi enviado para seu email.</span>
                  </SuccessMessage>
                )}
                
                <form onSubmit={handleExitIntentSubmit}>
                  <FormGroup>
                    <Input
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="email"
                      placeholder="Seu melhor email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <SubmitButton
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? 'Enviando...' : 'Garantir Meu Desconto de 15%'}
                  </SubmitButton>
                </form>
                
                <FormFooter>
                  Prometemos não enviar spam. Você pode cancelar a inscrição a qualquer momento.
                </FormFooter>
              </ExitIntentContent>
            </ExitIntentPopup>
          </PopupOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeadPopup;
