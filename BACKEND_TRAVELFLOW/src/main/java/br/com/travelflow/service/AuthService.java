package br.com.travelflow.service;

import br.com.travelflow.domain.dto.CreateUserDto;
import br.com.travelflow.domain.dto.LoginRequest;
import br.com.travelflow.domain.dto.LoginResponse;
import br.com.travelflow.domain.dto.UserLoggedInEvent;
import br.com.travelflow.domain.entity.User;
import br.com.travelflow.repository.UserRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final ApplicationEventPublisher eventPublisher;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       JwtService jwtService,
                       ApplicationEventPublisher eventPublisher,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.eventPublisher = eventPublisher;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest loginRequest){
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .filter(User::getActive)
                .orElseThrow(()-> new BadCredentialsException("Invalid credentials"));

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new BadCredentialsException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getUsername(), user.getRole().name());

        eventPublisher.publishEvent(new UserLoggedInEvent(user.getUsername()));

        return new LoginResponse(
                token, user.getUsername(), user.getFullName(), user.getRole().name()
        );
    }

    @Transactional
    public LoginResponse createUser(CreateUserDto createUSerDto){
        try {
            User user = new User(
                    createUSerDto.getUsername(),
                    createUSerDto.getEmail(),
                    passwordEncoder.encode(createUSerDto.getPassword()),
                    createUSerDto.getFullName(),
                    createUSerDto.getRole()
            );

            User persistedUser = userRepository.save(user);

            String token = jwtService.generateToken(
                    persistedUser.getUsername(),
                    persistedUser.getRole().name());

            return new LoginResponse(
                    token,
                    persistedUser.getUsername(),
                    persistedUser.getFullName(),
                    persistedUser.getRole().name()
            );
        } catch (DataIntegrityViolationException e){
            throw new DataIntegrityViolationException("Username or Email already exists");
        }
    }

}
