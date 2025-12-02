package br.com.travelflow.repository;

import br.com.caio.painel_service.domain.entity.Agency;
import br.com.caio.painel_service.domain.entity.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {
    
    @Query("SELECT DISTINCT p FROM TravelPackage p LEFT JOIN FETCH p.trips WHERE p.agency = :agency")
    List<TravelPackage> findByAgency(Agency agency);
    
    List<TravelPackage> findByAgencyAndActive(Agency agency, Boolean active);
    
    @Query("SELECT DISTINCT p FROM TravelPackage p LEFT JOIN FETCH p.trips WHERE p.agency = :agency AND p.active = true")
    List<TravelPackage> findActivePackagesByAgency(Agency agency);
    
    @Query("SELECT DISTINCT p FROM TravelPackage p LEFT JOIN FETCH p.trips WHERE p.id = :id AND p.agency = :agency")
    Optional<TravelPackage> findByIdAndAgency(Long id, Agency agency);
    
    @Query("SELECT p FROM TravelPackage p JOIN p.trips t WHERE t.id = :tripId AND p.agency = :agency")
    List<TravelPackage> findPackagesContainingTrip(Long tripId, Agency agency);
}
