import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Check, Sparkles, X, Info } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setDeferredPrompt(null);
        }
      } catch (err) {
        console.error('Install prompt error:', err);
        setShowGuideModal(true);
      }
    } else {
      setShowGuideModal(true);
    }
  };

  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono">
        <Check className="w-3.5 h-3.5" />
        <span>Terpasang di Android</span>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="group relative inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#9A5A65] via-[#B76E79] to-[#E5AA9C] hover:opacity-95 text-[#FAF7F2] font-semibold text-xs transition-all shadow-md active:scale-95 border border-[#E5AA9C]/30"
        title="Pasang aplikasi SAS AI langsung di HP Android Anda"
      >
        <Smartphone className="w-4 h-4 text-[#FAF7F2] animate-bounce" />
        <span className="hidden xs:inline">Pasang di HP (Android)</span>
        <span className="xs:hidden">Pasang App</span>
        <Download className="w-3.5 h-3.5 opacity-80" />
      </button>

      {/* Panduan Instalasi Modal jika browser memblokir prompt otomatis */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#14131A] border border-[#E5AA9C]/40 rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#1E1C27] text-[#DCD4CA] hover:text-[#FAF7F2] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2]">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#FAF7F2]">
                  Pasang SAS AI di Layar Utama HP
                </h3>
                <p className="text-xs text-[#E5AA9C]">Akses Instan Cepat & Ringan Tanpa Kuota Besar</p>
              </div>
            </div>

            <div className="bg-[#0C0C10] border border-[#E5AA9C]/20 rounded-xl p-4 space-y-3 text-xs text-[#DCD4CA]">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#E5AA9C]/20 text-[#E5AA9C] font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <span>
                  Buka menu titik tiga (<strong>⋮</strong>) di pojok kanan atas browser Google Chrome di HP Anda.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#E5AA9C]/20 text-[#E5AA9C] font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <span>
                  Pilih menu <strong>"Tambahkan ke Layar Utama"</strong> atau <strong>"Install App"</strong>.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#E5AA9C]/20 text-[#E5AA9C] font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <span>
                  Ikon aplikasi SAS AI berwarna Luxury Rose Gold akan langsung muncul di beranda HP Anda layaknya aplikasi native Android APK!
                </span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="w-full py-2.5 bg-gradient-to-r from-[#9A5A65] to-[#B76E79] text-[#FAF7F2] font-semibold text-xs rounded-xl shadow-md transition-opacity hover:opacity-95"
              >
                Mengerti, Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
