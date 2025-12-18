package br.gov.ma.ssp.whatsapp_service.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.gov.ma.ssp.whatsapp_service.dto.ConnectInstanceResponse;
import br.gov.ma.ssp.whatsapp_service.dto.ConnectionStatusResponse;
import br.gov.ma.ssp.whatsapp_service.dto.CreateInstanceRequest;
import br.gov.ma.ssp.whatsapp_service.dto.CreateInstanceResponse;
import br.gov.ma.ssp.whatsapp_service.dto.InstanceInfoResponse;
import br.gov.ma.ssp.whatsapp_service.dto.LogoutResponse;
import br.gov.ma.ssp.whatsapp_service.dto.MarkAsReadRequest;
import br.gov.ma.ssp.whatsapp_service.dto.MessageOptions;
import br.gov.ma.ssp.whatsapp_service.dto.MessageResponse;
import br.gov.ma.ssp.whatsapp_service.dto.ReadMessage;
import br.gov.ma.ssp.whatsapp_service.dto.SendMessageRequest;
import br.gov.ma.ssp.whatsapp_service.dto.SetWebhookRequest;
import br.gov.ma.ssp.whatsapp_service.dto.TextMessage;
import br.gov.ma.ssp.whatsapp_service.dto.WebhookResponse;

@Service
public class EvolutionApiService {

    private final String baseUrl;
    private final String apiKey;
    private final String instanceName;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public EvolutionApiService() {
        this.baseUrl = "http://localhost:9000"; //System.getenv("EVOLUTION_BASE_URL");
        this.apiKey = "B6D711FCDE4D4FD5936544120E713976";//System.getenv("EVOLUTION_API_KEY");
        this.instanceName = "ufma";//System.getenv("EVOLUTION_INSTANCE_NAME");
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("apikey", apiKey);
        headers.set("Authorization", "Bearer " + apiKey);
        return headers;
    }

    private String validateAndFormatBrazilianNumber(String number) {
        String cleanNumber = number.replaceAll("\\D", "");
        
        if (number.contains("@")) {
            return number;
        }
        
        if (!cleanNumber.startsWith("55")) {
            throw new RuntimeException("Número deve começar com código do Brasil (55). Recebido: " + number);
        }
        
        String withoutCountryCode = cleanNumber.substring(2);
        
        if (withoutCountryCode.length() < 10 || withoutCountryCode.length() > 11) {
            throw new RuntimeException(
                "Número inválido. Formato esperado: 55 + DDD (2) + Número (8 ou 9 dígitos). " +
                "Recebido: " + number + " (total: " + cleanNumber.length() + " dígitos)"
            );
        }
        
        if (withoutCountryCode.length() == 11) {
            String ddd = withoutCountryCode.substring(0, 2);
            String phoneNumber = withoutCountryCode.substring(2);
            
            if (!phoneNumber.startsWith("9")) {
                throw new RuntimeException(
                    "Número de celular deve começar com 9. Recebido: " + number
                );
            }
            
            System.out.println("Número validado: 55" + ddd + phoneNumber + " (celular)");
            return cleanNumber;
        }
        
        if (withoutCountryCode.length() == 10) {
            System.out.println("Número validado: " + cleanNumber + " (fixo)");
            return cleanNumber;
        }
        
        return cleanNumber;
    }

    /**
     * Criar uma nova instância do WhatsApp
     */
    public CreateInstanceResponse createInstance(){
        try{
            CreateInstanceRequest request = new CreateInstanceRequest(
                    instanceName,
                    true,
                    "WHATSAPP-BAILEYS"
            );

            HttpEntity<CreateInstanceRequest> entity = new HttpEntity<>(request, createHeaders());
            String url = baseUrl + "/instance/create";
            ResponseEntity<CreateInstanceResponse> response = restTemplate.postForEntity(
                    url,
                    entity,
                    CreateInstanceResponse.class
            );

            System.out.println("Instance created: " + response.getBody());
            return response.getBody();
        }catch (Exception e){
            throw new RuntimeException("Error creating instance", e);
        }
    }

