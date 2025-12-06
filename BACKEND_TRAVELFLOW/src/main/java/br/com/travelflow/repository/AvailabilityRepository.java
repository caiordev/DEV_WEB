package br.com.travelflow.repository;

import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.domain.entity.Availability;
import br.com.travelflow.domain.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    
    List<Availability> findByAgency(Agency agency);
    
    List<Availability> findByTripAndAgency(Trip trip, Agency agency);
    
    Optional<Availability> findByTripAndDateAndAgency(Trip trip, LocalDate date, Agency agency);
    
    Optional<Availability> findByIdAndAgency(Long id, Agency agency);
    
    @Query("SELECT a FROM Availability a WHERE a.agency = :agency AND a.date >= :startDate AND a.date <= :endDate")
    List<Availability> findByAgencyAndDateRange(Agency agency, LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT a FROM Availability a WHERE a.agency = :agency AND a.availableSlots > 0")
    List<Availability> findAvailableByAgency(Agency agency);
    
    @Query("SELECT a FROM Availability a WHERE a.trip = :trip AND a.date >= :date AND a.availableSlots > 0")
    List<Availability> findUpcomingAvailableForTrip(Trip trip, LocalDate date);
}
