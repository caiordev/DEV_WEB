package br.com.travelflow.security;

public class AuthenticationDetails {

    private final Long agencyId;
    private final String role;

    public AuthenticationDetails(Long agencyId, String role) {
        this.agencyId = agencyId;
        this.role = role;
    }

    public Long getAgencyId() {
        return agencyId;
    }

    public String getRole() {
        return role;
    }
}
