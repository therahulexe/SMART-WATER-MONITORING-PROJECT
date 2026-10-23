import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'guest' | 'user' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  location: string;
}

export interface LeakIncident {
  id: string;
  zone: string;
  fixture: string;
  reportedBy: string;
  reporterEmail: string;
  reportedAt: string;
  flowRate: number;
  severity: 'low' | 'medium' | 'critical';
  status: 'pending' | 'investigating' | 'resolved';
  notes: string;
}

export interface PlumbingZone {
  id: string;
  name: string;
  location: string;
  flowRate: number;
  normalThreshold: number;
  warningThreshold: number;
  solenoidStatus: 'open' | 'closed';
  pipeDiameter: string;
  lastInspection: string;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  role: UserRole;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  switchRole: (role: UserRole) => void;
  // Shared interactive state between User & Admin
  zones: PlumbingZone[];
  toggleSolenoid: (zoneId: string) => void;
  updateZoneThresholds: (zoneId: string, normal: number, warning: number) => void;
  incidents: LeakIncident[];
  reportLeak: (incident: Omit<LeakIncident, 'id' | 'reportedAt' | 'status'>) => void;
  updateIncidentStatus: (incidentId: string, status: LeakIncident['status']) => void;
  auditLogs: Array<{ id: string; time: string; actor: string; action: string }>;
}

const PRESET_ACCOUNTS: Record<string, { user: AuthUser; pass: string }> = {
  admin: {
    pass: 'admin123',
    user: {
      id: 'usr-admin-01',
      name: 'Rahul (Admin & Lead Developer)',
      email: 'admin@nmit.ac.in',
      role: 'admin',
      title: 'System Administrator & Lead Developer of this website',
      location: 'Central Architecture & Operations Console'
    }
  },
  user: {
    pass: 'user123',
    user: {
      id: 'usr-student-02',
      name: 'Student Resident',
      email: 'user@nmit.ac.in',
      role: 'user',
      title: 'Campus Student Resident & Lab Participant',
      location: 'Campus Housing - Block B, Unit 304'
    }
  }
};

const INITIAL_ZONES: PlumbingZone[] = [
  {
    id: 'zone-1',
    name: 'NMIT Environmental Science Lab',
    location: 'Engineering Building - 1st Floor',
    flowRate: 4.2,
    normalThreshold: 6.0,
    warningThreshold: 10.0,
    solenoidStatus: 'open',
    pipeDiameter: '1/2" DN15',
    lastInspection: 'Today, 08:30 AM'
  },
  {
    id: 'zone-2',
    name: 'Campus Student Dormitory Riser',
    location: 'Residential Block B - Floors 1-4',
    flowRate: 7.8,
    normalThreshold: 6.5,
    warningThreshold: 10.5,
    solenoidStatus: 'open',
    pipeDiameter: '3/4" DN20',
    lastInspection: 'Yesterday'
  },
  {
    id: 'zone-3',
    name: 'Canteen & Kitchen Main Fixture',
    location: 'Central Dining Hall',
    flowRate: 12.4,
    normalThreshold: 8.0,
    warningThreshold: 12.0,
    solenoidStatus: 'open',
    pipeDiameter: '1" DN25',
    lastInspection: '3 days ago'
  },
  {
    id: 'zone-4',
    name: 'NSSKC Field Demo Test Conduits',
    location: 'Outdoor Irrigation & Hydraulics Shed',
    flowRate: 0.0,
    normalThreshold: 5.0,
    warningThreshold: 9.0,
    solenoidStatus: 'closed',
    pipeDiameter: '1/2" DN15',
    lastInspection: 'Oct 20, 2026'
  }
];

