package br.gov.ma.ssp.whatsapp_service.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ma.ssp.whatsapp_service.dto.ConnectionStatusResponse;
import br.gov.ma.ssp.whatsapp_service.dto.MessageOptions;
import br.gov.ma.ssp.whatsapp_service.dto.MessageResponse;
import br.gov.ma.ssp.whatsapp_service.dto.SendMessageManualRequest;
import br.gov.ma.ssp.whatsapp_service.entity.MessageStatus;
import br.gov.ma.ssp.whatsapp_service.service.EvolutionApiService;
import br.gov.ma.ssp.whatsapp_service.service.MessageStatusService;

@RestController
@RequestMapping("/api/whatsapp")
public class WhatsappController {

    private final EvolutionApiService evolutionApiService;
    private final MessageStatusService messageStatusService;

    public WhatsappController(EvolutionApiService evolutionApiService, MessageStatusService messageStatusService) {
        this.evolutionApiService = evolutionApiService;
        this.messageStatusService = messageStatusService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(
            @RequestBody SendMessageManualRequest request){

        if(request.getPhoneNumber() == null || request.getMessage() == null){
            return ResponseEntity.badRequest().body("phoneNumber e message são obrigatórios");
        }

        // Criar opções se fornecidas
        MessageOptions options = null;
        if (request.getDelay() != null || request.getPresence() != null || request.getLinkPreview() != null) {
            options = new MessageOptions(request.getDelay(), request.getPresence(), request.getLinkPreview());
        }

        // Tentar enviar mensagem - o service já trata os erros
        MessageResponse response = evolutionApiService.sendTextMessage(
                request.getPhoneNumber(),
                request.getMessage(),
                options
        );

        // Salvar mensagem no banco de dados
        if (response != null && response.getKey() != null) {
            String messageId = response.getKey().getId();
            String remoteJid = response.getKey().getRemoteJid();
            String status = response.getStatus() != null ? response.getStatus() : "PENDING";
            Long timestamp = response.getMessageTimestamp() != null ? 
                Long.parseLong(response.getMessageTimestamp()) : System.currentTimeMillis() / 1000;
            
            messageStatusService.saveMessage(
                messageId,
                remoteJid,
                request.getPhoneNumber(),
                request.getMessage(),
                status,
                timestamp
            );
        }

        return ResponseEntity.ok(response);

    }
    
    @GetMapping("/status")
    public ResponseEntity<ConnectionStatusResponse> getConnectionStatus() {
        ConnectionStatusResponse status = evolutionApiService.getConnectionStatus();
        return ResponseEntity.ok(status);
    }

    /**
     * Consultar status de uma mensagem específica pelo ID
     * GET /api/whatsapp/message/{messageId}
     */
    @GetMapping("/message/{messageId}")
    public ResponseEntity<?> getMessageStatus(@PathVariable String messageId) {
        Optional<MessageStatus> messageStatus = messageStatusService.getMessageStatus(messageId);
        
        if (messageStatus.isPresent()) {
            return ResponseEntity.ok(messageStatus.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Consultar todas as mensagens de um número
     * GET /api/whatsapp/messages/phone/{phoneNumber}
     */
    @GetMapping("/messages/phone/{phoneNumber}")
    public ResponseEntity<List<MessageStatus>> getMessagesByPhone(@PathVariable String phoneNumber) {
        List<MessageStatus> messages = messageStatusService.getMessagesByPhone(phoneNumber);
        return ResponseEntity.ok(messages);
    }

    /**
     * Consultar mensagens por status (PENDING, DELIVERY_ACK, READ, etc)
     * GET /api/whatsapp/messages/status/{status}
     */
    @GetMapping("/messages/status/{status}")
    public ResponseEntity<List<MessageStatus>> getMessagesByStatus(@PathVariable String status) {
        List<MessageStatus> messages = messageStatusService.getMessagesByStatus(status);
        return ResponseEntity.ok(messages);
    }
}
