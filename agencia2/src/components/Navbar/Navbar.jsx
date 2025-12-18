import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const TopBar = styled.div`
  background-color: #FF9800;
  padding: 8px 0;
  display: ${props => props.scrolled ? 'none' : 'block'};
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TopBarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: white;
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 20px;
  
  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  
  a {
    color: white;
    font-size: 1.1rem;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const Nav = styled.nav`
  position: fixed;
  top: ${props => props.scrolled || props.isHomePage ? '0' : 'auto'};
  left: 0;
  width: 100%;
  z-index: 1000;
  background: ${props => props.scrolled ? 'white' : 'transparent'};
  transition: all 0.3s ease;
  padding: ${props => props.scrolled ? '5px 0' : '10px 0'};
  box-shadow: ${props => props.scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  img {
    height: 100px;
    width: 200px;
    transition: all 0.3s ease;
    cursor: pointer;

    @media (max-width: 768px) {
      width: 200px;
      height: 70px;
    }
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    gap: 0;
    padding: 0;
    max-height: ${props => props.isOpen ? '300px' : '0'};
    overflow-y: ${props => props.isOpen ? 'auto' : 'hidden'}; /* Adiciona scroll apenas quando o menu está aberto */
    overflow-x: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled.a`
  color: ${props => props.scrolled ? '#333' : 'white'};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #2196f3;
    transition: width 0.3s ease;
  }

  &:hover:after,
  &.active:after {
    width: 100%;
  }

  &:hover,
  &.active {
    color: #2196f3;
  }

  @media (max-width: 768px) {
    display: block;
    padding: 15px 20px;
    font-size: 1rem;
    color: #333;

    &:after {
      display: none;
    }

    &:hover {
      background: #f5f5f5;
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.scrolled ? '#333' : 'white'};
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }
`;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = ['home', 'about-section', 'tours', 'packages', 'accommodation', 'transfer', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about-section', label: 'Sobre' },
    { id: 'tours', label: 'Passeios' },
    { id: 'packages', label: 'Pacotes' },
    { id: 'accommodation', label: 'Hospedagem' },
    { id: 'transfer', label: 'Transfer' },
    { id: 'contact', label: 'Contato' }
  ];

  return (
    <>
      <Nav scrolled={scrolled} isHomePage={isHomePage}>
        <NavContainer>
          <Logo to="/" onClick={scrollToTop}>
            <img src="/public/favicon-150x150.ico" alt="Rota Turismo" />
          </Logo>
          <MenuButton
            scrolled={scrolled}
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </MenuButton>
          <NavLinks isOpen={isOpen}>
            {navItems.map(item => (
              <li key={item.id}>
                <NavLink
                  scrolled={scrolled}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </NavLinks>
        </NavContainer>
      </Nav>
    </>
  );
};

export default Navbar;
