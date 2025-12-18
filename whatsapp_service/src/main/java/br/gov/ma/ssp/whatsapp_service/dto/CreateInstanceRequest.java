package br.gov.ma.ssp.whatsapp_service.dto;

public class CreateInstanceRequest {
    private String instanceName;
    private boolean qrcode;
    private String integration;

    public CreateInstanceRequest(String instanceName, boolean qrcode, String integration) {
        this.instanceName = instanceName;
        this.qrcode = qrcode;
        this.integration = integration;
    }

    // Getters e Setters
    public String getInstanceName() { return instanceName; }
    public void setInstanceName(String instanceName) { this.instanceName = instanceName; }

    public boolean isQrcode() { return qrcode; }
    public void setQrcode(boolean qrcode) { this.qrcode = qrcode; }

    public String getIntegration() { return integration; }
    public void setIntegration(String integration) { this.integration = integration; }
}