package br.com.travelflow.service;

import br.com.travelflow.domain.dto.AvailabilityDto;
import br.com.travelflow.domain.dto.CreateAvailabilityDto;
import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.domain.entity.Availability;
import br.com.travelflow.domain.entity.Trip;
import br.com.travelflow.repository.AvailabilityRepository;
import br.com.travelflow.repository.TripRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AvailabilityService {
    
    private final AvailabilityRepository availabilityRepository;
    private final TripRepository tripRepository;
    
    public AvailabilityService(AvailabilityRepository availabilityRepository, TripRepository tripRepository) {
        this.availabilityRepository = availabilityRepository;
        this.tripRepository = tripRepository;
    }
    
    @Transactional(readOnly = true)
    public List<AvailabilityDto> getAllAvailabilities(Agency agency) {
        return availabilityRepository.findByAgency(agency).stream()
            .map(AvailabilityDto::new)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public AvailabilityDto getAvailabilityById(Long id, Agency agency) {
        Availability availability = availabilityRepository.findByIdAndAgency(id, agency)
            .orElseThrow(() -> new RuntimeException("Availability not found"));
        return new AvailabilityDto(availability);
    }
    
    @Transactional(readOnly = true)
    public List<AvailabilityDto> getAvailabilitiesByTrip(Long tripId, Agency agency) {
        Trip trip = tripRepository.findByIdAndAgency(tripId, agency)
            .orElseThrow(() -> new RuntimeException("Trip not found"));
        return availabilityRepository.findByTripAndAgency(trip, agency).stream()
            .map(AvailabilityDto::new)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<AvailabilityDto> getAvailabilitiesByDateRange(Agency agency, LocalDate startDate, LocalDate endDate) {
        return availabilityRepository.findByAgencyAndDateRange(agency, startDate, endDate).stream()
            .map(AvailabilityDto::new)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public AvailabilityDto createAvailability(CreateAvailabilityDto dto, Agency agency) {
        Trip trip = tripRepository.findByIdAndAgency(dto.getTripId(), agency)
            .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        if (dto.getAvailableSlots() > dto.getTotalSlots()) {
            throw new RuntimeException("Available slots cannot exceed total slots");
        }
        
        availabilityRepository.findByTripAndDateAndAgency(trip, dto.getDate(), agency)
            .ifPresent(a -> {
                throw new RuntimeException("Availability already exists for this trip and date");
            });
        
        Availability availability = new Availability();
        availability.setTrip(trip);
        availability.setDate(dto.getDate());
        availability.setTotalSlots(dto.getTotalSlots());
        availability.setAvailableSlots(dto.getAvailableSlots());
        availability.setPrice(dto.getPrice());
        availability.setAgency(agency);
        
        Availability saved = availabilityRepository.save(availability);
        return new AvailabilityDto(saved);
    }
    
    @Transactional
    public AvailabilityDto updateAvailability(Long id, @Valid CreateAvailabilityDto dto, Agency agency) {
        Availability availability = availabilityRepository.findByIdAndAgency(id, agency)
            .orElseThrow(() -> new RuntimeException("Availability not found"));
        
        if (dto.getAvailableSlots() > dto.getTotalSlots()) {
            throw new RuntimeException("Available slots cannot exceed total slots");
        }
        
        Trip trip = tripRepository.findByIdAndAgency(dto.getTripId(), agency)
            .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        availability.setTrip(trip);
        availability.setDate(dto.getDate());
        availability.setTotalSlots(dto.getTotalSlots());
        availability.setAvailableSlots(dto.getAvailableSlots());
        availability.setPrice(dto.getPrice());
        
        Availability updated = availabilityRepository.save(availability);
        return new AvailabilityDto(updated);
    }
    
    @Transactional
    public void deleteAvailability(Long id, Agency agency) {
        Availability availability = availabilityRepository.findByIdAndAgency(id, agency)
            .orElseThrow(() -> new RuntimeException("Availability not found"));
        availabilityRepository.delete(availability);
    }
}
