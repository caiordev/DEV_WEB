package br.gov.ma.ssp.whatsapp_service.dto;

import jakarta.validation.constraints.NotBlank;

public class GroupRequest {

    @NotBlank(message = "Nome do grupo é obrigatório")
    private String nome;

    private String descricao;

    public GroupRequest() {
    }

    public GroupRequest(String nome, String descricao) {
        this.nome = nome;
        this.descricao = descricao;
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
}
