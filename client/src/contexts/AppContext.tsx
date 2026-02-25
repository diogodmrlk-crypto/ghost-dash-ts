import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ApiKey, Package, Language, ModalState, User } from '@/types';
import { STORAGE_KEYS, KEY_LIMIT } from '@/lib/constants';

export interface AppContextType {
  // User & Auth
  user: User;
  
  // Data
  apiKeys: ApiKey[];
  packages: Package[];
  
  // UI State
  currentPage: 'home' | 'keys' | 'devices' | 'packages' | 'profile';
  language: Language;
  modals: ModalState;
  
  // Limits
  limitCount: number;
  
  // Actions
  setCurrentPage: (page: AppContextType['currentPage']) => void;
  setLanguage: (lang: Language) => void;
  openModal: (modal: keyof ModalState) => void;
  closeModal: (modal: keyof ModalState) => void;
  setApiKeys: (keys: ApiKey[]) => void;
  setPackages: (packages: Package[]) => void;
  updateLimitCount: (count: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User>({
    id: '1',
    name: 'GHOST DASH',
    plan: 'Gold',
    status: 'Ativo',
    avatar: 'G',
  });

  const [currentPage, setCurrentPage] = useState<AppContextType['currentPage']>('home');
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.language);
    return (saved as Language) || 'pt';
  });

  const [apiKeys, setApiKeys] = useState<ApiKey[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.apiKeys);
    return saved ? JSON.parse(saved) : [];
  });

  const [packages, setPackages] = useState<Package[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.packages);
    return saved ? JSON.parse(saved) : [];
  });

  const [limitCount, setLimitCount] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.limit);
    return saved ? parseInt(saved) : 0;
  });

  const [modals, setModals] = useState<ModalState>({
    create: false,
    package: false,
    integration: false,
    deviceAction: false,
    language: false,
    support: false,
  });

  // Persist language
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.language, language);
  }, [language]);

  // Persist API keys
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.apiKeys, JSON.stringify(apiKeys));
  }, [apiKeys]);

  // Persist packages
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.packages, JSON.stringify(packages));
  }, [packages]);

  // Persist limit
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.limit, limitCount.toString());
  }, [limitCount]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const openModal = (modal: keyof ModalState) => {
    setModals(prev => ({ ...prev, [modal]: true }));
  };

  const closeModal = (modal: keyof ModalState) => {
    setModals(prev => ({ ...prev, [modal]: false }));
  };

  const updateLimitCount = (count: number) => {
    setLimitCount(Math.min(count, KEY_LIMIT));
  };

  const value: AppContextType = {
    user,
    apiKeys,
    packages,
    currentPage,
    language,
    modals,
    limitCount,
    setCurrentPage,
    setLanguage,
    openModal,
    closeModal,
    setApiKeys,
    setPackages,
    updateLimitCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
