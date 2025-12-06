package br.com.travelflow.web.controller;

import br.com.travelflow.domain.dto.CreateNotificationRequest;
import br.com.travelflow.domain.dto.NotificationDto;
import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.security.SecurityUtils;
import br.com.travelflow.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
    
    private final NotificationService notificationService;
    
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<NotificationDto>> getAllNotifications() {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        List<NotificationDto> notifications = notificationService.getAllNotifications(agency);
        return ResponseEntity.ok(notifications);
    }
    
    @GetMapping("/unread")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<NotificationDto>> getUnreadNotifications() {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        List<NotificationDto> notifications = notificationService.getUnreadNotifications(agency);
        return ResponseEntity.ok(notifications);
    }
    
    @GetMapping("/unread/count")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Long> getUnreadCount() {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        Long count = notificationService.getUnreadCount(agency);
        return ResponseEntity.ok(count);
    }
    
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<NotificationDto> createNotification(@Valid @RequestBody CreateNotificationRequest request) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        NotificationDto notification = notificationService.createNotification(
            request.getMessage(), 
            request.getType(), 
            agency
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(notification);
    }
    
    @PutMapping("/{id}/read")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<NotificationDto> markAsRead(@PathVariable Long id) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        NotificationDto notification = notificationService.markAsRead(id, agency);
        return ResponseEntity.ok(notification);
    }
    
    @PutMapping("/read-all")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Void> markAllAsRead() {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        notificationService.markAllAsRead(agency);
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        notificationService.deleteNotification(id, agency);
        return ResponseEntity.noContent().build();
    }
}
