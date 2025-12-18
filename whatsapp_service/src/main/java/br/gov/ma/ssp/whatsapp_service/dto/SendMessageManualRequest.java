package br.gov.ma.ssp.whatsapp_service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SendMessageManualRequest {

    private String phoneNumber;
    private String message;
    private Integer delay;
    private String presence;
    private Boolean linkPreview;

    public SendMessageManualRequest() {}

    // Getters e Setters
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

    public Integer getDelay() {
        return delay;
    }

    public void setDelay(Integer delay) {
        this.delay = delay;
    }

    public String getPresence() {
        return presence;
    }

    public void setPresence(String presence) {
        this.presence = presence;
    }

    public Boolean getLinkPreview() {
        return linkPreview;
    }

    public void setLinkPreview(Boolean linkPreview) {
        this.linkPreview = linkPreview;
    }
}