package com.deliveroo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.List;
import com.deliveroo.repository.VehicleRepository;
import com.deliveroo.entity.Vehicle;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {
    private final VehicleRepository vehicleRepository;

    public VehicleController(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @GetMapping("/{id}")
    public Vehicle getVehicleById(@PathVariable Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteVehicleById(@PathVariable Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found");
        }
        vehicleRepository.deleteById(id);
    }

    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        vehicle.setId(null); // Ensure ID is not set by client
        return vehicleRepository.save(vehicle);
    }

    @PatchMapping("/{id}")
    public Vehicle updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) {
        Vehicle existing = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found"));
        if (vehicle.getType() != null) existing.setType(vehicle.getType());
        if (vehicle.getLicensePlate() != null) existing.setLicensePlate(vehicle.getLicensePlate());
        if (vehicle.getStatus() != null) existing.setStatus(vehicle.getStatus());
        if (vehicle.getLastMaintenanceDate() != null) existing.setLastMaintenanceDate(vehicle.getLastMaintenanceDate());
        return vehicleRepository.save(existing);
    }

    @PutMapping("/{id}")
    public Vehicle replaceVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) {
        if (!vehicleRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found");
        }
        vehicle.setId(id);
        return vehicleRepository.save(vehicle);
    }
} 