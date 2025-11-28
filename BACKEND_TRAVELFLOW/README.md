# TravelFlow Backend - Configuração de Segurança JWT

## Visão Geral

Este projeto implementa uma configuração de segurança robusta de nível senior para uma aplicação Spring Boot, utilizando JWT (JSON Web Tokens) para autenticação stateless. A configuração foi desenvolvida seguindo melhores práticas de segurança para APIs REST.

## Componentes de Segurança Implementados

### 1. UserDetailsServiceImpl
- **Arquivo**: `src/main/java/br/com/travelflow/security/UserDetailsServiceImpl.java`
- **Função**: Carrega usuários do banco de dados para autenticação
- **Características**:
  - Implementa `UserDetailsService` do Spring Security
  - Carrega usuário por username
  - Converte roles para `GrantedAuthority`
  - Verifica status ativo da conta

### 2. JwtAuthenticationFilter
- **Arquivo**: `src/main/java/br/com/travelflow/security/JwtAuthenticationFilter.java`
- **Função**: Filtro que intercepta requisições e valida tokens JWT
- **Características**:
  - Extende `OncePerRequestFilter`
  - Extrai token do header `Authorization`
  - Valida token usando `JwtService`
  - Define autenticação no `SecurityContextHolder`
  - Tratamento robusto de exceções

### 3. SecurityConfig
- **Arquivo**: `src/main/java/br/com/travelflow/security/SecurityConfig.java`
- **Função**: Configuração central da segurança da aplicação
- **Características**:
  - Stateless session management (adequado para JWT)
  - Configuração CORS personalizada
  - Desabilitação de CSRF (apropriado para APIs REST)
  - Headers de segurança (HSTS, X-Frame-Options, etc.)
  - Tratamento personalizado de exceções

### 4. Configuração de Propriedades
- **Arquivo**: `src/main/resources/application-dev.properties`
- **Propriedades JWT**:
  - `jwt.secret`: Chave secreta para assinatura (configurável via variável de ambiente)
  - `jwt.expiration`: Tempo de expiração do token (24 horas por padrão)
  - `management.security.enabled=false`: Desabilita segurança específica do Actuator

## Regras de Acesso

### Endpoints Públicos
- `POST /auth/login` - Autenticação de usuário
- `POST /auth/register` - Registro de novo usuário
- `/h2-console/**` - Console H2 (apenas desenvolvimento)
- `/actuator/health` - Health check
- `/actuator/info` - Informações da aplicação

### Endpoints Protegidos
- `/auth/me` - Informações do usuário autenticado (requer autenticação)
- `/actuator/**` - Endpoints do Actuator (requer ROLE_ADMIN)
- `/api/**` - APIs da aplicação:
  - `GET`, `POST`, `PUT`: Requer autenticação
  - `DELETE`: Requer ROLE_ADMIN

## Funcionalidades Avançadas

### CORS (Cross-Origin Resource Sharing)
- Configurado para permitir origens específicas (em produção)
- Métodos permitidos: GET, POST, PUT, DELETE, OPTIONS
- Headers personalizados permitidos
- Credenciais permitidas

### Headers de Segurança
- **X-Frame-Options**: DENY (protege contra clickjacking)
- **X-Content-Type-Options**: nosniff
- **Strict-Transport-Security**: HSTS habilitado com subdomains

### Tratamento de Exceções
- **401 Unauthorized**: Para tokens inválidos ou ausentes
- **403 Forbidden**: Para acesso negado baseado em roles
- Respostas JSON customizadas com mensagens claras

## Como Usar

### 1. Registro de Usuário
```bash
POST /auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "password123",
  "fullName": "Administrator",
  "role": "ADMIN"
}
```

### 2. Login
```bash
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

**Resposta**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "admin",
  "fullName": "Administrator",
  "role": "ADMIN"
}
```

### 3. Acesso a Endpoints Protegidos
```bash
GET /auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

## Configuração de Produção

### Variáveis de Ambiente
- `JWT_SECRET`: Chave secreta forte para assinatura JWT (mínimo 32 caracteres)
- `JWT_EXPIRATION`: Tempo de expiração em milissegundos

### CORS em Produção
No `SecurityConfig.java`, substitua:
```java
configuration.setAllowedOriginPatterns(List.of("*"));
```
Por origens específicas:
```java
configuration.setAllowedOrigins(List.of("https://seudominio.com"));
```

### Banco de Dados
Para produção, configure um banco real (PostgreSQL, MySQL, etc.) no `application-prod.properties`.

## Testes

### Health Check
```bash
GET /actuator/health
```

### Métricas (Admin)
```bash
GET /actuator/metrics
Authorization: Bearer <token_admin>
```

### H2 Console (Desenvolvimento)
```
http://localhost:8080/h2-console
```

## Considerações de Segurança

- **Senhas**: Armazenadas com BCrypt
- **Tokens**: Stateless, não armazenados no servidor
- **Roles**: Baseado em enum `UserRole` (USER, ADMIN)
- **Auditoria**: Logs de autenticação via `UserLoggedInEvent`
- **Rate Limiting**: Não implementado (recomendado adicionar)
- **Refresh Tokens**: Não implementado (pode ser adicionado futuramente)

## Dependências Necessárias

- `spring-boot-starter-security`
- `spring-boot-starter-web`
- `io.jsonwebtoken:jjwt-api`, `jjwt-impl`, `jjwt-jackson`
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-validation`

Esta configuração fornece uma base sólida e escalável para aplicações Spring Boot que necessitam de autenticação JWT robusta.
