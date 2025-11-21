package br.com.travelflow.service;

import br.com.travelflow.domain.dto.CreateUserDto;
import br.com.travelflow.domain.dto.LoginRequest;
import br.com.travelflow.domain.dto.LoginResponse;
import br.com.travelflow.domain.entity.User;
import br.com.travelflow.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest loginRequest){
        try{
            Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());

            if(userOpt.isEmpty() || !userOpt.get().getActive()){
                throw new RuntimeException("Invalid credentials");
            }

            User user = userOpt.get();

            if(!bCryptPasswordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
                throw new RuntimeException("Invalid credentials");
            }

            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);

            String token = jwtService.generateToken(user.getUsername(), user.getRole().name());

            return new LoginResponse(
                    token, user.getUsername(), user.getFullName(), user.getRole().name()
            );
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }

    public LoginResponse createUser(CreateUserDto createUSerDto){

        if(userRepository.existsByUsername(createUSerDto.getUsername())){
            throw new RuntimeException("Username already exists");
        }

        if(userRepository.existsByEmail(createUSerDto.getEmail())){
            throw new RuntimeException("Email already exists");
        }

        User user = new User(
                createUSerDto.getUsername(),
                createUSerDto.getEmail(),
                createUSerDto.getPassword(),
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
    }

}
