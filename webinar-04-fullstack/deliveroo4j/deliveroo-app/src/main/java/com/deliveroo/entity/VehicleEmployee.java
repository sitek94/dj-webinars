package com.deliveroo.entity;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(VehicleEmployee.VehicleEmployeeId.class)
public class VehicleEmployee {
    @Id
    @Column(name = "vehicle_id")
    private Long vehicleId;

    @Id
    @Column(name = "employee_id")
    private Long employeeId;

    @Id
    @Column(name = "since_date")
    private LocalDate sinceDate;

    @Column(name = "planned_leave_date")
    private LocalDate plannedLeaveDate;

    @Column(name = "usage_notes")
    private String usageNotes;

    @Column(name = "is_primary")
    private Boolean isPrimary;

    @Column(name = "last_inspection_date")
    private LocalDate lastInspectionDate;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VehicleEmployeeId implements Serializable {
        private Long vehicleId;
        private Long employeeId;
        private LocalDate sinceDate;
    }
} 