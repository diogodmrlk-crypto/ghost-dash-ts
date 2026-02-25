// Constants for Ghost Dash Application

export const API_BASE_URL = 'https://teste-api-mcok.vercel.app';
export const DISCORD_WEBHOOK = import.meta.env.VITE_DISCORD_WEBHOOK || '';

export const KEY_LIMIT = 5000;
export const STORAGE_KEYS = {
  apiKeys: 'ferrao_api_keys',
  generatedKeys: 'ferrao_generated_keys',
  packages: 'ferrao_packages',
  limit: 'ferrao_limit',
  language: 'ferrao_language',
  deletedIds: 'ferrao_deleted_ids',
  clearedSessions: 'ferrao_cleared_sessions',
} as const;

export const DURATION_OPTIONS = [
  { value: 'hour', label: 'Hour' },
  { value: 'day', label: 'Day' },
  { value: 'weekly', label: 'Week' },
  { value: 'monthly', label: 'Month' },
  { value: 'lifetime', label: 'Lifetime' },
] as const;

export const PROBLEMS = [
  '🔑 Key não funciona',
  '⚠️ Erro ao gerar key',
  '📱 Problema com device',
  '📦 Problema com package',
  '🔐 Erro de login',
  '⚡ Erro de integração',
  '🐛 Bug/Erro geral',
  '💡 Sugestão/Feedback',
] as const;

export const LANGUAGE_OPTIONS = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português (BR)', flag: '🇧🇷' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
] as const;

export const INTEGRATION_CODE = {
  js: `// Verificar se a key é válida
async function verifyKey(key) {
  try {
    const res = await fetch('https://sua-api.com/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    return res.ok;
  } catch (e) {
    console.error('Erro ao verificar key:', e);
    return false;
  }
}`,
  luau: `-- Verificar se a key é válida (Roblox/Luau)
local function verifyKey(key)
  local HttpService = game:GetService("HttpService")
  local success, result = pcall(function()
    return HttpService:PostAsync(
      "https://sua-api.com/verify",
      HttpService:JSONEncode({ key = key }),
      Enum.HttpContentType.ApplicationJson
    )
  end)
  return success
end`,
} as const;

export const BADGE_COLORS = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  expired: 'bg-red-100 text-red-800',
  used: 'bg-blue-100 text-blue-800',
  current: 'bg-blue-100 text-blue-800',
} as const;

export const PLATFORM_ICONS = {
  iOS: '📱',
  Android: '🤖',
  Windows: '💻',
  macOS: '🖥️',
  Linux: '🖥️',
  Unknown: '🖥️',
} as const;
