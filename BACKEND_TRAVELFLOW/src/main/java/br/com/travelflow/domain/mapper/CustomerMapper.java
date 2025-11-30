package br.com.travelflow.domain.mapper;

import br.com.travelflow.domain.dto.CustomerDto;
import br.com.travelflow.domain.entity.Customer;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomerMapper {
    
    public CustomerDto toDto(Customer customer) {
        if (customer == null) {
            return null;
        }
        
        return new CustomerDto(
            customer.getId(),
            customer.getName(),
            customer.getCpf(),
            customer.getPhone(),
            customer.getEmail(),
            customer.getCreatedAt(),
            customer.getUpdatedAt()
        );
    }
    
    public Customer toEntity(CustomerDto customerDto) {
        if (customerDto == null) {
            return null;
        }
        
        Customer customer = new Customer();
        customer.setId(customerDto.getId());
        customer.setName(customerDto.getName());
        customer.setCpf(customerDto.getCpf());
        customer.setPhone(customerDto.getPhone());
        customer.setEmail(customerDto.getEmail());
        
        return customer;
    }
    
    public List<CustomerDto> toDtoList(List<Customer> customers) {
        return customers.stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }
    
    public List<Customer> toEntityList(List<CustomerDto> customerDtos) {
        return customerDtos.stream()
            .map(this::toEntity)
            .collect(Collectors.toList());
    }
    
    public void updateEntityFromDto(CustomerDto customerDto, Customer customer) {
        if (customerDto == null || customer == null) {
            return;
        }
        
        customer.setName(customerDto.getName());
        customer.setCpf(customerDto.getCpf());
        customer.setPhone(customerDto.getPhone());
        customer.setEmail(customerDto.getEmail());
    }
}
