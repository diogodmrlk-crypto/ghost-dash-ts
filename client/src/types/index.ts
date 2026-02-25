// Types for Ghost Dash Application

export type Language = 'en' | 'pt' | 'vi';

export type KeyDuration = 'hour' | 'day' | 'weekly' | 'monthly' | 'lifetime';

export type KeyStatus = 'active' | 'pending' | 'expired' | 'used' | 'current';

export type Platform = 'iOS' | 'Android' | 'macOS' | 'Windows' | 'Linux' | 'Unknown';

export interface User {
  id: string;
  name: string;
  plan: string;
  status: string;
  avatar: string;
}

export interface ApiKey {
  id: string;
  key: string;
  packageId: string;
  duration: KeyDuration;
  durationValue: number;
  createdAt: number;
  expiresAt: number;
  used: boolean;
  device?: string;
  activatedAt?: number;
  status: KeyStatus;
  ip?: string;
  clientIp?: string;
  userIp?: string;
  ipAddress?: string;
  platform?: Platform;
  os?: string;
  osVersion?: string;
  version?: string;
  type?: string;
}

export interface Package {
  id: string;
  name: string;
  url: string;
  description?: string;
  createdAt: number;
  keysCount: number;
}

export interface Session {
  device: string;
  key: string;
  keyId: string;
  activatedAt: number;
  expiresAt: number;
  type: string;
  ip: string | null;
  platform: Platform;
  version: string;
  keyCount: number;
}

export interface GeneratedKey {
  id: string;
  key: string;
  packageId: string;
  duration: KeyDuration;
  createdAt: number;
}

export interface SupportTicket {
  name: string;
  problem: string;
  description: string;
  platform: string;
  timestamp: string;
}

export interface Stats {
  totalKeys: number;
  pendingKeys: number;
  activeDevices: number;
  usedKeys: number;
}

export interface ChartDataPoint {
  date: string;
  keys: number;
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface ModalState {
  create: boolean;
  package: boolean;
  integration: boolean;
  deviceAction: boolean;
  language: boolean;
  support: boolean;
}

export interface CreateKeyFormData {
  quantity: number;
  duration: KeyDuration;
  durationValue: number;
  packageId: string;
  autoClean: boolean;
}

export interface CreatePackageFormData {
  name: string;
  url: string;
  description: string;
}

export interface SupportFormData {
  name: string;
  problem: string;
  description: string;
}
