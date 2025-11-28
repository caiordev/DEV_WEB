package br.com.travelflow.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "voucher_trips")
public class VoucherTrip {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @JsonBackReference(value = "voucher-voucherTrips")
    @NotNull(message = "Voucher is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voucher_id", nullable = false)
    private Voucher voucher;
    
    @JsonBackReference(value = "trip-voucherTrips")
    @NotNull(message = "Trip is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;
    
    @Column(name = "trip_date")
    private LocalDate tripDate;
    
    @NotNull(message = "Passenger count is required")
    @Min(value = 1, message = "Passenger count must be at least 1")
    @Column(name = "passenger_count", nullable = false)
    private Integer passengerCount;
    
    @NotNull(message = "Total price is required")
    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public VoucherTrip() {}
    
    public VoucherTrip(Voucher voucher, Trip trip, LocalDate tripDate, Integer passengerCount) {
        this.voucher = voucher;
        this.trip = trip;
        this.tripDate = tripDate;
        this.passengerCount = passengerCount;
        calculateTotalPrice();
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (totalPrice == null) {
            calculateTotalPrice();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        calculateTotalPrice();
    }

    public void calculateTotalPrice() {
        if (trip != null && passengerCount != null) {
            this.totalPrice = trip.getPricePerPerson().multiply(BigDecimal.valueOf(passengerCount));
        }
    }

    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Voucher getVoucher() {
        return voucher;
    }
    
    public void setVoucher(Voucher voucher) {
        this.voucher = voucher;
    }
    
    public Trip getTrip() {
        return trip;
    }
    
    public void setTrip(Trip trip) {
        this.trip = trip;
    }
    
    public LocalDate getTripDate() {
        return tripDate;
    }
    
    public void setTripDate(LocalDate tripDate) {
        this.tripDate = tripDate;
    }
    
    public Integer getPassengerCount() {
        return passengerCount;
    }
    
    public void setPassengerCount(Integer passengerCount) {
        this.passengerCount = passengerCount;
        calculateTotalPrice();
    }
    
    public BigDecimal getTotalPrice() {
        return totalPrice;
    }
    
    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
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
