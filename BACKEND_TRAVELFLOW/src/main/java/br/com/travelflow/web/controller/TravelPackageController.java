package br.com.travelflow.web.controller;

import br.com.travelflow.domain.dto.CreatePackageDto;
import br.com.travelflow.domain.dto.TravelPackageDto;
import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.security.SecurityUtils;
import br.com.travelflow.service.TravelPackageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/packages")
public class TravelPackageController {
    
    private final TravelPackageService packageService;
    
    public TravelPackageController(TravelPackageService packageService) {
        this.packageService = packageService;
    }
    
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<TravelPackageDto>> getAllPackages() {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        List<TravelPackageDto> packages = packageService.getAllPackages(agency);
        return ResponseEntity.ok(packages);
    }
    
    @GetMapping("/active")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<TravelPackageDto>> getActivePackages() {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        List<TravelPackageDto> packages = packageService.getActivePackages(agency);
        return ResponseEntity.ok(packages);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<TravelPackageDto> getPackageById(@PathVariable Long id) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        TravelPackageDto packageDto = packageService.getPackageById(id, agency);
        return ResponseEntity.ok(packageDto);
    }
    
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<TravelPackageDto> createPackage(@Valid @RequestBody CreatePackageDto dto) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        TravelPackageDto created = packageService.createPackage(dto, agency);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<TravelPackageDto> updatePackage(@PathVariable Long id, @Valid @RequestBody CreatePackageDto dto) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        TravelPackageDto updated = packageService.updatePackage(id, dto, agency);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        packageService.deletePackage(id, agency);
        return ResponseEntity.noContent().build();
    }
}
