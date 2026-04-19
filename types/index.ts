// ─── Roles ────────────────────────────────────────────────────────────────────
export type Role = 'GUARD' | 'SUPERVISOR' | 'ADMIN';

// ─── Usuario ──────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  employeeId: string;       // Número de nómina
  role: Role;
  area?: string;
  avatarUrl?: string;
  createdAt: string;
}

// ─── Incidencia ───────────────────────────────────────────────────────────────
export type IncidentStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED';

export type IncidentType =
  | 'SECURITY'        // Incidente de seguridad (persona)
  | 'INFRASTRUCTURE'  // Fallo de infraestructura (puerta, cámara, etc.)
  | 'ACCIDENT'        // Accidente
  | 'THEFT'           // Robo
  | 'TRESPASSING'     // Intrusión
  | 'OTHER';          // Otro

export interface Location {
  lat: number;
  lng: number;
  address?: string;       // Descripción manual opcional
}

export interface MediaFile {
  id: string;
  url: string;
  type: 'IMAGE' | 'VIDEO' | 'AUDIO';
  createdAt: string;
}

export interface Incident {
  id: string;
  folio: string;            // Folio único, ej: INC-2024-0001
  title: string;
  description: string;
  type: IncidentType;
  status: IncidentStatus;
  location: Location;
  mediaFiles: MediaFile[];
  involvedPersons: string[];  // Nombres o nóminas de involucrados
  reportedBy: User;
  assignedTo?: User;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export interface IncidentStats {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
  byType: { type: IncidentType; count: number }[];
  byDay: { date: string; count: number }[];
  byArea: { area: string; count: number }[];
}

// ─── API Responses ────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}