const INITIAL_INCIDENTS: LeakIncident[] = [
  {
    id: 'inc-101',
    zone: 'Campus Student Dormitory Riser',
    fixture: 'Bathroom 304 Basin Bibcock Tap',
    reportedBy: 'Rahul Sharma (Student Resident)',
    reporterEmail: 'user@smartwater.org',
    reportedAt: 'Today, 08:15 AM',
    flowRate: 8.4,
    severity: 'medium',
    status: 'investigating',
    notes: 'Tap left partially ajar after morning rush. Continuous 8+ L/min telemetry logged for 35 minutes.'
  },
  {
    id: 'inc-102',
    zone: 'Canteen & Kitchen Main Fixture',
    fixture: 'Dishwasher Riser Brass Union Fitting',
    reportedBy: 'Head Chef Marco',
    reporterEmail: 'kitchen@campus.edu',
    reportedAt: 'Yesterday, 14:20 PM',
    flowRate: 13.1,
    severity: 'critical',
    status: 'pending',
    notes: 'High flow anomaly detected above 12 L/min threshold. Water pool observed near rear storage.'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('swm_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [zones, setZones] = useState<PlumbingZone[]>(INITIAL_ZONES);
  const [incidents, setIncidents] = useState<LeakIncident[]>(INITIAL_INCIDENTS);
  const [auditLogs, setAuditLogs] = useState<Array<{ id: string; time: string; actor: string; action: string }>>([
    {
      id: 'log-1',
      time: '08:45:12 AM',
      actor: 'System Daemon',
      action: 'Automated polling initialized for 4 telemetry zones.'
    },
    {
      id: 'log-2',
      time: '08:40:05 AM',
      actor: 'Rahul (Admin & Lead Developer)',
      action: 'Updated Warning threshold to 10.0 L/min on NMIT Lab.'
    }
  ]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('swm_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('swm_auth_user');
    }
  }, [currentUser]);

  const login = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const adminAcc = PRESET_ACCOUNTS.admin;
    const userAcc = PRESET_ACCOUNTS.user;

    const isAdminEmail = cleanEmail === 'admin@nmit.ac.in' || cleanEmail === 'admin@smartwater.org';
    const isUserEmail = cleanEmail === 'user@nmit.ac.in' || cleanEmail === 'user@smartwater.org';

    if (isAdminEmail && pass === adminAcc.pass) {
      setCurrentUser(adminAcc.user);
      addAuditLog(adminAcc.user.name, 'Logged in to Admin Management Console.');
      return { success: true };
    }

    if (isUserEmail && pass === userAcc.pass) {
      setCurrentUser(userAcc.user);
      addAuditLog(userAcc.user.name, 'Logged in to Resident User Portal.');
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password. Please use the pre-configured credentials.' };
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog(currentUser.name, 'Logged out of system.');
    }
    setCurrentUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'admin') {
      setCurrentUser(PRESET_ACCOUNTS.admin.user);
      addAuditLog(PRESET_ACCOUNTS.admin.user.name, 'Switched to Admin Role.');
    } else if (newRole === 'user') {
      setCurrentUser(PRESET_ACCOUNTS.user.user);
      addAuditLog(PRESET_ACCOUNTS.user.user.name, 'Switched to User Role.');
    } else {
      setCurrentUser(null);
    }
  };

  const addAuditLog = (actor: string, action: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setAuditLogs((prev) => [
      { id: `log-${Date.now()}`, time: timeStr, actor, action },
      ...prev.slice(0, 19)
    ]);
  };

  const toggleSolenoid = (zoneId: string) => {
    setZones((prev) =>
      prev.map((z) => {
        if (z.id === zoneId) {
          const nextStatus = z.solenoidStatus === 'open' ? 'closed' : 'open';
          const nextFlow = nextStatus === 'closed' ? 0.0 : 4.5;
          addAuditLog(
            currentUser?.name || 'Administrator',
            `${nextStatus === 'closed' ? 'EMERGENCY CUTOFF' : 'RESTORED FLOW'} for ${z.name}`
          );
          return {
            ...z,
            solenoidStatus: nextStatus,
            flowRate: nextFlow
          };
        }
        return z;
      })
    );
  };

  const updateZoneThresholds = (zoneId: string, normal: number, warning: number) => {
    setZones((prev) =>
      prev.map((z) => {
        if (z.id === zoneId) {
          addAuditLog(
            currentUser?.name || 'Administrator',
            `Reconfigured thresholds for ${z.name}: Normal ≤ ${normal} L/m, Warning ≤ ${warning} L/m`
          );
          return {
            ...z,
            normalThreshold: normal,
            warningThreshold: warning
          };
        }
        return z;
      })
    );
  };

  const reportLeak = (incidentData: Omit<LeakIncident, 'id' | 'reportedAt' | 'status'>) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newInc: LeakIncident = {
      ...incidentData,
      id: `inc-${Date.now()}`,
      reportedAt: `Today, ${timeStr}`,
      status: 'pending'
    };
    setIncidents((prev) => [newInc, ...prev]);
    addAuditLog(
      incidentData.reportedBy,
      `Filed new leak report for ${incidentData.fixture} (${incidentData.severity.toUpperCase()} severity)`
    );
  };

  const updateIncidentStatus = (incidentId: string, status: LeakIncident['status']) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          addAuditLog(currentUser?.name || 'Admin', `Updated incident ${inc.id} status to ${status.toUpperCase()}`);
          return { ...inc, status };
        }
        return inc;
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || 'guest',
        login,
        logout,
        switchRole,
        zones,
        toggleSolenoid,
        updateZoneThresholds,
        incidents,
        reportLeak,
        updateIncidentStatus,
        auditLogs
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
