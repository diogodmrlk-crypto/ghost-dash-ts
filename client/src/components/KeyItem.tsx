import React from 'react';
import { Copy, Trash2 } from 'lucide-react';
import { Badge } from './Badge';
import { cn, copyToClipboard, formatDateShort, getKeyStatus } from '@/lib/utils';
import type { ApiKey } from '@/types';

interface KeyItemProps {
  apiKey: ApiKey;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onCopy?: (key: string) => void;
  onDelete?: (id: string) => void;
  onShowDetails?: (key: ApiKey) => void;
}

export function KeyItem({
  apiKey,
  isSelected = false,
  onSelect,
  onCopy,
  onDelete,
  onShowDetails,
}: KeyItemProps) {
  const status = getKeyStatus(apiKey);
  const displayKey = apiKey.key.substring(0, 20) + '...';

  const handleCopy = async () => {
    const success = await copyToClipboard(apiKey.key);
    if (success) {
      onCopy?.(apiKey.key);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3.5 bg-white border-b border-slate-200 cursor-pointer transition-colors hover:bg-slate-50',
        isSelected && 'bg-blue-50'
      )}
      onClick={() => onShowDetails?.(apiKey)}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect?.(apiKey.id)}
        onClick={e => e.stopPropagation()}
        className="w-5 h-5 rounded-full cursor-pointer"
      />

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-slate-900 truncate font-mono">
          {displayKey}
        </div>
        <div className="text-xs text-slate-500 mt-1">
          {apiKey.device ? `${apiKey.device} • ` : ''}
          {formatDateShort(apiKey.createdAt)}
        </div>
      </div>

      <Badge status={status} />

      <button
        onClick={e => {
          e.stopPropagation();
          handleCopy();
        }}
        className="p-2 hover:bg-blue-100 rounded-lg transition-colors flex-shrink-0"
        title="Copiar"
      >
        <Copy className="w-4 h-4 text-blue-600" />
      </button>

      <button
        onClick={e => {
          e.stopPropagation();
          onDelete?.(apiKey.id);
        }}
        className="p-2 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
        title="Deletar"
      >
        <Trash2 className="w-4 h-4 text-red-600" />
      </button>
    </div>
  );
}
