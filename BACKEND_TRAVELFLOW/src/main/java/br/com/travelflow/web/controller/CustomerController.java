package br.com.travelflow.web.controller;

import br.com.travelflow.domain.dto.CustomerDto;
import br.com.travelflow.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    
    private final CustomerService customerService;
    
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }
    
    @GetMapping
    public ResponseEntity<List<CustomerDto>> getAllCustomers() {
        List<CustomerDto> customers = customerService.findAll();
        return ResponseEntity.ok(customers);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable Long id) {
        Optional<CustomerDto> customer = customerService.findById(id);
        return customer.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/by-cpf/{cpf}")
    public ResponseEntity<CustomerDto> getCustomerByCpf(@PathVariable String cpf) {
        Optional<CustomerDto> customer = customerService.findByCpf(cpf);
        return customer.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/by-email")
    public ResponseEntity<CustomerDto> getCustomerByEmail(@RequestParam String email) {
        Optional<CustomerDto> customer = customerService.findByEmail(email);
        return customer.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<CustomerDto>> searchCustomers(@RequestParam String q) {
        List<CustomerDto> customers = customerService.search(q);
        return ResponseEntity.ok(customers);
    }
    
    @GetMapping("/by-name")
    public ResponseEntity<List<CustomerDto>> getCustomersByName(@RequestParam String name) {
        List<CustomerDto> customers = customerService.findByName(name);
        return ResponseEntity.ok(customers);
    }
    
    @PostMapping
    public ResponseEntity<CustomerDto> createCustomer(@Valid @RequestBody CustomerDto customerDto) {
        try {
            CustomerDto createdCustomer = customerService.create(customerDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/find-or-create")
    public ResponseEntity<CustomerDto> findOrCreateCustomer(@Valid @RequestBody CustomerDto customerDto) {
        CustomerDto customer = customerService.findOrCreate(customerDto);
        return ResponseEntity.ok(customer);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CustomerDto> updateCustomer(@PathVariable Long id, @Valid @RequestBody CustomerDto customerDto) {
        try {
            Optional<CustomerDto> updatedCustomer = customerService.update(id, customerDto);
            return updatedCustomer.map(ResponseEntity::ok)
                                 .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        boolean deleted = customerService.delete(id);
        return deleted ? ResponseEntity.noContent().build() 
                      : ResponseEntity.notFound().build();
    }
    
    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> customerExists(@PathVariable Long id) {
        boolean exists = customerService.existsById(id);
        return ResponseEntity.ok(exists);
    }
    
    @GetMapping("/cpf/{cpf}/exists")
    public ResponseEntity<Boolean> customerExistsByCpf(@PathVariable String cpf) {
        boolean exists = customerService.existsByCpf(cpf);
        return ResponseEntity.ok(exists);
    }
    
    @GetMapping("/email/exists")
    public ResponseEntity<Boolean> customerExistsByEmail(@RequestParam String email) {
        boolean exists = customerService.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }
}
