package br.com.travelflow.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "br.com.travelflow.repository")
@EnableTransactionManagement
public class JpaConfig {
}
