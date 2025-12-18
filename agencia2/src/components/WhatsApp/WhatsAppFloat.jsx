import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsAppButton = styled.a`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #25d366;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }

  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  right: 70px;
  background: #333;
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:after {
    content: '';
    position: absolute;
    right: -8px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 8px solid #333;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
`;

const WhatsAppFloat = () => {
  return (
    <WhatsAppButton href="https://wa.me/5598991333370" target="_blank">
      <FontAwesomeIcon icon={faWhatsapp} />
      <Tooltip className="tooltip">Fale conosco!</Tooltip>
    </WhatsAppButton>
  );
};

export default WhatsAppFloat;
