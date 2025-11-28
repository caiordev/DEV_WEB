package br.com.travelflow.config;

import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.domain.entity.User;
import br.com.travelflow.domain.entity.UserRole;
import br.com.travelflow.repository.AgencyRepository;
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
    public CommandLineRunner loadData(UserRepository userRepository, AgencyRepository agencyRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if(userRepository.count() == 0) {
                Agency agency = new Agency(
                        "TravelFlow Agency",
                        "12.345.678/0001-90",
                        "agency@travelflow.com.br",
                        "9899999-9999",
                        "Rua das Viagens, 123, São Paulo, SP"
                );
                agencyRepository.save(agency);

                User admin = new User(
                        "admin",
                        "admin@travelflow.com.br",
                        passwordEncoder.encode("123456"),
                        "Administrador",
                        UserRole.ADMIN,
                        agency
                );
                admin.setAgency(agency);
                userRepository.save(admin);
                System.out.println("--- AGÊNCIA E USUÁRIO ADMIN CRIADOS PARA TESTES ---");
            }
        };
    }
}
