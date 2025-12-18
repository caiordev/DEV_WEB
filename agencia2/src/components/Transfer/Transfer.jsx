import React, { useState } from 'react';
import './Transfer.css';

// Import placeholder images - you'll need to replace these with actual images
const privateCarImage = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
const sharedVanImage = "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

const Transfer = () => {
  const [transferType, setTransferType] = useState('private');
  
  const handleWhatsAppClick = () => {
    const message = transferType === 'private' 
      ? 'Olá! Gostaria de solicitar um transfer privado.' 
      : 'Olá! Gostaria de solicitar um transfer compartilhado.';
    
    // Replace with your actual WhatsApp number
    const phoneNumber = '5500000000000'; // Format: country code + number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="transfer-section" id="transfer">
      <div className="transfer-container">
        <h2 className="transfer-title">Serviços de Transfer</h2>
        <p className="transfer-subtitle">Escolha a opção de transfer perfeita para sua viagem</p>
        
        <div className="transfer-options">
          <div 
            className={`transfer-option ${transferType === 'private' ? 'active' : ''}`}
            onClick={() => setTransferType('private')}
          >
            <div className="transfer-option-image">
              <img src={privateCarImage} alt="Transfer Privado" />
            </div>
            <div className="transfer-option-info">
              <h3>Transfer Privado</h3>
              <p>Veículo exclusivo só para você e seu grupo</p>
              <ul>
                <li>Rota direta para seu destino</li>
                <li>Sem espera por outros passageiros</li>
                <li>Horários de partida flexíveis</li>
                <li>Veículos premium disponíveis</li>
              </ul>
            </div>
          </div>
          
          <div 
            className={`transfer-option ${transferType === 'shared' ? 'active' : ''}`}
            onClick={() => setTransferType('shared')}
          >
            <div className="transfer-option-image">
              <img src={sharedVanImage} alt="Transfer Compartilhado" />
            </div>
            <div className="transfer-option-info">
              <h3>Transfer Compartilhado</h3>
              <p>Opção econômica compartilhando com outros viajantes</p>
              <ul>
                <li>Transporte com custo-benefício</li>
                <li>Ecologicamente responsável</li>
                <li>Conheça outros viajantes</li>
                <li>Partidas regulares programadas</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="whatsapp-container">
          <h3>Solicite seu Transfer {transferType === 'private' ? 'Privado' : 'Compartilhado'}</h3>
          <p className="whatsapp-info">Clique no botão abaixo para solicitar seu transfer via WhatsApp</p>
          
          <button 
            className="whatsapp-button" 
            onClick={handleWhatsAppClick}
          >
            <i className="fab fa-whatsapp"></i> Solicitar via WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default Transfer;
