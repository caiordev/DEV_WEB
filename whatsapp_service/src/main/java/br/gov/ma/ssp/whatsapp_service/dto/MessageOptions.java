package br.gov.ma.ssp.whatsapp_service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageOptions {
    
    private Integer delay;
    private String presence;
    private Boolean linkPreview;

    public MessageOptions() {}

    public MessageOptions(Integer delay, String presence, Boolean linkPreview) {
        this.delay = delay;
        this.presence = presence;
        this.linkPreview = linkPreview;
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
