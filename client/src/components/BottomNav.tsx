import React from 'react';
import { Key, Smartphone, Package, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AppContextType } from '@/contexts/AppContext';

interface BottomNavProps {
  currentPage: AppContextType['currentPage'];
  onNavigate: (page: AppContextType['currentPage']) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'keys', label: 'Keys', icon: Key },
  { id: 'devices', label: 'Devices', icon: Smartphone },
  { id: 'packages', label: 'Packages', icon: Package },
  { id: 'profile', label: 'Perfil', icon: User },
] as const;

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-200 flex items-center justify-around px-1 z-40 shadow-lg">
      {navItems.map(item => {
        const isActive = currentPage === item.id;
        const Icon = typeof item.icon === 'string' ? null : item.icon;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as any)}
            className={cn(
              'flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all',
              isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {typeof item.icon === 'string' ? (
              <span className="text-lg">{item.icon}</span>
            ) : Icon ? (
              <Icon className={cn('w-5 h-5', isActive && 'text-blue-600')} />
            ) : null}
            <span className="text-xs font-semibold">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
