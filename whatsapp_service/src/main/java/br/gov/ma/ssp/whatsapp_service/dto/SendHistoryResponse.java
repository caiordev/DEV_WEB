package br.gov.ma.ssp.whatsapp_service.dto;

import java.time.LocalDateTime;

import br.gov.ma.ssp.whatsapp_service.entity.SendHistory;
import br.gov.ma.ssp.whatsapp_service.entity.Status;

public class SendHistoryResponse {

    private Long id;
    private String phoneNumber;
    private String message;
    private Status status;
    private String errorMessage;
    private String messageId;
    private LocalDateTime sentAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public SendHistoryResponse() {
    }

    public SendHistoryResponse(SendHistory sendHistory) {
        this.id = sendHistory.getId();
        this.phoneNumber = sendHistory.getPhoneNumber();
        this.message = sendHistory.getMessage();
        this.status = sendHistory.getStatus();
        this.errorMessage = sendHistory.getErrorMessage();
        this.messageId = sendHistory.getMessageId();
        this.sentAt = sendHistory.getSentAt();
        this.createdAt = sendHistory.getCreatedAt();
        this.updatedAt = sendHistory.getUpdatedAt();
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
