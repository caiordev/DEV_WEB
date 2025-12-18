package br.com.travelflow.domain.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "revoked_tokens", indexes = {
        @Index(name = "idx_revoked_tokens_token_hash", columnList = "token_hash", unique = true),
        @Index(name = "idx_revoked_tokens_expires_at", columnList = "expires_at")
})
public class RevokedToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "token_hash", nullable = false, unique = true, length = 64)
    private String tokenHash;

    @Column(name = "revoked_at", nullable = false)
    private LocalDateTime revokedAt;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    public RevokedToken() {
    }

    public RevokedToken(String tokenHash, LocalDateTime revokedAt, LocalDateTime expiresAt) {
        this.tokenHash = tokenHash;
        this.revokedAt = revokedAt;
        this.expiresAt = expiresAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTokenHash() {
        return tokenHash;
    }

    public void setTokenHash(String tokenHash) {
        this.tokenHash = tokenHash;
    }

    public LocalDateTime getRevokedAt() {
        return revokedAt;
    }

    public void setRevokedAt(LocalDateTime revokedAt) {
        this.revokedAt = revokedAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }
}
