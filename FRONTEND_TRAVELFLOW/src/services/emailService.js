import emailjs from '@emailjs/browser';

// Configurações do EmailJS
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

let emailServiceInitialized = false;

/**
 * Inicializa o serviço de email
 */
export const initEmailService = () => {
  try {
    if (!emailServiceInitialized) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      emailServiceInitialized = true;
      console.log('Email service initialized');
    }
  } catch (error) {
    console.error('Error initializing email service:', error);
  }
};

/**
 * Envia email com voucher
 * @param {Object} customerInfo - Informações do cliente
 * @param {Array} trips - Lista de viagens
 * @param {string} voucherNumber - Número do voucher
 * @param {string} totalValue - Valor total
 * @param {Blob} pdfBlob - PDF do voucher (opcional)
 * @returns {Promise<Object>} Resultado do envio
 */
export const sendVoucherEmail = async (customerInfo, trips, voucherNumber, totalValue, pdfBlob = null) => {
  try {
    if (!emailServiceInitialized) {
      initEmailService();
    }

    // Preparar lista de destinos
    const destinationsList = trips.map((trip, index) => 
      `${index + 1}. ${trip.destination} - ${trip.location} (R$ ${trip.pricePerPerson})`
    ).join('\n');

    // Parâmetros do template
    const templateParams = {
      to_email: customerInfo.email,
      to_name: customerInfo.name,
      customer_name: customerInfo.name,
      customer_cpf: customerInfo.cpf,
      customer_phone: customerInfo.phone,
      voucher_number: voucherNumber,
      destinations: destinationsList,
      total_value: totalValue,
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR')
    };

    // Enviar email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return {
      success: true,
      message: 'Email enviado com sucesso!'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error.text || error.message || 'Erro ao enviar email'
    };
  }
};

/**
 * Envia email de notificação
 * @param {string} to - Email do destinatário
 * @param {string} subject - Assunto
 * @param {string} message - Mensagem
 * @returns {Promise<Object>} Resultado do envio
 */
export const sendNotificationEmail = async (to, subject, message) => {
  try {
    if (!emailServiceInitialized) {
      initEmailService();
    }

    const templateParams = {
      to_email: to,
      subject: subject,
      message: message,
      date: new Date().toLocaleDateString('pt-BR')
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return {
      success: true,
      message: 'Email enviado com sucesso!'
    };
  } catch (error) {
    console.error('Error sending notification email:', error);
    return {
      success: false,
      message: error.text || error.message || 'Erro ao enviar email'
    };
  }
};

export default {
  initEmailService,
  sendVoucherEmail,
  sendNotificationEmail
};
