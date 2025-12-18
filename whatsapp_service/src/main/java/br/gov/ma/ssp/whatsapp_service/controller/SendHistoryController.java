package br.gov.ma.ssp.whatsapp_service.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ma.ssp.whatsapp_service.dto.SendHistoryRequest;
import br.gov.ma.ssp.whatsapp_service.dto.SendHistoryResponse;
import br.gov.ma.ssp.whatsapp_service.service.SendHistoryService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/send-history")
public class SendHistoryController {

    private final SendHistoryService sendHistoryService;

    public SendHistoryController(SendHistoryService sendHistoryService) {
        this.sendHistoryService = sendHistoryService;
    }

    @PostMapping
    public ResponseEntity<SendHistoryResponse> saveSendHistory(@Valid @RequestBody SendHistoryRequest request) {
        SendHistoryResponse response = sendHistoryService.saveSendHistory(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<SendHistoryResponse>> getLastSendHistories() {
        List<SendHistoryResponse> responses = sendHistoryService.getLast50SendHistories();
        return ResponseEntity.ok(responses);
    }
}
