import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { KeyItem } from '@/components/KeyItem';
import { sortKeysByDate, filterKeys } from '@/lib/utils';
import { t } from '@/lib/i18n';
import { Search, Trash2, Plus } from 'lucide-react';

export default function Keys() {
  const { apiKeys, language, openModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const filteredKeys = filterKeys(sortKeysByDate(apiKeys), searchQuery);

  return (
    <div className="flex flex-col h-full bg-slate-50 pb-20">
      <div className="bg-white p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔑</span>
          <h1 className="font-bold text-slate-900">{t('keys', language)}</h1>
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">{apiKeys.length}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => openModal('create')} className="p-2 hover:bg-blue-100 rounded-lg">
            <Plus className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>

      <div className="p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder={t('search', language) + '...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-transparent flex-1 outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredKeys.length > 0 ? (
          <div className="bg-white">
            {filteredKeys.map(apiKey => (
              <KeyItem
                key={apiKey.id}
                apiKey={apiKey}
                isSelected={selectedKeys.has(apiKey.id)}
                onSelect={id => {
                  const newSelected = new Set(selectedKeys);
                  newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
                  setSelectedKeys(newSelected);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            <div className="text-center">
              <span className="text-4xl mb-2 block">📭</span>
              Nenhuma key encontrada
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
