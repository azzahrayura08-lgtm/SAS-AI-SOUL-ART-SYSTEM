import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Copy, 
  Check, 
  Trash2, 
  AlertCircle, 
  RefreshCw, 
  Bookmark, 
  BookmarkCheck,
  Briefcase,
  GraduationCap,
  Share2,
  Package,
  Palette
} from 'lucide-react';
import { MediaActionCard } from '../MediaActionCard';

export type PromptCategory = 'Business' | 'Education' | 'Social Media' | 'Product' | 'Creative';

interface PromptModuleProps {
  onSaveToVault?: (item: { title: string; category: string; content: string }) => void;
  onAutoSaveHistory?: (item: {
    moduleId: 'prompt';
    title: string;
    subtitle: string;
    content: string;
    metadata?: Record<string, any>;
  }) => void;
  onOpenInReelsStudio?: (params: {
    sourceModule: string;
    title: string;
    hookText: string;
    subtitleText: string;
  }) => void;
}

const CATEGORIES: { id: PromptCategory; label: string; desc: string; icon: typeof Briefcase }[] = [
  { id: 'Business', label: 'Business', desc: 'Strategi bisnis, pitching & negosiasi', icon: Briefcase },
  { id: 'Education', label: 'Education', desc: 'Rancangan silabus & materi belajar', icon: GraduationCap },
  { id: 'Social Media', label: 'Social Media', desc: 'Konten viral, hook & engagement', icon: Share2 },
  { id: 'Product', label: 'Product', desc: 'Deskripsi produk, USP & positioning', icon: Package },
  { id: 'Creative', label: 'Creative', desc: 'Ide storytelling, seni visual & imajinasi', icon: Palette },
];

const SAMPLE_PROMPTS: Record<PromptCategory, string> = {
  Business: 'Buatkan strategi ekspansi bisnis ritel kopi artisan lokal untuk membuka 5 cabang baru dengan modal efisien dan menjaga kualitas rasa.',
  Education: 'Rancang modul kurikulum 4 minggu pembelajaran Artificial Intelligence dasar untuk siswa pemula dengan studi kasus praktis.',
  'Social Media': 'Buatkan 5 hook konten video TikTok & Instagram Reels bertema produktivitas harian yang memicu audiens berkomentar dan membagikan video.',
  Product: 'Tuliskan deskripsi produk serum wajah berbahan mawar damaskus lokal yang menonjolkan manfaat skin barrier dan sertifikasi halal BPOM.',
  Creative: 'Ciptakan konsep cerita sci-fi tentang seorang pelukis di Jakarta tahun 2085 yang melukis memori manusia ke dalam kanvas hologram interaktif.'
};

