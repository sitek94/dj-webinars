export type VehicleStatus = 'Available' | 'On Delivery' | 'Maintenance' | 'Offline';

export interface VehicleDTO {
  id: string;
  type: string;
  licensePlate: string;
  status: VehicleStatus;
  currentDriver: string;
  lastMaintenance: string;
}

const dbToDtoStatusMap: Record<string, VehicleStatus> = {
  'available': 'Available',
  'on delivery': 'On Delivery',
  'maintenance': 'Maintenance',
  'offline': 'Offline',
};

export function mapVehicleRowsToDTOs(rows: any[]): VehicleDTO[] {
  return rows.map((v: any) => {
    const status: VehicleStatus = dbToDtoStatusMap[v.status] || 'Offline';
    return {
      id: v.id,
      type: v.type,
      licensePlate: v.license_plate,
      status,
      currentDriver: v.driver_name,
      lastMaintenance: v.last_maintenance_date,
    };
  });
} 