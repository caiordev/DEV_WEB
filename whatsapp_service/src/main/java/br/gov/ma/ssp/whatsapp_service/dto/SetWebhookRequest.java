package br.gov.ma.ssp.whatsapp_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class SetWebhookRequest {
    private String url;

    @JsonProperty("webhook_by_events")
    private boolean webhookByEvents;

    @JsonProperty("webhook_base64")
    private boolean webhookBase64;

    private List<String> events;

    public SetWebhookRequest(String url, boolean webhookByEvents,
                             boolean webhookBase64, List<String> events) {
        this.url = url;
        this.webhookByEvents = webhookByEvents;
        this.webhookBase64 = webhookBase64;
        this.events = events;
    }

    // Getters e Setters
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public boolean isWebhookByEvents() { return webhookByEvents; }
    public void setWebhookByEvents(boolean webhookByEvents) { this.webhookByEvents = webhookByEvents; }

    public boolean isWebhookBase64() { return webhookBase64; }
    public void setWebhookBase64(boolean webhookBase64) { this.webhookBase64 = webhookBase64; }

    public List<String> getEvents() { return events; }
    public void setEvents(List<String> events) { this.events = events; }
}