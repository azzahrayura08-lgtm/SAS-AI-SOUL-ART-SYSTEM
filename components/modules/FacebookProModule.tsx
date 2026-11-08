import React, { useState } from 'react';
import { 
  Share2, 
  Sparkles, 
  Wand2, 
  Copy, 
  Check, 
  Trash2, 
  RefreshCw, 
  AlertCircle, 
  Bookmark, 
  BookmarkCheck,
  Video,
  Flame,
  MessageCircle,
  Megaphone,
  BookOpen,
  Award,
  Users
} from 'lucide-react';
import { MediaActionCard } from '../MediaActionCard';

export type FbContentType = 
  | 'Facebook Sales Caption'
  | 'Promotional Post'
  | 'Educational Content'
  | 'Storytelling'
  | 'Facebook Reels Script'
  | 'Product Launch'
  | 'Customer Engagement';

export type FbTone = 
  | 'Professional'
  | 'Friendly'
  | 'Persuasive'
  | 'Informative'
  | 'Creative';

interface FacebookProModuleProps {
  onSaveToVault?: (item: { title: string; category: string; content: string }) => void;
  onAutoSaveHistory?: (item: {
    moduleId: 'facebook_pro';
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

const CONTENT_TYPES: { id: FbContentType; label: string; desc: string; icon: typeof Megaphone }[] = [
  { 
    id: 'Facebook Sales Caption', 
    label: 'Sales Caption', 
    desc: 'Copywriting penjualan persuasif dengan AIDA & scarcity',
    icon: Megaphone
  },
  { 
    id: 'Promotional Post', 
    label: 'Promotional Post', 
    desc: 'Penawaran diskon, bundling hemat & urgensi terbatas',
    icon: Flame
  },
  { 
    id: 'Educational Content', 
    label: 'Educational Content', 
    desc: 'Tips praktis bermanfaat tinggi yang memicu klik Share',
    icon: BookOpen
  },
  { 
    id: 'Storytelling', 
    label: 'Storytelling', 
    desc: 'Kisah nyata emosional yang mengundang empati & komentar',
    icon: MessageCircle
  },
  { 
    id: 'Facebook Reels Script', 
    label: 'Reels Script (15-30s)', 
    desc: 'Naskah video vertikal dengan arahan adegan & teks layar',
    icon: Video
  },
  { 
    id: 'Product Launch', 
    label: 'Product Launch', 
    desc: 'Pengumuman peluncuran resmi dengan akses VIP awal',
    icon: Award
  },
  { 
    id: 'Customer Engagement', 
    label: 'Customer Engagement', 
    desc: 'Pertanyaan pancing interaksi & diskusi komunitas hangat',
    icon: Users
  },
];

const TONES: { id: FbTone; label: string; desc: string }[] = [
  { id: 'Professional', label: 'Professional', desc: 'Otoritatif, terpercaya, dan berbasis data kredibel' },
  { id: 'Friendly', label: 'Friendly', desc: 'Hangat, akrab, santun, dan menyapa seperti sahabat' },
  { id: 'Persuasive', label: 'Persuasive', desc: 'Membujuk halus, mengatasi keraguan & berorientasi tindakan' },
  { id: 'Informative', label: 'Informative', desc: 'Jelas, terstruktur, edukatif, dan to the point' },
  { id: 'Creative', label: 'Creative', desc: 'Puitis, segar, kaya metafora & menghentikan scroll' },
];

const SAMPLE_CAMPAIGNS = [
  {
    title: 'Aura Botanica Serum Glowing',
    business: 'Aura Botanica Beauty',
    desc: 'Serum wajah herbal dari ekstrak mawar damaskus lokal yang mengunci kelembapan 24 jam, mencerahkan noda hitam tanpa rasa lengket, bersertifikasi BPOM & Halal.',
    audience: 'Wanita karir & ibu muda usia 22-38 tahun yang mendambakan kulit sehat bercahaya alami',
    type: 'Facebook Sales Caption' as FbContentType,
    tone: 'Persuasive' as FbTone
  },
  {
    title: 'Kopi Gayo Cold Brew Botolan',
    business: 'Kopi Gayo Artisan Roastery',
    desc: 'Kopi cold brew botol kaca 250ml hasil ekstraksi 18 jam dengan biji kopi arabika single origin Aceh Gayo, rasa manis alami tanpa gula tambahan dan asam yang aman untuk lambung.',
    audience: 'Pekerja remote, freelancer, dan penikmat kopi berkualitas yang butuh fokus bekerja',
    type: 'Facebook Reels Script' as FbContentType,
    tone: 'Friendly' as FbTone
  },
  {
    title: 'Masterclass Bisnis Modal 500 Ribu',
    business: 'Akademi UMKM Naik Kelas',
    desc: 'Pelatihan daring 3 hari yang membongkar strategi validasi produk, mencari supplier terpercaya, dan mendapatkan 100 pembeli pertama dari Facebook organik tanpa iklan berbayar.',
    audience: 'Pemula yang ingin memulai usaha sampingan dari rumah dengan modal minim',
    type: 'Storytelling' as FbContentType,
    tone: 'Creative' as FbTone
  }
];

export const FacebookProModule: React.FC<FacebookProModuleProps> = ({ 
  onSaveToVault, 
  onAutoSaveHistory,
  onOpenInReelsStudio 
}) => {
  // 1. Business or product name input
  const [businessName, setBusinessName] = useState('Aura Botanica Skincare');

  // 2. Product description input
  const [productDescription, setProductDescription] = useState(
    'Serum wajah berbahan ekstrak mawar damaskus & rosehip oil alami lokal yang merawat skin barrier, membuat kulit kenyal berseri dalam 14 hari, tekstur ringan cepat meresap, dan sudah terdaftar BPOM Halal.'
  );

  // 3. Target audience input
  const [targetAudience, setTargetAudience] = useState(
    'Wanita usia 22–38 tahun yang memiliki masalah kulit kusam dan mencari skincare alami yang aman untuk pemakaian jangka panjang'
  );

  // 4. Content type selector
  const [contentType, setContentType] = useState<FbContentType>('Facebook Sales Caption');

  // 5. Tone selector
  const [tone, setTone] = useState<FbTone>('Persuasive');

  // State management
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState<string>('gemini-3.8-flash');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const showLocalToast = (msg: string) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 2500);
  };

  // 6 & 7. Generate Content with server-side Gemini API
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!businessName.trim()) {
      setErrorMessage('Nama bisnis atau produk wajib diisi.');
      return;
    }

