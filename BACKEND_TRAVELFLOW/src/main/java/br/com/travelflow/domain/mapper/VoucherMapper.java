package br.com.travelflow.domain.mapper;

import br.com.travelflow.domain.dto.VoucherDto;
import br.com.travelflow.domain.dto.VoucherTripDto;
import br.com.travelflow.domain.entity.Voucher;
import br.com.travelflow.domain.entity.VoucherTrip;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class VoucherMapper {

    private final CustomerMapper customerMapper;
    private final TripMapper tripMapper;

    public VoucherMapper(CustomerMapper customerMapper, TripMapper tripMapper) {
        this.customerMapper = customerMapper;
        this.tripMapper = tripMapper;
    }

    public VoucherDto toDto(Voucher voucher) {
        if (voucher == null) {
            return null;
        }

        List<VoucherTripDto> voucherTripDtos = voucher.getVoucherTrips().stream()
                .map(this::toVoucherTripDto)
                .collect(Collectors.toList());

        return new VoucherDto(
                voucher.getId(),
                voucher.getVoucherNumber(),
                customerMapper.toDto(voucher.getCustomer()),
                voucher.getTotalValue(),
                voucher.getSaleDate(),
                voucher.getCreatedAt(),
                voucher.getUpdatedAt(),
                voucherTripDtos
        );
    }

    public Voucher toEntity(VoucherDto voucherDto) {
        if (voucherDto == null) {
            return null;
        }

        Voucher voucher = new Voucher();
        voucher.setId(voucherDto.getId());
        voucher.setVoucherNumber(voucherDto.getVoucherNumber());
        voucher.setCustomer(customerMapper.toEntity(voucherDto.getCustomer()));
        voucher.setTotalValue(voucherDto.getTotalValue());
        voucher.setSaleDate(voucherDto.getSaleDate());

        return voucher;
    }

    public VoucherTripDto toVoucherTripDto(VoucherTrip voucherTrip) {
        if (voucherTrip == null) {
            return null;
        }

        return new VoucherTripDto(
                voucherTrip.getId(),
                tripMapper.toDto(voucherTrip.getTrip()),
                voucherTrip.getTripDate(),
                voucherTrip.getPassengerCount(),
                voucherTrip.getTotalPrice(),
                voucherTrip.getCreatedAt(),
                voucherTrip.getUpdatedAt()
        );
    }

    public List<VoucherDto> toDtoList(List<Voucher> vouchers) {
        return vouchers.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}