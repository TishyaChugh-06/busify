

export const mockBuses = [
  { id: 1, busNumber: 'BUS-001', capacity: 50, driver: 'John Doe', status: 'active', route: 'Route A' },
  { id: 2, busNumber: 'BUS-002', capacity: 45, driver: 'Jane Smith', status: 'active', route: 'Route B' },
  { id: 3, busNumber: 'BUS-003', capacity: 50, driver: 'Mike Johnson', status: 'maintenance', route: 'Route C' },
  { id: 4, busNumber: 'BUS-004', capacity: 40, driver: 'Sarah Williams', status: 'active', route: 'Route A' },
];

export const mockRoutes = [
  { id: 1, name: 'Ambala', stops: ['Saha', 'Mithapur', 'Mangloi', 'SD College', 'Chitkara University'], duration: '30 min' },
  { id: 2, name: 'Patiala', stops: ['Main Gate', 'Student Center', 'Admin Block', 'Hostel Area'], duration: '25 min' },
  { id: 3, name: 'Shahbad', stops: ['Main Gate', 'Science Block', 'Arts Block', 'Cafeteria', 'Parking Lot'], duration: '35 min' },
];

export const mockUsers = [
  { id: 1, name: 'Alice Brown', email: 'alice@university.edu', role: 'student', route: 'Route A' },
  { id: 2, name: 'Bob Wilson', email: 'bob@university.edu', role: 'faculty', route: 'Route B' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@university.edu', role: 'student', route: 'Route A' },
  { id: 4, name: 'Diana Martinez', email: 'diana@university.edu', role: 'faculty', route: 'Route C' },
];

export const mockPayments = [
  { id: 1, userId: 1, amount: 500, date: '2024-01-15', status: 'completed', type: 'Monthly Pass' },
  { id: 2, userId: 2, amount: 300, date: '2024-01-20', status: 'completed', type: 'Weekly Pass' },
  { id: 3, userId: 3, amount: 500, date: '2024-02-01', status: 'pending', type: 'Monthly Pass' },
  { id: 4, userId: 4, amount: 1000, date: '2024-02-05', status: 'completed', type: 'Semester Pass' },
];

export const mockIncidents = [
  { id: 1, busNumber: 'BUS-001', description: 'Tire puncture on highway', reportedBy: 'John Doe', date: '2024-01-10', status: 'resolved' },
  { id: 2, busNumber: 'BUS-002', description: 'AC not working properly', reportedBy: 'Alice Brown', date: '2024-01-18', status: 'pending' },
  { id: 3, busNumber: 'BUS-003', description: 'Engine overheating issue', reportedBy: 'Mike Johnson', date: '2024-01-25', status: 'in-progress' },
];

export const mockNotifications = [
  { id: 1, title: 'Route A Delay', message: 'Bus will be 10 minutes late due to traffic', date: '2024-02-01 08:30', type: 'warning' },
  { id: 2, title: 'New Bus Added', message: 'BUS-005 has been added to Route B', date: '2024-01-28 10:00', type: 'info' },
  { id: 3, title: 'Payment Reminder', message: 'Your monthly pass expires in 3 days', date: '2024-02-05 09:00', type: 'alert' },
  { id: 4, title: 'Service Update', message: 'Weekend schedule has been updated', date: '2024-01-30 14:00', type: 'info' },
];

export const mockLiveLocations = [
  { busId: 1, busNumber: 'BUS-001', lat: 40.7128, lng: -74.0060, route: 'Route A', nextStop: 'Library' },
  { busId: 2, busNumber: 'BUS-002', lat: 40.7580, lng: -73.9855, route: 'Route B', nextStop: 'Student Center' },
  { busId: 4, busNumber: 'BUS-004', lat: 40.7489, lng: -73.9680, route: 'Route A', nextStop: 'Engineering Block' },
];
