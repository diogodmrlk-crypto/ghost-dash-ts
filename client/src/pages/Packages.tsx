import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { Plus } from 'lucide-react';

export default function Packages() {
  const { packages, language, openModal } = useApp();

  return (
    <div className="flex flex-col h-full bg-slate-50 pb-20">
      <div className="bg-white p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">📦</span>
          <h1 className="font-bold text-slate-900">{t('packages', language)}</h1>
        </div>
        <button onClick={() => openModal('package')} className="p-2 hover:bg-blue-100 rounded-lg">
          <Plus className="w-5 h-5 text-blue-600" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {packages.length > 0 ? (
          <div className="p-4 space-y-2">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold text-slate-900">{pkg.name}</h3>
                <p className="text-xs text-slate-500 mt-1 truncate">{pkg.url}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-slate-500">
              <span className="text-4xl mb-2 block">📦</span>
              Nenhum package encontrado
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
