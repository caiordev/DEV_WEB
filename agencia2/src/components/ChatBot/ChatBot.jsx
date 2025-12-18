import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tripsData, setTripsData] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  const waitingForWhatsAppRef = useRef(false);

  // Função para buscar dados do backend
  const fetchBackendData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Usando token para buscar dados do backend:', token);
      
      // Buscar trips
      const tripsResponse = await fetch('http://localhost:8082/trips', {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJhZ2VuY3lJZCI6MSwic3ViIjoiYWRtaW4iLCJpYXQiOjE3NjU5MjI1NjQsImV4cCI6MTc2NjAwODk2NH0.ODGt0LaWqezJE-PIBrqiGdRFDkejl8H1-m_kCkjUZzA`
        }
      });
      
      // Buscar packages
      const packagesResponse = await fetch('http://localhost:8082/packages', {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJhZ2VuY3lJZCI6MSwic3ViIjoiYWRtaW4iLCJpYXQiOjE3NjU5MjI1NjQsImV4cCI6MTc2NjAwODk2NH0.ODGt0LaWqezJE-PIBrqiGdRFDkejl8H1-m_kCkjUZzA`
        }
      });
      
      if (tripsResponse.ok && packagesResponse.ok) {
        const trips = await tripsResponse.json();
        const packages = await packagesResponse.json();
        
        setTripsData(trips);
        setPackagesData(packages);
        setIsDataLoaded(true);
        
        console.log('Dados carregados do backend:', { trips, packages });
      } else {
        console.error('Erro ao buscar dados do backend');
      }
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);
    }
  };

  // Carregar dados do backend ao montar o componente
  useEffect(() => {
    fetchBackendData();
  }, []);

  // Carregar histórico do localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('travelChatHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setMessages(history.slice(-10));
    } else {
      // Mensagem inicial
      setMessages([{
        type: 'bot',
        text: 'Olá! Sou o assistente virtual da Rota Turismo. Posso ajudar com informações sobre nossos destinos, pacotes e viagens. Como posso te ajudar hoje?',
        timestamp: new Date().toISOString()
      }]);
    }

  }, []);

  // Auto scroll para última mensagem
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Focar input quando abrir
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const saveChatHistory = (newMessages) => {
    localStorage.setItem('travelChatHistory', JSON.stringify(newMessages));
  };

  // Função para formatar dados do backend para o prompt da IA
  const formatBackendDataForPrompt = () => {
    if (!isDataLoaded || (tripsData.length === 0 && packagesData.length === 0)) {
      return '';
    }

    let formattedData = '\n\n━━━━━━━━━━ DADOS ATUALIZADOS DO SISTEMA ━━━━━━━━━━\n\n';

    // Formatar trips
    if (tripsData.length > 0) {
      formattedData += '📍 VIAGENS DISPONÍVEIS:\n\n';
      tripsData.forEach((trip, index) => {
        formattedData += `${index + 1}. ${trip.destination || 'Viagem'}\n`;
        if (trip.description) formattedData += `   Descrição: ${trip.description}\n`;
        if (trip.location) formattedData += `   Localização: ${trip.location}\n`;
        if (trip.pricePerPerson) formattedData += `   Preço por pessoa: R$ ${trip.pricePerPerson}\n`;
        if (trip.id) formattedData += `   ID: ${trip.id}\n`;
        formattedData += '\n';
      });
    }

    // Formatar packages
    if (packagesData.length > 0) {
      formattedData += '🎁 PACOTES DISPONÍVEIS:\n\n';
      packagesData.forEach((pkg, index) => {
        formattedData += `${index + 1}. ${pkg.name || 'Pacote'}\n`;
        if (pkg.description) formattedData += `   Descrição: ${pkg.description}\n`;
        if (pkg.destination) formattedData += `   Destino: ${pkg.destination}\n`;
        if (pkg.duration) formattedData += `   Duração: ${pkg.duration} dias\n`;
        if (pkg.price) formattedData += `   Preço: R$ ${pkg.price}\n`;
        if (pkg.includes) formattedData += `   Inclui: ${pkg.includes}\n`;
        if (pkg.category) formattedData += `   Categoria: ${pkg.category}\n`;
        formattedData += '\n';
      });
    }

    formattedData += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    formattedData += '\nIMPORTANTE: Use SEMPRE os dados acima do sistema quando disponíveis. Eles têm prioridade sobre qualquer informação pré-programada.\n';

    return formattedData;
  };

  // Função para detectar número de WhatsApp
  const detectWhatsAppNumber = (text) => {
    // Extrair apenas os dígitos da mensagem
    const digitsOnly = text.replace(/\D/g, '');
    
    // Verificar se tem pelo menos 10 dígitos (mínimo para um número brasileiro)
    if (digitsOnly.length < 10) {
      return null;
    }
    
    // Regex para detectar números de telefone brasileiros
    const phoneRegex = /(?:(?:\+|00)?55\s?)?(?:\(?0?[1-9]{2}\)?\s?)?(?:9\s?)?[0-9]{4}[-\s]?[0-9]{4}/g;
    const matches = text.match(phoneRegex);
    if (matches && matches.length > 0) {
      // Limpar o número (remover espaços, parênteses, hífens)
      const cleanNumber = matches[0].replace(/[\s\-\(\)]/g, '');
      
      // Validar se o número limpo tem entre 10 e 13 dígitos (formato brasileiro)
      if (cleanNumber.length >= 10 && cleanNumber.length <= 13) {
        return cleanNumber;
      }
    }
    return null;
  };

  // Função para criar notificação via API
  const createNotification = async (whatsapp, interestedPackages) => {
    try {
      const packagesText = interestedPackages.length > 0 
        ? interestedPackages.join(', ') 
        : 'Pacotes diversos';
      
      const message = `Novo lead de cliente interessado!

Passeios de interesse: ${packagesText}

Contato WhatsApp: ${whatsapp}`;

      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:8082/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJhZ2VuY3lJZCI6MSwic3ViIjoiYWRtaW4iLCJpYXQiOjE3NjU5MjI1NjQsImV4cCI6MTc2NjAwODk2NH0.ODGt0LaWqezJE-PIBrqiGdRFDkejl8H1-m_kCkjUZzA`
        },
        body: JSON.stringify({
          message: message,
          type: 'TRIP_REMINDER'
        })
      });

      if (response.ok) {
        console.log('Notificação criada com sucesso!');
        return true;
      } else {
        console.error('Erro ao criar notificação:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      return false;
    }
  };

  // Função para extrair pacotes mencionados na conversa
  const extractInterestedPackages = (messages) => {
    const packages = [];

    messages.forEach(msg => {
      if (msg.type === 'user') {
        const lowerText = msg.text.toLowerCase();
        
        // Verificar pacotes do backend
        packagesData.forEach(pkg => {
          const pkgName = pkg.name || '';
          const pkgNameLower = pkgName.toLowerCase();
          if (pkgNameLower && lowerText.includes(pkgNameLower) && !packages.includes(pkgName)) {
            packages.push(pkgName);
          }
        });
        
        // Verificar trips do backend
        tripsData.forEach(trip => {
          const tripName = trip.destination || '';
          const tripNameLower = tripName.toLowerCase();
          if (tripNameLower && lowerText.includes(tripNameLower) && !packages.includes(tripName)) {
            packages.push(tripName);
          }
        });
      }
    });

    return packages;
  };

  const addMessage = (type, text, isWhatsAppRequest = false) => {
    const newMessage = {
      type,
      text,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => {
      const updated = [...prev, newMessage];
      saveChatHistory(updated);
      return updated;
    });

    // Se esta mensagem é a solicitação de WhatsApp, ativar a flag
    if (isWhatsAppRequest) {
      waitingForWhatsAppRef.current = true;
    }
  };

  const sendMessage = async () => {
    const userText = inputValue.trim();
    if (!userText || isLoading) return;
    
    addMessage('user', userText);
    setInputValue('');

    // Verificar se está aguardando WhatsApp
    if (waitingForWhatsAppRef.current) {
      const whatsapp = detectWhatsAppNumber(userText);
      
      // Se detectou um número válido, processar
      if (whatsapp) {
        waitingForWhatsAppRef.current = false;

        // Extrair pacotes de interesse da conversa
        const interestedPackages = extractInterestedPackages(messages);
        
        // Criar notificação
        const success = await createNotification(whatsapp, interestedPackages);
        
        if (success) {
          addMessage('bot', '✅ Perfeito! Recebi seu contato. Nossa equipe entrará em contato em breve pelo WhatsApp para finalizar os detalhes da sua viagem. Obrigado pelo interesse!');
        } else {
          addMessage('bot', '✅ Recebi seu contato! Nossa equipe entrará em contato em breve pelo WhatsApp. Obrigado!');
        }
        return;
      }
      
      // Se a mensagem contém muitos dígitos mas não é um número válido, avisar
      const digitsOnly = userText.replace(/\D/g, '');
      if (digitsOnly.length >= 8) {
        addMessage('bot', 'Desculpe, não consegui identificar um número de WhatsApp válido. Por favor, envie no formato: (99) 99999-9999 ou 99999999999');
        return;
      }
      
      // Se não tem dígitos suficientes, desativar o modo de espera e processar normalmente
      waitingForWhatsAppRef.current = false;
      // Continuar para processar a mensagem normalmente abaixo
    }
    
    // Chamar API Groq
    setIsLoading(true);
    
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `Você é um assistente virtual da Rota Turismo, uma agência de viagens especializada em turismo.${formatBackendDataForPrompt()}

━━━━━━━━━━ INSTRUÇÕES ━━━━━━━━━━

• Use EXCLUSIVAMENTE os dados fornecidos acima do sistema para responder sobre pacotes e viagens
• Se não houver dados disponíveis, informe educadamente que está buscando as informações atualizadas
• Seja amigável, entusiasmado e prestativo
• Destaque as características únicas de cada destino e pacote
• Responda de forma concisa e direta

━━━━━━━━━━ SOLICITAÇÃO DE CONTATO ━━━━━━━━━━

IMPORTANTE: Quando o cliente demonstrar interesse genuíno em algum pacote (fazendo perguntas específicas sobre valores, pedindo mais detalhes sobre datas, ou mostrando intenção clara de reserva), você DEVE:
1. PRIMEIRO responder completamente a pergunta do cliente com todos os detalhes
2. DEPOIS incluir a tag [SOLICITAR_WHATSAPP] no FINAL da resposta

NÃO solicite WhatsApp em perguntas genéricas como "quais pacotes vocês têm?" - apenas quando houver interesse específico em um pacote.`
            },
            { role: "user", content: userText }
          ]
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const message = data.choices[0].message;
        
        if (message.content) {
          // Verificar se a IA sinalizou que deve solicitar WhatsApp
          if (message.content.includes('[SOLICITAR_WHATSAPP]')) {
            // Remover a tag da mensagem
            const cleanMessage = message.content.replace('[SOLICITAR_WHATSAPP]', '').trim();
            
            // Adicionar a mensagem limpa
            if (cleanMessage) {
              addMessage('bot', cleanMessage);
            }
            
            // Enviar mensagem solicitando WhatsApp com flag especial
            setTimeout(() => {
              addMessage('bot', 'Ótimo! Para prosseguir e enviar mais informações detalhadas, poderia me passar seu número de WhatsApp? 📱', true);
            }, 800);
          } else {
            addMessage('bot', message.content);
          }
        }
      } else if (data.error) {
        addMessage('bot', `Desculpe, tive um problema: ${data.error.message || 'Erro desconhecido'}`);
      } else {
        addMessage('bot', 'Desculpe, não consegui processar sua solicitação. Pode tentar novamente?');
      }
    } catch (error) {
      addMessage('bot', 'Erro ao conectar com o serviço. Por favor, tente novamente mais tarde.');
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showDestinations = () => {
    if (tripsData.length > 0) {
      const destinations = [...new Set(tripsData.map(trip => trip.destination).filter(Boolean))];
      if (destinations.length > 0) {
        addMessage('bot', `Temos destinos incríveis para você explorar: ${destinations.join(', ')}. Sobre qual você gostaria de saber mais?`);
      } else {
        addMessage('bot', 'Estamos atualizando nossos destinos. Por favor, clique no botão 🔄 para atualizar ou pergunte sobre nossas viagens disponíveis!');
      }
    } else {
      addMessage('bot', 'Estamos carregando nossos destinos. Por favor, clique no botão 🔄 para atualizar ou pergunte sobre nossas viagens disponíveis!');
    }
  };

  const showPackages = () => {
    if (packagesData.length > 0) {
      addMessage('bot', `Temos ${packagesData.length} pacote(s) disponível(is)! Posso te mostrar detalhes sobre qualquer um deles. Qual tipo de viagem você procura?`);
    } else {
      addMessage('bot', 'Estamos carregando nossos pacotes. Por favor, clique no botão 🔄 para atualizar ou pergunte sobre nossas ofertas!');
    }
  };

  const handleRefreshData = async () => {
    addMessage('bot', '🔄 Atualizando dados do sistema...');
    await fetchBackendData();
    if (isDataLoaded) {
      addMessage('bot', '✅ Dados atualizados com sucesso! Agora estou com as informações mais recentes de viagens e pacotes.');
    } else {
      addMessage('bot', '⚠️ Não foi possível atualizar os dados. Continuarei usando as informações padrão.');
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <div className={`chatbot-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <span className="close-icon">✕</span>
        ) : (
          <span className="chat-icon">💬</span>
        )}
      </div>

      {/* Janela do chat */}
      {isOpen && (
        <div className="chatbot-container">
          {/* Header */}
          <div className="chatbot-header">
            <div className="header-content">
              <div className="header-title">
                <h3>Rota Turismo</h3>
                <p>Assistente Virtual de Viagens</p>
              </div>
              <div className="header-actions">
                <button onClick={showDestinations} className="header-btn">Destinos</button>
                <button onClick={showPackages} className="header-btn">Pacotes</button>
                <button 
                  onClick={handleRefreshData} 
                  className="header-btn"
                  title="Atualizar dados do sistema"
                >
                  🔄
                </button>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="chatbot-body">
            <div className="chatbot-messages" ref={chatBoxRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  <div className="message-avatar">
                    {msg.type === 'bot' ? '🤖' : '👤'}
                  </div>
                  <div className="message-bubble">
                    <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message bot">
                  <div className="message-avatar">🤖</div>
                  <div className="message-bubble loading">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="chatbot-input">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              disabled={isLoading}
            />
            <button onClick={sendMessage} disabled={isLoading || !inputValue.trim()}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
