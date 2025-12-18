# Documentação TravelFlow

## 1. Nome do sistema e descrição breve

**TravelFlow (Backend)** é uma API REST para gestão de agências de viagens, com autenticação via JWT e operações de cadastro/consulta de clientes, viagens, pacotes, disponibilidade, vouchers e notificações.

## 1.1. Descrição detalhada do projeto

O TravelFlow é um backend desenvolvido para suportar um cenário de agência de viagens, permitindo:

- Autenticação e autorização por perfil (roles)
- Multi-agência (as operações são filtradas pela agência do usuário autenticado)
- Cadastro e busca de clientes
- Cadastro e gestão de viagens e pacotes
- Controle de disponibilidade
- Emissão e consulta de vouchers
- Indicadores básicos no dashboard e notificações

O objetivo é fornecer uma API REST pronta para consumo por um frontend (ex.: React) ou por ferramentas de teste como Postman/Insomnia, além de disponibilizar documentação via Swagger.

## 2. Autor

- **Nome:** Caio Reis Batista
- **Matrícula:** 20240000791

## 3. Tecnologias utilizadas (com versões)

- **Java:** 17 (definido em `pom.xml`)
- **Spring Boot:** 3.5.7 (parent do Maven)
- **Spring Web:** (starter)
- **Spring Security:** (starter)
- **Spring Data JPA:** (starter)
- **Bean Validation:** `spring-boot-starter-validation`
- **JWT:** `io.jsonwebtoken:jjwt` 0.11.5
- **Swagger/OpenAPI:** Springdoc OpenAPI `2.6.0`
- **Banco de dados (dev):** H2 (`com.h2database:h2`)
- **Banco de dados (prod):** PostgreSQL (`org.postgresql:postgresql`)
- **Actuator:** `spring-boot-starter-actuator`
- **Build:** Maven + Spring Boot Maven Plugin

## 4. Pré-requisitos

- **JDK 17** instalado e configurado no `PATH`
- **Maven** (ou usar o Maven da IDE)
- Para **produção (profile `prod`)**:
  - PostgreSQL instalado
  - Banco/usuário configurados (ou ajustar `src/main/resources/application-prod.properties`)

## 4.1. Configuração (variáveis de ambiente, banco de dados)

### 4.1.1. Variáveis de ambiente

- `JWT_SECRET`:
  - Usada para assinar tokens JWT.
  - Caso não seja definida, o projeto usa um valor default configurado nos `application-*.properties`.

### 4.1.2. Banco de dados (profiles)

- **`dev`** (H2):
  - Configuração em `src/main/resources/application-dev.properties`
  - Banco local em arquivo: `jdbc:h2:file:./data/travelflowdb`
  - Console H2: `http://localhost:8082/h2-console`

- **`prod`** (PostgreSQL):
  - Configuração em `src/main/resources/application-prod.properties`
  - Ajuste `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password` conforme seu ambiente.

## 5. Instalação (passo a passo)

1. Clonar/baixar o projeto.
2. Abrir a pasta do projeto no IntelliJ/Eclipse/VS Code.
3. Garantir que a IDE está usando **Java 17**.
4. Baixar dependências Maven:
   - Pela IDE (Import Maven) **ou**
   - Via terminal:
     - `mvn clean install`

## 6. Execução (como rodar o servidor)

### 6.1. Porta

Por padrão o servidor sobe na porta:

- `server.port=8082` (em `application.properties`)

URL base típica:

- `http://localhost:8082`

### 6.1.1. Swagger/OpenAPI

Com o servidor rodando, a documentação interativa fica disponível em:

- Swagger UI: `http://localhost:8082/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8082/v3/api-docs`

### 6.2. Profile ativo

O profile ativo padrão está definido em:

- `spring.profiles.active=prod` (em `src/main/resources/application.properties`)

Isso significa que, por padrão, ele tentará conectar no PostgreSQL conforme `application-prod.properties`.

### 6.3. Rodar em desenvolvimento (H2)

