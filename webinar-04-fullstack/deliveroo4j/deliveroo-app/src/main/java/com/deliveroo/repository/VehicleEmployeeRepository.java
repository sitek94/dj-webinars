package com.deliveroo.repository;

import com.deliveroo.entity.VehicleEmployee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleEmployeeRepository extends JpaRepository<VehicleEmployee, VehicleEmployee.VehicleEmployeeId> {
} 