package br.gov.ma.ssp.whatsapp_service.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.gov.ma.ssp.whatsapp_service.dto.SendHistoryRequest;
import br.gov.ma.ssp.whatsapp_service.dto.SendHistoryResponse;
import br.gov.ma.ssp.whatsapp_service.entity.SendHistory;
import br.gov.ma.ssp.whatsapp_service.repository.SendHistoryRepository;

@Service
public class SendHistoryService {

    private final SendHistoryRepository sendHistoryRepository;

    public SendHistoryService(SendHistoryRepository sendHistoryRepository) {
        this.sendHistoryRepository = sendHistoryRepository;
    }

    @Transactional
    public SendHistoryResponse saveSendHistory(SendHistoryRequest request) {
        SendHistory sendHistory = new SendHistory();
        sendHistory.setPhoneNumber(request.getPhoneNumber());
        sendHistory.setMessage(request.getMessage());
        sendHistory.setStatus(request.getStatus());
        sendHistory.setErrorMessage(request.getErrorMessage());
        sendHistory.setMessageId(request.getMessageId());

        SendHistory savedSendHistory = sendHistoryRepository.save(sendHistory);
        return new SendHistoryResponse(savedSendHistory);
    }

    @Transactional(readOnly = true)
    public List<SendHistoryResponse> getLast50SendHistories() {
        Pageable pageable = PageRequest.of(0, 50);
        Page<SendHistory> page = sendHistoryRepository.findAllByOrderBySentAtDesc(pageable);
        return page.getContent().stream()
                .map(SendHistoryResponse::new)
                .collect(Collectors.toList());
    }
}
