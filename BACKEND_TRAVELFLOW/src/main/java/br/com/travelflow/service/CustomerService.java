package br.com.travelflow.service;

import br.com.travelflow.domain.dto.CustomerDto;
import br.com.travelflow.domain.entity.Customer;
import br.com.travelflow.domain.mapper.CustomerMapper;
import br.com.travelflow.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    
    public CustomerService(CustomerRepository customerRepository, CustomerMapper customerMapper) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }
    
    @Transactional(readOnly = true)
    public List<CustomerDto> findAll() {
        List<Customer> customers = customerRepository.findAllOrderByCreatedAtDesc();
        return customerMapper.toDtoList(customers);
    }
    
    @Transactional(readOnly = true)
    public Optional<CustomerDto> findById(Long id) {
        return customerRepository.findById(id)
            .map(customerMapper::toDto);
    }
    
    @Transactional(readOnly = true)
    public Optional<CustomerDto> findByCpf(String cpf) {
        return customerRepository.findByCpf(cpf)
            .map(customerMapper::toDto);
    }
    
    @Transactional(readOnly = true)
    public Optional<CustomerDto> findByEmail(String email) {
        return customerRepository.findByEmail(email)
            .map(customerMapper::toDto);
    }
    
    @Transactional(readOnly = true)
    public List<CustomerDto> findByName(String name) {
        List<Customer> customers = customerRepository.findByNameContainingIgnoreCase(name);
        return customerMapper.toDtoList(customers);
    }
    
    @Transactional(readOnly = true)
    public List<CustomerDto> search(String searchTerm) {
        List<Customer> customers = customerRepository.findBySearchTerm(searchTerm);
        return customerMapper.toDtoList(customers);
    }
    
    public CustomerDto create(CustomerDto customerDto) {
        if (customerRepository.existsByCpf(customerDto.getCpf())) {
            throw new IllegalArgumentException("Customer with CPF " + customerDto.getCpf() + " already exists");
        }
        
        if (customerDto.getEmail() != null && customerRepository.existsByEmail(customerDto.getEmail())) {
            throw new IllegalArgumentException("Customer with email " + customerDto.getEmail() + " already exists");
        }
        
        Customer customer = customerMapper.toEntity(customerDto);
        Customer savedCustomer = customerRepository.save(customer);
        return customerMapper.toDto(savedCustomer);
    }
    
    public CustomerDto findOrCreate(CustomerDto customerDto) {
        Optional<Customer> existingCustomer = customerRepository.findByCpf(customerDto.getCpf());
        
        if (existingCustomer.isPresent()) {
            Customer customer = existingCustomer.get();
            customerMapper.updateEntityFromDto(customerDto, customer);
            Customer updatedCustomer = customerRepository.save(customer);
            return customerMapper.toDto(updatedCustomer);
        } else {
            return create(customerDto);
            }
    }
    
    public Optional<CustomerDto> update(Long id, CustomerDto customerDto) {
        return customerRepository.findById(id)
            .map(existingCustomer -> {
                if (!existingCustomer.getCpf().equals(customerDto.getCpf()) && 
                    customerRepository.existsByCpf(customerDto.getCpf())) {
                    throw new IllegalArgumentException("Customer with CPF " + customerDto.getCpf() + " already exists");
                }

                if (customerDto.getEmail() != null && 
                    !customerDto.getEmail().equals(existingCustomer.getEmail()) &&
                    customerRepository.existsByEmail(customerDto.getEmail())) {
                    throw new IllegalArgumentException("Customer with email " + customerDto.getEmail() + " already exists");
                }
                
                customerMapper.updateEntityFromDto(customerDto, existingCustomer);
                Customer updatedCustomer = customerRepository.save(existingCustomer);
                return customerMapper.toDto(updatedCustomer);
            });
    }
    
    public boolean delete(Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return customerRepository.existsById(id);
    }
    
    @Transactional(readOnly = true)
    public boolean existsByCpf(String cpf) {
        return customerRepository.existsByCpf(cpf);
    }
    
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return customerRepository.existsByEmail(email);
    }
}
