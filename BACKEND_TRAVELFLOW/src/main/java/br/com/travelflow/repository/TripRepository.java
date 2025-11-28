package br.com.travelflow.repository;

import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.domain.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    List<Trip> findByAgencyIdOrderByCreatedAtDesc(Long agencyId);

    Optional<Trip> findByIdAndAgencyId(Long id, Long agencyId);

    Optional<Trip> findByIdAndAgency(Long id, Agency agency);

    Long countByAgency(Agency agency);

    List<Trip> findByDestinationContainingIgnoreCaseAndAgencyId(String destination, Long agencyId);

    List<Trip> findByLocationContainingIgnoreCaseAndAgencyId(String location, Long agencyId);

    @Query("SELECT t FROM Trip t WHERE t.agency.id = :agencyId AND (" +
            "LOWER(t.destination) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(t.location) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Trip> findBySearchTermAndAgencyId(@Param("searchTerm") String searchTerm, @Param("agencyId") Long agencyId);

    @Query("SELECT DISTINCT t.destination FROM Trip t WHERE t.agency.id = :agencyId ORDER BY t.destination")
    List<String> findAllDestinationsByAgencyId(@Param("agencyId") Long agencyId);
}
