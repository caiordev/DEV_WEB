package br.com.travelflow.repository;

import br.com.travelflow.domain.entity.PackageImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageImageRepository extends JpaRepository<PackageImage, Long> {
}
