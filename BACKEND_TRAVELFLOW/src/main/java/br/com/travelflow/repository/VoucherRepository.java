package br.com.travelflow.repository;

import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.domain.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    List<Voucher> findByAgencyIdOrderBySaleDateDesc(Long agencyId);
    List<Voucher> findByAgency(Agency agency);
    Long countByAgency(Agency agency);
    Optional<Voucher> findByIdAndAgencyId(Long id, Long agencyId);
    Optional<Voucher> findByVoucherNumberAndAgencyId(String voucherNumber, Long agencyId);
    List<Voucher> findByCustomerIdAndAgencyId(Long customerId, Long agencyId);
    @Query("SELECT v FROM Voucher v WHERE v.agency.id = :agencyId AND v.saleDate BETWEEN :startDate AND :endDate ORDER BY v.saleDate DESC")
    List<Voucher> findBySaleDateBetweenAndAgencyId(@Param("startDate") LocalDateTime startDate,
                                                   @Param("endDate") LocalDateTime endDate,
                                                   @Param("agencyId") Long agencyId);

    @Query("SELECT v FROM Voucher v JOIN v.voucherTrips vt JOIN vt.trip t WHERE v.agency.id = :agencyId AND " +
            "LOWER(t.destination) LIKE LOWER(CONCAT('%', :destination, '%'))")
    List<Voucher> findByDestinationAndAgencyId(@Param("destination") String destination, @Param("agencyId") Long agencyId);

    @Query("SELECT v FROM Voucher v WHERE v.agency.id = :agencyId AND (" +
            "LOWER(v.customer.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "v.customer.cpf LIKE CONCAT('%', :searchTerm, '%') OR " +
            "v.voucherNumber LIKE CONCAT('%', :searchTerm, '%'))")
    List<Voucher> findBySearchTermAndAgencyId(@Param("searchTerm") String searchTerm, @Param("agencyId") Long agencyId);

    Long countTotalVouchersByAgencyId(Long agencyId);
    @Query("SELECT SUM(v.totalValue) FROM Voucher v WHERE v.agency.id = :agencyId")
    BigDecimal sumTotalRevenueByAgencyId(@Param("agencyId") Long agencyId);

    Long countUniqueCustomersByAgencyId(Long agencyId);
    boolean existsByVoucherNumberAndAgencyId(String voucherNumber, Long agencyId);
    boolean existsByIdAndAgencyId(Long id, Long agencyId);
}
