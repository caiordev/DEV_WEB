package br.gov.ma.ssp.whatsapp_service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ConnectInstanceResponse {
    private String base64;
    private String code;
    private int count;

    public String getBase64() { return base64; }
    public void setBase64(String base64) { this.base64 = base64; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public int getCount() { return count; }
    public void setCount(int count) { this.count = count; }
}