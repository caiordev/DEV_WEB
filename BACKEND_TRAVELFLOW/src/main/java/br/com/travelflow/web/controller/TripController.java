package br.com.travelflow.web.controller;

import br.com.travelflow.domain.dto.TripDto;
import br.com.travelflow.security.SecurityUtils;
import br.com.travelflow.service.TripService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
        System.out.println(agencyId);
        List<TripDto> trips = tripService.findByAgencyId(agencyId);
        if (trips.isEmpty()) return  ResponseEntity.noContent().build();
        return ResponseEntity.ok(trips);
    }

}
