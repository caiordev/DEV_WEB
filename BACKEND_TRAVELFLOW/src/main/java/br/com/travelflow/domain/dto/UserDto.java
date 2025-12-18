package br.com.travelflow.domain.dto;

import br.com.travelflow.domain.entity.UserRole;

public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private UserRole role;
    private boolean active;
    private Long agencyId;
    private String agencyName;

    public UserDto() {}

    public UserDto(Long id, String username, String email, String fullName,
                   UserRole role, boolean active, Long agencyId, String agencyName) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.active = active;
        this.agencyId = agencyId;
        this.agencyName = agencyName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
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
