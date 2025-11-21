package br.com.travelflow.web.controller;

import br.com.travelflow.domain.dto.CreateUserDto;
import br.com.travelflow.domain.dto.LoginRequest;
import br.com.travelflow.domain.dto.LoginResponse;
import br.com.travelflow.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
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
}
