package br.gov.ma.ssp.whatsapp_service.controller;

import br.gov.ma.ssp.whatsapp_service.dto.*;
import br.gov.ma.ssp.whatsapp_service.service.EvolutionApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instance")
public class InstanceController {

    @Autowired
    private EvolutionApiService evolutionApiService;

    /**
     * Criar instância
     * POST /api/instance/create
     */
    @PostMapping("/create")
    public ResponseEntity<CreateInstanceResponse> createInstance() {
        CreateInstanceResponse response = evolutionApiService.createInstance();
        return ResponseEntity.ok(response);
    }

    /**
     * Conectar e gerar QR Code
     * GET /api/instance/connect
     */
    @GetMapping("/connect")
    public ResponseEntity<ConnectInstanceResponse> connectInstance() {
        ConnectInstanceResponse response = evolutionApiService.connectInstance();
        return ResponseEntity.ok(response);
    }

    /**
     * Obter status da conexão
     * GET /api/instance/status
     */
    @GetMapping("/status")
    public ResponseEntity<ConnectionStatusResponse> getStatus() {
        ConnectionStatusResponse response = evolutionApiService.getConnectionStatus();
        return ResponseEntity.ok(response);
    }

    /**
     * Configurar webhook
     * POST /api/instance/webhook
     */
    @PostMapping("/webhook")
    public ResponseEntity<WebhookResponse> setWebhook(@RequestBody SetWebhookManualRequest request) {
        WebhookResponse response = evolutionApiService.setWebhook(request.getWebhookUrl());
        return ResponseEntity.ok(response);
    }

    /**
     * Obter informações da instância
     * GET /api/instance/info
     */
    @GetMapping("/info")
    public ResponseEntity<List<InstanceInfoResponse>> getInfo() {
        List<InstanceInfoResponse> response = evolutionApiService.getInstanceInfo();
        return ResponseEntity.ok(response);
    }

    /**
     * Desconectar (logout)
     * POST /api/instance/logout
     */
    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logout() {
        LogoutResponse response = evolutionApiService.logoutInstance();
        return ResponseEntity.ok(response);
    }
}