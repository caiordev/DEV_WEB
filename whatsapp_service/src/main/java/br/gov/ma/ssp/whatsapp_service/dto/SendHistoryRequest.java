package br.gov.ma.ssp.whatsapp_service.dto;

import br.gov.ma.ssp.whatsapp_service.entity.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SendHistoryRequest {

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "Message is required")
    private String message;

    @NotNull(message = "Status is required")
    private Status status;

    private String errorMessage;

    private String messageId;

    public SendHistoryRequest() {
    }

    public SendHistoryRequest(String phoneNumber, String message, Status status, String errorMessage) {
        this.phoneNumber = phoneNumber;
        this.message = message;
        this.status = status;
        this.errorMessage = errorMessage;
    }

    public SendHistoryRequest(String phoneNumber, String message, Status status, String errorMessage, String messageId) {
        this.phoneNumber = phoneNumber;
        this.message = message;
        this.status = status;
        this.errorMessage = errorMessage;
        this.messageId = messageId;
    }

    // Getters and Setters

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }
}
