package br.com.travelflow.service;

import br.com.travelflow.domain.dto.CreateVoucherDto;
import br.com.travelflow.domain.dto.CustomerDto;
import br.com.travelflow.domain.dto.VoucherDto;
import br.com.travelflow.domain.entity.*;
import br.com.travelflow.domain.mapper.VoucherMapper;
import br.com.travelflow.repository.AgencyRepository;
import br.com.travelflow.repository.TripRepository;
import br.com.travelflow.repository.VoucherRepository;
import br.com.travelflow.security.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class VoucherService {
    
    private final VoucherRepository voucherRepository;
    private final TripRepository tripRepository;
    private final AgencyRepository agencyRepository;
    private final CustomerService customerService;
    private final VoucherMapper voucherMapper;
    
    public VoucherService(VoucherRepository voucherRepository,
                          TripRepository tripRepository,
                          AgencyRepository agencyRepository,
                          CustomerService customerService,
                          VoucherMapper voucherMapper) {
        this.voucherRepository = voucherRepository;
        this.tripRepository = tripRepository;
        this.agencyRepository = agencyRepository;
        this.customerService = customerService;
        this.voucherMapper = voucherMapper;
    }

    @Transactional(readOnly = true)
    public List<VoucherDto> findAllByAgency() {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        List<Voucher> vouchers = voucherRepository.findByAgencyIdOrderBySaleDateDesc(agencyId);
        return voucherMapper.toDtoList(vouchers);
    }

    
    @Transactional(readOnly = true)
    public Optional<VoucherDto> findByIdAndAgency(Long id) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        return voucherRepository.findByIdAndAgencyId(id, agencyId)
            .map(voucherMapper::toDto);
    }
    
    @Transactional(readOnly = true)
    public Optional<VoucherDto> findByVoucherNumberAndAgency(String voucherNumber) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        return voucherRepository.findByVoucherNumberAndAgencyId(voucherNumber, agencyId)
            .map(voucherMapper::toDto);
    }

    @Transactional(readOnly = true)
    public List<VoucherDto> findByCustomerIdAndAgency(Long customerId) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        List<Voucher> vouchers = voucherRepository.findByCustomerIdAndAgencyId(customerId, agencyId);
        return voucherMapper.toDtoList(vouchers);
    }
    
    @Transactional(readOnly = true)
    public List<VoucherDto> findBySaleDateBetweenAndAgency(LocalDateTime startDate, LocalDateTime endDate) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        List<Voucher> vouchers = voucherRepository.findBySaleDateBetweenAndAgencyId(startDate, endDate, agencyId);
        return voucherMapper.toDtoList(vouchers);
    }
    
    @Transactional(readOnly = true)
    public List<VoucherDto> findByDestinationAndAgency(String destination) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        List<Voucher> vouchers = voucherRepository.findByDestinationAndAgencyId(destination, agencyId);
        return voucherMapper.toDtoList(vouchers);
    }
    
    @Transactional(readOnly = true)
    public List<VoucherDto> searchByAgency(String searchTerm) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        List<Voucher> vouchers = voucherRepository.findBySearchTermAndAgencyId(searchTerm, agencyId);
        return voucherMapper.toDtoList(vouchers);
    }


    @Transactional
    public VoucherDto createVoucherForAgency(CreateVoucherDto createVoucherDto) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        Agency agency = agencyRepository.findById(agencyId)
            .orElseThrow(() -> new IllegalArgumentException("Agency not found with id: " + agencyId));

        CustomerDto customerDto = customerService.findOrCreate(createVoucherDto.getCustomer());
        Customer customer = new Customer();
        customer.setId(customerDto.getId());
        customer.setName(customerDto.getName());
        customer.setCpf(customerDto.getCpf());
        customer.setPhone(customerDto.getPhone());
        customer.setEmail(customerDto.getEmail());

        String voucherNumber = generateVoucherNumber();

        Voucher voucher = new Voucher();
        voucher.setVoucherNumber(voucherNumber);
        voucher.setCustomer(customer);
        voucher.setAgency(agency);
        voucher.setSaleDate(LocalDateTime.now());

        BigDecimal totalValue = BigDecimal.ZERO;
        for (CreateVoucherDto.CreateVoucherTripDto tripDto : createVoucherDto.getTrips()) {
            Trip trip = tripRepository.findByIdAndAgencyId(tripDto.getTripId(), agencyId)
                .orElseThrow(() -> new IllegalArgumentException("Trip not found with id: " + tripDto.getTripId()));
            
            VoucherTrip voucherTrip = new VoucherTrip();
            voucherTrip.setVoucher(voucher);
            voucherTrip.setTrip(trip);
            voucherTrip.setTripDate(tripDto.getTripDate());
            voucherTrip.setPassengerCount(tripDto.getPassengerCount());
            voucherTrip.calculateTotalPrice();
            
            voucher.addVoucherTrip(voucherTrip);
            totalValue = totalValue.add(voucherTrip.getTotalPrice());
        }
        
        voucher.setTotalValue(totalValue);

        Voucher savedVoucher = voucherRepository.save(voucher);
        return voucherMapper.toDto(savedVoucher);
    }
    

    public boolean deleteByAgency(Long id) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        if (voucherRepository.existsByIdAndAgencyId(id, agencyId)) {
            voucherRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStatsByAgency() {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        Long totalVouchers = voucherRepository.countTotalVouchersByAgencyId(agencyId);
        BigDecimal totalRevenue = voucherRepository.sumTotalRevenueByAgencyId(agencyId);
        Long uniqueCustomers = voucherRepository.countUniqueCustomersByAgencyId(agencyId);
        
        if (totalRevenue == null) {
            totalRevenue = BigDecimal.ZERO;
        }
        
        return new DashboardStatsDto(
            totalVouchers != null ? totalVouchers : 0L,
            totalRevenue,
            uniqueCustomers != null ? uniqueCustomers : 0L
        );
    }
    
    private String generateVoucherNumber() {
        String datePrefix = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        int randomNumber = 100000 + new Random().nextInt(900000);
        String voucherNumber = datePrefix + "-" + randomNumber;

        Long agencyId = SecurityUtils.getCurrentAgencyId();
        while (voucherRepository.existsByVoucherNumberAndAgencyId(voucherNumber, agencyId)) {
            randomNumber = 100000 + new Random().nextInt(900000);
            voucherNumber = datePrefix + "-" + randomNumber;
        }
        
        return voucherNumber;
    }
    
    @Transactional(readOnly = true)
    public boolean existsByIdAndAgency(Long id) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        return voucherRepository.existsByIdAndAgencyId(id, agencyId);
    }
    
    @Transactional(readOnly = true)
    public boolean existsByVoucherNumberAndAgency(String voucherNumber) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        return voucherRepository.existsByVoucherNumberAndAgencyId(voucherNumber, agencyId);
    }
    
    public static class DashboardStatsDto {
        private final Long totalVouchers;
        private final BigDecimal totalRevenue;
        private final Long uniqueCustomers;
        
        public DashboardStatsDto(Long totalVouchers, BigDecimal totalRevenue, Long uniqueCustomers) {
            this.totalVouchers = totalVouchers;
            this.totalRevenue = totalRevenue;
            this.uniqueCustomers = uniqueCustomers;
        }
        
        public Long getTotalVouchers() {
            return totalVouchers;
        }
        
        public BigDecimal getTotalRevenue() {
            return totalRevenue;
        }
        
        public Long getUniqueCustomers() {
            return uniqueCustomers;
        }
    }
}
