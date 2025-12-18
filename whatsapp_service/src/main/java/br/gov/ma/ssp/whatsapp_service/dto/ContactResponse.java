package br.gov.ma.ssp.whatsapp_service.dto;

import java.time.LocalDateTime;

import br.gov.ma.ssp.whatsapp_service.entity.Contact;

public class ContactResponse {

    private Long id;
    private String nome;
    private String cpf;
    private String contato;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public ContactResponse() {
    }

    public ContactResponse(Contact contact) {
        this.id = contact.getId();
        this.nome = contact.getNome();
        this.cpf = contact.getCpf();
        this.contato = contact.getContato();
        this.createdAt = contact.getCreatedAt();
        this.updatedAt = contact.getUpdatedAt();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
