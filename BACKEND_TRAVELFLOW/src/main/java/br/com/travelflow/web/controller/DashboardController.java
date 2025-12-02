package br.com.travelflow.web.controller;

import br.com.travelflow.domain.dto.DashboardStatsDto;
import br.com.travelflow.domain.entity.Agency;
import br.com.travelflow.security.SecurityUtils;
import br.com.travelflow.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    
    private final DashboardService dashboardService;
    
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }
    
    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<DashboardStatsDto> getDashboardStats() {
        Agency agency = SecurityUtils.getCurrentUserAgency();
        DashboardStatsDto stats = dashboardService.getDashboardStats(agency);
        return ResponseEntity.ok(stats);
    }
}
