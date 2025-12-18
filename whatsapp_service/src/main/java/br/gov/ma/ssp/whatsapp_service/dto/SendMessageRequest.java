package br.gov.ma.ssp.whatsapp_service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SendMessageRequest {
    private String number;

    @JsonProperty("textMessage")
    private TextMessage textMessage;
    
    private MessageOptions options;

    public SendMessageRequest() {}

    public SendMessageRequest(String number, TextMessage textMessage) {
        this.number = number;
        this.textMessage = textMessage;
    }
    
    public SendMessageRequest(String number, TextMessage textMessage, MessageOptions options) {
        this.number = number;
        this.textMessage = textMessage;
        this.options = options;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public TextMessage getTextMessage() {
        return textMessage;
    }

    public void setTextMessage(TextMessage textMessage) {
        this.textMessage = textMessage;
    }

    public MessageOptions getOptions() {
        return options;
    }

    public void setOptions(MessageOptions options) {
        this.options = options;
    }
}
