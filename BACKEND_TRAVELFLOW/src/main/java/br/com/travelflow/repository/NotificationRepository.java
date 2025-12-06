package br.com.travelflow.repository;

import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.domain.entity.Notification;
import br.com.travelflow.domain.entity.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    List<Notification> findByAgencyOrderByCreatedAtDesc(Agency agency);
    
    List<Notification> findByAgencyAndReadOrderByCreatedAtDesc(Agency agency, Boolean read);
    
    @Query("SELECT n FROM Notification n WHERE n.agency = :agency AND n.read = false ORDER BY n.createdAt DESC")
    List<Notification> findUnreadByAgency(Agency agency);
    
    Optional<Notification> findByIdAndAgency(Long id, Agency agency);
    
    Long countByAgencyAndRead(Agency agency, Boolean read);
    
    List<Notification> findByAgencyAndTypeOrderByCreatedAtDesc(Agency agency, NotificationType type);
    
    @Modifying
    @Query("UPDATE Notification n SET n.read = true, n.readAt = CURRENT_TIMESTAMP WHERE n.agency = :agency AND n.read = false")
    int markAllAsReadForAgency(Agency agency);
    
    void deleteByAgencyAndRead(Agency agency, Boolean read);
}
