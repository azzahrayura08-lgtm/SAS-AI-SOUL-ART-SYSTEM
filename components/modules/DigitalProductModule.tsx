import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  Wand2, 
  Copy, 
  Check, 
  Trash2, 
  RefreshCw, 
  AlertCircle, 
  Bookmark, 
  BookmarkCheck,
  Palette,
  BookOpen,
  LayoutTemplate,
  FileSpreadsheet,
  Terminal,
  Target,
  ArrowRight,
  ShoppingBag,
  Share2,
  DollarSign,
  FileText,
  Paintbrush,
  Image,
  Tag
} from 'lucide-react';
import { MediaActionCard } from '../MediaActionCard';

export type DigitalProductCategory = 
  | 'AI Prompt'
  | 'E-book'
  | 'Worksheet'
  | 'Coloring Book'
  | 'Canva Template'
  | 'Digital Guide'
  | 'Social Media Content';

export type DigitalProductStyle = 
  | 'Luxury Pink Gold'
  | 'Minimalist'
  | 'Cute and Colorful'
  | 'Professional'
  | 'Modern Elegant';

interface DigitalProductModuleProps {
  onSaveToVault?: (item: { title: string; category: string; content: string }) => void;
  onAutoSaveHistory?: (item: {
    moduleId: 'digital_product';
    title: string;
    subtitle: string;
    content: string;
    metadata: Record<string, any>;
  }) => void;
  onOpenInReelsStudio?: (params: {
    sourceModule: string;
    title: string;
    hookText: string;
    subtitleText: string;
  }) => void;
}

const CATEGORIES: { id: DigitalProductCategory; label: string; desc: string; icon: typeof LayoutTemplate }[] = [
  { id: 'Canva Template', label: 'Canva Template', desc: 'Template feed, reels, presentasi & dokumen kerja siap edit', icon: LayoutTemplate },
  { id: 'AI Prompt', label: 'AI Prompt', desc: 'Formula prompt visual Midjourney, FLUX & copywriting ChatGPT', icon: Terminal },
  { id: 'E-book', label: 'E-book', desc: 'Buku digital panduan lengkap, kurikulum materi & studi kasus', icon: BookOpen },
  { id: 'Worksheet', label: 'Worksheet', desc: 'Lembar kerja interaktif, latihan mandiri & tracker produktivitas', icon: FileSpreadsheet },
  { id: 'Coloring Book', label: 'Coloring Book', desc: 'Buku mewarnai anak/dewasa resolusi tinggi siap cetak (KDP/Etsy)', icon: Paintbrush },
  { id: 'Digital Guide', label: 'Digital Guide', desc: 'Panduan taktis ringkas, playbook alur kerja & cheat sheet', icon: FileText },
  { id: 'Social Media Content', label: 'Social Media Content', desc: 'Paket konten 30 hari, kalender ide posting & hook viral', icon: Image },
];

const STYLES: { id: DigitalProductStyle; label: string; desc: string; colorDot: string }[] = [
  { id: 'Luxury Pink Gold', label: 'Luxury Pink Gold', desc: 'Sentuhan feminin berkelas, aksen rose gold & estetika khas SAS AI', colorDot: 'bg-[#E5AA9C]' },
  { id: 'Minimalist', label: 'Minimalist', desc: 'Bersih, elegan, tipografi modern & fokus pada ruang putih (negative space)', colorDot: 'bg-[#FAF7F2]' },
  { id: 'Cute and Colorful', label: 'Cute and Colorful', desc: 'Ceria, palet warna pastel cerah, ramah anak & memikat mata', colorDot: 'bg-[#F2A6B3]' },
  { id: 'Professional', label: 'Professional', desc: 'Rapi, otoritatif, berorientasi bisnis & terpercaya untuk korporat/klien', colorDot: 'bg-[#9A5A65]' },
  { id: 'Modern Elegant', label: 'Modern Elegant', desc: 'Perpaduan modern serif, layout simetris & estetika editorial premium', colorDot: 'bg-[#DCD4CA]' },
];