    if (!productDescription.trim()) {
      setErrorMessage('Deskripsi produk atau penawaran wajib diisi.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setIsSaved(false);

    try {
      const response = await fetch('/api/facebook-pro/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName: businessName.trim(),
          productDescription: productDescription.trim(),
          targetAudience: targetAudience.trim(),
          contentType,
          tone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat memproses konten Facebook Pro.');
      }

      setGeneratedContent(data.result);
      if (data.model) {
        setActiveModel(data.model);
      }
      if (onAutoSaveHistory) {
        onAutoSaveHistory({
          moduleId: 'facebook_pro',
          title: `Facebook · ${businessName.trim()}`,
          subtitle: `${contentType} (${tone})`,
          content: data.result,
          metadata: {
            contentType,
            tone,
            businessName: businessName.trim(),
            targetAudience: targetAudience.trim(),
            tags: ['Facebook Pro', contentType, tone, 'Meta Copywriting', 'Gemini 3.8 Flash'],
            stats: {
              'Tipe Konten': contentType,
              'Tone of Voice': tone,
              'Model AI': data.model || 'gemini-3.8-flash'
            }
          }
        });
      }
      showLocalToast('Konten Facebook Pro berhasil dibuat');
    } catch (err: any) {
      console.error('Error in Facebook Pro generation:', err);
      setErrorMessage(
        err.message || 'Gagal memproses konten Facebook Pro. Silakan periksa koneksi dan coba lagi.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // 10. Copy button
  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    showLocalToast('Konten Facebook berhasil disalin ke clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  // 10. Clear button
  const handleClear = () => {
    setGeneratedContent(null);
    setErrorMessage(null);
    setIsSaved(false);
    showLocalToast('Kotak hasil konten dibersihkan');
  };

  // 10. Regenerate button
  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleSaveVault = () => {
    if (!generatedContent) return;
    if (onSaveToVault) {
      onSaveToVault({
        title: `FB Pro: ${businessName} (${contentType})`,
        category: 'Facebook Pro',
        content: generatedContent,
      });
    }
    setIsSaved(true);
    showLocalToast('Tersimpan di Soul Art Saved Vault');
  };

  const handleApplyPreset = (p: typeof SAMPLE_CAMPAIGNS[0]) => {
    setBusinessName(p.business);
    setProductDescription(p.desc);
    setTargetAudience(p.audience);
    setContentType(p.type);
    setTone(p.tone);
    setErrorMessage(null);
    showLocalToast(`Preset "${p.title}" dimuat`);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toastNotification && (
        <div className="p-3 bg-[#1F1D27] border border-[#E5AA9C]/40 rounded-xl text-xs text-[#FAF7F2] flex items-center justify-between shadow-lg animate-fade-in">
          <span className="font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E5AA9C]" />
            {toastNotification}
          </span>
        </div>
      )}

      {/* Intro Header Card */}
      <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-semibold tracking-wider uppercase">
              <Share2 className="w-3.5 h-3.5" />
              <span>Facebook Marketing Content Assistant</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2] mt-1">
              AI Facebook Pro Assistant
            </h1>
            <p className="text-xs sm:text-sm text-[#DCD4CA]/80 mt-1 max-w-2xl leading-relaxed">
              Tingkatkan konversi penjualan, engagement organik, dan jangkauan Facebook Reels Anda. Hasilkan konten pemasaran berkualitas tinggi dalam <strong>Bahasa Indonesia</strong> dengan hook penahan scroll, narasi mengalir, CTA tegas, dan hashtag terarah menggunakan <strong>Gemini API</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <span className="text-[11px] font-mono text-[#E5AA9C] bg-[#0C0C10] px-3 py-1.5 rounded-lg border border-[#E5AA9C]/25 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Gemini FB Pro Engine</span>
            </span>
          </div>
        </div>

        {/* Preset Campaign Bar */}
        <div className="pt-3 border-t border-[#FAF7F2]/10">
          <span className="text-xs text-[#DCD4CA]/70 font-medium block mb-2">
            Ide Kampanye Siap Pakai (Klik untuk mengisi cepat):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SAMPLE_CAMPAIGNS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(sample)}
                className="text-left p-3 rounded-xl bg-[#0C0C10]/80 border border-[#E5AA9C]/15 hover:border-[#E5AA9C]/40 transition-all group min-h-[48px]"
              >
                <div className="flex items-center justify-between text-xs font-serif font-semibold text-[#E5AA9C]">
                  <span className="truncate">{sample.title}</span>
                  <span className="text-[10px] text-[#DCD4CA]/50 font-mono">0{idx + 1}</span>
                </div>
                <p className="text-[11px] text-[#DCD4CA]/65 line-clamp-1 mt-1 font-sans">
                  {sample.type} · {sample.tone}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Generator Form (Touch & Mobile Ergonomic for Android) */}
      <form onSubmit={handleGenerate} className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
        
        {/* 1. Business / Product Name & 3. Target Audience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 1. Business Name */}
          <div>
            <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
              1. Nama Bisnis atau Produk:
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Contoh: Aura Botanica Skincare, Kopi Gayo Artisan, Bromo Travel..."
              className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C] min-h-[44px]"
              required
            />
          </div>

          {/* 3. Target Audience */}
          <div>
            <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
              3. Target Audiens Utama:
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Contoh: Ibu muda pencinta skincare, pekerja kantoran, reseller..."
              className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C] min-h-[44px]"
            />
          </div>

