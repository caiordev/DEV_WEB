package br.com.travelflow.security;

import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.repository.AgencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Component
public class SecurityUtils {

    private static AgencyRepository agencyRepository;

    @Autowired
    public SecurityUtils(AgencyRepository agencyRepository) {
        SecurityUtils.agencyRepository = agencyRepository;
    }

    public static Long getCurrentAgencyId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getDetails() instanceof AuthenticationDetails) {
            AuthenticationDetails details = (AuthenticationDetails) authentication.getDetails();
            return details.getAgencyId();
        }
        throw new RuntimeException("No authenticated user or agency context found");
    }

    public static Agency getCurrentUserAgency() {
        Long agencyId = getCurrentAgencyId();
        return agencyRepository.findById(agencyId)
                .orElseThrow(() -> new RuntimeException("Agency not found for current user"));
    }

    public static String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return authentication.getName();
        }
        return null;
    }

    public static String getCurrentUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getDetails() instanceof AuthenticationDetails) {
            AuthenticationDetails details = (AuthenticationDetails) authentication.getDetails();
            return details.getRole();
        }
        return null;
    }

    public static boolean isAdmin() {
        String role = getCurrentUserRole();
        return "ADMIN".equals(role);
    }
}