const SAMPLE_IDEAS = [
  {
    title: 'Canva Template 50+ Instagram Branding Luxury',
    idea: 'Koleksi 50+ template feed & carousel Instagram Canva siap edit untuk brand fashion, skincare, dan UMKM estetik',
    category: 'Canva Template' as DigitalProductCategory,
    audience: 'Pemilik brand UMKM, admin media sosial, dan freelancer desainer',
    style: 'Luxury Pink Gold' as DigitalProductStyle
  },
  {
    title: 'E-book Rahasia 100 Juta Pertama dari Produk Digital',
    idea: 'Panduan praktis langkah demi langkah memvalidasi ide, membuat produk digital dari rumah, dan menjualnya lewat toko Lynk.id tanpa modal',
    category: 'E-book' as DigitalProductCategory,
    audience: 'Pemula yang ingin memulai bisnis digital mandiri dari rumah',
    style: 'Modern Elegant' as DigitalProductStyle
  },
  {
    title: 'Worksheet Finansial & Pengatur Anggaran Bulanan',
    idea: 'Lembar kerja perencanaan keuangan keluarga, pelacak utang dan tabungan bulanan yang praktis dan mudah dipahami',
    category: 'Worksheet' as DigitalProductCategory,
    audience: 'Ibu rumah tangga produktif dan karyawan muda',
    style: 'Minimalist' as DigitalProductStyle
  },
  {
    title: 'Buku Mewarnai Mandalas & Hewan Lucu untuk Relaksasi',
    idea: 'Koleksi 40 gambar mewarnai resolusi tinggi dengan tema hewan hutan dan pola mandala anti-stres siap cetak',
    category: 'Coloring Book' as DigitalProductCategory,
    audience: 'Orang dewasa yang butuh art therapy dan orang tua untuk anak-anak',
    style: 'Cute and Colorful' as DigitalProductStyle
  }
];

