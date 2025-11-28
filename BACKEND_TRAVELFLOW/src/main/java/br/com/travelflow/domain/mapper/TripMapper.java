package br.com.travelflow.domain.mapper;

import br.com.travelflow.domain.dto.TripDto;
import br.com.travelflow.domain.entity.Trip;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TripMapper {

    public TripDto toDto(Trip trip) {
        if (trip == null) {
            return null;
        }

        return new TripDto(
                trip.getId(),
                trip.getDestination(),
                trip.getLocation(),
                trip.getPricePerPerson(),
                trip.getDescription(),
                trip.getImageUrl(),
                trip.getCreatedAt(),
                trip.getUpdatedAt()
        );
    }

    public Trip toEntity(TripDto tripDto) {
        if (tripDto == null) {
            return null;
        }

        Trip trip = new Trip();
        trip.setId(tripDto.getId());
        trip.setDestination(tripDto.getDestination());
        trip.setLocation(tripDto.getLocation());
        trip.setPricePerPerson(tripDto.getPricePerPerson());
        trip.setDescription(tripDto.getDescription());
        trip.setImageUrl(tripDto.getImageUrl());

        return trip;
    }

    public List<TripDto> toDtoList(List<Trip> trips) {
        return trips.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<Trip> toEntityList(List<TripDto> tripDtos) {
        return tripDtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    public void updateEntityFromDto(TripDto tripDto, Trip trip) {
        if (tripDto == null || trip == null) {
            return;
        }

        trip.setDestination(tripDto.getDestination());
        trip.setLocation(tripDto.getLocation());
        trip.setPricePerPerson(tripDto.getPricePerPerson());
        trip.setDescription(tripDto.getDescription());
        trip.setImageUrl(tripDto.getImageUrl());
    }
}