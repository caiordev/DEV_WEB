package br.com.travelflow.repository;

import br.com.travelflow.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByCpf(String cpf);
    Optional<Customer> findByEmail(String email);
    List<Customer> findByNameContainingIgnoreCase(String name);
    @Query("SELECT c FROM Customer c WHERE " +
            "LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "c.cpf LIKE CONCAT('%', :searchTerm, '%') OR " +
            "c.phone LIKE CONCAT('%', :searchTerm, '%') OR " +
            "LOWER(c.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Customer> findBySearchTerm(@Param("searchTerm") String searchTerm);
    @Query("SELECT c FROM Customer c ORDER BY c.createdAt DESC")
    List<Customer> findAllOrderByCreatedAtDesc();
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);
}
