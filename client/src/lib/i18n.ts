import type { Language } from '@/types';

type TranslationKey = 
  | 'keys_generated'
  | 'pending'
  | 'active'
  | 'create_key'
  | 'copy_all'
  | 'profile'
  | 'recent_activations'
  | 'keys_per_day'
  | 'latest_keys'
  | 'see_all'
  | 'keys'
  | 'devices'
  | 'packages'
  | 'sessions'
  | 'settings'
  | 'create_keys'
  | 'add_package'
  | 'integration'
  | 'language'
  | 'support'
  | 'logout'
  | 'quantity'
  | 'duration'
  | 'package'
  | 'auto_clean'
  | 'preview'
  | 'generate'
  | 'name'
  | 'url'
  | 'description'
  | 'add'
  | 'cancel'
  | 'delete'
  | 'edit'
  | 'save'
  | 'search'
  | 'loading'
  | 'error'
  | 'success'
  | 'no_data'
  | 'copy'
  | 'copied'
  | 'refresh'
  | 'close';

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    keys_generated: 'Keys Generated',
    pending: 'Pending',
    active: 'Active',
    create_key: 'Create Key',
    copy_all: 'Copy All',
    profile: 'Profile',
    recent_activations: 'Recent Activations',
    keys_per_day: 'Keys generated per day',
    latest_keys: 'Latest Keys',
    see_all: 'See all →',
    keys: 'Keys',
    devices: 'Devices',
    packages: 'Packages',
    sessions: 'Sessions',
    settings: 'Settings',
    create_keys: 'Create Keys',
    add_package: 'Add Package',
    integration: 'Integration',
    language: 'Language',
    support: 'Support',
    logout: 'Logout',
    quantity: 'Quantity',
    duration: 'Duration',
    package: 'Package',
    auto_clean: 'Auto Clean',
    preview: 'Preview',
    generate: 'Generate',
    name: 'Name',
    url: 'URL',
    description: 'Description',
    add: 'Add',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    no_data: 'No data',
    copy: 'Copy',
    copied: 'Copied!',
    refresh: 'Refresh',
    close: 'Close',
  },
  pt: {
    keys_generated: 'Keys Geradas',
    pending: 'Pendentes',
    active: 'Ativas',
    create_key: 'Criar Key',
    copy_all: 'Copiar All',
    profile: 'Perfil',
    recent_activations: 'Ativações Recentes',
    keys_per_day: 'Keys geradas por dia',
    latest_keys: 'Últimas Keys',
    see_all: 'Ver todas →',
    keys: 'Keys',
    devices: 'Devices',
    packages: 'Packages',
    sessions: 'Sessões',
    settings: 'Configurações',
    create_keys: 'Criar Keys',
    add_package: 'Novo Package',
    integration: 'Integração',
    language: 'Idioma',
    support: 'Suporte',
    logout: 'Sair',
    quantity: 'Quantidade',
    duration: 'Duração',
    package: 'Package',
    auto_clean: 'Auto clean',
    preview: 'Preview',
    generate: 'Gerar',
    name: 'Nome',
    url: 'URL',
    description: 'Descrição',
    add: 'Adicionar',
    cancel: 'Cancelar',
    delete: 'Deletar',
    edit: 'Editar',
    save: 'Salvar',
    search: 'Buscar',
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    no_data: 'Sem dados',
    copy: 'Copiar',
    copied: 'Copiado!',
    refresh: 'Atualizar',
    close: 'Fechar',
  },
  vi: {
    keys_generated: 'Khóa Được Tạo',
    pending: 'Đang Chờ',
    active: 'Hoạt Động',
    create_key: 'Tạo Khóa',
    copy_all: 'Sao Chép Tất Cả',
    profile: 'Hồ Sơ',
    recent_activations: 'Kích Hoạt Gần Đây',
    keys_per_day: 'Khóa được tạo mỗi ngày',
    latest_keys: 'Khóa Mới Nhất',
    see_all: 'Xem tất cả →',
    keys: 'Khóa',
    devices: 'Thiết Bị',
    packages: 'Gói',
    sessions: 'Phiên',
    settings: 'Cài Đặt',
    create_keys: 'Tạo Khóa',
    add_package: 'Thêm Gói',
    integration: 'Tích Hợp',
    language: 'Ngôn Ngữ',
    support: 'Hỗ Trợ',
    logout: 'Đăng Xuất',
    quantity: 'Số Lượng',
    duration: 'Thời Lượng',
    package: 'Gói',
    auto_clean: 'Tự Động Làm Sạch',
    preview: 'Xem Trước',
    generate: 'Tạo',
    name: 'Tên',
    url: 'URL',
    description: 'Mô Tả',
    add: 'Thêm',
    cancel: 'Hủy',
    delete: 'Xóa',
    edit: 'Chỉnh Sửa',
    save: 'Lưu',
    search: 'Tìm Kiếm',
    loading: 'Đang Tải...',
    error: 'Lỗi',
    success: 'Thành Công',
    no_data: 'Không Có Dữ Liệu',
    copy: 'Sao Chép',
    copied: 'Đã Sao Chép!',
    refresh: 'Làm Mới',
    close: 'Đóng',
  },
};

export function t(key: TranslationKey, language: Language): string {
  return translations[language]?.[key] || translations.en[key] || key;
}

export function useTranslation(language: Language) {
  return (key: TranslationKey) => t(key, language);
}
