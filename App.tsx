/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ModuleType, GenerationResult, UserProfile, AppSettings, AboutInfo } from './types';
import { MODULES } from './data/presets';
import { generateContent, GenerationParams } from './services/aiGenerator';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ResultDisplay } from './components/ResultDisplay';
import { HistoryDrawer } from './components/HistoryDrawer';
import { QuickDemoModal } from './components/QuickDemoModal';
import { Toast } from './components/Toast';
import { HistoryView } from './components/HistoryView';
import { UserProfileView } from './components/UserProfileView';
import { SettingsView } from './components/SettingsView';
import { AboutView } from './components/AboutView';
import { SasLogo } from './components/SasLogo';
import { 
  Sparkles, 
  HeartHandshake, 
  Store, 
  Share2, 
  TrendingUp, 
  Layers, 
  Compass, 
  History,
  User,
  Settings as SettingsIcon,
  Info,
  Video
} from 'lucide-react';

// Modules
import { PromptModule } from './components/modules/PromptModule';
import { PreweddingModule } from './components/modules/PreweddingModule';
import { UmkmModule } from './components/modules/UmkmModule';
import { FacebookProModule } from './components/modules/FacebookProModule';
import { MarketingModule } from './components/modules/MarketingModule';
import { DigitalProductModule } from './components/modules/DigitalProductModule';
import { ReelsStudioModule } from './components/modules/ReelsStudioModule';

