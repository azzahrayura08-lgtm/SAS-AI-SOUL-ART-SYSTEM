import React from 'react';
import { 
  Sparkles, 
  HeartHandshake, 
  Store, 
  Share2, 
  TrendingUp, 
  Layers, 
  Video,
  Grid, 
  X,
  ChevronRight,
  Sparkle,
  History
} from 'lucide-react';
import { ModuleType } from '../types';
import { MODULES } from '../data/presets';
import { SasLogo } from './SasLogo';

interface NavigationProps {
  currentModule: ModuleType;
  onSelectModule: (module: ModuleType) => void;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentModule,
  onSelectModule,
  mobileMenuOpen,
  onCloseMobileMenu,
}) => {
  const getIcon = (name: string, className: string = 'w-5 h-5') => {
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
        return <Sparkle className={className} />;
    }
  };

  // Primary 4 tabs for mobile bottom bar + "More"
  const primaryTabs = MODULES.slice(0, 4);

  return (
    <>
      {/* ========================================================
          MOBILE BOTTOM TAB BAR (Thumb Zone Ergonomics)
          All SAS Modules Direct Access, >=44px hitboxes
         ======================================================== */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0C0C10]/95 backdrop-blur-lg border-t border-[#E5AA9C]/20 pb-safe shadow-2xl overflow-x-auto scrollbar-none"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-around h-16 min-w-full max-w-xl mx-auto px-1">
          {MODULES.map((mod, idx) => {
            const isActive = currentModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className="min-h-[48px] min-w-[44px] flex-1 flex flex-col items-center justify-center relative group py-1"
                aria-label={mod.title}
              >
                <div 
                  className={`p-1.5 rounded-xl transition-all ${
                    isActive 
                      ? 'text-[#FAF7F2] bg-gradient-to-br from-[#9A5A65] to-[#E5AA9C] shadow-sm shadow-[#E5AA9C]/30 scale-105' 
                      : 'text-[#DCD4CA]/60 hover:text-[#FAF7F2]'
                  }`}
                >
                  {getIcon(mod.iconName, 'w-4 h-4')}
                </div>
                <span 
                  className={`text-[9px] tracking-tight mt-0.5 truncate max-w-[54px] ${
                    isActive ? 'font-semibold text-[#FAF7F2]' : 'text-[#DCD4CA]/60'
                  }`}
                >
                  {mod.shortTitle}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#E5AA9C] absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ========================================================
          MOBILE FULL MODULES DRAWER
         ======================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full sm:max-w-md bg-[#121118] border-t sm:border border-[#E5AA9C]/30 rounded-t-3xl sm:rounded-2xl p-5 max-h-[85vh] overflow-y-auto pb-safe shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]/10 mb-4">
              <div className="flex items-center gap-2">
                <SasLogo variant="horizontal" size="sm" showSlogan={true} />
              </div>
              <button 
                onClick={onCloseMobileMenu}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#DCD4CA]/70 hover:text-[#FAF7F2] rounded-lg"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {MODULES.map((mod, idx) => {
                const isActive = currentModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      onSelectModule(mod.id);
                      onCloseMobileMenu();
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between min-h-[56px] ${
                      isActive
                        ? 'bg-[#1D1B26] border-[#E5AA9C]/50 shadow-md'
                        : 'bg-[#15141D] border-[#E5AA9C]/10 hover:border-[#E5AA9C]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${
                        isActive 
                          ? 'bg-gradient-to-tr from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2]' 
                          : 'bg-[#22202C] text-[#E5AA9C]'
                      }`}>
                        {getIcon(mod.iconName, 'w-5 h-5')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-sm font-semibold text-[#FAF7F2]">{mod.title}</span>
                          <span className="text-[10px] text-[#DCD4CA]/60 font-mono">0{idx + 1}</span>
                        </div>
                        <p className="text-xs text-[#DCD4CA]/70 line-clamp-1">{mod.tagline}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#E5AA9C]' : 'text-[#FAF7F2]/30'}`} />
                  </button>
                );
              })}

              {/* History Button in Drawer */}
              <button
                onClick={() => {
                  onSelectModule('history');
                  onCloseMobileMenu();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between min-h-[56px] ${
                  currentModule === 'history'
                    ? 'bg-[#1D1B26] border-[#E5AA9C]/50 shadow-md'
                    : 'bg-[#181622] border-[#E5AA9C]/20 hover:border-[#E5AA9C]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${
                    currentModule === 'history'
                      ? 'bg-gradient-to-tr from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2]' 
                      : 'bg-[#22202C] text-[#E5AA9C]'
                  }`}>
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm font-semibold text-[#FAF7F2]">Riwayat Generasi AI</span>
                      <span className="text-[10px] text-[#E5AA9C] font-mono">07 · Arsip</span>
                    </div>
                    <p className="text-xs text-[#DCD4CA]/70 line-clamp-1">Lihat dan salin kembali seluruh hasil dari 6 modul AI</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${currentModule === 'history' ? 'text-[#E5AA9C]' : 'text-[#FAF7F2]/30'}`} />
              </button>

              {/* System Center Divider */}
              <div className="pt-2 pb-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#E5AA9C]/80 px-1">
                  Sistem & Identitas
                </span>
              </div>

              {/* Profile Button in Drawer */}
              <button
                onClick={() => {
                  onSelectModule('profile');
                  onCloseMobileMenu();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between min-h-[56px] ${
                  currentModule === 'profile'
                    ? 'bg-[#1D1B26] border-[#E5AA9C]/50 shadow-md'
                    : 'bg-[#15141D] border-[#E5AA9C]/10 hover:border-[#E5AA9C]/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${
                    currentModule === 'profile'
                      ? 'bg-gradient-to-tr from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2]' 
                      : 'bg-[#22202C] text-[#E5AA9C]'
                  }`}>
                    <span className="text-base">👤</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm font-semibold text-[#FAF7F2]">Profil Pengguna</span>
                      <span className="text-[10px] text-[#DCD4CA]/60 font-mono">Identity</span>
                    </div>
                    <p className="text-xs text-[#DCD4CA]/70 line-clamp-1">Kelola nama tampilan, foto profil & bio kreator</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${currentModule === 'profile' ? 'text-[#E5AA9C]' : 'text-[#FAF7F2]/30'}`} />
              </button>

              {/* Settings Button in Drawer */}
              <button
                onClick={() => {
                  onSelectModule('settings');
                  onCloseMobileMenu();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between min-h-[56px] ${
                  currentModule === 'settings'
                    ? 'bg-[#1D1B26] border-[#E5AA9C]/50 shadow-md'
                    : 'bg-[#15141D] border-[#E5AA9C]/10 hover:border-[#E5AA9C]/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${
                    currentModule === 'settings'
                      ? 'bg-gradient-to-tr from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2]' 
                      : 'bg-[#22202C] text-[#E5AA9C]'
                  }`}>
                    <span className="text-base">⚙️</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm font-semibold text-[#FAF7F2]">Pengaturan Sistem</span>
                      <span className="text-[10px] text-[#DCD4CA]/60 font-mono">Settings</span>
                    </div>
                    <p className="text-xs text-[#DCD4CA]/70 line-clamp-1">Tema gelap/terang, bahasa, aksen visual & reset</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${currentModule === 'settings' ? 'text-[#E5AA9C]' : 'text-[#FAF7F2]/30'}`} />
              </button>

              {/* About SAS AI Button in Drawer */}
              <button
                onClick={() => {
                  onSelectModule('about');
                  onCloseMobileMenu();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between min-h-[56px] ${
                  currentModule === 'about'
                    ? 'bg-[#1D1B26] border-[#E5AA9C]/50 shadow-md'
                    : 'bg-[#15141D] border-[#E5AA9C]/10 hover:border-[#E5AA9C]/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${
                    currentModule === 'about'
                      ? 'bg-gradient-to-tr from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2]' 
                      : 'bg-[#22202C] text-[#E5AA9C]'
                  }`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm font-semibold text-[#FAF7F2]">Tentang SAS AI</span>
                      <span className="text-[10px] text-[#DCD4CA]/60 font-mono">About</span>
                    </div>
                    <p className="text-xs text-[#DCD4CA]/70 line-clamp-1">Slogan, identitas 4 warna mewah & info kreator</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${currentModule === 'about' ? 'text-[#E5AA9C]' : 'text-[#FAF7F2]/30'}`} />
              </button>
            </div>

            <div className="mt-5 pt-3 border-t border-[#FAF7F2]/10 text-center">
              <span className="text-xs text-[#DCD4CA]/50 font-sans">
                Soul Art System · Dusty Pink & Rose Gold Edition
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
