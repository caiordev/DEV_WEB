package br.gov.ma.ssp.whatsapp_service.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ma.ssp.whatsapp_service.service.WebhookService;

@RestController
@RequestMapping("/webhook")
public class WebhookController {

    @Autowired
    private WebhookService webhookService;

    @PostMapping("/whatsapp")
    public ResponseEntity<Map<String, Boolean>> handleWebhook(
            @RequestBody Map<String, Object> payload) {

        String event = (String) payload.get("event");
        System.out.println("📨 ========================================");
        System.out.println("📨 Webhook recebido - Evento: " + event);
        System.out.println("📨 Payload completo: " + payload);
        System.out.println("📨 ========================================");

        // Processar assincronamente
        webhookService.processWebhook(payload);

        return ResponseEntity.ok(Map.of("success", true));
    }
}