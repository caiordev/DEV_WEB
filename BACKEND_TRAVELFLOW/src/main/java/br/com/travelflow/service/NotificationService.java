package br.com.travelflow.service;

import br.com.travelflow.domain.dto.NotificationDto;
import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.domain.entity.Notification;
import br.com.travelflow.domain.entity.NotificationType;
import br.com.travelflow.domain.entity.Voucher;
import br.com.travelflow.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {
    
    private final NotificationRepository notificationRepository;
    
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    
    @Transactional(readOnly = true)
    public List<NotificationDto> getAllNotifications(Agency agency) {
        return notificationRepository.findByAgencyOrderByCreatedAtDesc(agency).stream()
            .map(NotificationDto::new)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<NotificationDto> getUnreadNotifications(Agency agency) {
        return notificationRepository.findUnreadByAgency(agency).stream()
            .map(NotificationDto::new)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public Long getUnreadCount(Agency agency) {
        return notificationRepository.countByAgencyAndRead(agency, false);
    }
    
    @Transactional
    public NotificationDto markAsRead(Long id, Agency agency) {
        Notification notification = notificationRepository.findByIdAndAgency(id, agency)
            .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.markAsRead();
        Notification updated = notificationRepository.save(notification);
        return new NotificationDto(updated);
    }
    
    @Transactional
    public void markAllAsRead(Agency agency) {
        notificationRepository.markAllAsReadForAgency(agency);
    }
    
    @Transactional
    public void deleteNotification(Long id, Agency agency) {
        Notification notification = notificationRepository.findByIdAndAgency(id, agency)
            .orElseThrow(() -> new RuntimeException("Notification not found"));
        notificationRepository.delete(notification);
    }
    
    @Transactional
    public NotificationDto createNotification(String message, NotificationType type, Agency agency) {
        Notification notification = new Notification(message, type, agency);
        Notification saved = notificationRepository.save(notification);
        return new NotificationDto(saved);
    }
    
    @Transactional
    public NotificationDto createTripReminder(Voucher voucher, String message, Agency agency) {
        Notification notification = new Notification(message, NotificationType.TRIP_REMINDER, agency, voucher);
        Notification saved = notificationRepository.save(notification);
        return new NotificationDto(saved);
    }
}