export default function App() {
  const [currentModule, setCurrentModule] = useState<ModuleType>('prompt');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<GenerationResult | null>(null);
  const [savedItems, setSavedItems] = useState<GenerationResult[]>([]);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [quickDemoOpen, setQuickDemoOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Profile State (Persistent)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    displayName: 'Soul Art Creator',
    brandName: 'SAS Soul Art System',
    avatarUrl: '',
    bio: 'Kreator konten digital dan visual strategist berfokus pada estetika luxury, produk digital, dan pertumbuhan bisnis modern.',
    role: 'Digital Creator & Business Strategist',
    updatedAt: Date.now(),
  });

  // App Settings State (Persistent)
  const [appSettings, setAppSettings] = useState<AppSettings>({
    themeMode: 'dark',
    language: 'id',
    accentTheme: 'rose_gold',
    fontSize: 'normal',
    animationEffects: true,
    autoSaveHistory: true,
    version: 'v2.4.0 Engine (Build 2026.11)',
    updatedAt: Date.now(),
  });

  // About SAS AI State (Persistent & Editable)
  const [aboutInfo, setAboutInfo] = useState<AboutInfo>({
    appName: 'SAS AI – Soul Art System',
    brandName: 'SAS Soul Art System',
    slogan: 'Create Your Dream with AI',
    shortDescription: 'Studio kecerdasan buatan kreatif kelas luxury pertama yang mengintegrasikan formula prompt visual sinematik, strategi komersial prewedding & F&B UMKM, monetisasi Facebook Pro & kampanye digital marketing, serta blueprint produk digital siap jual dalam satu ekosistem elegan.',
    brandIdentity: {
      dustyPink: '#C98B94',
      roseGold: '#E5AA9C',
      ivory: '#FAF7F2',
      black: '#0C0C10',
    },
    creatorInfo: {
      name: 'Soul Art System Creative Director',
      title: 'Creator & Lead AI Architect',
      bioNote: 'Diciptakan dengan dedikasi tinggi untuk memberdayakan insan kreatif, UMKM Indonesia, dan pemilik produk digital agar dapat menghasilkan karya berestetika tinggi dan bernilai komersial tanpa hambatan teknis.',
      email: 'soulart.system@gmail.com',
      location: 'Jakarta, Indonesia',
      editable: true,
      updatedAt: Date.now(),
    },
  });

  // Initialize with saved items, profile, settings, and about from database & localStorage
  useEffect(() => {
    // 1. Fetch History
    const fetchHistoryFromDb = async () => {
      try {
        const res = await fetch('/api/history');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setSavedItems(data);
            localStorage.setItem('sas_ai_vault', JSON.stringify(data));
            return;
          }
        }
      } catch (err) {
        console.warn('History API fetch fallback to localStorage:', err);
      }

      try {
        const stored = localStorage.getItem('sas_ai_vault');
        if (stored) {
          setSavedItems(JSON.parse(stored));
        }
      } catch {}
    };

    // 2. Fetch User Profile
    const fetchProfileFromDb = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          if (data && data.displayName) {
            setUserProfile(data);
            localStorage.setItem('sas_ai_profile', JSON.stringify(data));
            return;
          }
        }
      } catch (err) {
        console.warn('Profile API fallback to localStorage:', err);
      }

      try {
        const stored = localStorage.getItem('sas_ai_profile');
        if (stored) {
          setUserProfile(JSON.parse(stored));
        }
      } catch {}
    };

    // 3. Fetch Settings
    const fetchSettingsFromDb = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data && data.themeMode) {
            setAppSettings(data);
            localStorage.setItem('sas_ai_settings', JSON.stringify(data));
            return;
          }
        }
      } catch (err) {
        console.warn('Settings API fallback to localStorage:', err);
      }

      try {
        const stored = localStorage.getItem('sas_ai_settings');
        if (stored) {
          setAppSettings(JSON.parse(stored));
        }
      } catch {}
    };

    // 4. Fetch About info
    const fetchAboutFromDb = async () => {
      try {
        const res = await fetch('/api/about');
        if (res.ok) {
          const data = await res.json();
          if (data && data.appName) {
            setAboutInfo(data);
            localStorage.setItem('sas_ai_about', JSON.stringify(data));
            return;
          }
        }
      } catch (err) {
        console.warn('About API fallback to localStorage:', err);
      }

      try {
        const stored = localStorage.getItem('sas_ai_about');
        if (stored) {
          setAboutInfo(JSON.parse(stored));
        }
      } catch {}
    };

    fetchHistoryFromDb();
    fetchProfileFromDb();
    fetchSettingsFromDb();
    fetchAboutFromDb();

    // Auto-generate initial rich demo result on first load so user immediately sees functional results
    generateInitialDemo('prompt');
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleSaveItem = async (newItem: {
    id?: string;
    moduleId: ModuleType;
    title: string;
    subtitle: string;
    content: string;
    metadata?: Record<string, any>;
  }) => {
    const formattedItem: GenerationResult = {
      id: newItem.id || 'sas_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
      moduleId: newItem.moduleId,
      timestamp: Date.now(),
      title: newItem.title,
      subtitle: newItem.subtitle,
      content: newItem.content,
      isFavorite: true,
      metadata: newItem.metadata || {},
    };

    setSavedItems((prev) => {
      const exists = prev.some((i) => i.id === formattedItem.id);
      const nextList = exists ? prev : [formattedItem, ...prev];
      try {
        localStorage.setItem('sas_ai_vault', JSON.stringify(nextList));
      } catch {}
      return nextList;
    });

    // Save to persistent server database
    try {
      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedItem),
      });
    } catch (e) {
      console.warn('Could not sync history to server API:', e);
    }

    showToast('Tersimpan di Riwayat & Soul Art Vault');
  };

  // Persistent Profile Handler
  const handleSaveProfile = async (updated: Partial<UserProfile>) => {
    const next: UserProfile = { ...userProfile, ...updated, updatedAt: Date.now() };
    setUserProfile(next);
    try {
      localStorage.setItem('sas_ai_profile', JSON.stringify(next));
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
    } catch (err) {
      console.warn('Error saving profile:', err);
    }
    showToast('Profil pengguna berhasil disimpan');
  };

  // Persistent Settings Handler
  const handleUpdateSettings = async (updated: Partial<AppSettings>) => {
    const next: AppSettings = { ...appSettings, ...updated, updatedAt: Date.now() };
    setAppSettings(next);
    try {
      localStorage.setItem('sas_ai_settings', JSON.stringify(next));
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
    } catch (err) {
      console.warn('Error saving settings:', err);
    }
    showToast('Pengaturan sistem berhasil disimpan');
  };

  // Reset Settings Handler
  const handleResetSettings = async () => {
    try {
      const res = await fetch('/api/settings/reset', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setAppSettings(data.settings);
        localStorage.setItem('sas_ai_settings', JSON.stringify(data.settings));
      }
    } catch (err) {
      console.warn('Reset settings error:', err);
    }
    showToast('Pengaturan telah direset ke setelan standar');
  };

  // Persistent About Info Handler
  const handleSaveAboutInfo = async (updated: Partial<AboutInfo>) => {
    const next: AboutInfo = { ...aboutInfo, ...updated };
    setAboutInfo(next);
    try {
      localStorage.setItem('sas_ai_about', JSON.stringify(next));
      await fetch('/api/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
    } catch (err) {
      console.warn('Error saving about info:', err);
    }
    showToast('Informasi Tentang SAS AI berhasil disimpan');
  };

  const generateInitialDemo = async (modId: ModuleType) => {
    const nonDemoModules: ModuleType[] = ['history', 'profile', 'settings', 'about'];
    if (nonDemoModules.includes(modId)) return;
    setIsLoading(true);
    try {
      const res = await generateContent({ moduleId: modId });
      setCurrentResult(res);
    } catch {
      // Handle error gracefully
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectModule = (modId: ModuleType) => {
    setCurrentModule(modId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const nonDemoModules: ModuleType[] = ['history', 'profile', 'settings', 'about'];
    if (!nonDemoModules.includes(modId) && (!currentResult || currentResult.moduleId !== modId)) {
      generateInitialDemo(modId);
    }
  };

  const handleOpenInReelsStudio = (params: {
    sourceModule: string;
    title: string;
    hookText: string;
    subtitleText: string;
  }) => {
    setCurrentModule('reels_studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Membuka Reels Studio untuk ${params.title}`);
  };

  const handleGenerate = async (params: GenerationParams) => {
    setIsLoading(true);
    try {
      const res = await generateContent(params);
      setCurrentResult(res);
      showToast('Generated new Soul Art output successfully');

      // Auto scroll to result card on mobile
      setTimeout(() => {
        const el = document.getElementById('generation-result-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      showToast('Gagal memproses AI. Silakan coba kembali.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (id: string) => {
    if (!currentResult) return;

    const isFav = currentResult.id === id ? !currentResult.isFavorite : false;
    const updatedCurrent = currentResult.id === id ? { ...currentResult, isFavorite: isFav } : currentResult;
    setCurrentResult(updatedCurrent);

    setSavedItems((prev) => {
      let nextList: GenerationResult[];
      const exists = prev.some((item) => item.id === id);
      if (exists) {
        nextList = prev.filter((item) => item.id !== id);
        showToast('Removed from Saved Vault');
      } else {
        nextList = [{ ...updatedCurrent, isFavorite: true }, ...prev];
        showToast('Saved to Soul Art Vault');
      }
      try {
        localStorage.setItem('sas_ai_vault', JSON.stringify(nextList));
      } catch {
        // storage quota
      }
      return nextList;
    });
  };

  const handleDeleteSavedItem = async (id: string) => {
    setSavedItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      try {
        localStorage.setItem('sas_ai_vault', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (currentResult && currentResult.id === id) {
      setCurrentResult({ ...currentResult, isFavorite: false });
    }

    try {
      await fetch(`/api/history/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Could not delete history from server API:', e);
    }

    showToast('Riwayat berhasil dihapus');
  };

  const handleClearAllSaved = async () => {
    setSavedItems([]);
    try {
      localStorage.removeItem('sas_ai_vault');
      await fetch('/api/history', { method: 'DELETE' });
    } catch (e) {
      console.warn('Could not clear history from server API:', e);
    }
    showToast('Seluruh riwayat berhasil dibersihkan');
  };

  const handleCopyText = (text: string, label: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
    }
    showToast(label);
  };

  const handleSelectDemoFromModal = (modId: ModuleType) => {
    setCurrentModule(modId);
    generateInitialDemo(modId);
  };

  // Find active module metadata
  const activeModuleMeta = MODULES.find((m) => m.id === currentModule) || MODULES[0];

  const getModuleIcon = (name: string, className = 'w-4 h-4') => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'HeartHandshake':
        return <HeartHandshake className={className} />;
      case 'Store':
        return <Store className={className} />;
      case 'Share2':
        return <Share2 className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'Layers':
        return <Layers className={className} />;
      case 'Video':
        return <Video className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div className={`min-h-screen ${
      appSettings.themeMode === 'light' 
        ? 'bg-[#FAF7F2] text-[#1C1A24]' 
        : 'bg-[#0C0C10] text-[#FAF7F2]'
    } flex flex-col font-sans transition-colors selection:bg-[#E5AA9C]/30 selection:text-[#FAF7F2]`}>
      
      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Top Header Bar */}
      <Header
        currentModule={currentModule}
        onSelectModule={handleSelectModule}
        savedCount={savedItems.length}
        onOpenSaved={() => setHistoryDrawerOpen(true)}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        onOpenQuickDemo={() => setQuickDemoOpen(true)}
        userProfile={userProfile}
        onOpenProfile={() => handleSelectModule('profile')}
        onOpenSettings={() => handleSelectModule('settings')}
        onOpenAbout={() => handleSelectModule('about')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-16 space-y-8">
        
        {/* ========================================================
            6 SAS AI DASHBOARD NAVIGATION CARDS
            Visible, prominent, and fully accessible on Mobile & Desktop
           ======================================================== */}
        <section aria-label="6 SAS AI Dashboard Navigation Cards" className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5AA9C] animate-pulse" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
                Dashboard Modul Soul Art System
              </h2>
            </div>
            <span className="text-[11px] font-mono text-[#E5AA9C] bg-[#14131A] px-2.5 py-0.5 rounded-full border border-[#E5AA9C]/25">
              7 Modul & Reels MP4
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
            {MODULES.map((mod, index) => {
              const active = currentModule === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => handleSelectModule(mod.id)}
                  className={`min-h-[74px] text-left p-3 rounded-xl border transition-all flex flex-col justify-between relative group ${
                    active
                      ? 'bg-gradient-to-b from-[#2B1F2D] via-[#211A27] to-[#16141F] border-[#E5AA9C] text-[#FAF7F2] shadow-lg shadow-[#E5AA9C]/15 ring-1 ring-[#E5AA9C]'
                      : 'bg-[#14131A] border-[#E5AA9C]/20 text-[#DCD4CA]/75 hover:text-[#FAF7F2] hover:border-[#E5AA9C]/45 hover:bg-[#1C1A27]'
                  }`}
                  aria-label={mod.title}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className={`font-mono text-[10px] font-bold ${active ? 'text-[#E5AA9C]' : 'text-[#DCD4CA]/50'}`}>
                      0{index + 1}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                      active 
                        ? 'bg-[#E5AA9C]/20 text-[#FAF7F2] border border-[#E5AA9C]/40 font-semibold' 
                        : 'bg-[#0C0C10] text-[#DCD4CA]/60 border border-white/5'
                    }`}>
                      {mod.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg shrink-0 ${
                      active 
                        ? 'bg-gradient-to-tr from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2] shadow-sm' 
                        : 'bg-[#0C0C10] text-[#E5AA9C] border border-[#E5AA9C]/15'
                    }`}>
                      {getModuleIcon(mod.iconName, 'w-4 h-4')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs font-serif font-bold truncate ${active ? 'text-[#FAF7F2]' : 'text-[#FAF7F2]/90'}`}>
                        {mod.title}
                      </div>
                      <p className="text-[10px] text-[#DCD4CA]/60 truncate">
                        {mod.shortTitle}
                      </p>
                    </div>
                  </div>

                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5AA9C] absolute top-2 right-2 ring-2 ring-[#0C0C10]" />
                  )}
                </button>
              );
            })}

            {/* Card 07: Riwayat AI (History) on the Main Dashboard */}
            <button
              type="button"
              onClick={() => handleSelectModule('history')}
              className={`min-h-[74px] text-left p-3 rounded-xl border transition-all flex flex-col justify-between relative group ${
                currentModule === 'history'
                  ? 'bg-gradient-to-b from-[#2B1F2D] via-[#211A27] to-[#16141F] border-[#E5AA9C] text-[#FAF7F2] shadow-lg shadow-[#E5AA9C]/15 ring-1 ring-[#E5AA9C]'
                  : 'bg-[#14131A] border-[#E5AA9C]/20 text-[#DCD4CA]/75 hover:text-[#FAF7F2] hover:border-[#E5AA9C]/45 hover:bg-[#1C1A27]'
              }`}
              aria-label="Riwayat Generasi AI"
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className={`font-mono text-[10px] font-bold ${currentModule === 'history' ? 'text-[#E5AA9C]' : 'text-[#DCD4CA]/50'}`}>
                  07
                </span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                  currentModule === 'history' 
                    ? 'bg-[#E5AA9C]/20 text-[#FAF7F2] border border-[#E5AA9C]/40 font-semibold' 
                    : 'bg-[#0C0C10] text-[#DCD4CA]/60 border border-white/5'
                }`}>
                  {savedItems.length} Arsip
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  currentModule === 'history' 
                    ? 'bg-gradient-to-tr from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2] shadow-sm' 
                    : 'bg-[#0C0C10] text-[#E5AA9C] border border-[#E5AA9C]/15'
                }`}>
                  <History className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-xs font-serif font-bold truncate ${currentModule === 'history' ? 'text-[#FAF7F2]' : 'text-[#FAF7F2]/90'}`}>
                    Riwayat AI
                  </div>
                  <p className="text-[10px] text-[#DCD4CA]/60 truncate">
                    Arsip 6 Modul
                  </p>
                </div>
              </div>

              {currentModule === 'history' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5AA9C] absolute top-2 right-2 ring-2 ring-[#0C0C10]" />
              )}
            </button>
          </div>

          {/* System Center Quick Navigation Bar (Profile, Settings, About) */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-[#14131A] border border-[#E5AA9C]/20">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleSelectModule('profile')}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  currentModule === 'profile'
                    ? 'bg-gradient-to-r from-[#E5AA9C] to-[#FAF7F2] text-[#0C0C10] font-semibold shadow-md shadow-[#E5AA9C]/20'
                    : 'text-[#DCD4CA]/80 hover:text-[#FAF7F2] hover:bg-[#1C1A27]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Profil: {userProfile.displayName || 'Kreator'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectModule('settings')}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  currentModule === 'settings'
                    ? 'bg-gradient-to-r from-[#E5AA9C] to-[#FAF7F2] text-[#0C0C10] font-semibold shadow-md shadow-[#E5AA9C]/20'
                    : 'text-[#DCD4CA]/80 hover:text-[#FAF7F2] hover:bg-[#1C1A27]'
                }`}
              >
                <SettingsIcon className="w-3.5 h-3.5" />
                <span>Pengaturan ({appSettings.themeMode === 'light' ? 'Light' : 'Dark'} · {appSettings.language.toUpperCase()})</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectModule('about')}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  currentModule === 'about'
                    ? 'bg-gradient-to-r from-[#E5AA9C] to-[#FAF7F2] text-[#0C0C10] font-semibold shadow-md shadow-[#E5AA9C]/20'
                    : 'text-[#DCD4CA]/80 hover:text-[#FAF7F2] hover:bg-[#1C1A27]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E5AA9C]" />
                <span>Tentang SAS AI</span>
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#DCD4CA]/60 px-2">
              <span>Brand: <strong className="text-[#E5AA9C]">SAS Soul Art System</strong></span>
            </div>
          </div>
        </section>

        {/* Dynamic Active Module Form */}
        <section aria-label="Module Configuration">
          {currentModule === 'prompt' && (
            <PromptModule
              onOpenInReelsStudio={handleOpenInReelsStudio}
              onAutoSaveHistory={(item) => handleSaveItem(item)}
              onSaveToVault={(item) => {
                handleSaveItem({
                  moduleId: 'prompt',
                  title: item.title,
                  subtitle: `Prompt kategori ${item.category} dibuat dengan Gemini API`,
                  content: item.content,
                  metadata: {
                    category: item.category,
                    tags: ['Gemini 3.8 Flash', 'Indonesian Prompt', item.category],
                    stats: {
                      'Kategori': item.category,
                      'Panjang Karakter': `${item.content.length} chars`,
                      'Model AI': 'gemini-3.8-flash'
                    }
                  }
                });
              }}
            />
          )}
          {currentModule === 'prewedding' && (
            <PreweddingModule
              onOpenInReelsStudio={handleOpenInReelsStudio}
              onAutoSaveHistory={(item) => handleSaveItem(item)}
              onSaveToVault={(item) => {
                handleSaveItem({
                  moduleId: 'prewedding',
                  title: item.title,
                  subtitle: `Prewedding prompt dibuat dengan Gemini API`,
                  content: item.content,
                  metadata: {
                    category: item.category,
                    tags: ['Prewedding', 'Gemini 3.8 Flash', 'Editorial Photo'],
                    stats: {
                      'Kategori': item.category,
                      'Panjang Karakter': `${item.content.length} chars`,
                      'Model AI': 'gemini-3.8-flash'
                    }
                  }
                });
              }}
            />
          )}
          {currentModule === 'umkm' && (
            <UmkmModule
              onOpenInReelsStudio={handleOpenInReelsStudio}
              onAutoSaveHistory={(item) => handleSaveItem(item)}
              onSaveToVault={(item) => {
                handleSaveItem({
                  moduleId: 'umkm',
                  title: item.title,
                  subtitle: `Prompt foto produk F&B dibuat dengan Gemini API`,
                  content: item.content,
                  metadata: {
                    category: item.category,
                    tags: ['UMKM', 'Food & Beverage', 'Gemini 3.8 Flash', 'Commercial Photo'],
                    stats: {
                      'Kategori': item.category,
                      'Panjang Karakter': `${item.content.length} chars`,
                      'Model AI': 'gemini-3.8-flash'
                    }
                  }
                });
              }}
            />
          )}
          {currentModule === 'facebook_pro' && (
            <FacebookProModule
              onOpenInReelsStudio={handleOpenInReelsStudio}
              onAutoSaveHistory={(item) => handleSaveItem(item)}
              onSaveToVault={(item) => {
                handleSaveItem({
                  moduleId: 'facebook_pro',
                  title: item.title,
                  subtitle: `Konten Facebook Marketing dibuat dengan Gemini API`,
                  content: item.content,
                  metadata: {
                    category: item.category,
                    tags: ['Facebook Pro', 'Meta Marketing', 'Gemini 3.8 Flash'],
                    stats: {
                      'Kategori': item.category,
                      'Panjang Karakter': `${item.content.length} chars`,
                      'Model AI': 'gemini-3.8-flash'
                    }
                  }
                });
              }}
            />
          )}
          {currentModule === 'marketing' && (
            <MarketingModule
              onOpenInReelsStudio={handleOpenInReelsStudio}
              onAutoSaveHistory={(item) => handleSaveItem(item)}
              onSaveToVault={(item) => {
                handleSaveItem({
                  moduleId: 'marketing',
                  title: item.title,
                  subtitle: `Rencana Pemasaran Strategis dibuat dengan Gemini API`,
                  content: item.content,
                  metadata: {
                    category: item.category,
                    tags: ['Marketing Strategy', 'Growth Plan', 'Gemini 3.8 Flash', '7-Day Calendar'],
                    stats: {
                      'Kategori': item.category,
                      'Panjang Karakter': `${item.content.length} chars`,
                      'Model AI': 'gemini-3.8-flash'
                    }
                  }
                });
              }}
            />
          )}
          {currentModule === 'digital_product' && (
            <DigitalProductModule
              onOpenInReelsStudio={handleOpenInReelsStudio}
              onAutoSaveHistory={(item) => handleSaveItem(item)}
              onSaveToVault={(item) => {
                handleSaveItem({
                  moduleId: 'digital_product',
                  title: item.title,
                  subtitle: `Blueprint produk digital dibuat dengan Gemini API`,
                  content: item.content,
                  metadata: {
                    category: item.category,
                    tags: ['Digital Product', 'Creator Asset', 'Gemini 3.8 Flash', 'Value Ladder'],
                    stats: {
                      'Kategori': item.category,
                      'Panjang Karakter': `${item.content.length} chars`,
                      'Model AI': 'gemini-3.8-flash'
                    }
                  }
                });
              }}
            />
          )}
          {currentModule === 'reels_studio' && (
            <ReelsStudioModule
              onSaveToHistory={(item) => handleSaveItem(item)}
              initialSourceModule="umkm"
            />
          )}
          {currentModule === 'history' && (
            <HistoryView
              items={savedItems}
              onDeleteItem={handleDeleteSavedItem}
              onClearAll={handleClearAllSaved}
              onBackToStudio={(modId) => handleSelectModule(modId || 'prompt')}
            />
          )}
          {currentModule === 'profile' && (
            <UserProfileView
              profile={userProfile}
              onSaveProfile={handleSaveProfile}
              onBackToStudio={() => handleSelectModule('prompt')}
              onOpenSettings={() => handleSelectModule('settings')}
              onOpenAbout={() => handleSelectModule('about')}
            />
          )}
          {currentModule === 'settings' && (
            <SettingsView
              settings={appSettings}
              onUpdateSettings={handleUpdateSettings}
              onResetSettings={handleResetSettings}
              onBackToStudio={() => handleSelectModule('prompt')}
              onOpenProfile={() => handleSelectModule('profile')}
              onOpenAbout={() => handleSelectModule('about')}
            />
          )}
          {currentModule === 'about' && (
            <AboutView
              aboutInfo={aboutInfo}
              onSaveAboutInfo={handleSaveAboutInfo}
              onBackToStudio={() => handleSelectModule('prompt')}
              onOpenProfile={() => handleSelectModule('profile')}
              onOpenSettings={() => handleSelectModule('settings')}
            />
          )}
        </section>

        {/* Generation Results Display (For modules with external ResultDisplay) */}
        {currentModule !== 'prompt' && currentModule !== 'prewedding' && currentModule !== 'umkm' && currentModule !== 'facebook_pro' && currentModule !== 'marketing' && currentModule !== 'digital_product' && currentModule !== 'reels_studio' && currentModule !== 'history' && currentModule !== 'profile' && currentModule !== 'settings' && currentModule !== 'about' && (
          <section id="generation-result-section" aria-label="AI Generation Results">
            {isLoading ? (
              <div className="bg-[#14131A] border border-[#E5AA9C]/30 rounded-2xl p-12 text-center shadow-xl flex flex-col items-center justify-center animate-pulse">
                <div className="w-12 h-12 rounded-full border-2 border-[#E5AA9C] border-t-transparent animate-spin mb-4" />
                <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">
                  Mempersiapkan Hasil Soul Art AI...
                </h3>
                <p className="text-xs text-[#DCD4CA]/70 mt-1 max-w-sm">
                  Mengharmonisasikan formula visual, parameter kamera, dan kerangka copywriting berkelas dunia.
                </p>
              </div>
            ) : currentResult ? (
              <ResultDisplay
                result={currentResult}
                onToggleFavorite={handleToggleFavorite}
                onCopyText={handleCopyText}
              />
            ) : null}
          </section>
        )}

      </main>

      {/* Navigation (Mobile Bottom Bar & Drawer) */}
      <Navigation
        currentModule={currentModule}
        onSelectModule={handleSelectModule}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
      />

      {/* Saved History Drawer */}
      <HistoryDrawer
        isOpen={historyDrawerOpen}
        onClose={() => setHistoryDrawerOpen(false)}
        items={savedItems}
        onSelectItem={(item) => setCurrentResult(item)}
        onDeleteItem={handleDeleteSavedItem}
        onClearAll={handleClearAllSaved}
      />

      {/* Quick Demo Showcase Modal */}
      <QuickDemoModal
        isOpen={quickDemoOpen}
        onClose={() => setQuickDemoOpen(false)}
        onSelectDemo={handleSelectDemoFromModal}
      />

      {/* Quiet Luxury Footer */}
      <footer className="w-full border-t border-[#E5AA9C]/10 bg-[#0C0C10] py-6 px-4 text-center text-xs text-[#DCD4CA]/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SasLogo variant="horizontal" size="sm" showSlogan={false} />
            <span aria-hidden="true" className="text-[#E5AA9C]/40">·</span>
            <span className="text-[#DCD4CA]/70">Soul Art System Creative Engine</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Dusty Pink & Rose Gold Edition</span>
            <span aria-hidden="true" className="text-[#E5AA9C]/40">·</span>
            <span>Responsive Mobile & Desktop</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
