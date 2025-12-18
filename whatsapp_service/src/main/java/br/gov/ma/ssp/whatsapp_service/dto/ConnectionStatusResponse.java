package br.gov.ma.ssp.whatsapp_service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ConnectionStatusResponse {

    private Instance instance;

    public Instance getInstance() { return instance; }
    public void setInstance(Instance instance) { this.instance = instance; }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Instance {
        private String instanceName;
        private String state;

        public String getInstanceName() { return instanceName; }
        public void setInstanceName(String instanceName) { this.instanceName = instanceName; }

        public String getState() { return state; }
        public void setState(String state) { this.state = state; }
    }
}
