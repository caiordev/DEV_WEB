package br.gov.ma.ssp.whatsapp_service.dto;

public class SetWebhookManualRequest {
    private String webhookUrl;

    public String getWebhookUrl() { return webhookUrl; }
    public void setWebhookUrl(String webhookUrl) { this.webhookUrl = webhookUrl; }
}