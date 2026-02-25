import React, { useState, useEffect } from 'react';
import { BarChart3, RefreshCw, Plus } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { KeyItem } from '@/components/KeyItem';
import { Toast, useToast } from '@/components/Toast';
import { sortKeysByDate, formatDateShort } from '@/lib/utils';
import { t } from '@/lib/i18n';

export default function Home() {
  const { user, apiKeys, currentPage, language, openModal, setCurrentPage } = useApp();
  const { toasts, showToast } = useToast();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const recentKeys = sortKeysByDate(apiKeys).slice(0, 5);
  const pendingKeys = apiKeys.filter(k => !k.used && k.expiresAt > Date.now() / 1000);
  const activeDevices = new Set(apiKeys.filter(k => k.device).map(k => k.device)).size;

  const handleSelectKey = (id: string) => {
    const newSelected = new Set(selectedKeys);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedKeys(newSelected);
  };

  const handleCopyKey = (key: string) => {
    showToast('✅ Key copiada!', 'success');
  };

  const handleDeleteKey = (id: string) => {
    showToast('🗑️ Key deletada', 'info');
  };

  const handleCopyAll = () => {
    const allKeys = pendingKeys.map(k => k.key).join('\n');
    navigator.clipboard.writeText(allKeys).then(() => {
      showToast('✅ Todas as keys copiadas!', 'success');
    });
  };

  const limitPercentage = (apiKeys.length / 5000) * 100;

  return (
    <div className="flex flex-col h-full bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-lg font-bold text-amber-500">
              {user.avatar}
            </div>
            <div>
              <div className="font-bold text-lg">{user.name}</div>
              <div className="text-sm opacity-80">✦ {user.plan} • {user.status}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button onClick={() => openModal('create')} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Limit Bar */}
        <div className="bg-white/15 rounded-xl p-3 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{t('keys_generated', language)}</span>
            <span className="text-sm font-bold">{apiKeys.length} / 5.000</span>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
              style={{ width: `${limitPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setCurrentPage('keys')}
            className="bg-white/15 hover:bg-white/25 rounded-lg p-3 text-left transition-colors"
          >
            <div className="text-xs opacity-75 mb-1 flex items-center gap-1">
              <span>🔑</span> {t('keys', language)}
            </div>
            <div className="text-2xl font-bold">{apiKeys.length}</div>
            <div className="text-xs opacity-75 mt-2">
              {t('pending', language)}: {pendingKeys.length}
            </div>
          </button>

          <button
            onClick={() => setCurrentPage('devices')}
            className="bg-white/15 hover:bg-white/25 rounded-lg p-3 text-left transition-colors"
          >
            <div className="text-xs opacity-75 mb-1 flex items-center gap-1">
              <span>📱</span> {t('devices', language)}
            </div>
            <div className="text-2xl font-bold">{activeDevices}</div>
            <div className="text-xs opacity-75 mt-2">
              {t('active', language)}: {activeDevices}
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => openModal('create')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-center">{t('create_key', language)}</span>
          </button>

          <button
            onClick={() => setCurrentPage('packages')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
              📦
            </div>
            <span className="text-xs font-semibold text-center">{t('packages', language)}</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
              📋
            </div>
            <span className="text-xs font-semibold text-center">{t('copy_all', language)}</span>
          </button>

          <button
            onClick={() => setCurrentPage('profile')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
              👤
            </div>
            <span className="text-xs font-semibold text-center">{t('profile', language)}</span>
          </button>
        </div>

        {/* Chart Section */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-2">{t('recent_activations', language)}</h3>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold text-slate-600">{t('keys_per_day', language)}</span>
            </div>
            <div className="h-32 flex items-end justify-around gap-1">
              {[40, 60, 35, 80, 50, 70, 45].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Keys */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-900">{t('latest_keys', language)}</h3>
            <button
              onClick={() => setCurrentPage('keys')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              {t('see_all', language)}
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {recentKeys.length > 0 ? (
              recentKeys.map(apiKey => (
                <KeyItem
                  key={apiKey.id}
                  apiKey={apiKey}
                  isSelected={selectedKeys.has(apiKey.id)}
                  onSelect={handleSelectKey}
                  onCopy={handleCopyKey}
                  onDelete={handleDeleteKey}
                />
              ))
            ) : (
              <div className="p-8 text-center text-slate-500">
                <span className="text-3xl mb-2 block">📭</span>
                Nenhuma key encontrada
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toasts */}
      {toasts.map(toast => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </div>
  );
}
