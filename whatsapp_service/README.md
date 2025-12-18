# WhatsApp Service (Spring Boot)

API REST em **Spring Boot** para gerenciamento de contatos e grupos, envio de mensagens via **Evolution API (WhatsApp)**, registro de histórico de envios e processamento de **webhooks** (incluindo integração com **Groq API** para respostas automáticas).

## Autor

- **Nome:** Caio Reis Batista
- **Matrícula:** 20240000791

## Tecnologias utilizadas (versões)

- **Java:** 17 (definido em `pom.xml`)
- **Spring Boot:** 3.5.7 (parent do Maven)
- **Maven:** Maven Wrapper (`./mvnw`)
- **Spring Web:** `spring-boot-starter-web`
- **Spring Data JPA:** `spring-boot-starter-data-jpa`
- **Bean Validation:** `spring-boot-starter-validation`
- **Banco de dados (dev/local):** H2 (`com.h2database:h2`)
- **Banco de dados (opcional/produtivo):** PostgreSQL driver (`org.postgresql:postgresql`)
- **WhatsApp Gateway:** Evolution API Docker Image `atendai/evolution-api:v1.8.7`

## Pré-requisitos

- **JDK 17** instalado
- **Docker** (para rodar a Evolution API)
- (Opcional) **Postman/Insomnia** para testar endpoints

## Instalação (passo a passo)

1. **Clonar o repositório** (ou abrir a pasta do projeto no IDE).
2. **Subir a Evolution API via Docker** (obrigatório para envio/recebimento via WhatsApp):

```bash
docker run -d --name evolution_api --restart always -p 9000:8080 -e AUTHENTICATION_API_KEY=B6D711FCDE4D4FD5936544120E713976 -v evolution_instances:/evolution/instances -v evolution_store:/evolution/store atendai/evolution-api:v1.8.7
```

3. **(Opcional) Ajustar configurações** em `src/main/resources/application.properties`:

- `server.port=3001`
- `evolution.api.url=http://localhost:9000`
- `evolution.api.key=...`
- `evolution.instance.name=ufma`
- `spring.datasource.url=jdbc:h2:file:./data/travelflowdb;`

## Execução (como rodar o servidor)

Na raiz do projeto:

```bash
./mvnw spring-boot:run
```

A API iniciará, por padrão, em:

- **Backend:** `http://localhost:3001`

### Console do H2

Se habilitado (está habilitado no `application.properties`):

- **H2 Console:** `http://localhost:3001/h2-console`
- JDBC URL padrão no projeto: `jdbc:h2:file:./data/travelflowdb;`

## Estrutura do projeto

- **`src/main/java/br/gov/ma/ssp/whatsapp_service/`**
  - **`controller/`**: controllers REST (rotas da API)
  - **`service/`**: regras de negócio e integrações (Evolution API, webhook, histórico)
  - **`entity/`**: entidades JPA (`Contact`, `Group`, `MessageStatus`, `SendHistory`)
  - **`repository/`**: repositórios Spring Data (persistência)
  - **`dto/`**: objetos de request/response
  - **`config/`**: configurações (ex.: CORS)
- **`src/main/resources/`**
  - `application.properties`: configurações do servidor, banco e integrações
- **`data/`**
  - base do H2 (arquivo local)

## Funcionalidades implementadas

- **Gerenciamento de contatos**
  - CRUD de contatos com validações (ex.: não duplicar CPF/contato)
- **Gerenciamento de grupos**
  - CRUD de grupos
  - Adicionar/remover contatos em grupos (relacionamento many-to-many)
- **Envio manual de mensagem via WhatsApp**
  - Endpoint para enviar mensagem e salvar o status no banco
- **Consulta de status de mensagens**
  - Consultar por ID
  - Consultar por número
  - Consultar por status
- **Histórico de envios**
  - Registrar envio
  - Listar últimos 50 registros
- **Webhook de WhatsApp (Evolution API)**
  - Recebe eventos e processa
  - Atualiza status de mensagens ao receber `messages.update`
  - Processa mensagens recebidas (`messages.upsert`) e pode responder automaticamente
- **Integração com Groq API (chat completions)**
  - Gera resposta automática baseada em prompt e dados externos do backend

