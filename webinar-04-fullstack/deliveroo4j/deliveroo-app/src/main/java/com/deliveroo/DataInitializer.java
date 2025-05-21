package com.deliveroo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.deliveroo.repository.EmployeeRepository;
import com.deliveroo.repository.VehicleRepository;
import com.deliveroo.repository.VehicleEmployeeRepository;
import com.deliveroo.entity.Employee;
import com.deliveroo.entity.Vehicle;
import com.deliveroo.entity.VehicleEmployee;

@Component
public class DataInitializer implements CommandLineRunner {
    private final VehicleRepository vehicleRepository;
    private final EmployeeRepository employeeRepository;
    private final VehicleEmployeeRepository vehicleEmployeeRepository;

    public DataInitializer(VehicleRepository vehicleRepository, EmployeeRepository employeeRepository, VehicleEmployeeRepository vehicleEmployeeRepository) {
        this.vehicleRepository = vehicleRepository;
        this.employeeRepository = employeeRepository;
        this.vehicleEmployeeRepository = vehicleEmployeeRepository;
    }

    @Override
    public void run(String... args) {
        long count = vehicleRepository.count();
        System.out.println("Vehicle count in DB: " + count);
        vehicleRepository.findAll().stream().findFirst().ifPresent(v -> System.out.println("First vehicle: " + v));
    }
} 