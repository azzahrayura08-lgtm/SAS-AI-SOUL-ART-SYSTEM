import React from 'react';
import { Bookmark, Sparkles, Menu, Compass, History, User, Settings, Info } from 'lucide-react';
import { ModuleType, UserProfile } from '../types';
import { MODULES } from '../data/presets';
import { SasLogo } from './SasLogo';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentModule: ModuleType;
  onSelectModule: (module: ModuleType) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenMobileMenu: () => void;
  onOpenQuickDemo: () => void;
  userProfile?: UserProfile;
  onOpenProfile?: () => void;
  onOpenSettings?: () => void;
  onOpenAbout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentModule,
  onSelectModule,
  savedCount,
  onOpenSaved,
  onOpenMobileMenu,
  onOpenQuickDemo,
  userProfile,
  onOpenProfile,
  onOpenSettings,
  onOpenAbout,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0C0C10]/90 backdrop-blur-md border-b border-[#E5AA9C]/15 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        
        {/* Zone 1: Distinctive Professional SAS Logo (Horizontal Variant) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onSelectModule('prompt')}
            className="flex items-center text-left group focus-visible:outline-none"
            aria-label="SAS SOUL ART SYSTEM Home"
          >
            <SasLogo variant="horizontal" size="md" showSlogan={true} />
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 overflow-x-auto">
          {MODULES.map((mod) => {
            const isActive = currentModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1F1D27] text-[#FAF7F2] border border-[#E5AA9C]/35 shadow-sm shadow-[#E5AA9C]/10'
                    : 'text-[#DCD4CA]/75 hover:text-[#FAF7F2] hover:bg-[#16151E]'
                }`}
              >
                {mod.shortTitle}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onOpenQuickDemo}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#FAF7F2] bg-[#1A1822] hover:bg-[#252230] border border-[#E5AA9C]/20 rounded-lg transition-all whitespace-nowrap"
            title="Load ready-made demo prompt"
          >
            <Compass className="w-3.5 h-3.5 text-[#E5AA9C]" />
            <span>Preset Showcase</span>
          </button>

          {/* PWA / Android Install Button */}
          <PWAInstallButton />

          {/* Riwayat Generasi AI Button */}
          <button
            onClick={onOpenSaved}
            className="relative min-h-[38px] px-2.5 sm:px-3.5 py-1.5 flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-[#FAF7F2] bg-gradient-to-r from-[#9A5A65] to-[#B76E79] hover:from-[#B76E79] hover:to-[#E5AA9C] rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap"
            aria-label="View history and saved vault"
          >
            <History className="w-3.5 h-3.5 text-[#FAF7F2]" />
            <span className="hidden sm:inline">Riwayat AI</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#0C0C10] text-[#E5AA9C] rounded-full text-[10px] font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* User Profile Pill */}
          <button
            onClick={onOpenProfile || (() => onSelectModule('profile'))}
            className={`min-h-[38px] px-2 sm:px-3 py-1 rounded-lg border transition-all flex items-center gap-2 group ${
              currentModule === 'profile'
                ? 'bg-[#E5AA9C]/20 border-[#E5AA9C] text-[#FAF7F2]'
                : 'bg-[#14131A] border-[#E5AA9C]/20 text-[#DCD4CA]/80 hover:text-[#FAF7F2] hover:border-[#E5AA9C]/40'
            }`}
            title="Profil Pengguna & Identitas"
            aria-label="User Profile"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-[#E5AA9C]/50 bg-[#2A2433] flex items-center justify-center shrink-0">
              {userProfile?.avatarUrl ? (
                <img src={userProfile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-3.5 h-3.5 text-[#E5AA9C]" />
              )}
            </div>
            <span className="text-xs font-medium max-w-[80px] sm:max-w-[110px] truncate hidden md:inline">
              {userProfile?.displayName || 'Profil'}
            </span>
          </button>

          {/* Settings Icon Button */}
          <button
            onClick={onOpenSettings || (() => onSelectModule('settings'))}
            className={`min-h-[38px] min-w-[38px] p-2 rounded-lg border transition-all flex items-center justify-center ${
              currentModule === 'settings'
                ? 'bg-[#E5AA9C]/20 border-[#E5AA9C] text-[#E5AA9C]'
                : 'bg-[#14131A] border-[#E5AA9C]/20 text-[#DCD4CA]/75 hover:text-[#FAF7F2] hover:border-[#E5AA9C]/40'
            }`}
            title="Pengaturan Sistem"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* About SAS AI Button */}
          <button
            onClick={onOpenAbout || (() => onSelectModule('about'))}
            className={`hidden sm:flex min-h-[38px] min-w-[38px] p-2 rounded-lg border transition-all items-center justify-center ${
              currentModule === 'about'
                ? 'bg-[#E5AA9C]/20 border-[#E5AA9C] text-[#E5AA9C]'
                : 'bg-[#14131A] border-[#E5AA9C]/20 text-[#DCD4CA]/75 hover:text-[#FAF7F2] hover:border-[#E5AA9C]/40'
            }`}
            title="Tentang SAS AI (About)"
            aria-label="About SAS AI"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Mobile Menu Drawer Button */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden min-h-[38px] min-w-[38px] flex items-center justify-center text-[#FAF7F2] hover:text-[#E5AA9C] bg-[#14131A] border border-[#E5AA9C]/20 rounded-lg p-2"
            aria-label="Open Modules Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
};
