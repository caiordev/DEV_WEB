import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1a1a1a, #333);
  color: #fff;
  padding: 80px 0 30px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #FF9800, #F44336);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  .logo-container {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  
  img {
    height: 80px;
    width: auto;
    margin-bottom: 15px;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.2));
  }
  
  p {
    color: #ddd;
    line-height: 1.7;
    margin-bottom: 20px;
    font-size: 0.95rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 25px;
    position: relative;
    padding-bottom: 12px;
    font-weight: 600;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #FF9800, #F44336);
      border-radius: 2px;
    }
  }

  p {
    color: #bbb;
    line-height: 1.6;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;

    &:hover {
      color: #fff;
      transform: translateX(5px);
    }

    svg {
      color: #FF9800;
      width: 16px;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  background: ${props => props.color || '#FF9800'};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-5px) rotate(5deg);
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  }
`;

const QuickLinks = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 15px;
    position: relative;
  }

  a {
    color: #bbb;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    padding-left: 15px;
    
    &::before {
      content: '›';
      position: absolute;
      left: 0;
      color: #FF9800;
      font-size: 1.2rem;
      font-weight: bold;
    }

    &:hover {
      color: #fff;
      transform: translateX(5px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 60px;
  padding-top: 25px;
  border-top: 1px solid rgba(255,255,255,0.1);
  color: #bbb;
  font-size: 0.9rem;
  
  a {
    color: #FF9800;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection>
          <div className="logo-container">
            <img src="/favicon.png" alt="Lençóis Turismo Logo" />
          </div>
          <p>
            Descubra os Lençóis Maranhenses com a melhor agência de turismo da região.
            Oferecemos experiências inesquecíveis com guias experientes e atendimento personalizado.
          </p>
          <SocialLinks>
            <SocialIcon href="#" target="_blank" color="#3b5998">
              <FontAwesomeIcon icon={faFacebookF} />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" color="#e1306c">
              <FontAwesomeIcon icon={faInstagram} />
            </SocialIcon>
            <SocialIcon href="https://wa.me/5598991333370" target="_blank" color="#25D366">
              <FontAwesomeIcon icon={faWhatsapp} />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" color="#FF0000">
              <FontAwesomeIcon icon={faYoutube} />
            </SocialIcon>
          </SocialLinks>
        </LogoSection>

        <FooterSection>
          <h3>Contato</h3>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>Barreirinhas, Maranhão - Brasil</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} />
            <span>+55 98 99133-3370</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} />
            <span>contato@lencoisturismo.com.br</span>
          </p>
        </FooterSection>

        <FooterSection>
          <h3>Horário de Funcionamento</h3>
          <p>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Segunda a Sábado</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faClock} />
            <span>08:00 - 18:00</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Domingo</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faClock} />
            <span>08:00 - 12:00</span>
          </p>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>&copy; {new Date().getFullYear()} Lençóis Turismo. Todos os direitos reservados. Desenvolvido por <a href="#">Agência Digital</a></p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
