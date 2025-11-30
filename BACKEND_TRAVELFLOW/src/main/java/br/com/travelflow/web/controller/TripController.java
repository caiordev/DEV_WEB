package br.com.travelflow.web.controller;

import br.com.travelflow.domain.dto.TripDto;
import br.com.travelflow.domain.entity.Trip;
import br.com.travelflow.security.SecurityUtils;
import br.com.travelflow.service.TripService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public ResponseEntity<List<TripDto>> getAllTrips() {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        List<TripDto> trips = tripService.findByAgencyId(agencyId);
        if (trips.isEmpty()) return  ResponseEntity.noContent().build();
        return ResponseEntity.ok(trips);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripDto> getTripById(@PathVariable Long id) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        Optional<TripDto> trip = tripService.findByIdAndAgencyId(id, agencyId);
        if (trip.isEmpty()) return  ResponseEntity.noContent().build();
        return trip.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<TripDto>> searchTrips(@RequestParam String q) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        List<TripDto> trips = tripService.searchByAgencyId(q, agencyId);
        if (trips.isEmpty()) return  ResponseEntity.noContent().build();
        return ResponseEntity.ok(trips);
    }

    @GetMapping("/destinations")
    public ResponseEntity<List<String>> getAllDestinations() {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        List<String> destinations = tripService.findAllDestinationsByAgencyId(agencyId);
        if (destinations.isEmpty()) return  ResponseEntity.noContent().build();
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/by-destination")
    public ResponseEntity<List<TripDto>> getTripsByDestination(@RequestParam String destination) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        List<TripDto> trips = tripService.findByDestinationAndAgencyId(destination, agencyId);
        if (trips.isEmpty()) return  ResponseEntity.noContent().build();
        return ResponseEntity.ok(trips);
    }

    @GetMapping("by-location")
    public ResponseEntity<List<TripDto>> getTripsByLocation(@RequestParam String location) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        List<TripDto> trips = tripService.findByLocationAndAgencyId(location, agencyId);
        if (trips.isEmpty()) return  ResponseEntity.noContent().build();
        return ResponseEntity.ok(trips);
    }

    @PostMapping
    public ResponseEntity<TripDto> createTrip(@Valid @RequestBody TripDto trip) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        TripDto createdTrip = tripService.createForAgency(trip, agencyId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTrip);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripDto> updateTrip(@PathVariable Long id, @Valid @RequestBody TripDto trip) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        Optional<TripDto> updatedTrip = tripService.updateForAgency(id, trip, agencyId);
        return updatedTrip.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        boolean deleted = tripService.deleteForAgency(id, agencyId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> tripExists(@PathVariable Long id) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        boolean exists = tripService.existsByIdAndAgencyId(id, agencyId);
        return exists ? ResponseEntity.ok(true) : ResponseEntity.notFound().build();
    }

}
