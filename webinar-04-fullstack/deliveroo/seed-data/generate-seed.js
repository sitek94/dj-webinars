// Required modules
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const config = {
  numVehicles: parseInt(process.argv[2], 10) || 100,
  numEmployees: parseInt(process.argv[3], 10) || 200,
  // Probability that an employee has at least one vehicle assigned
  employeeHasVehicleProb: 0.7,
  // Probability that a vehicle is assigned to at least one employee
  vehicleHasEmployeeProb: 0.8,
  // Max number of vehicles per employee
  maxVehiclesPerEmployee: 3,
  // Max number of employees per vehicle
  maxEmployeesPerVehicle: 4,
  // Output file
  outputFile: path.join(__dirname, 'output', `seed-${Date.now()}.sql`),
};

// --- ENUMS (from schema) ---
const employeeRoles = ['driver', 'dispatcher', 'manager'];
const employeeStatuses = ['active', 'on leave', 'inactive'];
const vehicleTypes = ['truck', 'van', 'car'];
const vehicleStatuses = ['available', 'on delivery', 'maintenance', 'offline'];

// --- SQL SCHEMA (copied from init.sql, no changes) ---
const schemaSQL = `
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
`;

// --- DATA GENERATION ---
function randomEnum(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return faker.date.between({ from: start, to: end });
}

// Generate employees
function generateEmployees(n) {
  const employees = [];
  const emails = new Set();
  for (let i = 0; i < n; i++) {
    let email;
    do {
      email = faker.internet.email({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      }).toLowerCase();
    } while (emails.has(email));
    emails.add(email);
    employees.push({
      id: i + 1,
      name: faker.person.fullName(),
      role: randomEnum(employeeRoles),
      status: randomEnum(employeeStatuses),
      contact_email: email,
      hire_date: faker.date.past({ years: 10, refDate: '2025-01-01' }).toISOString().slice(0, 10),
    });
  }
  return employees;
}

// Generate vehicles
function generateVehicles(n) {
  const vehicles = [];
  const plates = new Set();
  for (let i = 0; i < n; i++) {
    let plate;
    do {
      plate = faker.string.alphanumeric({ length: 3, casing: 'upper' }) + '-' + faker.string.numeric(3);
    } while (plates.has(plate));
    plates.add(plate);
    vehicles.push({
      id: i + 1,
      type: randomEnum(vehicleTypes),
      license_plate: plate,
      status: randomEnum(vehicleStatuses),
      last_maintenance_date: faker.date.past({ years: 2, refDate: '2025-05-01' }).toISOString().slice(0, 10),
    });
  }
  return vehicles;
}

// Generate vehicle-employee associations
function generateAssociations(employees, vehicles, config) {
  const associations = [];
  // Map to track which vehicles/employees are already associated
  const employeeToVehicles = new Map();
  const vehicleToEmployees = new Map();

  // Assign vehicles to employees based on probability
  employees.forEach(emp => {
    if (Math.random() < config.employeeHasVehicleProb) {
      const numVehicles = 1 + Math.floor(Math.random() * config.maxVehiclesPerEmployee);
      const vehicleIds = faker.helpers.arrayElements(
        vehicles.map(v => v.id),
        Math.min(numVehicles, vehicles.length)
      );
      vehicleIds.forEach(vehicleId => {
        const since_date = faker.date.between({ from: emp.hire_date, to: '2025-05-01' }).toISOString().slice(0, 10);
        const planned_leave_date = Math.random() < 0.2 ? faker.date.future({ years: 1, refDate: since_date }).toISOString().slice(0, 10) : null;
        const usage_notes = faker.lorem.sentence();
        const is_primary = Math.random() < 0.5;
        const last_inspection_date = faker.date.between({ from: since_date, to: '2025-05-15' }).toISOString().slice(0, 10);
        associations.push({
          vehicle_id: vehicleId,
          employee_id: emp.id,
          since_date,
          planned_leave_date,
          usage_notes,
          is_primary,
          last_inspection_date,
        });
        // Track associations
        if (!employeeToVehicles.has(emp.id)) employeeToVehicles.set(emp.id, new Set());
        employeeToVehicles.get(emp.id).add(vehicleId);
        if (!vehicleToEmployees.has(vehicleId)) vehicleToEmployees.set(vehicleId, new Set());
        vehicleToEmployees.get(vehicleId).add(emp.id);
      });
    }
  });

  // Ensure vehicles have employees based on probability
  vehicles.forEach(vehicle => {
    if ((vehicleToEmployees.get(vehicle.id)?.size || 0) === 0 && Math.random() < config.vehicleHasEmployeeProb) {
      const numEmployees = 1 + Math.floor(Math.random() * config.maxEmployeesPerVehicle);
      const employeeIds = faker.helpers.arrayElements(
        employees.map(e => e.id),
        Math.min(numEmployees, employees.length)
      );
      employeeIds.forEach(employeeId => {
        // Avoid duplicate association
        if (associations.some(a => a.vehicle_id === vehicle.id && a.employee_id === employeeId)) return;
        const since_date = faker.date.past({ years: 2, refDate: '2025-05-01' }).toISOString().slice(0, 10);
        const planned_leave_date = Math.random() < 0.2 ? faker.date.future({ years: 1, refDate: since_date }).toISOString().slice(0, 10) : null;
        const usage_notes = faker.lorem.sentence();
        const is_primary = Math.random() < 0.5;
        const last_inspection_date = faker.date.between({ from: since_date, to: '2025-05-15' }).toISOString().slice(0, 10);
        associations.push({
          vehicle_id: vehicle.id,
          employee_id: employeeId,
          since_date,
          planned_leave_date,
          usage_notes,
          is_primary,
          last_inspection_date,
        });
      });
    }
  });

  return associations;
}

// --- SQL GENERATION ---
function toSQLInsert(table, rows, columns) {
  if (rows.length === 0) return '';
  const values = rows.map(row =>
    '(' + columns.map(col => {
      const val = row[col];
      if (val === null || val === undefined) return 'NULL';
      if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
      if (typeof val === 'number') return val;
      return `'${String(val).replace(/'/g, "''")}'`;
    }).join(', ') + ')'
  ).join(',\n');
  return `INSERT INTO ${table} (${columns.join(', ')}) VALUES\n${values};\n`;
}

// --- MAIN ---
function main() {
  // Generate data
  const employees = generateEmployees(config.numEmployees);
  const vehicles = generateVehicles(config.numVehicles);
  const associations = generateAssociations(employees, vehicles, config);

  // Generate SQL
  let sql = schemaSQL + '\n';
  sql += toSQLInsert('employees', employees, ['id', 'name', 'role', 'status', 'contact_email', 'hire_date']);
  sql += '\n';
  sql += toSQLInsert('vehicles', vehicles, ['id', 'type', 'license_plate', 'status', 'last_maintenance_date']);
  sql += '\n';
  sql += toSQLInsert('vehicle_employee', associations, [
    'vehicle_id', 'employee_id', 'since_date', 'planned_leave_date', 'usage_notes', 'is_primary', 'last_inspection_date',
  ]);

  // Write to file
  fs.writeFileSync(config.outputFile, sql);
  console.log(`Seed SQL written to ${config.outputFile}`);
}

main();
