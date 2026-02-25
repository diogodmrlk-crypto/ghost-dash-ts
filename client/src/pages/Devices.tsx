import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';

export default function Devices() {
  const { language } = useApp();

  return (
    <div className="flex flex-col h-full bg-slate-50 pb-20">
      <div className="bg-white p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">📱</span>
          <h1 className="font-bold text-slate-900">{t('devices', language)}</h1>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-slate-500">
          <span className="text-4xl mb-2 block">📱</span>
          Nenhum device encontrado
        </div>
      </div>
    </div>
  );
}