Recomendado para testes locais.

#### 6.3.1. Importante (Schema do banco / DDL CREATE)

Para atender a exigência de entrega do **schema do banco**, o profile `dev` está configurado para:

- Criar as tabelas automaticamente via JPA/Hibernate com `spring.jpa.hibernate.ddl-auto=create`.
- Gerar um arquivo `schema.sql` na **raiz do projeto** ao iniciar a aplicação em `dev`.

Opção A (terminal):

- `mvn spring-boot:run -Dspring-boot.run.profiles=dev`

Após subir em `dev`, verifique o arquivo gerado:

- `./schema.sql`

Opção B (IDE):

- Adicionar variável/argumento: `--spring.profiles.active=dev`

H2 Console (somente no `dev`):

- `http://localhost:8082/h2-console`
- JDBC URL usada no dev: `jdbc:h2:file:./data/travelflowdb`

### 6.4. Rodar em produção (PostgreSQL)

1. Ajustar credenciais/URL do Postgres em `application-prod.properties` se necessário.
2. Rodar:

- `mvn spring-boot:run -Dspring-boot.run.profiles=prod`

### 6.5. Usuário padrão para testes

O projeto possui um carregamento inicial (seed) em `LocalDataLoader` (ativo nos profiles `dev` e `prod`). Se não houver usuários no banco, ele cria:

- **Usuário:** `admin`
- **Senha:** `123456`
- **Email:** `admin@travelflow.com.br`
- **Agency:** `TravelFlow Agency`

## 7. Estrutura do projeto

Principais pastas em `src/main/java/br/com/travelflow`:

- **`config/`**
  - Configurações de JPA e carga inicial (`LocalDataLoader`).
- **`domain/`**
  - Entidades (`entity/`) e DTOs (`dto/`) usados nas requisições/respostas.
- **`repository/`**
  - Repositórios Spring Data JPA.
- **`service/`**
  - Regras de negócio (ex.: autenticação, vouchers, dashboard, etc.).
- **`security/`**
  - Configuração do Spring Security, filtro JWT e utilitários de autenticação.
- **`web/`**
  - Controllers REST (`web/controller/`) e camada de entrada da API.

Recursos em `src/main/resources`:

- `application.properties` (config base)
- `application-dev.properties` (H2 + logs debug)
- `application-prod.properties` (PostgreSQL)

## 8. Funcionalidades implementadas

- Autenticação com **JWT**
  - Login e registro
  - Logout (revogação de token)
  - Recuperação de senha (request/confirm)
  - Recuperação de usuário atual (`/auth/me`)
- Controle de acesso por **roles** (`ADMIN` / `USER`) via Spring Security
- Gestão de **clientes** (`/customers`) com:
  - CRUD
  - Busca por CPF, email, nome e pesquisa textual
  - "find-or-create"
- Gestão de **viagens** (`/trips`) com:
  - CRUD
  - Busca/pesquisa e filtros (destino/localização)
  - Listagem de destinos
- Gestão de **pacotes de viagem** (`/packages`) com CRUD e listagem de ativos
- Gestão de **disponibilidades** (`/availabilities`) com CRUD e filtros por viagem e período
- Gestão de **vouchers** (`/vouchers`) com:
  - Criação e listagens por número, cliente, período e destino
  - Pesquisa
- **Dashboard** (`/dashboard/stats`) com estatísticas por agência
- **Notificações** (`/notifications`) com:
  - Listar todas
  - Listar não lidas + contagem
  - Marcar como lida / marcar todas
  - Excluir
- Endpoints do **Actuator** (saúde e info públicos; demais restritos)

## 9. Funcionalidades não implementadas (nesta entrega)

- Testes automatizados abrangentes (unit/integration) para todos os serviços
- Deploy/CI (pipeline) e conteinerização (Docker)
- Paginação/ordenação padronizada em todas as listagens

## 10. Decisões técnicas