export const PromptModule: React.FC<PromptModuleProps> = ({ 
  onSaveToVault, 
  onAutoSaveHistory,
  onOpenInReelsStudio 
}) => {
  // 1. Input field where users can describe the content they want
  const [description, setDescription] = useState(
    'Buatkan strategi pemasaran digital untuk peluncuran produk kecantikan organik lokal dengan anggaran terbatas namun menghasilkan konversi tinggi.'
  );

  // 2. Category selector: Business, Education, Social Media, Product, Creative
  const [category, setCategory] = useState<PromptCategory>('Business');

  // State management for generation, output, loading, error, copy
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState<string>('gemini-3.8-flash');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const showLocalToast = (msg: string) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 2500);
  };

  // 3 & 4. When clicked, generate a detailed, high-quality AI prompt in Indonesian via server-side Gemini API
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setErrorMessage('Deskripsi konten tidak boleh kosong. Silakan tuliskan kebutuhan prompt Anda.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setIsSaved(false);

    try {
      const response = await fetch('/api/prompt/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description.trim(),
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kegagalan komunikasi dengan server.');
      }

      setGeneratedPrompt(data.result);
      if (data.model) {
        setActiveModel(data.model);
      }
      if (onAutoSaveHistory) {
        onAutoSaveHistory({
          moduleId: 'prompt',
          title: `AI Prompt · ${category}`,
          subtitle: description.trim().slice(0, 60) + (description.length > 60 ? '...' : ''),
          content: data.result,
          metadata: {
            category,
            tags: ['AI Prompt', category, 'Gemini 3.8 Flash'],
            stats: {
              'Kategori': category,
              'Model AI': data.model || 'gemini-3.8-flash'
            }
          }
        });
      }
      showLocalToast('Prompt AI Bahasa Indonesia berhasil dibuat');
    } catch (err: any) {
      console.error('Error generating prompt:', err);
      setErrorMessage(
        err.message || 'Gagal memproses AI prompt. Silakan periksa koneksi dan coba lagi.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // 6. Copy button
  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    showLocalToast('Prompt berhasil disalin ke clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  // 6. Clear button
  const handleClear = () => {
    setGeneratedPrompt(null);
    setErrorMessage(null);
    setIsSaved(false);
    showLocalToast('Output box telah dibersihkan');
  };

  const handleClearInput = () => {
    setDescription('');
    setErrorMessage(null);
  };

  const handleSaveVault = () => {
    if (!generatedPrompt) return;
    if (onSaveToVault) {
      onSaveToVault({
        title: `AI Prompt · ${category}`,
        category,
        content: generatedPrompt,
      });
    }
    setIsSaved(true);
    showLocalToast('Tersimpan di Soul Art Saved Vault');
  };

  const handleLoadSample = (cat: PromptCategory) => {
    setCategory(cat);
    setDescription(SAMPLE_PROMPTS[cat]);
    setErrorMessage(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification Alert */}
      {toastNotification && (
        <div className="p-3 bg-[#1F1D27] border border-[#E5AA9C]/40 rounded-xl text-xs text-[#FAF7F2] flex items-center justify-between shadow-lg animate-fade-in">
          <span className="font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E5AA9C]" />
            {toastNotification}
          </span>
        </div>
      )}

      {/* Module Title Header */}
      <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini AI Integration</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2] mt-1">
              AI Prompt Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#DCD4CA]/80 mt-1 max-w-2xl leading-relaxed">
              Buat prompt AI terstruktur dan berwibawa dalam <strong>Bahasa Indonesia</strong> untuk kebutuhan bisnis, pendidikan, media sosial, produk, dan kreasi seni menggunakan <strong>Gemini API</strong> server-side.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <span className="text-[11px] font-mono text-[#E5AA9C] bg-[#0C0C10] px-3 py-1.5 rounded-lg border border-[#E5AA9C]/25 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Gemini API Enabled</span>
            </span>
          </div>
        </div>

        {/* Quick Sample Selector */}
        <div className="pt-3 border-t border-[#FAF7F2]/10">
          <span className="text-xs text-[#DCD4CA]/70 font-medium block mb-2">
            Contoh Ide Siap Pakai (Klik untuk mengisi otomatis):
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleLoadSample(cat.id)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  category === cat.id
                    ? 'bg-[#1E1C27] border-[#E5AA9C]/60 text-[#FAF7F2]'
                    : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Generator Form */}
      <form onSubmit={handleGenerate} className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
        
        {/* 2. Category Selector: Business, Education, Social Media, Product, Creative */}
        <div>
          <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
            Pilih Kategori Prompt:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setCategory(cat.id);
                    setErrorMessage(null);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all min-h-[52px] flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#9A5A65]/30 via-[#1C1A24] to-[#14131A] border-[#E5AA9C] text-[#FAF7F2] shadow-sm shadow-[#E5AA9C]/10 ring-1 ring-[#E5AA9C]/50'
                      : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2] hover:border-[#E5AA9C]/35'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E5AA9C]' : 'text-[#DCD4CA]/60'}`} />
                    <span className="font-serif text-xs font-semibold">{cat.label}</span>
                  </div>
                  <span className="text-[10px] text-[#DCD4CA]/60 line-clamp-1 mt-1 font-sans">
                    {cat.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. Input field where users can describe the content they want */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider">
              Deskripsi Konten yang Anda Inginkan:
            </label>
            {description && (
              <button
                type="button"
                onClick={handleClearInput}
                className="text-[11px] text-[#DCD4CA]/50 hover:text-[#FAF7F2] transition-colors"
              >
                Hapus teks input
              </button>
            )}
          </div>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            rows={4}
            className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl p-3.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C] transition-all leading-relaxed"
            placeholder="Jelaskan konten yang ingin Anda buat secara detail (misal: strategi bisnis peluncuran cafe, naskah silabus edukasi coding, video reels viral, deskripsi produk kecantikan halal, atau ide cerita fiksi)..."
            required
          />
          <div className="flex items-center justify-between mt-1.5 text-[11px] text-[#DCD4CA]/60">
            <span>Model AI akan menganalisis kebutuhan ini dan menyusun prompt Indonesia yang optimal.</span>
            <span className="font-mono tabular-nums">{description.length} karakter</span>
          </div>
        </div>

        {/* 7. Error Message */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-200 flex items-start gap-2.5 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block">Gagal Membuat Prompt:</span>
              <span className="mt-0.5 block text-rose-300/90">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* 3. Generate Prompt Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#DCD4CA]/60 flex items-center gap-1.5">
            <span className="text-[#E5AA9C]">✦</span>
            <span>Aman server-side: API key tidak pernah terekspos ke kode browser</span>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !description.trim()}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-gradient-to-r from-[#9A5A65] via-[#B76E79] to-[#E5AA9C] hover:opacity-95 text-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#E5AA9C]/10 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#FAF7F2]" />
                <span>Menghasilkan Prompt AI...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-[#FAF7F2]" />
                <span>Generate Prompt</span>
              </>
            )}
          </button>
        </div>

      </form>

      {/* 7. Loading Message */}
      {isGenerating && (
        <div className="bg-[#14131A] border border-[#E5AA9C]/30 rounded-2xl p-8 sm:p-12 text-center shadow-xl animate-pulse space-y-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#E5AA9C] border-t-transparent animate-spin mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">
            Gemini Sedang Menyusun Prompt Berkualitas Tinggi...
          </h3>
          <p className="text-xs text-[#DCD4CA]/70 max-w-md mx-auto">
            Mengharmonisasikan persona AI, konteks mendalam, batasan negatif, dan formula siap pakai dalam Bahasa Indonesia.
          </p>
        </div>
      )}

      {/* 5. Readable Output Box */}
      {!isGenerating && generatedPrompt && (
        <div className="bg-[#14131A] border border-[#E5AA9C]/30 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 animate-fade-in">
          
          {/* Output Box Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FAF7F2]/10">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-mono">
                <span className="uppercase font-semibold tracking-wider">Hasil Prompt Gemini</span>
                <span aria-hidden="true">·</span>
                <span>Kategori: {category}</span>
                <span aria-hidden="true">·</span>
                <span>Model: {activeModel}</span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#FAF7F2] mt-0.5">
                Formula AI Prompt Bahasa Indonesia
              </h2>
            </div>

            {/* 6. Copy and Clear Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {onSaveToVault && (
                <button
                  type="button"
                  onClick={handleSaveVault}
                  className={`min-h-[38px] px-3 py-1.5 border rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isSaved
                      ? 'bg-[#B76E79]/20 border-[#E5AA9C] text-[#E5AA9C]'
                      : 'bg-[#1C1A24] border-[#E5AA9C]/20 text-[#DCD4CA]/80 hover:text-[#FAF7F2]'
                  }`}
                  title="Simpan ke Vault"
                >
                  {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-[#E5AA9C]" /> : <Bookmark className="w-3.5 h-3.5" />}
                  <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleClear}
                className="min-h-[38px] px-3.5 py-1.5 bg-[#1C1A24] hover:bg-[#252230] text-[#DCD4CA]/80 hover:text-rose-200 border border-[#E5AA9C]/20 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Bersihkan kotak hasil"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="min-h-[38px] px-4 py-1.5 bg-gradient-to-r from-[#9A5A65] to-[#B76E79] hover:from-[#B76E79] hover:to-[#E5AA9C] text-[#FAF7F2] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                title="Salin prompt ke clipboard"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#FAF7F2]" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Readable Output Content Area */}
          <div className="bg-[#0C0C10] border border-[#E5AA9C]/20 rounded-xl p-4 sm:p-5 max-h-[550px] overflow-y-auto">
            <pre className="text-xs sm:text-sm text-[#FAF7F2] font-mono whitespace-pre-wrap leading-relaxed select-all">
              {generatedPrompt}
            </pre>
          </div>

          {/* Footer note */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-[#DCD4CA]/65">
            <span>💡 <strong>Petunjuk:</strong> Klik <em>Copy Prompt</em> di atas, lalu tempelkan langsung ke model AI Anda (ChatGPT, Claude, Gemini, dll).</span>
            <span className="font-mono tabular-nums">{generatedPrompt.length} karakter</span>
          </div>

          {/* AI Image & Video MP4 Generator for this Prompt */}
          <div className="pt-2">
            <MediaActionCard
              sourceModule="prompt"
              title={`Prompt ${category}: ${description.slice(0, 45)}`}
              subtitle={`Formula AI Prompt Kategori ${category}`}
              content={generatedPrompt}
              onOpenInReelsStudio={onOpenInReelsStudio as any}
              onAutoSaveToHistory={(mediaData) => {
                onAutoSaveHistory?.({
                  moduleId: 'prompt',
                  title: `Prompt Media ${category}: ${description.slice(0, 35)}`,
                  subtitle: `Media visual & video MP4 untuk formula prompt ${category}`,
                  content: generatedPrompt,
                  metadata: {
                    category,
                    mediaData,
                    tags: ['Prompt Module', 'AI Media', category]
                  }
                });
              }}
            />
          </div>

        </div>
      )}

      {/* Standalone Visual & Video Generator Section if no prompt generated yet */}
      {!generatedPrompt && !isGenerating && (
        <div className="pt-2">
          <MediaActionCard
            sourceModule="prompt"
            title={`Visual Kreatif: ${description.slice(0, 45)}`}
            subtitle={`Visual AI & Reels MP4 Kategori ${category}`}
            content={description}
            onOpenInReelsStudio={onOpenInReelsStudio as any}
            onAutoSaveToHistory={(mediaData) => {
              onAutoSaveHistory?.({
                moduleId: 'prompt',
                title: `Visual Prompt ${category}: ${description.slice(0, 35)}`,
                subtitle: `Media visual & video MP4 untuk kategori ${category}`,
                content: description,
                metadata: {
                  category,
                  mediaData,
                  tags: ['Prompt Module', 'AI Media', category]
                }
              });
            }}
          />
        </div>
      )}

    </div>
  );
};
