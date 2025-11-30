package br.com.travelflow.repository;

import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.domain.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
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
    List<Voucher> findBySaleDateBetweenAndAgencyId(Date saleDate, Date agencyId, Long start, Long end);
    List<Voucher> findByDestinationAndAgencyId(Long destination, Long agencyId);
    List<Voucher> findBySearchTermAndAgencyId(String searchTerm, Long agencyId);
    Long countTotalVouchersByAgencyId(Long agencyId);
    BigDecimal sumTotalRevenueByAgencyId(Long agencyId);
    Long countUniqueCustomersByAgencyId(Long agencyId);
    boolean existsByVoucherNumberAndAgencyId(String voucherNumber, Long agencyId);
    boolean existsByIdAndAgencyId(Long id, Long agencyId);
}
