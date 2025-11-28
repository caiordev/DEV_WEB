package br.com.travelflow.domain.dto;

public class LoginResponse {

    private String token;
    private String username;
    private String fullName;
    private String role;
    private Long agencyId;
    private String agencyName;

    public LoginResponse() {}

    public LoginResponse(String token, String username, String fullName, String role, Long agencyId, String agencyName) {
        this.token = token;
        this.username = username;
        this.fullName = fullName;
        this.role = role;
        this.agencyId = agencyId;
        this.agencyName = agencyName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getAgencyId() {
        return agencyId;
    }

    public void setAgencyId(Long agencyId) {
        this.agencyId = agencyId;
    }

    public String getAgencyName() {
        return agencyName;
    }

    public void setAgencyName(String agencyName) {
        this.agencyName = agencyName;
    }
}
