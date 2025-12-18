package br.gov.ma.ssp.whatsapp_service.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.gov.ma.ssp.whatsapp_service.entity.MessageStatus;
import br.gov.ma.ssp.whatsapp_service.repository.MessageStatusRepository;

@Service
public class MessageStatusService {

    private final MessageStatusRepository messageStatusRepository;

    public MessageStatusService(MessageStatusRepository messageStatusRepository) {
        this.messageStatusRepository = messageStatusRepository;
    }

    @Transactional
    public MessageStatus saveMessage(String messageId, String remoteJid, String phoneNumber, String message, String status, Long messageTimestamp) {
        MessageStatus messageStatus = new MessageStatus(messageId, remoteJid, phoneNumber, message, status, messageTimestamp);
        return messageStatusRepository.save(messageStatus);
    }

    @Transactional
    public void updateMessageStatus(String messageId, String newStatus) {
        Optional<MessageStatus> optionalMessage = messageStatusRepository.findByMessageId(messageId);
        
        if (optionalMessage.isPresent()) {
            MessageStatus messageStatus = optionalMessage.get();
            messageStatus.setStatus(newStatus);
            
            // Atualizar timestamps específicos
            if ("DELIVERY_ACK".equals(newStatus)) {
                messageStatus.setDeliveredAt(LocalDateTime.now());
            } else if ("READ".equals(newStatus)) {
                messageStatus.setReadAt(LocalDateTime.now());
            }
            
            messageStatusRepository.save(messageStatus);
            System.out.println("✅ Status atualizado: " + messageId + " -> " + newStatus);
        } else {
            System.out.println("⚠️ Mensagem não encontrada: " + messageId);
        }
    }

    public Optional<MessageStatus> getMessageStatus(String messageId) {
        return messageStatusRepository.findByMessageId(messageId);
    }

    public List<MessageStatus> getMessagesByPhone(String phoneNumber) {
        return messageStatusRepository.findByPhoneNumberOrderByCreatedAtDesc(phoneNumber);
    }

    public List<MessageStatus> getMessagesByStatus(String status) {
        return messageStatusRepository.findByStatusOrderByCreatedAtDesc(status);
    }
}
