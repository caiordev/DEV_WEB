package br.com.travelflow.web.controller;

import br.com.travelflow.domain.dto.*;
import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.domain.entity.User;
import br.com.travelflow.service.AuthService;
import br.com.travelflow.service.JwtService;
import br.com.travelflow.service.PasswordResetService;
import br.com.travelflow.service.TokenRevocationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;
    private final TokenRevocationService tokenRevocationService;
    private final PasswordResetService passwordResetService;

    public AuthController(AuthService authService,
                          JwtService jwtService,
                          TokenRevocationService tokenRevocationService,
                          PasswordResetService passwordResetService) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.tokenRevocationService = tokenRevocationService;
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login (@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> createUser(@Valid @RequestBody CreateUserDto createUserDto) {
        LoginResponse response = authService.createUser(createUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }

        String jwt = authorization.substring(7);
        LocalDateTime expiresAt = jwtService.extractExpiration(jwt)
                .toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();

        tokenRevocationService.revoke(jwt, expiresAt);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/password-reset/request")
    public ResponseEntity<PasswordResetTokenResponse> requestPasswordReset(@Valid @RequestBody PasswordResetRequest request) {
        PasswordResetTokenResponse response = passwordResetService.requestReset(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/password-reset/confirm")
    public ResponseEntity<Void> confirmPasswordReset(@Valid @RequestBody PasswordResetConfirmRequest request) {
        passwordResetService.confirmReset(request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAgencyUsers() {
        List<UserDto> users = authService.getAgencyUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/agencies")
    public ResponseEntity<Agency> createAgency(@Valid @RequestBody CreateAgencyDto createAgencyDto) {
        try {
            Agency agency = authService.createAgency(createAgencyDto);
            return ResponseEntity.ok(agency);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/agencies/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllAgencies() {
        try {
            if (!authService.isSuperAdmin()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado: apenas o super admin pode acessar esta funcionalidade");
            }

            List<Agency> agencies = authService.getAllAgencies();
            return ResponseEntity.ok(agencies);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/super-admin-check")
    public ResponseEntity<Boolean> isSuperAdmin() {
        boolean isSuperAdmin = authService.isSuperAdmin();
        return ResponseEntity.ok(isSuperAdmin);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        User user = authService.getCurrentUser();
        return ResponseEntity.ok(user);
    }
}
