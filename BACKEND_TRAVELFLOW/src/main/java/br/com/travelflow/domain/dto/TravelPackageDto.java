package br.com.travelflow.domain.dto;

import br.com.caio.painel_service.domain.entity.TravelPackage;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class TravelPackageDto {
    
    private Long id;
    private String name;
    private String description;
    private BigDecimal discountPercentage;
    private Boolean active;
    private List<TripDto> trips;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public TravelPackageDto() {}
    
    public TravelPackageDto(TravelPackage travelPackage) {
        this.id = travelPackage.getId();
        this.name = travelPackage.getName();
        this.description = travelPackage.getDescription();
        this.discountPercentage = travelPackage.getDiscountPercentage();
        this.active = travelPackage.getActive();
        this.createdAt = travelPackage.getCreatedAt();
        this.updatedAt = travelPackage.getUpdatedAt();
        
        if (travelPackage.getTrips() != null) {
            this.trips = travelPackage.getTrips().stream()
                .map(TripDto::new)
                .collect(Collectors.toList());
        }
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public BigDecimal getDiscountPercentage() {
        return discountPercentage;
    }
    
    public void setDiscountPercentage(BigDecimal discountPercentage) {
        this.discountPercentage = discountPercentage;
    }
    
    public Boolean getActive() {
        return active;
    }
    
    public void setActive(Boolean active) {
        this.active = active;
    }
    
    public List<TripDto> getTrips() {
        return trips;
    }
    
    public void setTrips(List<TripDto> trips) {
        this.trips = trips;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
