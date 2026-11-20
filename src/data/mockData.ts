import { WasteLog, WasteType, Pickup, Violation, Notification, WardStats, BinStatus } from '@/types';

// Generate random date within last 30 days
const randomDate = (daysBack: number = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date;
};

// Mock Waste Logs
export const mockWasteLogs: WasteLog[] = [
  { id: 'wl1', houseId: 'h1', wasteType: 'organic', weight: 2.5, timestamp: new Date(), fillLevel: 45, mlConfidence: 94 },
  { id: 'wl2', houseId: 'h1', wasteType: 'recyclable', weight: 1.2, timestamp: new Date(), fillLevel: 30, mlConfidence: 91 },
  { id: 'wl3', houseId: 'h1', wasteType: 'organic', weight: 3.1, timestamp: randomDate(1), fillLevel: 55, mlConfidence: 96 },
  { id: 'wl4', houseId: 'h1', wasteType: 'hazardous', weight: 0.3, timestamp: randomDate(2), fillLevel: 10, mlConfidence: 88 },
  { id: 'wl5', houseId: 'h1', wasteType: 'recyclable', weight: 2.0, timestamp: randomDate(3), fillLevel: 40, mlConfidence: 93 },
  { id: 'wl6', houseId: 'h1', wasteType: 'organic', weight: 2.8, timestamp: randomDate(4), fillLevel: 50, mlConfidence: 95 },
  { id: 'wl7', houseId: 'h1', wasteType: 'organic', weight: 1.9, timestamp: randomDate(5), fillLevel: 35, mlConfidence: 92 },
  { id: 'wl8', houseId: 'h1', wasteType: 'recyclable', weight: 1.5, timestamp: randomDate(6), fillLevel: 28, mlConfidence: 90 },
];

// Monthly waste data for charts
export const monthlyWasteData = [
  { month: 'Jan', organic: 45, recyclable: 28, hazardous: 5 },
  { month: 'Feb', organic: 52, recyclable: 31, hazardous: 4 },
  { month: 'Mar', organic: 48, recyclable: 35, hazardous: 6 },
  { month: 'Apr', organic: 55, recyclable: 32, hazardous: 3 },
  { month: 'May', organic: 60, recyclable: 38, hazardous: 5 },
  { month: 'Jun', organic: 58, recyclable: 42, hazardous: 4 },
  { month: 'Jul', organic: 62, recyclable: 45, hazardous: 7 },
  { month: 'Aug', organic: 65, recyclable: 48, hazardous: 5 },
  { month: 'Sep', organic: 59, recyclable: 44, hazardous: 6 },
  { month: 'Oct', organic: 63, recyclable: 50, hazardous: 4 },
  { month: 'Nov', organic: 68, recyclable: 52, hazardous: 5 },
  { month: 'Dec', organic: 70, recyclable: 55, hazardous: 6 },
];

// Mock Pickups
export const mockPickups: Pickup[] = [
  { id: 'p1', houseId: 'h1', collectorId: 'c1', timestamp: new Date(), status: 'completed' },
  { id: 'p2', houseId: 'h1', collectorId: 'c1', timestamp: randomDate(3), status: 'completed' },
  { id: 'p3', houseId: 'h1', collectorId: 'c1', timestamp: randomDate(6), status: 'completed' },
  { id: 'p4', houseId: 'h1', collectorId: 'c1', timestamp: randomDate(9), status: 'missed' },
];

// Mock Violations
export const mockViolations: Violation[] = [
  { id: 'v1', houseId: 'h1', message: 'Mixed waste detected in organic bin', severity: 'medium', timestamp: randomDate(5), resolved: true },
  { id: 'v2', houseId: 'h2', message: 'Hazardous waste improperly disposed', severity: 'high', timestamp: randomDate(2), resolved: false },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'Pickup Scheduled', message: 'Your next pickup is scheduled for tomorrow at 9 AM', type: 'info', timestamp: new Date(), read: false },
  { id: 'n2', title: 'Reward Earned!', message: 'You earned 50 points for proper segregation this week', type: 'success', timestamp: randomDate(1), read: false },
  { id: 'n3', title: 'Bin Almost Full', message: 'Your organic waste bin is 85% full', type: 'warning', timestamp: randomDate(2), read: true },
  { id: 'n4', title: 'Hazardous Alert', message: 'Hazardous waste detected. Please ensure proper disposal', type: 'error', timestamp: randomDate(3), read: true },
];

// Mock Ward Statistics
export const mockWardStats: WardStats[] = [
  { wardNumber: 'W01', totalWaste: 2450, organicPercentage: 55, recyclablePercentage: 35, hazardousPercentage: 10, segregationScore: 87, householdsCompliant: 245, totalHouseholds: 280 },
  { wardNumber: 'W02', totalWaste: 1980, organicPercentage: 52, recyclablePercentage: 38, hazardousPercentage: 10, segregationScore: 82, householdsCompliant: 198, totalHouseholds: 250 },
  { wardNumber: 'W03', totalWaste: 2100, organicPercentage: 58, recyclablePercentage: 32, hazardousPercentage: 10, segregationScore: 79, householdsCompliant: 175, totalHouseholds: 230 },
  { wardNumber: 'W04', totalWaste: 1750, organicPercentage: 50, recyclablePercentage: 40, hazardousPercentage: 10, segregationScore: 91, householdsCompliant: 210, totalHouseholds: 220 },
  { wardNumber: 'W05', totalWaste: 2300, organicPercentage: 54, recyclablePercentage: 36, hazardousPercentage: 10, segregationScore: 85, householdsCompliant: 230, totalHouseholds: 270 },
];

