package br.gov.ma.ssp.whatsapp_service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MessageResponse {

    private MessageKey key;
    private MessageDetails message;
    private String messageTimestamp;
    private String status;

    public MessageKey getKey() {
        return key;
    }

    public void setKey(MessageKey key) {
        this.key = key;
    }

    public MessageDetails getMessage() {
        return message;
    }

    public void setMessage(MessageDetails message) {
        this.message = message;
    }

    public String getMessageTimestamp() {
        return messageTimestamp;
    }

    public void setMessageTimestamp(String messageTimestamp) {
        this.messageTimestamp = messageTimestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static class MessageKey {

        private String remoteJid;
        private boolean fromMe;
        private String id;

        public String getRemoteJid() {
            return remoteJid;
        }

        public void setRemoteJid(String remoteJid) {
            this.remoteJid = remoteJid;
        }

        public boolean isFromMe() {
            return fromMe;
        }

        public void setFromMe(boolean fromMe) {
            this.fromMe = fromMe;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }
    }

    public static class ExtendedTextMessage {
        private String text;

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }

    public static class MessageDetails {
        private ExtendedTextMessage extendedTextMessage;

        public ExtendedTextMessage getExtendedTextMessage() {
            return extendedTextMessage;
        }

        public void setExtendedTextMessage(ExtendedTextMessage extendedTextMessage) {
            this.extendedTextMessage = extendedTextMessage;
        }
    }

}