export const DigitalProductModule: React.FC<DigitalProductModuleProps> = ({ 
  onSaveToVault,
  onAutoSaveHistory,
  onOpenInReelsStudio 
}) => {
  // Form States
  const [productIdea, setProductIdea] = useState(
    'Koleksi 50+ template feed & carousel Instagram Canva siap edit untuk brand fashion, skincare, dan UMKM estetik'
  );
  const [category, setCategory] = useState<DigitalProductCategory>('Canva Template');
  const [targetAudience, setTargetAudience] = useState(
    'Pemilik brand UMKM, admin media sosial, konten kreator, dan reseller online'
  );
  const [designStyle, setDesignStyle] = useState<DigitalProductStyle>('Luxury Pink Gold');

  // Generation & UI States
  const [generatedBlueprint, setGeneratedBlueprint] = useState<string>('');
  const [lastParams, setLastParams] = useState<{
    productIdea: string;
    category: DigitalProductCategory;
    targetAudience: string;
    designStyle: DigitalProductStyle;
  } | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedLynkid, setCopiedLynkid] = useState<boolean>(false);
  const [savedToVault, setSavedToVault] = useState<boolean>(false);

  // Apply Quick Sample
  const handleApplySample = (sample: typeof SAMPLE_IDEAS[0]) => {
    setProductIdea(sample.idea);
    setCategory(sample.category);
    setTargetAudience(sample.audience);
    setDesignStyle(sample.style);
    setErrorMessage(null);
  };

  // Clear Form
  const handleClear = () => {
    setProductIdea('');
    setCategory('Canva Template');
    setTargetAudience('');
    setDesignStyle('Luxury Pink Gold');
    setGeneratedBlueprint('');
    setLastParams(null);
    setErrorMessage(null);
    setSavedToVault(false);
  };

  // Extract Lynk.id section for quick copy button
  const extractLynkidSection = (fullText: string) => {
    const marker = 'Khusus Deskripsi Listing Toko Digital Lynk.id';
    const idx = fullText.indexOf(marker);
    if (idx !== -1) {
      return fullText.slice(idx).replace(/^.*?\n/, '').trim();
    }
    return fullText;
  };

  // API Call
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!productIdea.trim()) {
      setErrorMessage('Silakan isi ide atau topik produk digital yang ingin Anda buat.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSavedToVault(false);

    try {
      const response = await fetch('/api/digital-product/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productIdea: productIdea.trim(),
          category,
          targetAudience: targetAudience.trim(),
          designStyle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal menghasilkan blueprint produk digital.');
      }

      setGeneratedBlueprint(data.result);
      setLastParams({
        productIdea: productIdea.trim(),
        category,
        targetAudience: targetAudience.trim(),
        designStyle,
      });

      // Auto save to persistent history
      if (onAutoSaveHistory) {
        onAutoSaveHistory({
          moduleId: 'digital_product',
          title: productIdea.trim().slice(0, 50) + (productIdea.length > 50 ? '...' : ''),
          subtitle: `Produk Digital ${category} (${designStyle})`,
          content: data.result,
          metadata: {
            category,
            designStyle,
            targetAudience: targetAudience.trim(),
            tags: ['Digital Product', category, designStyle, 'Lynk.id Ready'],
            stats: {
              'Kategori': category,
              'Gaya Desain': designStyle,
              'Model': data.model || 'gemini-3.8-flash'
            }
          }
        });
      }

      // Smooth scroll to output
      setTimeout(() => {
        const el = document.getElementById('digital-product-output-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Digital Product Generation Error:', err);
      setErrorMessage(err.message || 'Terjadi gangguan jaringan saat memproses permintaan.');
    } finally {
      setIsLoading(false);
    }
  };

  // Regenerate
  const handleRegenerate = () => {
    if (lastParams) {
      setProductIdea(lastParams.productIdea);
      setCategory(lastParams.category);
      setTargetAudience(lastParams.targetAudience);
      setDesignStyle(lastParams.designStyle);
    }
    handleGenerate();
  };

  // Copy All to clipboard
  const handleCopyAll = async () => {
    if (!generatedBlueprint) return;
    try {
      await navigator.clipboard.writeText(generatedBlueprint);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  };

  // Copy Lynk.id section specifically
  const handleCopyLynkid = async () => {
    if (!generatedBlueprint) return;
    try {
      const lynkidText = extractLynkidSection(generatedBlueprint);
      await navigator.clipboard.writeText(lynkidText);
      setCopiedLynkid(true);
      setTimeout(() => setCopiedLynkid(false), 2500);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  };

  // Save to Vault
  const handleSave = () => {
    if (!generatedBlueprint || !onSaveToVault) return;
    onSaveToVault({
      title: productIdea ? productIdea.slice(0, 45) + '...' : 'Produk Digital SAS AI',
      category: `Digital Product · ${category}`,
      content: generatedBlueprint,
    });
    setSavedToVault(true);
    setTimeout(() => setSavedToVault(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#E5AA9C]/10 via-[#C98B94]/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-semibold tracking-wider uppercase mb-1">
              <Layers className="w-3.5 h-3.5 text-[#E5AA9C]" />
              <span>AI Digital Product Creation Assistant · Module 06</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
              AI Digital Product Creator
            </h1>
            <p className="text-xs sm:text-sm text-[#DCD4CA]/80 mt-1 max-w-2xl leading-relaxed">
              Ciptakan produk digital komersial siap monetisasi: judul & konsep produk, struktur isi lengkap, copywriting jualan persuasif, headline promosi, rekomendasi harga jual, ide marketing, serta deskripsi listing toko digital <strong>Lynk.id</strong> siap salin.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-[11px] font-mono text-[#FAF7F2] bg-[#0C0C10] px-3.5 py-1.5 rounded-lg border border-[#E5AA9C]/30 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-[#E5AA9C]" />
              <span>Gemini 3.8 Flash</span>
            </span>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="pt-3 border-t border-[#FAF7F2]/10 mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-[#DCD4CA]/70 flex items-center gap-1.5">
              <Wand2 className="w-3 h-3 text-[#E5AA9C]" />
              Pilih Ide Produk Digital Cepat:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {SAMPLE_IDEAS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplySample(sample)}
                className="text-left p-2.5 rounded-xl border border-[#E5AA9C]/15 bg-[#0C0C10]/80 hover:bg-[#1C1A24] hover:border-[#E5AA9C]/40 transition-all text-xs group"
              >
                <div className="font-semibold text-[#FAF7F2] group-hover:text-[#E5AA9C] truncate">
                  {sample.title}
                </div>
                <div className="text-[10px] text-[#DCD4CA]/60 flex items-center gap-1.5 mt-0.5">
                  <span className="text-[#E5AA9C]">{sample.category}</span>
                  <span>•</span>
                  <span>{sample.style}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Configuration Form */}
      <form 
        onSubmit={handleGenerate} 
        className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6"
      >
        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl flex items-start gap-3 text-red-200 text-xs sm:text-sm animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold">Perhatian</div>
              <p className="mt-0.5 text-red-300/90">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-200 text-xs px-2 py-1 rounded"
            >
              ✕
            </button>
          </div>
        )}

        {/* Section 1: Product Idea Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#E5AA9C]" />
              <label htmlFor="productIdeaInput" className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
                1. Ide Produk Digital (Product Idea) <span className="text-[#E5AA9C]">*</span>
              </label>
            </div>
            <span className="text-[11px] text-[#DCD4CA]/60 font-mono">
              {productIdea.length} karakter
            </span>
          </div>

          <textarea
            id="productIdeaInput"
            value={productIdea}
            onChange={(e) => setProductIdea(e.target.value)}
            rows={3}
            placeholder="Tuliskan ide produk digital Anda: topik apa yang dibahas, format yang diinginkan, atau kendala apa yang ingin Anda selesaikan untuk pembeli..."
            className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl p-3.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#DCD4CA]/40 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C]"
            required
          />
        </div>

        {/* Section 2: Category Selector (Exact requested 7 categories) */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-2">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#E5AA9C]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
                2. Kategori Produk (Product Category)
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#E5AA9C] bg-[#0C0C10] px-2.5 py-0.5 rounded border border-[#E5AA9C]/20">
              {category}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {CATEGORIES.map((cat) => {
              const active = category === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`text-left p-3 rounded-xl border transition-all min-h-[52px] flex flex-col justify-between ${
                    active
                      ? 'bg-gradient-to-br from-[#271E26] to-[#1E1925] border-[#E5AA9C] text-[#FAF7F2] shadow-md ring-1 ring-[#E5AA9C]/40'
                      : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2] hover:bg-[#15131C]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#E5AA9C]' : 'text-[#DCD4CA]/60'}`} />
                    <span className="text-xs font-semibold truncate">{cat.label}</span>
                  </div>
                  <p className="text-[10px] text-[#DCD4CA]/65 leading-tight line-clamp-2">
                    {cat.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Target Audience Input */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#E5AA9C]" />
              <label htmlFor="targetAudienceInput" className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
                3. Target Audiens (Target Audience)
              </label>
            </div>
            <span className="text-[11px] text-[#DCD4CA]/60 font-mono">
              Opsional
            </span>
          </div>

          <input
            id="targetAudienceInput"
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="Contoh: Pemilik brand UMKM, admin online shop, freelancer, mahasiswa, ibu rumah tangga"
            className="w-full min-h-[44px] bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#DCD4CA]/40 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C]"
          />

          {/* Quick Audience Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] text-[#DCD4CA]/60 mr-1">Rekomendasi audiens cepat:</span>
            {[
              'Pemilik Brand UMKM & Online Shop',
              'Kreator Konten & Influencer',
              'Freelancer Desain & Copywriter',
              'Karyawan & Job Seeker',
              'Ibu Rumah Tangga Produktif',
              'Guru & Pendidik'
            ].map((aud) => (
              <button
                key={aud}
                type="button"
                onClick={() => setTargetAudience(aud)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                  targetAudience === aud
                    ? 'bg-[#E5AA9C]/20 border-[#E5AA9C] text-[#FAF7F2]'
                    : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2]'
                }`}
              >
                {aud}
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Product Style Selector (Exact requested 5 styles) */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-2">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#E5AA9C]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
                4. Gaya Tampilan Produk (Product Style)
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#E5AA9C] bg-[#0C0C10] px-2.5 py-0.5 rounded border border-[#E5AA9C]/20">
              {designStyle}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {STYLES.map((st) => {
              const active = designStyle === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setDesignStyle(st.id)}
                  className={`text-left p-3 rounded-xl border transition-all min-h-[52px] flex items-start gap-2.5 ${
                    active
                      ? 'bg-gradient-to-br from-[#271E26] to-[#1E1925] border-[#E5AA9C] text-[#FAF7F2] shadow-md ring-1 ring-[#E5AA9C]/40'
                      : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2] hover:bg-[#15131C]'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${st.colorDot} shrink-0 mt-0.5 border border-white/20`} />
                  <div className="flex-1">
                    <div className="font-semibold text-xs text-[#FAF7F2]">
                      {st.label}
                    </div>
                    <p className="text-[10px] text-[#DCD4CA]/65 leading-tight mt-0.5">
                      {st.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Blueprint Deliverables Checklist */}
        <div className="p-3.5 bg-[#0C0C10]/80 rounded-xl border border-[#E5AA9C]/20 text-xs text-[#DCD4CA]/85 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-[#E5AA9C]">
            <Sparkles className="w-4 h-4" />
            <span>Fitur Lengkap yang Dihasilkan Gemini AI:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#DCD4CA]/80">
            <div>✓ Nama & Judul Produk</div>
            <div>✓ Konsep Produk Nyata</div>
            <div>✓ Isi & Struktur Lengkap</div>
            <div>✓ Deskripsi Penjualan AIDA</div>
            <div>✓ Headline Promosi Menjual</div>
            <div>✓ Rentang Harga Rekomendasi</div>
            <div>✓ Ide Pemasaran & Launch</div>
            <div className="text-[#E5AA9C] font-semibold">✓ Khusus Listing Lynk.id</div>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="w-full sm:w-auto min-h-[44px] px-4 py-2 text-xs font-semibold text-[#DCD4CA]/70 hover:text-[#FAF7F2] hover:bg-[#1E1C27] rounded-xl border border-[#E5AA9C]/20 transition-all flex items-center justify-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Bersihkan Formulir</span>
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto min-h-[44px] px-8 py-3 bg-gradient-to-r from-[#9A5A65] via-[#B76E79] to-[#E5AA9C] hover:opacity-95 text-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#E5AA9C]/10 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#FAF7F2]" />
                <span>Membuat Produk Digital & Listing Lynk.id...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#FAF7F2]" />
                <span>Generate Digital Product</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Loading Banner */}
      {isLoading && (
        <div className="bg-[#14131A] border border-[#E5AA9C]/30 rounded-2xl p-8 sm:p-12 text-center shadow-xl flex flex-col items-center justify-center animate-pulse">
          <div className="w-12 h-12 rounded-full border-2 border-[#E5AA9C] border-t-transparent animate-spin mb-4" />
          <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">
            Merancang Produk Digital & Deskripsi Lynk.id...
          </h3>
          <p className="text-xs text-[#DCD4CA]/70 mt-1 max-w-md">
            Menyusun nama produk, struktur isi {category}, sales copy, rekomendasi harga, serta format deskripsi toko Lynk.id siap jual.
          </p>
        </div>
      )}

      {/* Generated Result Output Box */}
      {generatedBlueprint && !isLoading && (
        <section 
          id="digital-product-output-section"
          aria-label="Hasil Cetak Biru Produk Digital SAS AI" 
          className="bg-[#14131A] border border-[#E5AA9C]/30 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          {/* Header of Output Box */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FAF7F2]/10">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-semibold tracking-wider uppercase">
                <Layers className="w-3.5 h-3.5" />
                <span>Cetak Biru Produk Digital & Listing Toko Siap Jual</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2] mt-0.5">
                {productIdea.slice(0, 50)}{productIdea.length > 50 ? '...' : ''}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#DCD4CA]/70 mt-1 font-mono">
                <span className="bg-[#0C0C10] px-2 py-0.5 rounded border border-[#E5AA9C]/20 text-[#FAF7F2]">
                  {category}
                </span>
                <span>•</span>
                <span className="text-[#E5AA9C]">{designStyle}</span>
                {targetAudience && (
                  <>
                    <span>•</span>
                    <span>{targetAudience}</span>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons: Copy All, Copy Lynk.id, Regenerate, Save to Vault */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLynkid}
                className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-[#FAF7F2] bg-[#1E1926] hover:bg-[#282133] rounded-xl border border-[#E5AA9C]/40 hover:border-[#E5AA9C] transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                title="Salin bagian khusus deskripsi listing Lynk.id"
              >
                {copiedLynkid ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Lynk.id Tersalin!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#E5AA9C]" />
                    <span>Salin Lynk.id</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyAll}
                className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-[#FAF7F2] bg-[#0C0C10] hover:bg-[#1E1C27] rounded-xl border border-[#E5AA9C]/30 hover:border-[#E5AA9C] transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#E5AA9C]" />
                    <span>Salin Semua</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleRegenerate}
                className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-[#DCD4CA]/80 hover:text-[#FAF7F2] bg-[#0C0C10] hover:bg-[#1E1C27] rounded-xl border border-[#E5AA9C]/20 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <RefreshCw className="w-4 h-4 text-[#E5AA9C]" />
                <span>Regenerate</span>
              </button>

              {onSaveToVault && (
                <button
                  type="button"
                  onClick={handleSave}
                  className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-[#FAF7F2] bg-gradient-to-r from-[#9A5A65] to-[#B76E79] hover:opacity-95 rounded-xl border border-[#E5AA9C]/30 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  {savedToVault ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-emerald-300" />
                      <span>Tersimpan di Vault</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-[#FAF7F2]" />
                      <span>Simpan ke Vault</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Readable Output Box */}
          <div className="bg-[#0C0C10] border border-[#E5AA9C]/20 rounded-xl p-4 sm:p-5 overflow-x-auto">
            <div className="font-sans text-xs sm:text-sm text-[#FAF7F2]/95 leading-relaxed whitespace-pre-wrap select-text">
              {generatedBlueprint}
            </div>
          </div>

          {/* Footer of Output Box */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#DCD4CA]/70 border-t border-[#FAF7F2]/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Lengkap dengan rentang harga jual & format listing toko Lynk.id</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopyLynkid}
                className="text-[#E5AA9C] hover:underline font-semibold flex items-center gap-1"
              >
                <span>{copiedLynkid ? 'Deskripsi Lynk.id tersalin' : 'Salin format Lynk.id'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI Image & Video MP4 Generator for this Digital Product */}
          <div className="pt-3">
            <MediaActionCard
              sourceModule="digital_product"
              title={`Produk Digital: ${productIdea.slice(0, 45)}`}
              subtitle={`${category} · Desain ${designStyle}`}
              content={generatedBlueprint}
              onOpenInReelsStudio={onOpenInReelsStudio as any}
              onAutoSaveToHistory={(mediaData) => {
                onAutoSaveHistory?.({
                  moduleId: 'digital_product',
                  title: `Media Produk Digital: ${productIdea.slice(0, 35)}`,
                  subtitle: `Media visual & video MP4 untuk produk digital ${productIdea.slice(0, 30)}`,
                  content: generatedBlueprint,
                  metadata: {
                    category,
                    designStyle,
                    mediaData,
                    tags: ['Digital Product', 'AI Media', category]
                  }
                });
              }}
            />
          </div>

        </section>
      )}

      {/* Standalone Visual & Video Generator Section if no blueprint generated yet */}
      {!generatedBlueprint && !isLoading && (
        <div className="pt-2">
          <MediaActionCard
            sourceModule="digital_product"
            title={`Visual Produk Digital: ${productIdea.slice(0, 45)}`}
            subtitle={`Visual AI & Reels MP4 · ${category}`}
            content={productIdea}
            onOpenInReelsStudio={onOpenInReelsStudio as any}
            onAutoSaveToHistory={(mediaData) => {
              onAutoSaveHistory?.({
                moduleId: 'digital_product',
                title: `Visual Produk Digital: ${productIdea.slice(0, 35)}`,
                subtitle: `Visual AI & Reels MP4 · ${category}`,
                content: productIdea,
                metadata: {
                  category,
                  designStyle,
                  mediaData,
                  tags: ['Digital Product', 'AI Media', category]
                }
              });
            }}
          />
        </div>
      )}

    </div>
  );
};
