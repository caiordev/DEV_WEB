package br.com.travelflow.service;

import br.com.caio.painel_service.domain.dto.CreateVoucherDto;
import br.com.caio.painel_service.domain.dto.CustomerDto;
import br.com.caio.painel_service.domain.dto.VoucherDto;
import br.com.caio.painel_service.domain.entity.*;
import br.com.caio.painel_service.domain.mapper.VoucherMapper;
import br.com.caio.painel_service.domain.repository.AgencyRepository;
import br.com.caio.painel_service.domain.repository.TripRepository;
import br.com.caio.painel_service.domain.repository.VoucherRepository;
import br.com.caio.painel_service.security.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
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
    
    // Multi-tenant methods
    @Transactional(readOnly = true)
    public List<VoucherDto> findAllByAgency() {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        List<Voucher> vouchers = voucherRepository.findByAgencyIdOrderBySaleDateDesc(agencyId);
        return voucherMapper.toDtoList(vouchers);
    }
    
    // Legacy method - deprecated
    @Deprecated
    @Transactional(readOnly = true)
    public List<VoucherDto> findAll() {
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
    
    // Legacy method - deprecated
    @Deprecated
    @Transactional(readOnly = true)
    public Optional<VoucherDto> findById(Long id) {
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
    
    // Legacy method - deprecated
    @Deprecated
    @Transactional(readOnly = true)
    public Optional<VoucherDto> findByVoucherNumber(String voucherNumber) {
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
    
    // Legacy method - deprecated
    @Deprecated
    @Transactional(readOnly = true)
    public List<VoucherDto> findByCustomerId(Long customerId) {
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
    
    // Legacy method - deprecated
    @Deprecated
    @Transactional(readOnly = true)
    public List<VoucherDto> findBySaleDateBetween(LocalDateTime startDate, LocalDateTime endDate) {
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
    
    // Legacy method - deprecated
    @Deprecated
    @Transactional(readOnly = true)
    public List<VoucherDto> findByDestination(String destination) {
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
    
    // Legacy method - deprecated
    @Deprecated
    @Transactional(readOnly = true)
    public List<VoucherDto> search(String searchTerm) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        List<Voucher> vouchers = voucherRepository.findBySearchTermAndAgencyId(searchTerm, agencyId);
        return voucherMapper.toDtoList(vouchers);
    }
    
    public VoucherDto createVoucherForAgency(CreateVoucherDto createVoucherDto) {
        Long agencyId = SecurityUtils.getCurrentAgencyId();
        Agency agency = agencyRepository.findById(agencyId)
            .orElseThrow(() -> new IllegalArgumentException("Agency not found with id: " + agencyId));
        
        // Find or create customer
        CustomerDto customerDto = customerService.findOrCreate(createVoucherDto.getCustomer());
        Customer customer = new Customer();
        customer.setId(customerDto.getId());
        customer.setName(customerDto.getName());
        customer.setCpf(customerDto.getCpf());
        customer.setPhone(customerDto.getPhone());
        customer.setEmail(customerDto.getEmail());
        
        // Generate unique voucher number
        String voucherNumber = generateVoucherNumber();
        
        // Create voucher
        Voucher voucher = new Voucher();
        voucher.setVoucherNumber(voucherNumber);
        voucher.setCustomer(customer);
        voucher.setAgency(agency);
        voucher.setSaleDate(LocalDateTime.now());
        
        // Create voucher trips
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
        
        // Save voucher
        Voucher savedVoucher = voucherRepository.save(voucher);
        return voucherMapper.toDto(savedVoucher);
    }
    
    // Legacy method - deprecated
    @Deprecated
    public VoucherDto createVoucher(CreateVoucherDto createVoucherDto) {
        // Find or create customer
        CustomerDto customerDto = customerService.findOrCreate(createVoucherDto.getCustomer());
        Customer customer = new Customer();
        customer.setId(customerDto.getId());
        customer.setName(customerDto.getName());
        customer.setCpf(customerDto.getCpf());
        customer.setPhone(customerDto.getPhone());
        customer.setEmail(customerDto.getEmail());
        
        // Generate unique voucher number
        String voucherNumber = generateVoucherNumber();
        
        // Create voucher
        Voucher voucher = new Voucher();
        voucher.setVoucherNumber(voucherNumber);
        voucher.setCustomer(customer);
        voucher.setSaleDate(LocalDateTime.now());
        
        // Create voucher trips
        BigDecimal totalValue = BigDecimal.ZERO;
        for (CreateVoucherDto.CreateVoucherTripDto tripDto : createVoucherDto.getTrips()) {
            Trip trip = tripRepository.findById(tripDto.getTripId())
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
        
        // Save voucher
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
    
    // Legacy method - deprecated
    @Deprecated
    public boolean delete(Long id) {
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
    
    // Legacy method - deprecated
    @Deprecated
    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStats() {
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
        
        // Ensure uniqueness
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
    
    // Legacy methods - deprecated
    @Deprecated
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return voucherRepository.existsById(id);
    }
    
    @Deprecated
    @Transactional(readOnly = true)
    public boolean existsByVoucherNumber(String voucherNumber) {
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
