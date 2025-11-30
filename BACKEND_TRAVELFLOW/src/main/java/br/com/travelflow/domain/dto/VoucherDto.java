package br.com.travelflow.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class VoucherDto {

    private Long id;

    @NotBlank(message = "Voucher number is required")
    @Size(max = 50, message = "Voucher number must not exceed 50 characters")
    private String voucherNumber;

    @NotNull(message = "Customer is required")
    private CustomerDto customer;

    @NotNull(message = "Total value is required")
    private BigDecimal totalValue;

    private LocalDateTime saleDate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<VoucherTripDto> voucherTrips;

    public VoucherDto() {}

    public VoucherDto(Long id, String voucherNumber, CustomerDto customer, BigDecimal totalValue,
                      LocalDateTime saleDate, LocalDateTime createdAt, LocalDateTime updatedAt,
                      List<VoucherTripDto> voucherTrips) {
        this.id = id;
        this.voucherNumber = voucherNumber;
        this.customer = customer;
        this.totalValue = totalValue;
        this.saleDate = saleDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.voucherTrips = voucherTrips;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVoucherNumber() {
        return voucherNumber;
    }

    public void setVoucherNumber(String voucherNumber) {
        this.voucherNumber = voucherNumber;
    }

    public CustomerDto getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDto customer) {
        this.customer = customer;
    }

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }

    public LocalDateTime getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(LocalDateTime saleDate) {
        this.saleDate = saleDate;
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

    public List<VoucherTripDto> getVoucherTrips() {
        return voucherTrips;
    }

    public void setVoucherTrips(List<VoucherTripDto> voucherTrips) {
        this.voucherTrips = voucherTrips;
    }
}
