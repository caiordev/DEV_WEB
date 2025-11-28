package br.com.travelflow.service;

import br.com.travelflow.domain.dto.*;
import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.domain.entity.UserRole;
import br.com.travelflow.repository.AgencyRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.travelflow.domain.entity.User;
import br.com.travelflow.exception.UserAlreadyExistsException;
import br.com.travelflow.repository.UserRepository;
import br.com.travelflow.security.SecurityUtils;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final ApplicationEventPublisher eventPublisher;
    private final PasswordEncoder passwordEncoder;
    private final AgencyRepository agencyRepository;

    public AuthService(UserRepository userRepository,
                       JwtService jwtService,
                       ApplicationEventPublisher eventPublisher,
                       PasswordEncoder passwordEncoder,
                       AgencyRepository agencyRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.eventPublisher = eventPublisher;
        this.passwordEncoder = passwordEncoder;
        this.agencyRepository = agencyRepository;
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest loginRequest){
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .filter(User::getActive)
                .orElseThrow(()-> new BadCredentialsException("Invalid credentials"));

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new BadCredentialsException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getUsername(), user.getRole().name(), user.getAgency().getId());

        eventPublisher.publishEvent(new UserLoggedInEvent(user.getUsername()));

        return new LoginResponse(
                token,
                user.getUsername(),
                user.getFullName(),
                user.getRole().name(),
                user.getAgency().getId(),
                user.getAgency().getName()
        );
    }

    @Transactional
    public Agency createAgency(CreateAgencyDto createAgencyDto) {
        if (agencyRepository.findByCnpj(createAgencyDto.getCnpj()).isPresent()) {
            throw new RuntimeException("CNPJ already exists");
        }

        if (userRepository.existsByUsername(createAgencyDto.getAdminUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(createAgencyDto.getAdminEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Agency agency = new Agency(
                createAgencyDto.getName(),
                createAgencyDto.getCnpj(),
                createAgencyDto.getEmail(),
                createAgencyDto.getPhone(),
                createAgencyDto.getAddress()
        );

        agency = agencyRepository.save(agency);

        User adminUser = new User(
                createAgencyDto.getAdminUsername(),
                createAgencyDto.getAdminEmail(),
                passwordEncoder.encode(createAgencyDto.getAdminPassword()),
                createAgencyDto.getAdminFullName(),
                UserRole.ADMIN,
                agency
        );

        userRepository.save(adminUser);

        return agency;
    }

    @Transactional
    public LoginResponse createUser(CreateUserDto createUSerDto){
        Long agencyId = SecurityUtils.getCurrentAgencyId();

        Agency agency = agencyRepository.findById(agencyId)
                .orElseThrow(() -> new RuntimeException("Agency not found"));

        try {
            User user = new User(
                    createUSerDto.getUsername(),
                    createUSerDto.getEmail(),
                    passwordEncoder.encode(createUSerDto.getPassword()),
                    createUSerDto.getFullName(),
                    createUSerDto.getRole(),
                    agency
            );

            User savedUser = userRepository.save(user);

            String token = jwtService.generateToken(
                    savedUser.getUsername(), savedUser.getRole().name(),savedUser.getAgency().getId());

            return new LoginResponse(
                    token,
                    savedUser.getUsername(),
                    savedUser.getFullName(),
                    savedUser.getRole().name(),
                    savedUser.getAgency().getId(),
                    savedUser.getAgency().getName()
            );
        } catch (DataIntegrityViolationException e){
            throw new UserAlreadyExistsException("Username or Email already exists");
        }
    }

    public User getCurrentUser() {
        String username = SecurityUtils.getCurrentUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Current user not found"));
    }

}
