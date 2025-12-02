package br.com.travelflow.service;

import br.com.caio.painel_service.domain.dto.CreatePackageDto;
import br.com.caio.painel_service.domain.dto.TravelPackageDto;
import br.com.caio.painel_service.domain.entity.Agency;
import br.com.caio.painel_service.domain.entity.TravelPackage;
import br.com.caio.painel_service.domain.entity.Trip;
import br.com.caio.painel_service.domain.repository.TravelPackageRepository;
import br.com.caio.painel_service.domain.repository.TripRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TravelPackageService {
    
    private final TravelPackageRepository packageRepository;
    private final TripRepository tripRepository;
    
    public TravelPackageService(TravelPackageRepository packageRepository, TripRepository tripRepository) {
        this.packageRepository = packageRepository;
        this.tripRepository = tripRepository;
    }
    
    @Transactional(readOnly = true)
    public List<TravelPackageDto> getAllPackages(Agency agency) {
        return packageRepository.findByAgency(agency).stream()
            .map(TravelPackageDto::new)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<TravelPackageDto> getActivePackages(Agency agency) {
        return packageRepository.findActivePackagesByAgency(agency).stream()
            .map(TravelPackageDto::new)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public TravelPackageDto getPackageById(Long id, Agency agency) {
        TravelPackage travelPackage = packageRepository.findByIdAndAgency(id, agency)
            .orElseThrow(() -> new RuntimeException("Package not found"));
        return new TravelPackageDto(travelPackage);
    }
    
    @Transactional
    public TravelPackageDto createPackage(CreatePackageDto dto, Agency agency) {
        TravelPackage travelPackage = new TravelPackage();
        travelPackage.setName(dto.getName());
        travelPackage.setDescription(dto.getDescription());
        travelPackage.setDiscountPercentage(dto.getDiscountPercentage());
        travelPackage.setActive(dto.getActive());
        travelPackage.setAgency(agency);
        
        // Salvar primeiro para gerar o ID
        TravelPackage saved = packageRepository.save(travelPackage);
        
        // Depois adicionar os trips
        List<Trip> trips = tripRepository.findAllById(dto.getTripIds());
        if (trips.size() != dto.getTripIds().size()) {
            throw new RuntimeException("Some trips not found");
        }
        
        saved.setTrips(trips);
        saved = packageRepository.save(saved);
        
        // Forçar o carregamento dos trips
        saved.getTrips().size();
        
        return new TravelPackageDto(saved);
    }
    
    @Transactional
    public TravelPackageDto updatePackage(Long id, CreatePackageDto dto, Agency agency) {
        TravelPackage travelPackage = packageRepository.findByIdAndAgency(id, agency)
            .orElseThrow(() -> new RuntimeException("Package not found"));
        
        travelPackage.setName(dto.getName());
        travelPackage.setDescription(dto.getDescription());
        travelPackage.setDiscountPercentage(dto.getDiscountPercentage());
        travelPackage.setActive(dto.getActive());
        
        List<Trip> trips = tripRepository.findAllById(dto.getTripIds());
        if (trips.size() != dto.getTripIds().size()) {
            throw new RuntimeException("Some trips not found");
        }
        
        travelPackage.setTrips(trips);
        
        TravelPackage updated = packageRepository.save(travelPackage);
        return new TravelPackageDto(updated);
    }
    
    @Transactional
    public void deletePackage(Long id, Agency agency) {
        TravelPackage travelPackage = packageRepository.findByIdAndAgency(id, agency)
            .orElseThrow(() -> new RuntimeException("Package not found"));
        packageRepository.delete(travelPackage);
    }
}
