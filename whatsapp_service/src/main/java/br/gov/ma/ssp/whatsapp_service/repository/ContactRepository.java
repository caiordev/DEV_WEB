package br.gov.ma.ssp.whatsapp_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.gov.ma.ssp.whatsapp_service.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    Optional<Contact> findByCpf(String cpf);
    
    boolean existsByCpf(String cpf);
    
    boolean existsByContato(String contato);
}
