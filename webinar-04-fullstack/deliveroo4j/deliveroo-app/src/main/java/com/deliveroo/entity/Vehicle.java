package com.deliveroo.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // truck, van, car
    @Column(name = "license_plate", unique = true, nullable = false)
    private String licensePlate;
    private String status; // available, on delivery, maintenance, offline
    @Column(name = "last_maintenance_date")
    private LocalDate lastMaintenanceDate;
} 