import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, type = 'info', duration = 3200, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const baseStyles = 'fixed top-20 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl text-sm font-semibold z-50 pointer-events-none shadow-lg transition-all duration-300';
  
  const typeStyles = {
    success: 'bg-green-900 text-white',
    error: 'bg-red-900 text-white',
    info: 'bg-slate-900 text-white',
    warning: 'bg-yellow-900 text-white',
  };

  return (
    <div className={cn(baseStyles, typeStyles[type])}>
      {message}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  return { toasts, showToast };
}
