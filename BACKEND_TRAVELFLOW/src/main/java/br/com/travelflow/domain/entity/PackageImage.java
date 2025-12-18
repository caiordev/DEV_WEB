package br.com.travelflow.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "package_images")
public class PackageImage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "Image URL is required")
    @Column(name = "image_url", nullable = false, columnDefinition = "TEXT")
    private String imageUrl;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @JsonBackReference(value = "package-images")
    @NotNull(message = "Travel package is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", nullable = false)
    private TravelPackage travelPackage;
    
    public PackageImage() {}
    
    public PackageImage(String imageUrl, TravelPackage travelPackage) {
        this.imageUrl = imageUrl;
        this.travelPackage = travelPackage;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public TravelPackage getTravelPackage() {
        return travelPackage;
    }
    
    public void setTravelPackage(TravelPackage travelPackage) {
        this.travelPackage = travelPackage;
    }
}
