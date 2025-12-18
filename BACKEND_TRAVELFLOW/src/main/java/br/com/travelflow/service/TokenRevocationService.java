package br.com.travelflow.service;

import br.com.travelflow.repository.RevokedTokenRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;

import br.com.travelflow.domain.entity.RevokedToken;

@Service
public class TokenRevocationService {

    private final RevokedTokenRepository revokedTokenRepository;

    public TokenRevocationService(RevokedTokenRepository revokedTokenRepository) {
        this.revokedTokenRepository = revokedTokenRepository;
    }

    public boolean isRevoked(String jwt) {
        String tokenHash = sha256Hex(jwt);
        return revokedTokenRepository.existsByTokenHash(tokenHash);
    }

    @Transactional
    public void revoke(String jwt, LocalDateTime expiresAt) {
        String tokenHash = sha256Hex(jwt);
        if (revokedTokenRepository.existsByTokenHash(tokenHash)) {
            return;
        }
        revokedTokenRepository.save(new RevokedToken(tokenHash, LocalDateTime.now(), expiresAt));
    }

    @Transactional
    public long cleanupExpired(LocalDateTime now) {
        return revokedTokenRepository.deleteByExpiresAtBefore(now);
    }

    private String sha256Hex(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] bytes = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder(bytes.length * 2);
            for (byte b : bytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to hash token", e);
        }
    }
}
