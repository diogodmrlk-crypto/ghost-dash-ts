import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ApiKey, KeyDuration, Platform } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomKey(prefix: string = 'GHOST'): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 20; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${result}`;
}

export function formatDate(timestamp: number): string {
  if (!timestamp || timestamp === 0) return '–';
  return new Date(timestamp * 1000).toLocaleString('pt-BR');
}

export function formatDateShort(timestamp: number): string {
  if (!timestamp || timestamp === 0) return '–';
  return new Date(timestamp * 1000).toLocaleDateString('pt-BR');
}

export function getKeyStatus(key: ApiKey): 'active' | 'pending' | 'expired' | 'used' | 'current' {
  if (key.used) return 'used';
  if (key.expiresAt > 0 && key.expiresAt < Date.now() / 1000) return 'expired';
  if (key.activatedAt && key.activatedAt > 0) return 'current';
  return 'pending';
}

export function isKeyExpired(expiresAt: number): boolean {
  if (expiresAt === 0) return false;
  return expiresAt < Date.now() / 1000;
}

export function calculateExpirationTime(duration: KeyDuration, durationValue: number): number {
  const now = Date.now() / 1000;
  const multipliers: Record<KeyDuration, number> = {
    hour: 3600,
    day: 86400,
    weekly: 604800,
    monthly: 2592000,
    lifetime: 0,
  };
  
  if (duration === 'lifetime') return 0;
  return Math.floor(now + durationValue * multipliers[duration]);
}

export function detectPlatform(deviceName: string): Platform {
  const d = deviceName.toLowerCase();
  if (d.includes('iphone') || d.includes('ipad') || d.includes('ipod')) return 'iOS';
  if (d.includes('android') || d.includes('samsung') || d.includes('xiaomi') || 
      d.includes('pixel') || d.includes('huawei') || d.includes('motorola') || 
      d.includes('oppo') || d.includes('vivo')) return 'Android';
  if (d.includes('mac') || d.includes('darwin')) return 'macOS';
  if (d.includes('win') || d.includes('windows')) return 'Windows';
  if (d.includes('linux') || d.includes('ubuntu')) return 'Linux';
  return 'Unknown';
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => false);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatKeyPreview(prefix: string, duration: KeyDuration, durationValue: number): string {
  const durationMap: Record<KeyDuration, string> = {
    hour: 'hour',
    day: 'day',
    weekly: 'weekly',
    monthly: 'monthly',
    lifetime: 'lifetime',
  };
  return `${prefix}-${durationMap[duration]}-${'x'.repeat(20)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

export function calculatePercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}

export function groupKeysByDate(keys: ApiKey[]): Map<string, ApiKey[]> {
  const grouped = new Map<string, ApiKey[]>();
  
  keys.forEach(key => {
    const date = formatDateShort(key.createdAt);
    if (!grouped.has(date)) {
      grouped.set(date, []);
    }
    grouped.get(date)!.push(key);
  });
  
  return grouped;
}

export function sortKeysByDate(keys: ApiKey[], order: 'asc' | 'desc' = 'desc'): ApiKey[] {
  return [...keys].sort((a, b) => {
    if (order === 'desc') return b.createdAt - a.createdAt;
    return a.createdAt - b.createdAt;
  });
}

export function filterKeys(keys: ApiKey[], query: string): ApiKey[] {
  if (!query.trim()) return keys;
  const q = query.toLowerCase();
  return keys.filter(k => 
    k.key.toLowerCase().includes(q) ||
    (k.device?.toLowerCase().includes(q)) ||
    (k.ip?.includes(q))
  );
}

export async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout: number = 6000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export function getChartData(keys: ApiKey[]): Array<{ date: string; keys: number }> {
  const grouped = new Map<string, number>();
  
  keys.forEach(key => {
    const date = formatDateShort(key.createdAt);
    grouped.set(date, (grouped.get(date) || 0) + 1);
  });
  
  return Array.from(grouped.entries())
    .map(([date, count]) => ({ date, keys: count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
