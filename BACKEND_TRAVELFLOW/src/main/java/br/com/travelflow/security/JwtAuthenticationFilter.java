package br.com.travelflow.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.travelflow.service.JwtService;
import br.com.travelflow.service.TokenRevocationService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final TokenRevocationService tokenRevocationService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService, TokenRevocationService tokenRevocationService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.tokenRevocationService = tokenRevocationService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);

        try {
            if (tokenRevocationService.isRevoked(jwt)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: token revoked");
                return;
            }

            username = jwtService.extractUsername(jwt);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                var userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtService.validateToken(jwt, userDetails.getUsername())) {
                    String role = jwtService.extractRole(jwt);
                    Long agencyId = jwtService.extractAgencyId(jwt);

                    var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, authorities);
                    authToken.setDetails(new AuthenticationDetails(agencyId, role));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (io.jsonwebtoken.JwtException | IllegalArgumentException e) {
            logger.warn("JWT token validation failed: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
