import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { LogOut, Globe } from 'lucide-react';

export default function Profile() {
  const { user, language, openModal } = useApp();

  return (
    <div className="flex flex-col h-full bg-slate-50 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-2xl font-bold text-amber-500">
            {user.avatar}
          </div>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm opacity-80">✦ {user.plan} • {user.status}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-3">
        <button
          onClick={() => openModal('language')}
          className="w-full bg-white rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
        >
          <Globe className="w-5 h-5 text-blue-600" />
          <div className="text-left flex-1">
            <div className="font-semibold text-slate-900">{t('language', language)}</div>
            <div className="text-xs text-slate-500">Mudar idioma</div>
          </div>
        </button>

        <button
          onClick={() => openModal('support')}
          className="w-full bg-white rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
        >
          <span className="text-lg">🎧</span>
          <div className="text-left flex-1">
            <div className="font-semibold text-slate-900">{t('support', language)}</div>
            <div className="text-xs text-slate-500">Enviar ticket de suporte</div>
          </div>
        </button>
      </div>

      <div className="p-4 border-t border-slate-200">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
          <LogOut className="w-5 h-5" />
          {t('logout', language)}
        </button>
      </div>
    </div>
  );
}
