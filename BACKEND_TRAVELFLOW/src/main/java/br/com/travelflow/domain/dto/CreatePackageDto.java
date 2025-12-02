package br.com.travelflow.domain.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

public class CreatePackageDto {
    
    @NotBlank(message = "Package name is required")
    @Size(max = 200, message = "Package name must not exceed 200 characters")
    private String name;
    
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;
    
    @NotNull(message = "Trip IDs are required")
    @Size(min = 1, message = "At least one trip must be selected")
    private List<Long> tripIds;
    
    @NotNull(message = "Discount percentage is required")
    @DecimalMin(value = "0.0", message = "Discount must be at least 0")
    @DecimalMax(value = "100.0", message = "Discount must not exceed 100")
    private BigDecimal discountPercentage;
    
    @NotNull(message = "Active status is required")
    private Boolean active;
    
    public CreatePackageDto() {}
    
    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public List<Long> getTripIds() {
        return tripIds;
    }
    
    public void setTripIds(List<Long> tripIds) {
        this.tripIds = tripIds;
    }
    
    public BigDecimal getDiscountPercentage() {
        return discountPercentage;
    }
    
    public void setDiscountPercentage(BigDecimal discountPercentage) {
        this.discountPercentage = discountPercentage;
    }
    
    public Boolean getActive() {
        return active;
    }
    
    public void setActive(Boolean active) {
        this.active = active;
    }
}
