package br.com.travelflow.domain.dto;

import java.math.BigDecimal;

public class DashboardStatsDto {
    
    private Long totalVouchers;
    private BigDecimal totalRevenue;
    private Long uniqueCustomers;
    private Long totalTrips;
    
    public DashboardStatsDto() {}
    
    public DashboardStatsDto(Long totalVouchers, BigDecimal totalRevenue, Long uniqueCustomers, Long totalTrips) {
        this.totalVouchers = totalVouchers;
        this.totalRevenue = totalRevenue;
        this.uniqueCustomers = uniqueCustomers;
        this.totalTrips = totalTrips;
    }

    public Long getTotalVouchers() {
        return totalVouchers;
    }
    
    public void setTotalVouchers(Long totalVouchers) {
        this.totalVouchers = totalVouchers;
    }
    
    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }
    
    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
    
    public Long getUniqueCustomers() {
        return uniqueCustomers;
    }
    
    public void setUniqueCustomers(Long uniqueCustomers) {
        this.uniqueCustomers = uniqueCustomers;
    }
    
    public Long getTotalTrips() {
        return totalTrips;
    }
    
    public void setTotalTrips(Long totalTrips) {
        this.totalTrips = totalTrips;
    }
}
