import React from 'react';
import { X, Bookmark, Trash2, ArrowUpRight, Copy, Check } from 'lucide-react';
import { GenerationResult, ModuleType } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: GenerationResult[];
  onSelectItem: (item: GenerationResult) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onSelectItem,
  onDeleteItem,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-full bg-[#121118] border-l border-[#E5AA9C]/25 flex flex-col shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#FAF7F2]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#E5AA9C]" />
            <h2 className="font-serif text-lg font-bold text-[#FAF7F2]">
              Soul Art Saved Vault
            </h2>
            <span className="text-xs font-mono text-[#DCD4CA]/60">({items.length})</span>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-300 hover:text-rose-100 px-2 py-1 hover:bg-rose-950/40 rounded transition-colors"
                title="Clear history"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#DCD4CA]/60 hover:text-[#FAF7F2] rounded-lg transition-colors"
              aria-label="Close saved vault"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#DCD4CA]/60">
              <Bookmark className="w-10 h-10 text-[#E5AA9C]/30 stroke-[1.5] mb-3" />
              <p className="font-serif text-base text-[#FAF7F2]">Vault Masih Kosong</p>
              <p className="text-xs text-[#DCD4CA]/70 mt-1 max-w-xs">
                Simpan hasil rancangan prompt, storyboard prewedding, atau copywriting Anda untuk dibuka kembali kapan saja.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-[#171620] border border-[#E5AA9C]/15 hover:border-[#E5AA9C]/40 transition-all group relative"
              >
                <div className="flex items-center justify-between text-[11px] text-[#DCD4CA]/70 mb-1">
                  <span className="text-[#E5AA9C] uppercase font-mono tracking-wider font-semibold">
                    {item.moduleId.replace('_', ' ')}
                  </span>
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>

                <h3 className="font-serif text-sm font-semibold text-[#FAF7F2] line-clamp-1 group-hover:text-[#E5AA9C] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#DCD4CA]/70 line-clamp-2 mt-1">
                  {item.subtitle}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#FAF7F2]/10">
                  <button
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    className="text-xs font-medium text-[#FAF7F2] hover:text-[#E5AA9C] flex items-center gap-1 transition-colors"
                  >
                    <span>Buka Rincian</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1 text-[#DCD4CA]/50 hover:text-rose-400 transition-colors"
                    title="Hapus dari vault"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#FAF7F2]/10 bg-[#0C0C10] text-center text-xs text-[#DCD4CA]/60 font-sans">
          Tersimpan otomatis di penyimpanan lokal peramban Anda.
        </div>
      </div>
    </div>
  );
};