// Mock Bin Statuses for city map
export const mockBinStatuses: BinStatus[] = [
  { houseId: 'h1', fillLevel: 45, lastUpdated: new Date(), status: 'partial' },
  { houseId: 'h2', fillLevel: 85, lastUpdated: new Date(), status: 'full' },
  { houseId: 'h3', fillLevel: 15, lastUpdated: new Date(), status: 'empty' },
  { houseId: 'h4', fillLevel: 95, lastUpdated: new Date(), status: 'overflow' },
  { houseId: 'h5', fillLevel: 60, lastUpdated: new Date(), status: 'partial' },
];

// Collector route assignments
export const mockCollectorRoutes = [
  { id: 'r1', collectorId: 'c1', houseIds: ['H001', 'H002', 'H003', 'H004', 'H005'], ward: 'W01', street: 'S01', date: new Date() },
  { id: 'r2', collectorId: 'c1', houseIds: ['H006', 'H007', 'H008', 'H009', 'H010'], ward: 'W01', street: 'S02', date: new Date() },
  { id: 'r3', collectorId: 'c2', houseIds: ['H001', 'H002', 'H003', 'H004', 'H005'], ward: 'W02', street: 'S01', date: new Date() },
];

// Calculate waste totals by type
export const calculateWasteTotals = (logs: WasteLog[]) => {
  return logs.reduce(
    (acc, log) => {
      acc[log.wasteType] += log.weight;
      acc.total += log.weight;
      return acc;
    },
    { organic: 0, recyclable: 0, hazardous: 0, total: 0 }
  );
};

// City-wide statistics for Rajapalayam Municipality (Special Grade)
export const cityStats = {
  totalWasteToday: 48500, // 48.5 TPD
  totalHouseholds: 47497, // ~47,497 residential assessments in Rajapalayam
  activeCollectors: 128,  // Workers across 9 sanitary divisions
  recyclingRate: 45,      // Micro Composting Centres + dry waste recovery
  segregationScore: 84,   // City-wide compliance score
  hazardousAlerts: 2,
};

import { SmartBin } from '@/types';

// Mock bin data for Rajapalayam Municipality / City Map
export const mockBins: SmartBin[] = [
  {
    id: '1',
    binId: 'RAJ-BIN-001',
    wardNumber: 'W08',
    location: { lat: 9.4532, lng: 77.5550, address: 'Gandhi Kalai Mandram (Municipal Office)' },
    fillLevel: 85,
    wasteType: 'mixed',
    lastUpdated: new Date(),
    status: 'active',
  },
  {
    id: '2',
    binId: 'RAJ-BIN-002',
    wardNumber: 'W05',
    location: { lat: 9.4512, lng: 77.5580, address: 'Old Bus Stand Commercial Complex' },
    fillLevel: 45,
    wasteType: 'organic',
    lastUpdated: new Date(),
    status: 'active',
  },
  {
    id: '3',
    binId: 'RAJ-BIN-003',
    wardNumber: 'W18',
    location: { lat: 9.4601, lng: 77.5592, address: 'New Bus Stand Terminal' },
    fillLevel: 92,
    wasteType: 'recyclable',
    lastUpdated: new Date(),
    status: 'active',
  },
  {
    id: '4',
    binId: 'RAJ-BIN-004',
    wardNumber: 'W24',
    location: { lat: 9.4565, lng: 77.5620, address: 'Cotton Market (Panju Market Yard)' },
    fillLevel: 30,
    wasteType: 'mixed',
    lastUpdated: new Date(),
    status: 'active',
  },
  {
    id: '5',
    binId: 'RAJ-BIN-005',
    wardNumber: 'W14',
    location: { lat: 9.4485, lng: 77.5615, address: 'Railway Feeder Road Junction' },
    fillLevel: 72,
    wasteType: 'organic',
    lastUpdated: new Date(),
    status: 'active',
  },
  {
    id: '6',
    binId: 'RAJ-BIN-006',
    wardNumber: 'W28',
    location: { lat: 9.4410, lng: 77.5510, address: 'PACR Salai / Mill Quarters' },
    fillLevel: 15,
    wasteType: 'hazardous',
    lastUpdated: new Date(),
    status: 'active',
  },
  {
    id: '7',
    binId: 'RAJ-BIN-007',
    wardNumber: 'W12',
    location: { lat: 9.4450, lng: 77.5480, address: 'Mudangiar Road Micro Composting Centre' },
    fillLevel: 95,
    wasteType: 'mixed',
    lastUpdated: new Date(),
    status: 'active',
  },
  {
    id: '8',
    binId: 'RAJ-BIN-008',
    wardNumber: 'W42',
    location: { lat: 9.4320, lng: 77.5310, address: 'Arasiarpatti Municipal Compost Yard (20.37 Acres)' },
    fillLevel: 55,
    wasteType: 'recyclable',
    lastUpdated: new Date(),
    status: 'active',
  },
];