## Funcionalidades não implementadas (nesta entrega)

- **Autenticação/Autorização** nos endpoints (JWT/Basic/etc.)
- **Padronização de erros** (ex.: `@ControllerAdvice` com mensagens e códigos consistentes)
- **Testes automatizados** (unitários e integração)
- **Dockerização do serviço Spring Boot** (Dockerfile / docker-compose do projeto)
- **Configuração via variáveis de ambiente** completa (há chaves/URLs no `application.properties` e trechos hardcoded no serviço)
- **Documentação automática de API** (Swagger/OpenAPI)

## Decisões técnicas

- **Spring Boot + Spring Web**
  - Escolha por produtividade e padrão de mercado para APIs REST.
- **Spring Data JPA**
  - Facilidade para CRUD e mapeamento das entidades (`Contact`, `Group`, etc.).
- **H2 em arquivo** (`jdbc:h2:file:...`)
  - Usado para simplificar a entrega e permitir execução rápida sem subir banco externo.
  - **PostgreSQL** está preparado (dependência existe e configs estão comentadas), mas não foi priorizado nesta entrega.
- **Integração com WhatsApp via Evolution API**
  - Evita implementar do zero a camada de conexão com WhatsApp; utiliza uma solução pronta via Docker.
- **Webhook com processamento assíncrono**
  - O `WebhookService` usa `@Async` para não bloquear a resposta HTTP do webhook.

## Rotas / Endpoints

Base URL: `http://localhost:3001`

### WhatsApp

- `POST /api/whatsapp/send`
  - Envia uma mensagem de texto.
- `GET /api/whatsapp/status`
  - Consulta status de conexão da instância.
- `GET /api/whatsapp/message/{messageId}`
  - Consulta status de uma mensagem.
- `GET /api/whatsapp/messages/phone/{phoneNumber}`
  - Lista mensagens por número.
- `GET /api/whatsapp/messages/status/{status}`
  - Lista mensagens por status.

### Instância (Evolution API)

- `POST /api/instance/create`
- `GET /api/instance/connect`
- `GET /api/instance/status`
- `POST /api/instance/webhook`
- `GET /api/instance/info`
- `POST /api/instance/logout`

### Contatos

- `POST /api/contacts`
- `GET /api/contacts/{id}`
- `GET /api/contacts`
- `PUT /api/contacts/{id}`
- `DELETE /api/contacts/{id}`

### Grupos

- `POST /api/groups`
- `GET /api/groups/{id}`
- `GET /api/groups`
- `PUT /api/groups/{id}`
- `DELETE /api/groups/{id}`
- `POST /api/groups/{groupId}/contacts`
- `DELETE /api/groups/{groupId}/contacts/{contactId}`

### Histórico de envios

- `POST /api/send-history`
- `GET /api/send-history`

### Webhook

- `POST /webhook/whatsapp`

## Screenshots (mínimo 3)

O repositório **ainda não contém imagens**. Para atender o requisito, adicione pelo menos 3 prints em uma pasta (ex.: `docs/screenshots/`) e referencie aqui.

Sugestões de prints:

1. Tela/print do servidor rodando (log do Spring Boot no terminal)
2. Teste no Postman/Insomnia criando um contato (`POST /api/contacts`)
3. Teste no Postman/Insomnia enviando uma mensagem (`POST /api/whatsapp/send`) ou consultando histórico (`GET /api/send-history`)

Exemplo de como linkar (depois de adicionar os arquivos):

- `docs/screenshots/01-server-running.png`
- `docs/screenshots/02-create-contact.png`
- `docs/screenshots/03-send-message.png`

## Dificuldades encontradas e como foram resolvidas

- **Integração com WhatsApp**
  - Desafio: necessidade de um gateway confiável.
  - Solução: uso da **Evolution API** em Docker para padronizar o ambiente e facilitar a execução.
- **Atualização de status via webhook**
  - Desafio: eventos de status chegam de forma assíncrona e não devem travar o endpoint.
  - Solução: processamento assíncrono no `WebhookService`.
- **Persistência simples para entrega**
  - Desafio: evitar dependência de banco externo.
  - Solução: uso de **H2 file** para persistir localmente sem setup adicional.
