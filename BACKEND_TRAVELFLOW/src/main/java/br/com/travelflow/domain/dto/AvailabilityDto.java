package br.com.travelflow.domain.dto;

import br.com.travelflow.domain.entity.Availability;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class AvailabilityDto {
    
    private Long id;
    private TripDto trip;
    private LocalDate date;
    private Integer totalSlots;
    private Integer availableSlots;
    private BigDecimal price;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public AvailabilityDto() {}
    
    public AvailabilityDto(Availability availability) {
        this.id = availability.getId();
        this.date = availability.getDate();
        this.totalSlots = availability.getTotalSlots();
        this.availableSlots = availability.getAvailableSlots();
        this.price = availability.getPrice();
        this.createdAt = availability.getCreatedAt();
        this.updatedAt = availability.getUpdatedAt();
        
        if (availability.getTrip() != null) {
            this.trip = new TripDto(availability.getTrip());
        }
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public TripDto getTrip() {
        return trip;
    }
    
    public void setTrip(TripDto trip) {
        this.trip = trip;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    public Integer getTotalSlots() {
        return totalSlots;
    }
    
    public void setTotalSlots(Integer totalSlots) {
        this.totalSlots = totalSlots;
    }
    
    public Integer getAvailableSlots() {
        return availableSlots;
    }
    
    public void setAvailableSlots(Integer availableSlots) {
        this.availableSlots = availableSlots;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
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
