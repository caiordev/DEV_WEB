package br.com.travelflow.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "availabilities", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"trip_id", "date"})
})
public class Availability {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @JsonBackReference(value = "trip-availabilities")
    @NotNull(message = "Trip is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;
    
    @NotNull(message = "Date is required")
    @Column(nullable = false)
    private LocalDate date;
    
    @NotNull(message = "Total slots is required")
    @Min(value = 1, message = "Total slots must be at least 1")
    @Column(name = "total_slots", nullable = false)
    private Integer totalSlots;
    
    @NotNull(message = "Available slots is required")
    @Min(value = 0, message = "Available slots cannot be negative")
    @Column(name = "available_slots", nullable = false)
    private Integer availableSlots;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @JsonBackReference(value = "agency-availabilities")
    @NotNull(message = "Agency is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agency_id", nullable = false)
    private Agency agency;
    
    public Availability() {}
    
    public Availability(Trip trip, LocalDate date, Integer totalSlots, Integer availableSlots, BigDecimal price, Agency agency) {
        this.trip = trip;
        this.date = date;
        this.totalSlots = totalSlots;
        this.availableSlots = availableSlots;
        this.price = price;
        this.agency = agency;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public boolean hasAvailableSlots() {
        return availableSlots > 0;
    }
    
    public boolean reserveSlots(int count) {
        if (availableSlots >= count) {
            availableSlots -= count;
            return true;
        }
        return false;
    }
    
    public void releaseSlots(int count) {
        availableSlots = Math.min(availableSlots + count, totalSlots);
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Trip getTrip() {
        return trip;
    }
    
    public void setTrip(Trip trip) {
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
    
    public Agency getAgency() {
        return agency;
    }
    
    public void setAgency(Agency agency) {
        this.agency = agency;
    }
}
