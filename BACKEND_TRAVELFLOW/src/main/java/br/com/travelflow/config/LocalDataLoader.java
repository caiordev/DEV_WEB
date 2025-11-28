package br.com.travelflow.config;

import br.com.travelflow.domain.entity.User;
import br.com.travelflow.domain.entity.UserRole;
import br.com.travelflow.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Profile("dev")
public class LocalDataLoader {
    @Bean
    public CommandLineRunner loadData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if(userRepository.count() == 0) {
                User admin = new User(
                        "admin",
                        "admin@travelflow.com.br",
                        passwordEncoder.encode("123456"),
                        "Administrador",
                        UserRole.ADMIN
                );
                userRepository.save(admin);
                System.out.println("--- USUÁRIO ADMIN CRIADO PARA TESTES ---");
            }
        };
    }
}
