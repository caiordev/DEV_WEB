package br.gov.ma.ssp.whatsapp_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.gov.ma.ssp.whatsapp_service.entity.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    
    Optional<Group> findByNome(String nome);
    
    boolean existsByNome(String nome);
}
