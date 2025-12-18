package br.gov.ma.ssp.whatsapp_service.dto;

public class ReadMessage {
    private String id;
    private boolean fromMe;
    private String remoteJid;

    public ReadMessage(String id, boolean fromMe, String remoteJid) {
        this.id = id;
        this.fromMe = fromMe;
        this.remoteJid = remoteJid;
    }

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public boolean isFromMe() { return fromMe; }
    public void setFromMe(boolean fromMe) { this.fromMe = fromMe; }

    public String getRemoteJid() { return remoteJid; }
    public void setRemoteJid(String remoteJid) { this.remoteJid = remoteJid; }
}