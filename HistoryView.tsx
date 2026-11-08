import React, { useState, useMemo } from 'react';
import { 
  History, 
  Search, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  HeartHandshake, 
  Store, 
  Share2, 
  TrendingUp, 
  Layers, 
  ArrowLeft,
  Calendar,
  Eye,
  X,
  Clock,
  Filter,
  CheckCircle2,
  Database
} from 'lucide-react';
import { GenerationResult, ModuleType } from '../types';

interface HistoryViewProps {
  items: GenerationResult[];
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  onBackToStudio: (moduleId?: ModuleType) => void;
}

const MODULE_FILTERS: { id: string; label: string; icon: typeof Sparkles }[] = [
  { id: 'all', label: 'Semua Modul', icon: History },
  { id: 'prompt', label: 'AI Prompt', icon: Sparkles },
  { id: 'prewedding', label: 'AI Prewedding', icon: HeartHandshake },
  { id: 'umkm', label: 'AI UMKM', icon: Store },
  { id: 'facebook_pro', label: 'AI FB Pro', icon: Share2 },
  { id: 'marketing', label: 'AI Marketing', icon: TrendingUp },
  { id: 'digital_product', label: 'AI Digital Product', icon: Layers },
];

export const HistoryView: React.FC<HistoryViewProps> = ({
  items,
  onDeleteItem,
  onClearAll,
  onBackToStudio,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewingItem, setViewingItem] = useState<GenerationResult | null>(null);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Filter by module
      if (selectedModule !== 'all' && item.moduleId !== selectedModule) {
        return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = item.title?.toLowerCase().includes(query);
        const subtitleMatch = item.subtitle?.toLowerCase().includes(query);
        const contentMatch = item.content?.toLowerCase().includes(query);
        const categoryMatch = item.metadata?.category?.toLowerCase().includes(query);
        const tagMatch = item.metadata?.tags?.some((t) => t.toLowerCase().includes(query));
        return titleMatch || subtitleMatch || contentMatch || categoryMatch || tagMatch;
      }

      return true;
    });
  }, [items, selectedModule, searchQuery]);

  // Handle Copy
  const handleCopy = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  // Format Date Indonesian
  const formatDate = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB';
    } catch {
      return new Date(timestamp).toLocaleDateString();
    }
  };

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'prompt':
        return <Sparkles className="w-4 h-4 text-[#E5AA9C]" />;
      case 'prewedding':
        return <HeartHandshake className="w-4 h-4 text-[#C98B94]" />;
      case 'umkm':
        return <Store className="w-4 h-4 text-[#E5AA9C]" />;
      case 'facebook_pro':
        return <Share2 className="w-4 h-4 text-[#C98B94]" />;
      case 'marketing':
        return <TrendingUp className="w-4 h-4 text-[#E5AA9C]" />;
      case 'digital_product':
        return <Layers className="w-4 h-4 text-[#C98B94]" />;
      default:
        return <History className="w-4 h-4 text-[#E5AA9C]" />;
    }
  };

  const getModuleName = (moduleId: string) => {
    switch (moduleId) {
      case 'prompt':
        return 'AI Prompt';
      case 'prewedding':
        return 'AI Prewedding';
      case 'umkm':
        return 'AI UMKM';
      case 'facebook_pro':
        return 'AI Facebook Pro';
      case 'marketing':
        return 'AI Marketing';
      case 'digital_product':
        return 'AI Digital Product';
      default:
        return moduleId;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner Header */}
      <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#E5AA9C]/10 via-[#C98B94]/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-semibold tracking-wider uppercase mb-1">
              <Database className="w-3.5 h-3.5 text-[#E5AA9C]" />
              <span>Persistent AI Storage & Vault</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
              Riwayat Hasil Generasi SAS AI
            </h1>
            <p className="text-xs sm:text-sm text-[#DCD4CA]/80 mt-1 max-w-2xl leading-relaxed">
              Arsip permanen seluruh formula prompt, naskah prewedding, foto produk UMKM, konten Facebook Pro, strategi marketing, dan cetak biru produk digital Anda. Tersimpan aman di database lokal dan server.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onBackToStudio('prompt')}
              className="min-h-[44px] px-4 py-2 bg-[#0C0C10] hover:bg-[#1E1C27] text-[#FAF7F2] text-xs font-semibold rounded-xl border border-[#E5AA9C]/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#E5AA9C]" />
              <span>Kembali ke Studio</span>
            </button>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="pt-4 border-t border-[#FAF7F2]/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#E5AA9C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari riwayat berdasarkan judul, konten, atau kata kunci..."
              className="w-full min-h-[44px] bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#DCD4CA]/40 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#DCD4CA]/60 hover:text-[#FAF7F2]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Stats & Clear Button */}
          <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
            <span className="text-[#DCD4CA]/70 font-mono text-[11px]">
              Menampilkan <strong className="text-[#E5AA9C]">{filteredItems.length}</strong> dari {items.length} riwayat
            </span>

            {items.length > 0 && (
              <button
                type="button"
                onClick={() => setConfirmClearOpen(true)}
                className="min-h-[40px] px-3 py-1.5 text-xs text-rose-300 hover:text-rose-100 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/30 rounded-xl transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Semua</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Module Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {MODULE_FILTERS.map((f) => {
          const active = selectedModule === f.id;
          const Icon = f.icon;
          return (
            <button
              key={f.id}
              onClick={() => setSelectedModule(f.id)}
              className={`min-h-[40px] px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap flex items-center gap-2 ${
                active
                  ? 'bg-gradient-to-r from-[#9A5A65] to-[#B76E79] text-[#FAF7F2] border-[#E5AA9C] shadow-sm'
                  : 'bg-[#14131A] text-[#DCD4CA]/70 border-[#E5AA9C]/15 hover:text-[#FAF7F2] hover:bg-[#1E1C27]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* History Items Grid / List */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-12 text-center shadow-xl space-y-3">
          <History className="w-12 h-12 text-[#E5AA9C]/30 mx-auto stroke-[1.5]" />
          <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">
            {items.length === 0 ? 'Belum Ada Riwayat Tersimpan' : 'Tidak Ada Hasil yang Cocok'}
          </h3>
          <p className="text-xs text-[#DCD4CA]/70 max-w-md mx-auto">
            {items.length === 0
              ? 'Mulai hasilkan konten dari salah satu dari 6 modul AI. Semua hasil otomatis disimpan secara permanen di database ini.'
              : `Tidak ditemukan riwayat yang cocok dengan kata kunci "${searchQuery}". Coba kata kunci lain atau ubah filter modul.`}
          </p>
          {items.length === 0 && (
            <button
              onClick={() => onBackToStudio('prompt')}
              className="mt-2 min-h-[44px] px-6 py-2.5 bg-gradient-to-r from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2] text-xs font-semibold rounded-xl inline-flex items-center gap-2 shadow-lg active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Buka Studio AI Sekarang</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#14131A] border border-[#E5AA9C]/20 hover:border-[#E5AA9C]/45 rounded-2xl p-5 shadow-xl flex flex-col justify-between transition-all group relative"
              >
                <div>
                  {/* Card Header: Module Badge & Date */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold font-mono uppercase bg-[#0C0C10] border border-[#E5AA9C]/30 text-[#E5AA9C]">
                      {getModuleIcon(item.moduleId)}
                      <span>{getModuleName(item.moduleId)}</span>
                    </span>

                    <span className="text-[11px] text-[#DCD4CA]/60 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-[#DCD4CA]/40" />
                      <span>{formatDate(item.timestamp)}</span>
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-base font-bold text-[#FAF7F2] group-hover:text-[#E5AA9C] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#DCD4CA]/75 mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>

                  {/* Content Preview Box */}
                  <div className="mt-3 p-3 bg-[#0C0C10] border border-[#E5AA9C]/15 rounded-xl max-h-36 overflow-hidden relative">
                    <p className="text-xs text-[#FAF7F2]/85 font-sans whitespace-pre-wrap line-clamp-4 leading-relaxed">
                      {item.content}
                    </p>
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0C0C10] to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Card Action Buttons (Copy, View Details, Delete) */}
                <div className="mt-4 pt-3 border-t border-[#FAF7F2]/10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setViewingItem(item)}
                    className="min-h-[44px] px-3.5 py-1.5 text-xs font-semibold text-[#FAF7F2] bg-[#1E1C27] hover:bg-[#2A2738] rounded-xl border border-[#E5AA9C]/30 flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#E5AA9C]" />
                    <span>Lihat Lengkap</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.content)}
                      className="min-h-[44px] px-3 py-1.5 text-xs font-semibold text-[#FAF7F2] bg-[#0C0C10] hover:bg-[#1E1C27] rounded-xl border border-[#E5AA9C]/25 flex items-center gap-1.5 transition-all active:scale-95"
                      title="Salin isi konten ke clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#E5AA9C]" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteItem(item.id)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#DCD4CA]/50 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition-all"
                      title="Hapus riwayat ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: View Full Result Detail */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-[#14131A] border border-[#E5AA9C]/40 rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[90vh] flex flex-col space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#FAF7F2]/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#E5AA9C] mb-1">
                  {getModuleIcon(viewingItem.moduleId)}
                  <span>{getModuleName(viewingItem.moduleId)}</span>
                  <span>•</span>
                  <span className="text-[#DCD4CA]/60">{formatDate(viewingItem.timestamp)}</span>
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#FAF7F2]">
                  {viewingItem.title}
                </h2>
                <p className="text-xs text-[#DCD4CA]/75 mt-0.5">
                  {viewingItem.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewingItem(null)}
                className="p-1.5 text-[#DCD4CA]/60 hover:text-[#FAF7F2] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Box */}
            <div className="flex-1 overflow-y-auto bg-[#0C0C10] border border-[#E5AA9C]/20 rounded-xl p-4 sm:p-5 select-text">
              <p className="font-sans text-xs sm:text-sm text-[#FAF7F2]/95 whitespace-pre-wrap leading-relaxed">
                {viewingItem.content}
              </p>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-2 border-t border-[#FAF7F2]/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(viewingItem.id, viewingItem.content)}
                  className="min-h-[44px] px-4 py-2 bg-gradient-to-r from-[#9A5A65] to-[#B76E79] hover:from-[#B76E79] hover:to-[#E5AA9C] text-[#FAF7F2] text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  {copiedId === viewingItem.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Seluruh Naskah</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onDeleteItem(viewingItem.id);
                    setViewingItem(null);
                  }}
                  className="min-h-[44px] px-3.5 py-2 text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus Riwayat</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setViewingItem(null)}
                className="min-h-[44px] px-4 py-2 bg-[#0C0C10] hover:bg-[#1E1C27] text-[#FAF7F2] text-xs font-semibold rounded-xl border border-[#E5AA9C]/25"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Clear All */}
      {confirmClearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-[#14131A] border border-rose-500/40 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <Trash2 className="w-6 h-6 shrink-0" />
              <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">Hapus Semua Riwayat?</h3>
            </div>
            <p className="text-xs text-[#DCD4CA]/80 leading-relaxed">
              Tindakan ini akan menghapus seluruh ({items.length}) riwayat generasi yang tersimpan di database permanen. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmClearOpen(false)}
                className="min-h-[44px] px-4 py-2 text-xs text-[#FAF7F2] bg-[#0C0C10] hover:bg-[#1E1C27] rounded-xl border border-[#E5AA9C]/20"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearAll();
                  setConfirmClearOpen(false);
                }}
                className="min-h-[44px] px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-lg"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
