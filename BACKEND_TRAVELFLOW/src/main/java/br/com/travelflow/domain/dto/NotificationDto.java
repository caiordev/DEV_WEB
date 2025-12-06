package br.com.travelflow.domain.dto;

import br.com.travelflow.domain.entity.Notification;
import br.com.travelflow.domain.entity.NotificationType;

import java.time.LocalDateTime;

public class NotificationDto {
    
    private Long id;
    private String message;
    private NotificationType type;
    private Boolean read;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
    private Long voucherId;
    
    public NotificationDto() {}
    
    public NotificationDto(Notification notification) {
        this.id = notification.getId();
        this.message = notification.getMessage();
        this.type = notification.getType();
        this.read = notification.getRead();
        this.createdAt = notification.getCreatedAt();
        this.readAt = notification.getReadAt();
        
        if (notification.getVoucher() != null) {
            this.voucherId = notification.getVoucher().getId();
        }
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public NotificationType getType() {
        return type;
    }
    
    public void setType(NotificationType type) {
        this.type = type;
    }
    
    public Boolean getRead() {
        return read;
    }
    
    public void setRead(Boolean read) {
        this.read = read;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getReadAt() {
        return readAt;
    }
    
    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }
    
    public Long getVoucherId() {
        return voucherId;
    }
    
    public void setVoucherId(Long voucherId) {
        this.voucherId = voucherId;
    }
}
