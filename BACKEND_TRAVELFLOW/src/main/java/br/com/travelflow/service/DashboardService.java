package br.com.travelflow.service;

import br.com.travelflow.domain.dto.DashboardStatsDto;
import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.repository.CustomerRepository;
import br.com.travelflow.repository.TripRepository;
import br.com.travelflow.repository.VoucherRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class DashboardService {
    
    private final VoucherRepository voucherRepository;
    private final CustomerRepository customerRepository;
    private final TripRepository tripRepository;
    
    public DashboardService(VoucherRepository voucherRepository,
                            CustomerRepository customerRepository,
                            TripRepository tripRepository) {
        this.voucherRepository = voucherRepository;
        this.customerRepository = customerRepository;
        this.tripRepository = tripRepository;
    }
    
    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStats(Agency agency) {
        Long totalVouchers = voucherRepository.countByAgency(agency);
        
        BigDecimal totalRevenue = voucherRepository.findByAgency(agency).stream()
            .map(v -> v.getTotalValue())
            .filter(value -> value != null)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Long uniqueCustomers = voucherRepository.findByAgency(agency).stream()
            .map(v -> v.getCustomer())
            .filter(customer -> customer != null)
            .map(customer -> customer.getId())
            .distinct()
            .count();
        
        Long totalTrips = tripRepository.countByAgency(agency);
        
        return new DashboardStatsDto(totalVouchers, totalRevenue, uniqueCustomers, totalTrips);
    }
}
