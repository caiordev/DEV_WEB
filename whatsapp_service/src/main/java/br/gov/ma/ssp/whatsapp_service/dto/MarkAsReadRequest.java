package br.gov.ma.ssp.whatsapp_service.dto;

import java.util.List;

public class MarkAsReadRequest {
    private List<ReadMessage> readMessages;

    public MarkAsReadRequest(List<ReadMessage> readMessages) {
        this.readMessages = readMessages;
    }

    public List<ReadMessage> getReadMessages() { return readMessages; }
    public void setReadMessages(List<ReadMessage> readMessages) { this.readMessages = readMessages; }
}