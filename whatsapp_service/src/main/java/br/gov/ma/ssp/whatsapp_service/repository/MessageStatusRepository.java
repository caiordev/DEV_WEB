package br.gov.ma.ssp.whatsapp_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.gov.ma.ssp.whatsapp_service.entity.MessageStatus;

@Repository
public interface MessageStatusRepository extends JpaRepository<MessageStatus, Long> {

    Optional<MessageStatus> findByMessageId(String messageId);
    
    List<MessageStatus> findByPhoneNumberOrderByCreatedAtDesc(String phoneNumber);
    
    List<MessageStatus> findByStatusOrderByCreatedAtDesc(String status);
}
