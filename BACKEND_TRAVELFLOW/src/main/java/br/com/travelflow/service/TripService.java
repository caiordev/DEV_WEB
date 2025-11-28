package br.com.travelflow.service;

import br.com.travelflow.domain.dto.TripDto;
import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.domain.entity.Trip;
import br.com.travelflow.domain.mapper.TripMapper;
import br.com.travelflow.repository.AgencyRepository;
import br.com.travelflow.repository.TripRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final AgencyRepository agencyRepository;
    private final TripMapper tripMapper;

    public TripService(TripRepository tripRepository, AgencyRepository agencyRepository, TripMapper tripMapper) {
        this.tripRepository = tripRepository;
        this.agencyRepository = agencyRepository;
        this.tripMapper = tripMapper;
    }

    @Transactional(readOnly = true)
    public List<TripDto> findByAgencyId(Long agencyId) {
        List<Trip> trips = tripRepository.findByAgencyIdOrderByCreatedAtDesc(agencyId);
        return tripMapper.toDtoList(trips);
    }

    @Transactional(readOnly = true)
    public Optional<TripDto> findByIdAndAgencyId(Long id, Long agencyId) {
        return tripRepository.findByIdAndAgencyId(id, agencyId)
                .map(tripMapper::toDto);
    }

    @Transactional(readOnly = true)
    public List<TripDto> findByDestinationAndAgencyId(String destination, Long agencyId) {
        List<Trip> trips = tripRepository.findByDestinationContainingIgnoreCaseAndAgencyId(destination, agencyId);
        return tripMapper.toDtoList(trips);
    }

    @Transactional(readOnly = true)
    public List<TripDto> findByLocationAndAgencyId(String location, Long agencyId) {
        List<Trip> trips = tripRepository.findByLocationContainingIgnoreCaseAndAgencyId(location, agencyId);
        return tripMapper.toDtoList(trips);
    }

    @Transactional(readOnly = true)
    public List<TripDto> searchByAgencyId(String searchTerm, Long agencyId) {
        List<Trip> trips = tripRepository.findBySearchTermAndAgencyId(searchTerm, agencyId);
        return tripMapper.toDtoList(trips);
    }

    @Transactional(readOnly = true)
    public List<String> findAllDestinationsByAgencyId(Long agencyId) {
        return tripRepository.findAllDestinationsByAgencyId(agencyId);
    }

    @Transactional
    public TripDto createForAgency(TripDto tripDto, Long agencyId) {
        Agency agency = agencyRepository.findById(agencyId)
                .orElseThrow(() -> new RuntimeException("Agency not found"));

        Trip trip = tripMapper.toEntity(tripDto);
        trip.setAgency(agency);
        Trip savedTrip = tripRepository.save(trip);
        return tripMapper.toDto(savedTrip);
    }

    @Transactional
    public Optional<TripDto> updateForAgency(Long id, TripDto tripDto, Long agencyId) {
        return tripRepository.findByIdAndAgencyId(id, agencyId)
                .map(existingTrip -> {
                    tripMapper.updateEntityFromDto(tripDto, existingTrip);
                    Trip updatedTrip = tripRepository.save(existingTrip);
                    return tripMapper.toDto(updatedTrip);
                });
    }

    public boolean deleteForAgency(Long id, Long agencyId) {
        Optional<Trip> trip = tripRepository.findByIdAndAgencyId(id, agencyId);
        if (trip.isPresent()) {
            tripRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public boolean existsByIdAndAgencyId(Long id, Long agencyId) {
        return tripRepository.findByIdAndAgencyId(id, agencyId).isPresent();
    }
}