- **Spring Boot 3 + Java 17**:
  - Stack atual e estável, com ecossistema forte para APIs REST.
- **JWT (JJWT 0.11.5)**:
  - Autenticação stateless, simples de integrar com frontend.
- **H2 no `dev` e PostgreSQL no `prod`**:
  - H2 facilita rodar local sem dependências externas.
  - PostgreSQL atende cenário mais realista em produção.
- **Seed de dados (`LocalDataLoader`)**:
  - Cria agência e admin padrão para facilitar testes e demonstração.

## 10.1. Segurança (1.3)

- **Senhas armazenadas com hash (bcrypt)**
  - As senhas nunca são armazenadas em texto puro.
  - A aplicação usa `BCryptPasswordEncoder` (Spring Security) para:
    - Criar usuário (`AuthService.createUser` / `AuthService.createAgency`)
    - Validar login (`AuthService.login` usa `passwordEncoder.matches(...)`).

- **Proteção contra SQL Injection**
  - O acesso ao banco é feito via **Spring Data JPA/Hibernate** (ORM).
  - Consultas são construídas pelo ORM (equivalente a prepared statements), reduzindo risco de SQL injection.

- **Validação e sanitização de inputs**
  - Controllers recebem payloads com `@Valid`.
  - DTOs e entidades usam **Bean Validation** (`@NotBlank`, `@Email`, `@Size`, etc.).
  - Exemplos: `LoginRequest`, `CreateUserDto`, `CustomerDto`.

- **Proteção CSRF (se aplicável)**
  - O backend é **stateless** e autentica via **JWT**.
  - Por isso o CSRF está desabilitado em `SecurityConfig` (`csrf().disable()`), pois CSRF é mais relevante em autenticação baseada em cookie/sessão.

- **Controle de acesso adequado**
  - Autorização por **roles** (`ADMIN` / `USER`).
  - Uso de `@PreAuthorize` nos endpoints sensíveis e regras no `SecurityFilterChain`.
  - `@EnableMethodSecurity` habilitado para suportar `@PreAuthorize`.

- **Tratamento seguro de sessões**
  - A API roda com `SessionCreationPolicy.STATELESS`.
  - Não mantém sessão no servidor.
  - Logout é implementado via revogação de token (blacklist) (`POST /auth/logout`).

## 11. Rotas/Endpoints da API

Base URL: `http://localhost:8082`

### 11.1. Autenticação (`/auth`)

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`
- `POST /auth/password-reset/request`
- `POST /auth/password-reset/confirm`
- `GET /auth/me`
- `GET /auth/users` (ADMIN)
- `POST /auth/agencies`
- `GET /auth/agencies/all` (ADMIN e **somente super admin**, conforme regra em `AuthService`)
- `GET /auth/super-admin-check`

### 11.2. Clientes (`/customers`)

- `GET /customers`
- `GET /customers/{id}`
- `GET /customers/by-cpf/{cpf}`
- `GET /customers/by-email?email=...`
- `GET /customers/search?q=...`
- `GET /customers/by-name?name=...`
- `POST /customers`
- `POST /customers/find-or-create`
- `PUT /customers/{id}`
- `DELETE /customers/{id}`
- `GET /customers/{id}/exists`
- `GET /customers/cpf/{cpf}/exists`
- `GET /customers/email/exists?email=...`

### 11.3. Viagens (`/trips`)

- `GET /trips`
- `GET /trips/{id}`
- `GET /trips/search?q=...`
- `GET /trips/destinations`
- `GET /trips/by-destination?destination=...`
- `GET /trips/by-location?location=...`
- `POST /trips`
- `PUT /trips/{id}`
- `DELETE /trips/{id}`
- `GET /trips/{id}/exists`

### 11.4. Pacotes (`/packages`) (ADMIN/USER)

- `GET /packages`
- `GET /packages/active`
- `GET /packages/{id}`
- `POST /packages`
- `PUT /packages/{id}`
- `DELETE /packages/{id}`

### 11.5. Disponibilidades (`/availabilities`) (ADMIN/USER)

- `GET /availabilities`
- `GET /availabilities/{id}`
- `GET /availabilities/trip/{tripId}`
- `GET /availabilities/date-range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- `POST /availabilities`
- `PUT /availabilities/{id}`
- `DELETE /availabilities/{id}`

