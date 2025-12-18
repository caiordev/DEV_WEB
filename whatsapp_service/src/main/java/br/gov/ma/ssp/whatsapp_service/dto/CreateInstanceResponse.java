package br.gov.ma.ssp.whatsapp_service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CreateInstanceResponse {
    private String instanceName;
    private String status;
    private QRCodeData qrcode;

    // Getters e Setters
    public String getInstanceName() { return instanceName; }
    public void setInstanceName(String instanceName) { this.instanceName = instanceName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public QRCodeData getQrcode() { return qrcode; }
    public void setQrcode(QRCodeData qrcode) { this.qrcode = qrcode; }

    public static class QRCodeData {
        private String code;
        private String base64;

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }

        public String getBase64() { return base64; }
        public void setBase64(String base64) { this.base64 = base64; }
    }
}