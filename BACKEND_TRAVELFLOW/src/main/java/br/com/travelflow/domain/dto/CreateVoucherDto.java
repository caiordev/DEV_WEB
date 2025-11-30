package br.com.travelflow.domain.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class CreateVoucherDto {
    
    @NotNull(message = "Customer information is required")
    @Valid
    private CustomerDto customer;
    
    @NotNull(message = "Trip list is required")
    @Size(min = 1, message = "At least one trip is required")
    @Valid
    private List<CreateVoucherTripDto> trips;
    
    // Constructors
    public CreateVoucherDto() {}
    
    public CreateVoucherDto(CustomerDto customer, List<CreateVoucherTripDto> trips) {
        this.customer = customer;
        this.trips = trips;
    }
    
    // Getters and Setters
    public CustomerDto getCustomer() {
        return customer;
    }
    
    public void setCustomer(CustomerDto customer) {
        this.customer = customer;
    }
    
    public List<CreateVoucherTripDto> getTrips() {
        return trips;
    }
    
    public void setTrips(List<CreateVoucherTripDto> trips) {
        this.trips = trips;
    }
    
    public static class CreateVoucherTripDto {
        
        @NotNull(message = "Trip ID is required")
        private Long tripId;
        
        private java.time.LocalDate tripDate;
        
        @NotNull(message = "Passenger count is required")
        @jakarta.validation.constraints.Min(value = 1, message = "Passenger count must be at least 1")
        private Integer passengerCount;
        
        // Constructors
        public CreateVoucherTripDto() {}
        
        public CreateVoucherTripDto(Long tripId, java.time.LocalDate tripDate, Integer passengerCount) {
            this.tripId = tripId;
            this.tripDate = tripDate;
            this.passengerCount = passengerCount;
        }
        
        // Getters and Setters
        public Long getTripId() {
            return tripId;
        }
        
        public void setTripId(Long tripId) {
            this.tripId = tripId;
        }
        
        public java.time.LocalDate getTripDate() {
            return tripDate;
        }
        
        public void setTripDate(java.time.LocalDate tripDate) {
            this.tripDate = tripDate;
        }
        
        public Integer getPassengerCount() {
            return passengerCount;
        }
        
        public void setPassengerCount(Integer passengerCount) {
            this.passengerCount = passengerCount;
        }
    }
}
