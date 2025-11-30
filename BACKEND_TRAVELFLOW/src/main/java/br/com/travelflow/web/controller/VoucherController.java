package br.com.travelflow.web.controller;

import br.com.travelflow.domain.dto.CreateVoucherDto;
import br.com.travelflow.domain.dto.VoucherDto;
import br.com.travelflow.service.VoucherService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vouchers")
public class VoucherController {
    
    private final VoucherService voucherService;
    
    public VoucherController(VoucherService voucherService) {
        this.voucherService = voucherService;
    }
    
    @GetMapping
    public ResponseEntity<List<VoucherDto>> getAllVouchers() {
        List<VoucherDto> vouchers = voucherService.findAllByAgency();
        return ResponseEntity.ok(vouchers);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<VoucherDto> getVoucherById(@PathVariable Long id) {
        Optional<VoucherDto> voucher = voucherService.findByIdAndAgency(id);
        return voucher.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/by-number/{voucherNumber}")
    public ResponseEntity<VoucherDto> getVoucherByNumber(@PathVariable String voucherNumber) {
        Optional<VoucherDto> voucher = voucherService.findByVoucherNumberAndAgency(voucherNumber);
        return voucher.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/by-customer/{customerId}")
    public ResponseEntity<List<VoucherDto>> getVouchersByCustomer(@PathVariable Long customerId) {
        List<VoucherDto> vouchers = voucherService.findByCustomerIdAndAgency(customerId);
        return ResponseEntity.ok(vouchers);
    }
    
    @GetMapping("/by-date-range")
    public ResponseEntity<List<VoucherDto>> getVouchersByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<VoucherDto> vouchers = voucherService.findBySaleDateBetweenAndAgency(startDate, endDate);
        return ResponseEntity.ok(vouchers);
    }
    
    @GetMapping("/by-destination")
    public ResponseEntity<List<VoucherDto>> getVouchersByDestination(@RequestParam String destination) {
        List<VoucherDto> vouchers = voucherService.findByDestinationAndAgency(destination);
        return ResponseEntity.ok(vouchers);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<VoucherDto>> searchVouchers(@RequestParam String q) {
        List<VoucherDto> vouchers = voucherService.searchByAgency(q);
        return ResponseEntity.ok(vouchers);
    }
    
    @PostMapping
    public ResponseEntity<VoucherDto> createVoucher(@Valid @RequestBody CreateVoucherDto createVoucherDto) {
        VoucherDto createdVoucher = voucherService.createVoucherForAgency(createVoucherDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVoucher);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoucher(@PathVariable Long id) {
        boolean deleted = voucherService.deleteByAgency(id);
        return deleted ? ResponseEntity.noContent().build() 
                      : ResponseEntity.notFound().build();
    }
    
    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> voucherExists(@PathVariable Long id) {
        boolean exists = voucherService.existsByIdAndAgency(id);
        return ResponseEntity.ok(exists);
    }
    
    @GetMapping("/number/{voucherNumber}/exists")
    public ResponseEntity<Boolean> voucherExistsByNumber(@PathVariable String voucherNumber) {
        boolean exists = voucherService.existsByVoucherNumberAndAgency(voucherNumber);
        return ResponseEntity.ok(exists);
    }
}
