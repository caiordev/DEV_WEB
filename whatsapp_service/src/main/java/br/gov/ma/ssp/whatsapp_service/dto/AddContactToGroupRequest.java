package br.gov.ma.ssp.whatsapp_service.dto;

import jakarta.validation.constraints.NotNull;

public class AddContactToGroupRequest {

    @NotNull(message = "ID do contato é obrigatório")
    private Long contactId;

    public AddContactToGroupRequest() {
    }

    public AddContactToGroupRequest(Long contactId) {
        this.contactId = contactId;
    }

    public Long getContactId() {
        return contactId;
    }

    public void setContactId(Long contactId) {
        this.contactId = contactId;
    }
}
