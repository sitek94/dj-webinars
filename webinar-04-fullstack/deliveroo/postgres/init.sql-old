-- Drop tables and types if they exist (for repeatability, optional)
DROP TABLE IF EXISTS vehicle_employee CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TYPE IF EXISTS employee_role;
DROP TYPE IF EXISTS employee_status;
DROP TYPE IF EXISTS vehicle_type;
DROP TYPE IF EXISTS vehicle_status;

-- Create custom enum types
CREATE TYPE employee_role AS ENUM ('driver', 'dispatcher', 'manager');
CREATE TYPE employee_status AS ENUM ('active', 'on leave', 'inactive');
CREATE TYPE vehicle_type AS ENUM ('truck', 'van', 'car');
CREATE TYPE vehicle_status AS ENUM ('available', 'on delivery', 'maintenance', 'offline');

-- Employee table (no reference to current_vehicle)
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role employee_role NOT NULL,
    status employee_status NOT NULL,
    contact_email VARCHAR(255) UNIQUE NOT NULL,
    hire_date DATE NOT NULL
);

-- Vehicle table (no reference to current_driver)
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    type vehicle_type NOT NULL,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    status vehicle_status NOT NULL,
    last_maintenance_date DATE
);

-- Vehicle-Employee association table with additional columns
CREATE TABLE vehicle_employee (
    vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    employee_id INT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    since_date DATE NOT NULL,
    planned_leave_date DATE,
    usage_notes TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    last_inspection_date DATE,
    PRIMARY KEY (vehicle_id, employee_id, since_date)
);

-- Sample data insertion

-- Vehicles
INSERT INTO vehicles (type, license_plate, status, last_maintenance_date) VALUES
('truck', 'TRK-101', 'available', '2025-04-15'),
('van', 'VAN-202', 'on delivery', '2025-05-01'),
('car', 'CAR-303', 'maintenance', '2025-03-20'),
('truck', 'TRK-404', 'offline', '2025-01-10'),
('van', 'VAN-505', 'available', '2025-04-25'),
('car', 'CAR-606', 'available', '2025-02-28'),
('truck', 'TRK-707', 'on delivery', '2025-05-10'),
('van', 'VAN-808', 'maintenance', '2025-04-05');

-- Employees
INSERT INTO employees (name, role, status, contact_email, hire_date) VALUES
('John Driver', 'driver', 'active', 'john.d@example.com', '2024-01-01'),
('Jane Operator', 'driver', 'active', 'jane.o@example.com', '2023-06-15'),
('Mike Dispatcher', 'dispatcher', 'active', 'mike.d@example.com', '2022-03-01'),
('Sarah Manager', 'manager', 'active', 'sarah.m@example.com', '2021-09-01'),
('Alex Free', 'driver', 'on leave', 'alex.f@example.com', '2024-07-01');

-- Vehicle-Employee associations
INSERT INTO vehicle_employee (vehicle_id, employee_id, since_date, planned_leave_date, usage_notes, is_primary, last_inspection_date) VALUES
(2, 1, '2025-01-01', '2025-12-31', 'Primary delivery vehicle', TRUE, '2025-04-20'),
(5, 2, '2025-03-01', NULL, 'Backup vehicle for special deliveries', FALSE, '2025-04-28'),
(7, 1, '2025-05-01', '2025-05-15', 'Temporary replacement vehicle', FALSE, '2025-04-30'),
(1, 2, '2025-05-10', NULL, 'Occasional use for local transport', FALSE, '2025-05-15');

