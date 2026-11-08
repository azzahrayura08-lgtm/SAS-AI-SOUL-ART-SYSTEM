import React, { useState } from 'react';
import { 
  Settings, 
  Moon, 
  Sun, 
  Globe, 
  Palette, 
  Type, 
  Sparkles, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  Layers, 
  ArrowLeft,
  Sliders,
  Cpu
} from 'lucide-react';
import { AppSettings } from '../types';
import { SasLogo } from './SasLogo';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (updated: Partial<AppSettings>) => Promise<void> | void;
  onResetSettings: () => Promise<void> | void;
  onBackToStudio: () => void;
  onOpenProfile?: () => void;
  onOpenAbout?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onResetSettings,
  onBackToStudio,
  onOpenProfile,
  onOpenAbout,
}) => {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(settings.themeMode || 'dark');
  const [language, setLanguage] = useState<'id' | 'en'>(settings.language || 'id');
  const [accentTheme, setAccentTheme] = useState<'rose_gold' | 'champagne' | 'velvet_rose'>(
    settings.accentTheme || 'rose_gold'
  );
  const [fontSize, setFontSize] = useState<'compact' | 'normal' | 'large'>(
    settings.fontSize || 'normal'
  );
  const [animationEffects, setAnimationEffects] = useState<boolean>(
    settings.animationEffects !== undefined ? settings.animationEffects : true
  );
  const [autoSaveHistory, setAutoSaveHistory] = useState<boolean>(
    settings.autoSaveHistory !== undefined ? settings.autoSaveHistory : true
  );

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Apply changes immediately or via button
  const handleApplySetting = async (partial: Partial<AppSettings>) => {
    setIsSaving(true);
    try {
      await onUpdateSettings(partial);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    setThemeMode(newTheme);
    handleApplySetting({ themeMode: newTheme });
  };

  const handleLanguageChange = (newLang: 'id' | 'en') => {
    setLanguage(newLang);
    handleApplySetting({ language: newLang });
  };

  const handleAccentChange = (accent: 'rose_gold' | 'champagne' | 'velvet_rose') => {
    setAccentTheme(accent);
    handleApplySetting({ accentTheme: accent });
  };

  const handleFontSizeChange = (size: 'compact' | 'normal' | 'large') => {
    setFontSize(size);
    handleApplySetting({ fontSize: size });
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      await onResetSettings();
      setThemeMode('dark');
      setLanguage('id');
      setAccentTheme('rose_gold');
      setFontSize('normal');
      setAnimationEffects(true);
      setAutoSaveHistory(true);
      setShowResetModal(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E5AA9C]/15">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToStudio}
            className="p-2 rounded-xl bg-[#14131A] text-[#FAF7F2] hover:text-[#E5AA9C] border border-[#E5AA9C]/20 transition-all hover:scale-105 active:scale-95"
            title="Kembali ke Dashboard"
            aria-label="Kembali ke Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-semibold tracking-wider uppercase">
              <Settings className="w-3.5 h-3.5" />
              <span>Pengaturan Sistem</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#FAF7F2]">
              Settings & Preferences
            </h1>
          </div>
        </div>

        {/* Quick Tabs to Profile & About */}
        <div className="flex items-center gap-2">
          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#14131A] text-[#DCD4CA]/80 hover:text-[#FAF7F2] border border-[#E5AA9C]/20 transition-colors"
            >
              👤 Profil
            </button>
          )}
          {onOpenAbout && (
            <button
              onClick={onOpenAbout}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#14131A] text-[#DCD4CA]/80 hover:text-[#FAF7F2] border border-[#E5AA9C]/20 transition-colors"
            >
              ✨ Tentang SAS AI
            </button>
          )}
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ========================================================
            CARD 1: TEMA TAMPILAN (LIGHT & DARK MODE)
           ======================================================== */}
        <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#E5AA9C]/10">
            <div className="p-1.5 rounded-lg bg-[#E5AA9C]/15 text-[#E5AA9C]">
              {themeMode === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold text-[#FAF7F2]">
                1. Mode Tampilan (Theme Mode)
              </h2>
              <p className="text-[11px] text-[#DCD4CA]/60">
                Pilih antara Dark Obsidian elegan atau Light Ivory Rose Gold
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => handleThemeChange('dark')}
              className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col gap-2 ${
                themeMode === 'dark'
                  ? 'bg-gradient-to-br from-[#231A27] to-[#121118] border-[#E5AA9C] shadow-md shadow-[#E5AA9C]/15 ring-1 ring-[#E5AA9C]'
                  : 'bg-[#0C0C10] border-white/10 hover:border-[#E5AA9C]/30 text-[#DCD4CA]/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <Moon className={`w-4 h-4 ${themeMode === 'dark' ? 'text-[#E5AA9C]' : 'text-[#DCD4CA]/50'}`} />
                {themeMode === 'dark' && (
                  <span className="w-2 h-2 rounded-full bg-[#E5AA9C]" />
                )}
              </div>
              <div>
                <span className="text-xs font-semibold text-[#FAF7F2] block">
                  Dark Obsidian
                </span>
                <span className="text-[10px] text-[#DCD4CA]/60">
                  Luxury Rose Gold (Default)
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleThemeChange('light')}
              className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col gap-2 ${
                themeMode === 'light'
                  ? 'bg-gradient-to-br from-[#FAF7F2] to-[#F5ECE9] border-[#9A5A65] text-[#1C1A24] shadow-md shadow-[#E5AA9C]/20 ring-1 ring-[#9A5A65]'
                  : 'bg-[#0C0C10] border-white/10 hover:border-[#E5AA9C]/30 text-[#DCD4CA]/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <Sun className={`w-4 h-4 ${themeMode === 'light' ? 'text-[#9A5A65]' : 'text-[#DCD4CA]/50'}`} />
                {themeMode === 'light' && (
                  <span className="w-2 h-2 rounded-full bg-[#9A5A65]" />
                )}
              </div>
              <div>
                <span className={`text-xs font-semibold block ${themeMode === 'light' ? 'text-[#1C1A24]' : 'text-[#FAF7F2]'}`}>
                  Light Ivory
                </span>
                <span className={`text-[10px] ${themeMode === 'light' ? 'text-[#5A4F4F]' : 'text-[#DCD4CA]/60'}`}>
                  Soft Silk & Warm Rose
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* ========================================================
            CARD 2: PENGATURAN BAHASA (INDONESIAN AS DEFAULT)
           ======================================================== */}
        <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#E5AA9C]/10">
            <div className="p-1.5 rounded-lg bg-[#E5AA9C]/15 text-[#E5AA9C]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold text-[#FAF7F2]">
                2. Bahasa Antarmuka (Language)
              </h2>
              <p className="text-[11px] text-[#DCD4CA]/60">
                Bahasa Indonesia sebagai standar bawaan Soul Art System
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => handleLanguageChange('id')}
              className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col gap-2 ${
                language === 'id'
                  ? 'bg-gradient-to-br from-[#231A27] to-[#121118] border-[#E5AA9C] shadow-md shadow-[#E5AA9C]/15 ring-1 ring-[#E5AA9C]'
                  : 'bg-[#0C0C10] border-white/10 hover:border-[#E5AA9C]/30 text-[#DCD4CA]/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">🇮🇩</span>
                {language === 'id' && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#E5AA9C]/20 text-[#E5AA9C] border border-[#E5AA9C]/40">
                    DEFAULT
                  </span>
                )}
              </div>
              <div>
                <span className="text-xs font-semibold text-[#FAF7F2] block">
                  Bahasa Indonesia
                </span>
                <span className="text-[10px] text-[#DCD4CA]/60">
                  Standar Nasional Terkurasi
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col gap-2 ${
                language === 'en'
                  ? 'bg-gradient-to-br from-[#231A27] to-[#121118] border-[#E5AA9C] shadow-md shadow-[#E5AA9C]/15 ring-1 ring-[#E5AA9C]'
                  : 'bg-[#0C0C10] border-white/10 hover:border-[#E5AA9C]/30 text-[#DCD4CA]/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">🇬🇧</span>
                {language === 'en' && (
                  <span className="w-2 h-2 rounded-full bg-[#E5AA9C]" />
                )}
              </div>
              <div>
                <span className="text-xs font-semibold text-[#FAF7F2] block">
                  English (International)
                </span>
                <span className="text-[10px] text-[#DCD4CA]/60">
                  Global Creative Mode
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* ========================================================
            CARD 3: PENGATURAN TAMPILAN & AKSEN (APPEARANCE)
           ======================================================== */}
        <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#E5AA9C]/10">
            <div className="p-1.5 rounded-lg bg-[#E5AA9C]/15 text-[#E5AA9C]">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold text-[#FAF7F2]">
                3. Aksen & Estetika Visual (Appearance)
              </h2>
              <p className="text-[11px] text-[#DCD4CA]/60">
                Pilih palet aksen kemilau dan densitas tipografi
              </p>
            </div>
          </div>

          {/* Accent Color Palette */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-medium text-[#FAF7F2]">Palet Warna Aksen:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleAccentChange('rose_gold')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  accentTheme === 'rose_gold'
                    ? 'border-[#E5AA9C] bg-[#E5AA9C]/15 text-[#FAF7F2]'
                    : 'border-white/10 bg-[#0C0C10] text-[#DCD4CA]/60 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-3 h-3 rounded-full bg-[#E5AA9C]" />
                  <span className="w-3 h-3 rounded-full bg-[#C98B94]" />
                </div>
                <span className="text-[11px] font-semibold block">Rose Gold</span>
                <span className="text-[9px] text-[#DCD4CA]/50">Signature SAS</span>
              </button>

              <button
                type="button"
                onClick={() => handleAccentChange('champagne')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  accentTheme === 'champagne'
                    ? 'border-[#F4D06F] bg-[#F4D06F]/15 text-[#FAF7F2]'
                    : 'border-white/10 bg-[#0C0C10] text-[#DCD4CA]/60 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-3 h-3 rounded-full bg-[#F4D06F]" />
                  <span className="w-3 h-3 rounded-full bg-[#FAF7F2]" />
                </div>
                <span className="text-[11px] font-semibold block">Champagne</span>
                <span className="text-[9px] text-[#DCD4CA]/50">Warm Amber</span>
              </button>

              <button
                type="button"
                onClick={() => handleAccentChange('velvet_rose')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  accentTheme === 'velvet_rose'
                    ? 'border-[#F2A6B3] bg-[#F2A6B3]/15 text-[#FAF7F2]'
                    : 'border-white/10 bg-[#0C0C10] text-[#DCD4CA]/60 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-3 h-3 rounded-full bg-[#F2A6B3]" />
                  <span className="w-3 h-3 rounded-full bg-[#9A5A65]" />
                </div>
                <span className="text-[11px] font-semibold block">Velvet Rose</span>
                <span className="text-[9px] text-[#DCD4CA]/50">Deep Romantic</span>
              </button>
            </div>
          </div>

          {/* Font Density Selector */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#FAF7F2]">Ukuran & Densitas Teks:</span>
              <span className="text-[10px] font-mono text-[#E5AA9C] capitalize">{fontSize}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['compact', 'normal', 'large'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => handleFontSizeChange(sz)}
                  className={`py-2 px-3 rounded-xl border text-xs text-center transition-all capitalize font-medium ${
                    fontSize === sz
                      ? 'border-[#E5AA9C] bg-[#E5AA9C]/20 text-[#FAF7F2]'
                      : 'border-white/10 bg-[#0C0C10] text-[#DCD4CA]/60 hover:border-white/20'
                  }`}
                >
                  {sz === 'compact' ? 'Rapat' : sz === 'normal' ? 'Standar' : 'Nyaman'}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="pt-2 space-y-2.5">
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#0C0C10] border border-white/5 cursor-pointer">
              <span className="text-xs text-[#FAF7F2]">Efek Animasi Halus (Smooth Motion)</span>
              <input
                type="checkbox"
                checked={animationEffects}
                onChange={(e) => {
                  setAnimationEffects(e.target.checked);
                  handleApplySetting({ animationEffects: e.target.checked });
                }}
                className="w-4 h-4 rounded text-[#E5AA9C] focus:ring-[#E5AA9C] bg-[#14131A] border-[#E5AA9C]/40"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#0C0C10] border border-white/5 cursor-pointer">
              <span className="text-xs text-[#FAF7F2]">Otomatis Arsip ke Riwayat AI</span>
              <input
                type="checkbox"
                checked={autoSaveHistory}
                onChange={(e) => {
                  setAutoSaveHistory(e.target.checked);
                  handleApplySetting({ autoSaveHistory: e.target.checked });
                }}
                className="w-4 h-4 rounded text-[#E5AA9C] focus:ring-[#E5AA9C] bg-[#14131A] border-[#E5AA9C]/40"
              />
            </label>
          </div>
        </div>

        {/* ========================================================
            CARD 4: INFORMASI VERSI APLIKASI & RESET PREFERENSI
           ======================================================== */}
        <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#E5AA9C]/10">
              <div className="p-1.5 rounded-lg bg-[#E5AA9C]/15 text-[#E5AA9C]">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-serif font-bold text-[#FAF7F2]">
                  4. Informasi Versi Aplikasi
                </h2>
                <p className="text-[11px] text-[#DCD4CA]/60">
                  Data sistem engine & lisensi aktif
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0C0C10] border border-[#E5AA9C]/15 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#DCD4CA]/60">Aplikasi</span>
                <SasLogo variant="horizontal" size="sm" showSlogan={false} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#DCD4CA]/60">Versi Engine</span>
                <span className="text-[#E5AA9C] font-semibold">{settings.version || 'v2.4.0 Engine (Build 2026.11)'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#DCD4CA]/60">Model AI</span>
                <span className="text-emerald-400 font-semibold">gemini-3.8-flash</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#DCD4CA]/60">Keamanan API</span>
                <span className="text-[#DCD4CA]/80">Server-Side Proxy (Zero Exposure)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#DCD4CA]/60">Penyimpanan</span>
                <span className="text-[#DCD4CA]/80">Persistent JSON + Local Cache</span>
              </div>
            </div>
          </div>

          {/* Reset Preferences Option (Requirement 5: Add a reset preferences option with confirmation) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-800/40 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span>Reset Semua Preferensi ke Standar</span>
            </button>
          </div>
        </div>

      </div>

      {/* Save Success Banner */}
      {saveSuccess && (
        <div className="p-3 bg-[#1C1A24] border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Pengaturan berhasil diperbarui dan disimpan secara persisten.</span>
        </div>
      )}

      {/* ========================================================
          RESET PREFERENCES CONFIRMATION MODAL
         ======================================================== */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#14131A] border border-[#E5AA9C]/40 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-800/40">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">
                Konfirmasi Reset Preferensi
              </h3>
            </div>

            <p className="text-xs text-[#DCD4CA]/80 leading-relaxed font-sans">
              Apakah Anda yakin ingin mengembalikan seluruh pengaturan ke setelan standar pabrik? 
              Mode tema akan kembali ke <strong>Dark Obsidian</strong>, bahasa ke <strong>Bahasa Indonesia</strong>, dan aksen ke <strong>Rose Gold</strong>.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#FAF7F2] bg-[#1E1C27] hover:bg-[#282534] border border-white/10 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isResetting}
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#0C0C10] bg-gradient-to-r from-[#E5AA9C] to-[#FAF7F2] hover:brightness-105 transition-all flex items-center gap-1.5"
              >
                {isResetting ? (
                  <span>Mereset...</span>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ya, Reset Preferensi</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
