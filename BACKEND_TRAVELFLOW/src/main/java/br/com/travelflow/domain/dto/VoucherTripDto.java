package br.com.travelflow.domain.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class VoucherTripDto {

    private Long id;

    @NotNull(message = "Trip is required")
    private TripDto trip;
    private LocalDate tripDate;

    @NotNull(message = "Passenger count is required")
    @Min(value = 1, message = "Passenger count must be at least 1")
    private Integer passengerCount;

    @NotNull(message = "Total price is required")
    private Double totalPrice;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public VoucherTripDto() {}

    public VoucherTripDto(Long id, TripDto trip, LocalDate tripDate, Integer passengerCount, Double totalPrice, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.trip = trip;
        this.tripDate = tripDate;
        this.passengerCount = passengerCount;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

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
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
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