        </div>

        {/* 2. Product Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider">
              2. Deskripsi Produk & Keunggulan (USP):
            </label>
            {productDescription && (
              <button
                type="button"
                onClick={() => setProductDescription('')}
                className="text-[11px] text-[#DCD4CA]/50 hover:text-[#FAF7F2] transition-colors p-1"
              >
                Hapus teks
              </button>
            )}
          </div>
          <textarea
            value={productDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            rows={3}
            className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl p-3.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C] transition-all leading-relaxed"
            placeholder="Jelaskan manfaat utama, promo yang sedang berjalan, bonus, garansi kepuasan, atau masalah yang diselesaikan produk ini..."
            required
          />
          <span className="text-[11px] text-[#DCD4CA]/60 block mt-1">
            Tips: Sebutkan penawaran spesifik (misal Diskon 30%, Beli 2 Gratis 1, Free Ongkir) agar ajakan aksi (CTA) lebih bertenaga.
          </span>
        </div>

        {/* 4. Content Type Selector */}
        <div>
          <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
            4. Pilih Tipe Konten Facebook (Content Type):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {CONTENT_TYPES.map((type) => {
              const IconComp = type.icon;
              const isSelected = contentType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setContentType(type.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[72px] active:scale-[0.98] ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#9A5A65]/35 via-[#1C1A24] to-[#14131A] border-[#E5AA9C] text-[#FAF7F2] shadow-sm ring-1 ring-[#E5AA9C]/50'
                      : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/75 hover:text-[#FAF7F2] hover:border-[#E5AA9C]/35'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E5AA9C]' : 'text-[#DCD4CA]/60'}`} />
                    <span className="font-serif text-xs font-semibold">{type.label}</span>
                  </div>
                  <span className="text-[10px] text-[#DCD4CA]/60 line-clamp-1 mt-1 font-sans">
                    {type.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Tone Selector */}
        <div>
          <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
            5. Nada Bicara (Tone of Voice):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {TONES.map((t) => {
              const isSelected = tone === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={`p-3 rounded-xl border text-left transition-all min-h-[60px] active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#1E1C27] border-[#E5AA9C] text-[#FAF7F2] font-semibold shadow-sm ring-1 ring-[#E5AA9C]/40'
                      : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2]'
                  }`}
                >
                  <span className="text-xs font-semibold block">{t.label}</span>
                  <span className="text-[10px] text-[#DCD4CA]/60 line-clamp-1 mt-0.5">{t.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notice for Reels Script Structure */}
        {contentType === 'Facebook Reels Script' && (
          <div className="p-3.5 bg-[#0C0C10]/80 rounded-xl border border-[#E5AA9C]/25 text-xs text-[#FAF7F2]/90 flex items-start gap-2.5 animate-fade-in">
            <Video className="w-4 h-4 text-[#E5AA9C] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-[#E5AA9C] block">Format Facebook Reels 15–30 Detik Aktif:</span>
              <span className="text-[11px] text-[#DCD4CA]/80 block">
                Hasil akan menyertakan breakdown waktu per detik, petunjuk visual kamera (scene directions), on-screen text, dan naskah voiceover siap rekam.
              </span>
            </div>
          </div>
        )}

        {/* 11. Error Message Display */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-200 flex items-start gap-2.5 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block">Gagal Membuat Konten Facebook:</span>
              <span className="mt-0.5 block text-rose-300/90">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* 6. Generate Content Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#DCD4CA]/60 flex items-center gap-1.5">
            <span className="text-[#E5AA9C]">✦</span>
            <span>Mencakup Hook Pembuka, Konten Utama, Call to Action & Hashtag Strategis</span>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !businessName.trim() || !productDescription.trim()}
            className="w-full sm:w-auto min-h-[48px] px-7 py-2.5 bg-gradient-to-r from-[#9A5A65] via-[#B76E79] to-[#E5AA9C] hover:opacity-95 text-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#E5AA9C]/10 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#FAF7F2]" />
                <span>Menghasilkan Konten Facebook...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-[#FAF7F2]" />
                <span>Generate Content</span>
              </>
            )}
          </button>
        </div>

      </form>

      {/* 11. Loading State */}
      {isGenerating && (
        <div className="bg-[#14131A] border border-[#E5AA9C]/30 rounded-2xl p-8 sm:p-12 text-center shadow-xl animate-pulse space-y-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#E5AA9C] border-t-transparent animate-spin mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">
            Gemini Sedang Merancang Konten Facebook Pro...
          </h3>
          <p className="text-xs text-[#DCD4CA]/70 max-w-md mx-auto">
            Menuliskan hook memikat penahan scroll, narasi bernilai, ajakan aksi yang jelas, dan hashtag untuk {businessName}.
          </p>
        </div>
      )}

      {/* Output Box */}
      {!isGenerating && generatedContent && (
        <div className="bg-[#14131A] border border-[#E5AA9C]/30 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 animate-fade-in">
          
          {/* Header row with Copy, Regenerate, Clear buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FAF7F2]/10">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-mono">
                <span className="uppercase font-semibold tracking-wider">Hasil FB Marketing</span>
                <span aria-hidden="true">·</span>
                <span>{contentType}</span>
                <span aria-hidden="true">·</span>
                <span>Tone: {tone}</span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#FAF7F2] mt-0.5">
                Konten Siap Publikasi: {businessName}
              </h2>
            </div>

            {/* 10. Copy, Regenerate, and Clear buttons */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
              {onSaveToVault && (
                <button
                  type="button"
                  onClick={handleSaveVault}
                  className={`min-h-[40px] px-3.5 py-1.5 border rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
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

              {/* Clear button */}
              <button
                type="button"
                onClick={handleClear}
                className="min-h-[40px] px-3.5 py-1.5 bg-[#1C1A24] hover:bg-[#252230] text-[#DCD4CA]/80 hover:text-rose-200 border border-[#E5AA9C]/20 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Bersihkan kotak hasil"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>

              {/* Regenerate button */}
              <button
                type="button"
                onClick={handleRegenerate}
                className="min-h-[40px] px-3.5 py-1.5 bg-[#1C1A24] hover:bg-[#252230] text-[#FAF7F2] border border-[#E5AA9C]/30 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Buat variasi baru"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#E5AA9C]" />
                <span>Regenerate</span>
              </button>

              {/* Copy button */}
              <button
                type="button"
                onClick={handleCopy}
                className="min-h-[40px] px-4 py-1.5 bg-gradient-to-r from-[#9A5A65] to-[#B76E79] hover:from-[#B76E79] hover:to-[#E5AA9C] text-[#FAF7F2] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                title="Salin seluruh konten"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#FAF7F2]" />
                    <span>Copy Post</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Readable Output Box Body */}
          <div className="bg-[#0C0C10] border border-[#E5AA9C]/20 rounded-xl p-4 sm:p-5 max-h-[550px] overflow-y-auto">
            <pre className="text-xs sm:text-sm text-[#FAF7F2] font-mono whitespace-pre-wrap leading-relaxed select-all">
              {generatedContent}
            </pre>
          </div>

          {/* Footer Guidance */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-[#DCD4CA]/65">
            <span>💡 <strong>Tips Posting:</strong> Klik <em>Copy Post</em> lalu tempelkan langsung ke status Facebook Halaman/Grup atau aplikasi Meta Business Suite Anda.</span>
            <span className="font-mono tabular-nums">{generatedContent.length} karakter</span>
          </div>

          {/* AI Image & Video MP4 Generator for this Facebook Pro post */}
          <div className="pt-2">
            <MediaActionCard
              sourceModule="facebook_pro"
              title={`Facebook Post: ${businessName}`}
              subtitle={`${contentType} · Tone ${tone}`}
              content={generatedContent}
              onOpenInReelsStudio={onOpenInReelsStudio as any}
              onAutoSaveToHistory={(mediaData) => {
                onAutoSaveHistory?.({
                  moduleId: 'facebook_pro',
                  title: `Media FB Pro: ${businessName}`,
                  subtitle: `Media visual & video MP4 untuk postingan ${businessName}`,
                  content: generatedContent,
                  metadata: {
                    contentType,
                    tone,
                    mediaData,
                    tags: ['Facebook Pro', 'AI Media', contentType]
                  }
                });
              }}
            />
          </div>

        </div>
      )}

      {/* Standalone Visual & Video Generator Section if no post generated yet */}
      {!generatedContent && !isGenerating && (
        <div className="pt-2">
          <MediaActionCard
            sourceModule="facebook_pro"
            title={`Konten Visual FB Pro: ${businessName}`}
            subtitle={`Visual AI & Reels MP4 · ${contentType}`}
            content={productDescription}
            onOpenInReelsStudio={onOpenInReelsStudio as any}
            onAutoSaveToHistory={(mediaData) => {
              onAutoSaveHistory?.({
                moduleId: 'facebook_pro',
                title: `Visual FB Pro: ${businessName}`,
                subtitle: `Visual AI & Reels MP4 · ${businessName}`,
                content: productDescription,
                metadata: {
                  contentType,
                  tone,
                  mediaData,
                  tags: ['Facebook Pro', 'AI Media', contentType]
                }
              });
            }}
          />
        </div>
      )}

    </div>
  );
};
