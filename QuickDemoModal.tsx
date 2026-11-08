import React from 'react';
import { X, Sparkles, HeartHandshake, Store, Share2, TrendingUp, Layers, Play } from 'lucide-react';
import { ModuleType } from '../types';
import { MODULES } from '../data/presets';

interface QuickDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDemo: (moduleId: ModuleType) => void;
}

export const QuickDemoModal: React.FC<QuickDemoModalProps> = ({
  isOpen,
  onClose,
  onSelectDemo
}) => {
  if (!isOpen) return null;

  const demoItems = [
    {
      moduleId: 'prompt' as ModuleType,
      title: 'AI Prompt: Haute Couture Editorial',
      desc: 'Formula Midjourney v6.1 & FLUX.1 Pro dengan lighting Rose Gold Hour dan lensa Leica 85mm f/1.4.',
      tag: 'Midjourney v6.1'
    },
    {
      moduleId: 'prewedding' as ModuleType,
      title: 'AI Prewedding: Bromo Misty Sunrise',
      desc: 'Moodboard romantis, gaun dusty pink organza, harmonisasi jas linen ivory & 6-shot storyboard.',
      tag: 'Editorial Story'
    },
    {
      moduleId: 'umkm' as ModuleType,
      title: 'AI UMKM: Aura Botanica Skincare Pack',
      desc: 'Paket 3-in-1: Foto studio travertine, copywriting feed Instagram AIDA & skrip closing WhatsApp.',
      tag: 'Brand & Sales'
    },
    {
      moduleId: 'facebook_pro' as ModuleType,
      title: 'AI FB Pro: Viral Storytelling & Reels',
      desc: 'Hook pemicu ratusan komentar organik, naskah Reels 30 detik & optimasi monetisasi Meta 2026.',
      tag: 'Reach & Stars'
    },
    {
      moduleId: 'marketing' as ModuleType,
      title: 'AI Marketing: 30-Day Campaign Blueprint',
      desc: 'Kerangka konversi AIDA/PAS, matriks 4 pilar mingguan & sales headline penakluk keberatan.',
      tag: 'Omnichannel'
    },
    {
      moduleId: 'digital_product' as ModuleType,
      title: 'AI Digital Product: Soul Art Prompt Vault',
      desc: 'Tangga harga (Value Ladder Rp 0 - Rp 449k), outline kurikulum 5 modul & copywriting hero page.',
      tag: 'Passive Asset'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-[#121118] border border-[#E5AA9C]/30 rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]/10 mb-5">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
              Soul Art System · Preset Showcase
            </h2>
            <p className="text-xs text-[#DCD4CA]/75 mt-0.5">
              Pilih salah satu modul untuk langsung menjalankan simulasi dan melihat demo generation result lengkap.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#DCD4CA]/60 hover:text-[#FAF7F2] rounded-lg transition-colors"
            aria-label="Close demo modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {demoItems.map((item, idx) => (
            <div
              key={item.moduleId}
              className="p-4 rounded-xl bg-[#171620] border border-[#E5AA9C]/15 hover:border-[#E5AA9C]/45 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#DCD4CA]/60 mb-1">
                  <span className="font-mono text-[#E5AA9C] font-semibold">0{idx + 1}</span>
                  <span className="bg-[#0C0C10] px-2 py-0.5 rounded text-[10px] text-[#E5AA9C] border border-[#E5AA9C]/20">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-serif text-base font-semibold text-[#FAF7F2] group-hover:text-[#E5AA9C] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#DCD4CA]/75 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#FAF7F2]/10 flex justify-end">
                <button
                  onClick={() => {
                    onSelectDemo(item.moduleId);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-[#9A5A65] to-[#B76E79] hover:from-[#B76E79] hover:to-[#E5AA9C] text-[#FAF7F2] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Uji Coba Demo</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
