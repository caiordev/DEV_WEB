package br.com.travelflow.domain.dto;

import br.com.travelflow.domain.entity.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateNotificationRequest {
    
    @NotBlank(message = "Message is required")
    @Size(max = 1000, message = "Message must not exceed 1000 characters")
    private String message;
    
    @NotNull(message = "Type is required")
    private NotificationType type;
    
    // Constructors
    public CreateNotificationRequest() {}
    
    public CreateNotificationRequest(String message, NotificationType type) {
        this.message = message;
        this.type = type;
    }
    
    // Getters and Setters
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
}
