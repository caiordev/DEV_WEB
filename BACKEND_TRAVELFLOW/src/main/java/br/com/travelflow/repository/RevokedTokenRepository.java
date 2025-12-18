package br.com.travelflow.repository;

import br.com.travelflow.domain.entity.RevokedToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface RevokedTokenRepository extends JpaRepository<RevokedToken, Long> {
    boolean existsByTokenHash(String tokenHash);

    long deleteByExpiresAtBefore(LocalDateTime cutoff);
}
