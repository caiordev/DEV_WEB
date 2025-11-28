package br.com.travelflow.repository;

import br.com.travelflow.domain.entity.Agency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgencyRepository extends JpaRepository<Agency, Long> {

    Optional<Agency> findByCnpj(String cnpj);

    Optional<Agency> findByEmail(String email);

    @Query("SELECT a FROM Agency a WHERE a.active = true")
    List<Agency> findAllActive();

    @Query("SELECT a FROM Agency a WHERE a.name LIKE %:name% AND a.active = true")
    List<Agency> findByNameContainingAndActive(String name);
}
