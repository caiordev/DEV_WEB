package br.gov.ma.ssp.whatsapp_service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class InstanceInfoResponse {
    private Instance instance;

    public Instance getInstance() { return instance; }
    public void setInstance(Instance instance) { this.instance = instance; }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Instance {
        private String instanceName;
        private String status;
        private String serverUrl;
        private String apikey;

        public String getInstanceName() { return instanceName; }
        public void setInstanceName(String instanceName) { this.instanceName = instanceName; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getServerUrl() { return serverUrl; }
        public void setServerUrl(String serverUrl) { this.serverUrl = serverUrl; }

        public String getApikey() { return apikey; }
        public void setApikey(String apikey) { this.apikey = apikey; }
    }
}