    /**
     * Conectar instância (gerar QR Code)
     */
    public ConnectInstanceResponse connectInstance(){
        try{
            HttpEntity<Void> entity = new HttpEntity<>(createHeaders());

            String url = baseUrl + "/instance/connect/"+instanceName;
            ResponseEntity<ConnectInstanceResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    ConnectInstanceResponse.class
            );

            System.out.println("Instance connected: " + response.getBody());
            return response.getBody();
        } catch (Exception e){
            throw new RuntimeException("Error connecting instance", e);
        }
    }

    /**
     * Obter status da conexão
     */
    public ConnectionStatusResponse getConnectionStatus() {
        try {
            HttpEntity<Void> entity = new HttpEntity<>(createHeaders());

            String url = baseUrl + "/instance/connectionState/" + instanceName;
            ResponseEntity<ConnectionStatusResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    ConnectionStatusResponse.class
            );

            return response.getBody();

        } catch (Exception e) {
            System.err.println("Erro ao obter status: " + e.getMessage());
            throw new RuntimeException("Erro ao obter status", e);
        }
    }

    /**
     * Configurar webhook para receber mensagens
     */
    public WebhookResponse setWebhook(String webhookUrl) {
        try {
            SetWebhookRequest request = new SetWebhookRequest(
                    webhookUrl,
                    false, 
                    false,  
                    List.of(
                            "QRCODE_UPDATED",
                            "MESSAGES_UPSERT",
                            "MESSAGES_UPDATE",
                            "CONNECTION_UPDATE"
                    )
            );

            HttpEntity<SetWebhookRequest> entity = new HttpEntity<>(request, createHeaders());

            String url = baseUrl + "/webhook/set/" + instanceName;
            
            System.out.println("🔧 Configurando webhook...");
            System.out.println("URL: " + url);
            System.out.println("Webhook URL: " + webhookUrl);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    url,
                    entity,
                    Map.class
            );

            System.out.println("Webhook configurado com sucesso!");
            System.out.println("Resposta: " + response.getBody());
            
            WebhookResponse webhookResponse = new WebhookResponse();
            webhookResponse.setWebhook(webhookUrl);
            webhookResponse.setEnabled(true);
            
            return webhookResponse;

        } catch (Exception e) {
            System.err.println("Erro ao configurar webhook: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Erro ao configurar webhook: " + e.getMessage(), e);
        }
    }

    /**
     * Obter informações da instância
     */
    public List<InstanceInfoResponse> getInstanceInfo() {
        try {
            HttpEntity<Void> entity = new HttpEntity<>(createHeaders());

            String url = baseUrl + "/instance/fetchInstances";
            ResponseEntity<InstanceInfoResponse[]> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    InstanceInfoResponse[].class
            );

            List<InstanceInfoResponse> instanceInfoResponses = Arrays.asList(response.getBody());

            return instanceInfoResponses;

        } catch (Exception e) {
            System.err.println("Erro ao obter informações: " + e.getMessage());
            throw new RuntimeException("Erro ao obter informações", e);
        }
    }

    /**
     * Desconectar instância (logout)
     */
    public LogoutResponse logoutInstance() {
        try {
            HttpEntity<Void> entity = new HttpEntity<>(createHeaders());

            String url = baseUrl + "/instance/logout/" + instanceName;
            ResponseEntity<LogoutResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.DELETE,
                    entity,
                    LogoutResponse.class
            );

            System.out.println("Instância desconectada: " + instanceName);
            return response.getBody();

        } catch (Exception e) {
            System.err.println("Erro ao desconectar: " + e.getMessage());
            throw new RuntimeException("Erro ao desconectar", e);
        }
    }

    /**
     * Enviar mensagem de texto
     */
    public MessageResponse sendTextMessage(String phoneNumber, String message){
        return sendTextMessage(phoneNumber, message, null);
    }
    
    /**
     * Enviar mensagem de texto com opções
     */
    public MessageResponse sendTextMessage(String phoneNumber, String message, MessageOptions options){
        try{
            String cleanNumber = phoneNumber.replaceAll("\\D", "");
            
            String formattedNumber = validateAndFormatBrazilianNumber(cleanNumber);
            
            if (!formattedNumber.contains("@")) {
                formattedNumber = formattedNumber + "@s.whatsapp.net";
            }

            SendMessageRequest payload = new SendMessageRequest(
                    formattedNumber,
                    new TextMessage(message),
                    options
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("apiKey", apiKey);
            headers.set("Authorization", "Bearer " + apiKey);

            HttpEntity<SendMessageRequest> request = new HttpEntity<>(payload, headers);
            String url = baseUrl + "/message/sendText/"+instanceName;
            
            System.out.println("=== DEBUG SEND MESSAGE ===");
            System.out.println("URL: " + url);
            System.out.println("Phone: " + formattedNumber);
            System.out.println("Message: " + message);
            
            ResponseEntity<MessageResponse> response = restTemplate.postForEntity(
                    url,
                    request,
                    MessageResponse.class
            );

            System.out.println("Response Status: " + response.getStatusCode());
            System.out.println("Response Body: " + response.getBody());
            
            return response.getBody();
        }catch (HttpClientErrorException e){
            System.err.println("=== ERROR SEND MESSAGE ===");
            System.err.println("Error Type: " + e.getClass().getName());
            System.err.println("Error Message: " + e.getMessage());
            System.err.println("Response Body: " + e.getResponseBodyAsString());
            e.printStackTrace();
            
            String responseBody = e.getResponseBodyAsString();
            
            if (responseBody.contains("No sessions")) {
                throw new RuntimeException("Instância do WhatsApp não está conectada. Execute /instance/connect primeiro.", e);
            }
            
            if (responseBody.contains("\"exists\":false")) {
                throw new RuntimeException("O número " + phoneNumber + " não existe no WhatsApp ou não está registrado corretamente.", e);
            }
            
            throw new RuntimeException("Erro ao enviar mensagem: " + e.getMessage(), e);
        }catch (Exception e){
            System.err.println("=== ERROR SEND MESSAGE ===");
            System.err.println("Error Type: " + e.getClass().getName());
            System.err.println("Error Message: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Erro ao enviar mensagem: " + e.getMessage(), e);
        }
    }

    /**
     * Marcar mensagem como lida
     */
    public void markAsRead(String messageId, String remoteJid) {
        try {
            MarkAsReadRequest request = new MarkAsReadRequest(
                    List.of(new ReadMessage(messageId, false, remoteJid))
            );

            HttpEntity<MarkAsReadRequest> entity = new HttpEntity<>(request, createHeaders());

            String url = baseUrl + "/chat/markMessageAsRead/" + instanceName;
            restTemplate.postForEntity(url, entity, Map.class);

            System.out.println("Mensagem marcada como lida");

        } catch (Exception e) {
            System.out.println("Não foi possível marcar como lida (não crítico)");
        }
    }
}
