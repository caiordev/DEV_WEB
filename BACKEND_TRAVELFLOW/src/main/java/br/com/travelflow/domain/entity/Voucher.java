package br.com.travelflow.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vouchers")
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Voucher number is required")
    @Size(max = 50, message = "Voucher number must not exceed 50 characters")
    @Column(name = "voucher_number", nullable = false, unique = true, length = 50)
    private String voucherNumber;

    @JsonBackReference(value = "customer-vouchers")
    @NotNull(message = "Customer is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @NotNull(message = "Total value is required")
    @Column(name = "total_value", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalValue;

    @Column(name = "sale_date", nullable = false)
    private LocalDateTime saleDate;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private VoucherStatus status = VoucherStatus.ATIVO;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @JsonBackReference(value = "agency-vouchers")
    @NotNull(message = "Agency is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agency_id", nullable = false)
    private Agency agency;

    @JsonManagedReference(value = "voucher-voucherTrips")
    @OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<VoucherTrip> voucherTrips = new ArrayList<>();

    public Voucher() {}

    public Voucher(String voucherNumber, Customer customer, BigDecimal totalValue, LocalDateTime saleDate, Agency agency) {
        this.voucherNumber = voucherNumber;
        this.customer = customer;
        this.totalValue = totalValue;
        this.saleDate = saleDate;
        this.agency = agency;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (saleDate == null) {
            saleDate = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void addVoucherTrip(VoucherTrip voucherTrip) {
        voucherTrips.add(voucherTrip);
        voucherTrip.setVoucher(this);
    }

    public void removeVoucherTrip(VoucherTrip voucherTrip) {
        voucherTrips.remove(voucherTrip);
        voucherTrip.setVoucher(null);
    }

    public void calculateTotalValue() {
        this.totalValue = voucherTrips.stream()
                .map(VoucherTrip::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
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

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
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

    public List<VoucherTrip> getVoucherTrips() {
        return voucherTrips;
    }

    public void setVoucherTrips(List<VoucherTrip> voucherTrips) {
        this.voucherTrips = voucherTrips;
    }

    public Agency getAgency() {
        return agency;
    }

    public void setAgency(Agency agency) {
        this.agency = agency;
    }

    public VoucherStatus getStatus() {
        return status;
    }

    public void setStatus(VoucherStatus status) {
        this.status = status;
    }

    public void cancel() {
        this.status = VoucherStatus.CANCELADO;
    }

    public void markAsUsed() {
        this.status = VoucherStatus.UTILIZADO;
    }

    public boolean isActive() {
        return this.status == VoucherStatus.ATIVO;
    }
}
