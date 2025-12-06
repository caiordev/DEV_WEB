package br.com.travelflow.web.controller;

import br.com.travelflow.domain.dto.AvailabilityDto;
import br.com.travelflow.domain.dto.CreateAvailabilityDto;
import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.security.SecurityUtils;
import br.com.travelflow.service.AvailabilityService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/availabilities")
public class AvailabilityController {
    
    private final AvailabilityService availabilityService;
    
    public AvailabilityController(AvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }
    
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<AvailabilityDto>> getAllAvailabilities() {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        List<AvailabilityDto> availabilities = availabilityService.getAllAvailabilities(agency);
        return ResponseEntity.ok(availabilities);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<AvailabilityDto> getAvailabilityById(@PathVariable Long id) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        AvailabilityDto availability = availabilityService.getAvailabilityById(id, agency);
        return ResponseEntity.ok(availability);
    }
    
    @GetMapping("/trip/{tripId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<AvailabilityDto>> getAvailabilitiesByTrip(@PathVariable Long tripId) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        List<AvailabilityDto> availabilities = availabilityService.getAvailabilitiesByTrip(tripId, agency);
        return ResponseEntity.ok(availabilities);
    }
    
    @GetMapping("/date-range")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<AvailabilityDto>> getAvailabilitiesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        List<AvailabilityDto> availabilities = availabilityService.getAvailabilitiesByDateRange(agency, startDate, endDate);
        return ResponseEntity.ok(availabilities);
    }
    
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<AvailabilityDto> createAvailability(@Valid @RequestBody CreateAvailabilityDto dto) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        AvailabilityDto created = availabilityService.createAvailability(dto, agency);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<AvailabilityDto> updateAvailability(@PathVariable Long id, @Valid @RequestBody CreateAvailabilityDto dto) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        AvailabilityDto updated = availabilityService.updateAvailability(id, dto, agency);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Void> deleteAvailability(@PathVariable Long id) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        availabilityService.deleteAvailability(id, agency);
        return ResponseEntity.noContent().build();
    }
}
