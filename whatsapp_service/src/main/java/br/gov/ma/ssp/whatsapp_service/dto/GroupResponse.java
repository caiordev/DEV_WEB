package br.gov.ma.ssp.whatsapp_service.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import br.gov.ma.ssp.whatsapp_service.entity.Group;

public class GroupResponse {

    private Long id;
    private String nome;
    private String descricao;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ContactResponse> contacts;

    public GroupResponse() {
    }

    public GroupResponse(Group group) {
        this.id = group.getId();
        this.nome = group.getNome();
        this.descricao = group.getDescricao();
        this.createdAt = group.getCreatedAt();
        this.updatedAt = group.getUpdatedAt();
        this.contacts = group.getContacts().stream()
                .map(ContactResponse::new)
                .collect(Collectors.toList());
    }

    public GroupResponse(Group group, boolean includeContacts) {
        this.id = group.getId();
        this.nome = group.getNome();
        this.descricao = group.getDescricao();
        this.createdAt = group.getCreatedAt();
        this.updatedAt = group.getUpdatedAt();
        if (includeContacts) {
            this.contacts = group.getContacts().stream()
                    .map(ContactResponse::new)
                    .collect(Collectors.toList());
        }
    }

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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
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

    public List<ContactResponse> getContacts() {
        return contacts;
    }

    public void setContacts(List<ContactResponse> contacts) {
        this.contacts = contacts;
    }
}
