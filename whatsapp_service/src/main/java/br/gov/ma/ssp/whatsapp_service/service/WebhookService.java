package br.gov.ma.ssp.whatsapp_service.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class WebhookService {

    private final EvolutionApiService evolutionApiService;
    private final MessageStatusService messageStatusService;

    public WebhookService(EvolutionApiService evolutionApiService, MessageStatusService messageStatusService) {
        this.evolutionApiService = evolutionApiService;
        this.messageStatusService = messageStatusService;
    }

    @Value("${groq.api.key}")
    private String groqApiKey;

    @Value("${backend.token}")
    private String backendToken;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private List<Map<String, Object>> tripsData = new ArrayList<>();
    private List<Map<String, Object>> packagesData = new ArrayList<>();
    private Map<String, List<String>> userMessages = new ConcurrentHashMap<>();

    private void fetchBackendData() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + backendToken);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<List> tripsResponse = restTemplate.exchange("http://localhost:8082/trips", HttpMethod.GET, entity, List.class);
            ResponseEntity<List> packagesResponse = restTemplate.exchange("http://localhost:8082/packages", HttpMethod.GET, entity, List.class);

            if (tripsResponse.getStatusCode().is2xxSuccessful() && packagesResponse.getStatusCode().is2xxSuccessful()) {
                tripsData = (List<Map<String, Object>>) tripsResponse.getBody();
                packagesData = (List<Map<String, Object>>) packagesResponse.getBody();
                System.out.println("Dados do backend carregados com sucesso.");
            } else {
                System.out.println("Erro ao buscar dados do backend.");
            }
        } catch (Exception e) {
            System.err.println("Erro ao conectar com o backend: " + e.getMessage());
        }
    }

    private String formatBackendDataForPrompt() {
        if (tripsData.isEmpty() && packagesData.isEmpty()) {
            return "";
        }

        StringBuilder formattedData = new StringBuilder("\n\n━━━━━━━━━━ DADOS ATUALIZADOS DO SISTEMA ━━━━━━━━━━\n\n");

        if (!tripsData.isEmpty()) {
            formattedData.append("📍 VIAGENS DISPONÍVEIS:\n\n");
            for (int i = 0; i < tripsData.size(); i++) {
                Map<String, Object> trip = tripsData.get(i);
                formattedData.append(String.format("%d. %s\n", i + 1, trip.getOrDefault("destination", "Viagem")));
                if (trip.get("description") != null) formattedData.append("   Descrição: ").append(trip.get("description")).append("\n");
                if (trip.get("location") != null) formattedData.append("   Localização: ").append(trip.get("location")).append("\n");
                if (trip.get("pricePerPerson") != null) formattedData.append("   Preço por pessoa: R$ ").append(trip.get("pricePerPerson")).append("\n");
                if (trip.get("id") != null) formattedData.append("   ID: ").append(trip.get("id")).append("\n");
                formattedData.append("\n");
            }
        }

        if (!packagesData.isEmpty()) {
            formattedData.append("🎁 PACOTES DISPONÍVEIS:\n\n");
            for (int i = 0; i < packagesData.size(); i++) {
                Map<String, Object> pkg = packagesData.get(i);
                formattedData.append(String.format("%d. %s\n", i + 1, pkg.getOrDefault("name", "Pacote")));
                if (pkg.get("description") != null) formattedData.append("   Descrição: ").append(pkg.get("description")).append("\n");
                if (pkg.get("destination") != null) formattedData.append("   Destino: ").append(pkg.get("destination")).append("\n");
                if (pkg.get("duration") != null) formattedData.append("   Duração: ").append(pkg.get("duration")).append(" dias\n");
                if (pkg.get("price") != null) formattedData.append("   Preço: R$ ").append(pkg.get("price")).append("\n");
                if (pkg.get("includes") != null) formattedData.append("   Inclui: ").append(pkg.get("includes")).append("\n");
                if (pkg.get("category") != null) formattedData.append("   Categoria: ").append(pkg.get("category")).append("\n");
                formattedData.append("\n");
            }
        }

        formattedData.append("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        formattedData.append("\nIMPORTANTE: Use SEMPRE os dados acima do sistema quando disponíveis. Eles têm prioridade sobre qualquer informação pré-programada.\n");

        return formattedData.toString();
    }

    private List<String> extractInterestedPackages(String phoneNumber) {
        List<String> messages = userMessages.get(phoneNumber);
        if (messages == null) return new ArrayList<>();

        List<String> packages = new ArrayList<>();
        for (String msg : messages) {
            String lowerText = msg.toLowerCase();

            // Check packages
            for (Map<String, Object> pkg : packagesData) {
                String pkgName = (String) pkg.get("name");
                if (pkgName != null && lowerText.contains(pkgName.toLowerCase()) && !packages.contains(pkgName)) {
                    packages.add(pkgName);
                }
            }

            // Check trips
            for (Map<String, Object> trip : tripsData) {
                String tripName = (String) trip.get("destination");
                if (tripName != null && lowerText.contains(tripName.toLowerCase()) && !packages.contains(tripName)) {
                    packages.add(tripName);
                }
            }
        }
        return packages;
    }

    private void createNotification(String whatsapp, List<String> interestedPackages) {
        try {
            String packagesText = interestedPackages.isEmpty() ? "Pacotes diversos" : String.join(", ", interestedPackages);
            String message = "Novo lead de cliente interessado!\n\nPasseios de interesse: " + packagesText + "\n\nContato WhatsApp: " + whatsapp;

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            headers.set("Authorization", "Bearer " + backendToken);

            Map<String, Object> body = new HashMap<>();
            body.put("message", message);
            body.put("type", "TRIP_REMINDER");

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:8082/notifications", entity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("Notificação criada com sucesso!");
            } else {
                System.err.println("Erro ao criar notificação: " + response.getBody());
            }
        } catch (Exception e) {
            System.err.println("Erro ao enviar notificação: " + e.getMessage());
        }
    }

    private String callGroqAPI(String userMessage) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + groqApiKey);
            headers.set("Content-Type", "application/json");

            String systemPrompt = "Você é um assistente virtual da Rota Turismo, uma agência de viagens especializada em turismo." + formatBackendDataForPrompt() +
                    "\n\n━━━━━━━━━━ INSTRUÇÕES ━━━━━━━━━━\n\n" +
                    "• Use EXCLUSIVAMENTE os dados fornecidos acima do sistema para responder sobre pacotes e viagens\n" +
                    "• Se não houver dados disponíveis, informe educadamente que está buscando as informações atualizadas\n" +
                    "• Seja amigável, entusiasmado e prestativo\n" +
                    "• Destaque as características únicas de cada destino e pacote\n" +
                    "• Responda de forma concisa e direta\n\n" +
                    "━━━━━━━━━━ SOLICITAÇÃO DE CONTATO ━━━━━━━━━━\n\n" +
                    "IMPORTANTE: Quando o cliente demonstrar interesse genuíno em algum pacote (fazendo perguntas específicas sobre valores, pedindo mais detalhes sobre datas, ou mostrando intenção clara de reserva), você DEVE:\n" +
                    "1. PRIMEIRO responder completamente a pergunta do cliente com todos os detalhes\n" +
                    "2. DEPOIS incluir a tag [SOLICITAR_WHATSAPP] no FINAL da resposta\n\n" +
                    "NÃO solicite WhatsApp em perguntas genéricas como \"quais pacotes vocês têm?\" - apenas quando houver interesse específico em um pacote.";

            Map<String, Object> messageSystem = new HashMap<>();
            messageSystem.put("role", "system");
            messageSystem.put("content", systemPrompt);

            Map<String, Object> messageUser = new HashMap<>();
            messageUser.put("role", "user");
            messageUser.put("content", userMessage);

            List<Map<String, Object>> messages = new ArrayList<>();
            messages.add(messageSystem);
            messages.add(messageUser);

            Map<String, Object> body = new HashMap<>();
            body.put("model", "llama-3.3-70b-versatile");
            body.put("messages", messages);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity("https://api.groq.com/openai/v1/chat/completions", entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                Map<String, Object> responseBody = response.getBody();
                List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map<String, Object> choice = choices.get(0);
                    Map<String, Object> message = (Map<String, Object>) choice.get("message");
                    if (message != null) {
                        return (String) message.get("content");
                    }
                }
            } else {
                System.err.println("Erro na API Groq: " + response.getBody());
            }
        } catch (Exception e) {
            System.err.println("Erro ao chamar Groq API: " + e.getMessage());
        }
        return "Desculpe, não consegui processar sua solicitação. Pode tentar novamente?";
    }

    @Async
    public void processWebhook(Map<String, Object> data) {
        String event = (String) data.get("event");

        if ("messages.upsert".equals(event)) {
            handleIncomingMessage(data);
        } else if ("messages.update".equals(event)) {
            handleMessageStatusUpdate(data);
        }
    }

    private void handleMessageStatusUpdate(Map<String, Object> data) {
        try {
            Map<String, Object> messageData = (Map<String, Object>) data.get("data");

            String messageId = (String) messageData.get("id");
            String status = (String) messageData.get("status");

            if (messageId != null && status != null) {
                System.out.println("Atualizando status da mensagem: " + messageId + " -> " + status);
                messageStatusService.updateMessageStatus(messageId, status);
            } else {
                System.out.println("Webhook recebido mas sem messageId ou status");
                System.out.println("Data: " + messageData);
            }
        } catch (Exception e) {
            System.err.println("Erro ao processar atualização de status: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void handleIncomingMessage(Map<String, Object> data) {
        try {
            Map<String, Object> message = (Map<String, Object>) data.get("data");
            Map<String, Object> key = (Map<String, Object>) message.get("key");

            // Ignorar mensagens próprias
            Boolean fromMe = (Boolean) key.get("fromMe");
            if (fromMe != null && fromMe) {
                return;
            }

            // Extrair dados
            String remoteJid = (String) key.get("remoteJid");
            String phoneNumber = remoteJid.replace("@s.whatsapp.net", "");

            Map<String, Object> messageContent = (Map<String, Object>) message.get("message");
            String messageText = (String) messageContent.get("conversation");

            System.out.println("Mensagem de " + phoneNumber + ": " + messageText);

            // Adicionar mensagem ao histórico do usuário
            userMessages.computeIfAbsent(phoneNumber, k -> new ArrayList<>()).add(messageText);

            // Buscar dados do backend
            fetchBackendData();

            // Chamar AI para resposta
            String aiResponse = callGroqAPI(messageText);

            // Verificar se AI sinalizou para solicitar WhatsApp
            boolean shouldSolicitWhatsApp = aiResponse.contains("[SOLICITAR_WHATSAPP]");
            if (shouldSolicitWhatsApp) {
                aiResponse = aiResponse.replace("[SOLICITAR_WHATSAPP]", "").trim();
                // Criar notificação
                List<String> interestedPackages = extractInterestedPackages(phoneNumber);
                createNotification(phoneNumber, interestedPackages);
                // Adicionar mensagem solicitando WhatsApp
                aiResponse += "\n\n✅ Recebi seu contato! Nossa equipe entrará em contato em breve pelo WhatsApp. Obrigado!";
            }

            // Responder via WhatsApp
            evolutionApiService.sendTextMessage("559988247734", aiResponse);

        } catch (Exception e) {
            System.err.println("Erro ao processar mensagem: " + e.getMessage());
        }
    }
}