package br.gov.ma.ssp.whatsapp_service.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.gov.ma.ssp.whatsapp_service.entity.SendHistory;

@Repository
public interface SendHistoryRepository extends JpaRepository<SendHistory, Long> {

    Page<SendHistory> findAllByOrderBySentAtDesc(Pageable pageable);
}