### 11.6. Vouchers (`/vouchers`)

- `GET /vouchers`
- `GET /vouchers/{id}`
- `GET /vouchers/by-number/{voucherNumber}`
- `GET /vouchers/by-customer/{customerId}`
- `GET /vouchers/by-date-range?startDate=...&endDate=...` (ISO date-time)
- `GET /vouchers/by-destination?destination=...`
- `GET /vouchers/search?q=...`
- `POST /vouchers`
- `DELETE /vouchers/{id}`
- `GET /vouchers/{id}/exists`
- `GET /vouchers/number/{voucherNumber}/exists`

### 11.7. Dashboard (`/dashboard`) (ADMIN/USER)

- `GET /dashboard/stats`

### 11.8. Notificações (`/notifications`) (ADMIN/USER)

- `GET /notifications`
- `GET /notifications/unread`
- `GET /notifications/unread/count`
- `POST /notifications`
- `PUT /notifications/{id}/read`
- `PUT /notifications/read-all`
- `DELETE /notifications/{id}`

### 11.9. Actuator

- `GET /actuator/health`
- `GET /actuator/info`


## 12. Vídeo demonstrativo

- Link: (adicione aqui o link do YouTube/Drive)

## 13. Diagrama de Arquitetura (2.3)

Adicionar um diagrama (Draw.io/Lucidchart) mostrando:

- Componentes principais (Controller → Service → Repository → DB)
- Fluxo de autenticação (login → JWT → filtro → controllers)
- Integrações externas (se existirem)

Sugestão:

- Arquivo: `docs/architecture/architecture.drawio` (ou `.png` exportado)
- Link: (adicione aqui o link do diagrama)

## 14. Modelo de Dados (2.4)

### 14.1. Diagrama ER

- Link/arquivo do diagrama ER: (adicione aqui)
  - Sugestão: `docs/data-model/er-diagram.png` e/ou `docs/data-model/er-diagram.drawio`

### 14.2. Descrição textual do schema

Entidades principais (visão geral):

- **Agency**: dados da agência.
- **User**: usuários da agência (role ADMIN/USER).
- **Customer**: clientes.
- **Trip**: viagens/destinos.
- **TravelPackage** e **PackageImage**: pacotes e imagens.
- **Availability**: disponibilidades por período/viagem.
- **Voucher** e **VoucherTrip**: registro de vendas/emissão de voucher.
- **Notification**: notificações por agência.

### 14.3. Scripts SQL de criação

- O arquivo `schema.sql` é gerado automaticamente ao iniciar o projeto em `dev`:
  - `mvn spring-boot:run -Dspring-boot.run.profiles=dev`
  - Saída: `./schema.sql`

## 15. Melhorias futuras

- Melhorar tratamento de erros (responses padronizados com `@ControllerAdvice`)
- Paginação e ordenação padronizadas em listagens
- Testes automatizados (unitários e integração)
- Envio de email real no fluxo de recuperação de senha
- Observabilidade (logs estruturados e métricas adicionais)

## 16. Dificuldades encontradas e como foram resolvidas

- **Configuração de autenticação stateless (JWT) no Spring Security 6**
  - Solução: criação de filtro `JwtAuthenticationFilter` e configuração do `SecurityFilterChain` com `SessionCreationPolicy.STATELESS`.
- **Ambientes diferentes (H2 vs PostgreSQL)**
  - Solução: uso de profiles `dev` e `prod` com `application-dev.properties` e `application-prod.properties`.
- **CORS para integração com frontend**
  - Solução: configuração de CORS via `CorsConfigurationSource` com lista de origens em `cors.allowed-origins`.
