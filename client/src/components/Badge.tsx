import React from 'react';
import { cn } from '@/lib/utils';
import type { KeyStatus } from '@/types';

interface BadgeProps {
  status: KeyStatus;
  className?: string;
}

const statusStyles: Record<KeyStatus, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  pending: 'bg-amber-100 text-amber-800',
  expired: 'bg-red-100 text-red-800',
  used: 'bg-blue-100 text-blue-800',
  current: 'bg-blue-100 text-blue-800',
};

const statusLabels: Record<KeyStatus, string> = {
  active: 'Ativa',
  pending: 'Pendente',
  expired: 'Expirada',
  used: 'Usada',
  current: 'Recente',
};

export function Badge({ status, className }: BadgeProps) {
  return (
    <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold', statusStyles[status], className)}>
      {statusLabels[status]}
    </span>
  );
}
