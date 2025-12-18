package br.com.travelflow.service;

import br.com.travelflow.domain.dto.PasswordResetConfirmRequest;
import br.com.travelflow.domain.dto.PasswordResetRequest;
import br.com.travelflow.domain.dto.PasswordResetTokenResponse;
import br.com.travelflow.domain.entity.PasswordResetToken;
import br.com.travelflow.domain.entity.User;
import br.com.travelflow.repository.PasswordResetTokenRepository;
import br.com.travelflow.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    private static final int RESET_TOKEN_TTL_MINUTES = 30;

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;

    public PasswordResetService(UserRepository userRepository,
                               PasswordResetTokenRepository passwordResetTokenRepository,
                               PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public PasswordResetTokenResponse requestReset(PasswordResetRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String rawToken = UUID.randomUUID().toString().replace("-", "") + UUID.randomUUID().toString().replace("-", "");
        String tokenHash = sha256Hex(rawToken);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiresAt = now.plusMinutes(RESET_TOKEN_TTL_MINUTES);

        PasswordResetToken entity = new PasswordResetToken(user, tokenHash, now, expiresAt);
        passwordResetTokenRepository.save(entity);

        return new PasswordResetTokenResponse(rawToken, expiresAt);
    }

    @Transactional
    public void confirmReset(PasswordResetConfirmRequest request) {
        String tokenHash = sha256Hex(request.getToken());

        PasswordResetToken resetToken = passwordResetTokenRepository
                .findByTokenHashAndUsedAtIsNullAndExpiresAtAfter(tokenHash, LocalDateTime.now())
                .orElseThrow(() -> new RuntimeException("Invalid or expired reset token"));

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        resetToken.setUsedAt(LocalDateTime.now());
        passwordResetTokenRepository.save(resetToken);
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
