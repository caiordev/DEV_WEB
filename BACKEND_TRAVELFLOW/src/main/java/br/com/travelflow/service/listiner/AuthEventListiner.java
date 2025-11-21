package br.com.travelflow.service.listiner;

import br.com.travelflow.domain.dto.UserLoggedInEvent;
import br.com.travelflow.repository.UserRepository;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
public class AuthEventListiner {
    private final UserRepository userRepository;

    public AuthEventListiner(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Async
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleUserLoggedIn(UserLoggedInEvent event) {
        try{
            userRepository.findByUsername(event.username()).ifPresent(user -> {
                user.setLastLogin(LocalDateTime.now());
                userRepository.save(user);
            });
        } catch (Exception e) {
            System.out.println("Failed to update last login for user: " + event.username());
        }
    }
}
