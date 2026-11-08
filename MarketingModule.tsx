import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Sparkles, 
  Wand2, 
  Copy, 
  Check, 
  Trash2, 
  RefreshCw, 
  AlertCircle, 
  Bookmark, 
  BookmarkCheck,
  DollarSign,
  Share2,
  Megaphone,
  Compass,
  Layers,
  ArrowRight,
  Eye,
  ShoppingBag,
  Rocket,
  Users2
} from 'lucide-react';
import { MediaActionCard } from '../MediaActionCard';

export type MarketingObjective = 
  | 'Increase Product Awareness'
  | 'Increase Sales'
  | 'Build Brand Identity'
  | 'Launch a New Product'
  | 'Grow Social Media Audience';

export type MarketingPlatform = 
  | 'Facebook'
  | 'TikTok'
  | 'Instagram'
  | 'WhatsApp'
  | 'Multiple Platforms';

export type MarketingStrategy = 
  | 'Organic Marketing'
  | 'Content Marketing'
  | 'Promotional Campaign'
  | 'Product Launch Strategy'
  | 'Brand Building';

interface MarketingModuleProps {
  onSaveToVault?: (item: { title: string; category: string; content: string }) => void;
  onAutoSaveHistory?: (item: {
    moduleId: 'marketing';
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

const OBJECTIVES: { id: MarketingObjective; label: string; desc: string; icon: typeof Eye }[] = [
  {
    id: 'Increase Product Awareness',
    label: 'Product Awareness',
    desc: 'Menjangkau audiens baru dan membangun popularitas merek',
    icon: Eye
  },
  {
    id: 'Increase Sales',
    label: 'Increase Sales',
    desc: 'Fokus konversi langsung, penawaran menarik, dan ROI tinggi',
    icon: ShoppingBag
  },
  {
    id: 'Build Brand Identity',
    label: 'Brand Identity',
    desc: 'Membentuk persepsi mewah, kredibilitas, dan diferensiasi pasar',
    icon: Compass
  },
  {
    id: 'Launch a New Product',
    label: 'Launch New Product',
    desc: 'Rangkaian teaser, pre-order, dan peluncuran produk resmi',
    icon: Rocket
  },
  {
    id: 'Grow Social Media Audience',
    label: 'Grow Audience',
    desc: 'Meningkatkan pengikut setia, engagement, dan komunitas aktif',
    icon: Users2
  },
];

const PLATFORMS: { id: MarketingPlatform; label: string; icon: string; desc: string }[] = [
  { id: 'Facebook', label: 'Facebook', icon: '📘', desc: 'Komunitas grup, post panjang & audiens matang' },
  { id: 'TikTok', label: 'TikTok', icon: '🎵', desc: 'Video vertikal viral, tren audio & algoritma FYP' },
  { id: 'Instagram', label: 'Instagram', icon: '📸', desc: 'Estetika visual, Reels, Stories & interaksi DM' },
  { id: 'WhatsApp', label: 'WhatsApp', icon: '💬', desc: 'Closing personal, database kontak & broadcast list' },
  { id: 'Multiple Platforms', label: 'Multi-Platform', icon: '🌐', desc: 'Sinergi lintas saluran terintegrasi (Omnichannel)' },
];

const STRATEGIES: { id: MarketingStrategy; label: string; desc: string }[] = [
  { id: 'Organic Marketing', label: 'Organic Marketing', desc: 'Pertumbuhan alami tanpa biaya iklan lewat SEO & interaksi komunitas' },
  { id: 'Content Marketing', label: 'Content Marketing', desc: 'Edukasi bernilai tinggi, solusi masalah & pilar konten konsisten' },
  { id: 'Promotional Campaign', label: 'Promotional Campaign', desc: 'Diskon terbatas, bundling hemat, flash sale & urgensi' },
  { id: 'Product Launch Strategy', label: 'Product Launch Strategy', desc: 'Fase Teaser (H-7), Grand Launching & momentum purna jual' },
  { id: 'Brand Building', label: 'Brand Building', desc: 'Narasi brand storytelling, nilai emosional & loyalitas jangka panjang' },
];

const SAMPLE_MARKETING_CASES = [
  {
    title: 'E-Book Panduan Desain Grafis Canva',
    productName: 'E-Book Masterclass Canva Pro & AI Design',
    desc: 'E-book digital 120 halaman berisi panduan membuat konten visual media sosial profesional dengan template siap pakai dan trik AI generatif untuk pebisnis pemula.',
    price: 'Rp 99.000',
    objective: 'Increase Sales' as MarketingObjective,
    platform: 'Instagram' as MarketingPlatform,
    strategy: 'Content Marketing' as MarketingStrategy
  },
  {
    title: 'Brand Hijab Satin Sutra Premium',
    productName: 'Zahara Silk Scarf Exclusive Edition',
    desc: 'Hijab segi empat berbahan sutra satin doff mewah dengan motif watercolor eksklusif, adem di kepala, tegak di dahi, dan dilengkapi kotak kemasan rose gold.',
    price: 'Rp 185.000',
    objective: 'Build Brand Identity' as MarketingObjective,
    platform: 'TikTok' as MarketingPlatform,
    strategy: 'Brand Building' as MarketingStrategy
  },
  {
    title: 'Kopi Susu Gula Aren Literan UMKM',
    productName: 'Kopi Janji Teman 1 Liter Family Size',
    desc: 'Minuman kopi susu gula aren botol 1 liter menggunakan espresso murni double shot arabika-robusta dan susu segar berkualitas, tahan 5 hari di kulkas.',
    price: 'Rp 65.000',
    objective: 'Grow Social Media Audience' as MarketingObjective,
    platform: 'WhatsApp' as MarketingPlatform,
    strategy: 'Promotional Campaign' as MarketingStrategy
  }
];

export const MarketingModule: React.FC<MarketingModuleProps> = ({ 
  onSaveToVault, 
  onAutoSaveHistory,
  onOpenInReelsStudio 
}) => {
  // Form States
  const [productName, setProductName] = useState('E-Book Masterclass Canva Pro & AI Design');
  const [productDescription, setProductDescription] = useState(
    'E-book digital 120 halaman berisi panduan membuat konten visual media sosial profesional dengan template siap pakai dan trik AI generatif untuk pebisnis pemula.'
  );
  const [productPrice, setProductPrice] = useState('Rp 99.000');
  const [objective, setObjective] = useState<MarketingObjective>('Increase Sales');
  const [platform, setPlatform] = useState<MarketingPlatform>('Instagram');
  const [strategy, setStrategy] = useState<MarketingStrategy>('Content Marketing');

  // Generation & UI States
  const [generatedPlan, setGeneratedPlan] = useState<string>('');
  const [lastParams, setLastParams] = useState<{
    productName: string;
    productDescription: string;
    productPrice: string;
    objective: MarketingObjective;
    platform: MarketingPlatform;
    strategy: MarketingStrategy;
  } | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedToVault, setSavedToVault] = useState<boolean>(false);

  // Apply Quick Sample
  const handleApplySample = (sample: typeof SAMPLE_MARKETING_CASES[0]) => {
    setProductName(sample.productName);
    setProductDescription(sample.desc);
    setProductPrice(sample.price);
    setObjective(sample.objective);
    setPlatform(sample.platform);
    setStrategy(sample.strategy);
    setErrorMessage(null);
  };

  // Clear Form
  const handleClear = () => {
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setObjective('Increase Sales');
    setPlatform('Instagram');
    setStrategy('Content Marketing');
    setGeneratedPlan('');
    setLastParams(null);
    setErrorMessage(null);
    setSavedToVault(false);
  };

  // API Call
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!productName.trim()) {
      setErrorMessage('Silakan isi nama produk atau bisnis Anda.');
      return;
    }
    if (!productDescription.trim()) {
      setErrorMessage('Silakan jelaskan deskripsi produk atau penawaran Anda.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSavedToVault(false);

    try {
      const response = await fetch('/api/marketing/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: productName.trim(),
          productDescription: productDescription.trim(),
          productPrice: productPrice.trim(),
          objective,
          platform,
          strategy,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal menghasilkan rencana pemasaran.');
      }

      setGeneratedPlan(data.result);
      setLastParams({
        productName: productName.trim(),
        productDescription: productDescription.trim(),
        productPrice: productPrice.trim(),
        objective,
        platform,
        strategy,
      });

      if (onAutoSaveHistory) {
        onAutoSaveHistory({
          moduleId: 'marketing',
          title: `Marketing · ${productName.trim()}`,
          subtitle: `${strategy} on ${platform} (${objective})`,
          content: data.result,
          metadata: {
            objective,
            platform,
            strategy,
            productPrice: productPrice.trim(),
            tags: ['Marketing Strategy', platform, strategy, '7-Day Plan', 'Gemini 3.8 Flash'],
            stats: {
              'Tujuan': objective,
              'Platform': platform,
              'Strategi': strategy,
              'Harga': productPrice.trim(),
              'Model AI': data.model || 'gemini-3.8-flash'
            }
          }
        });
      }

      // Smooth scroll to output
      setTimeout(() => {
        const el = document.getElementById('marketing-output-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Marketing Generation Error:', err);
      setErrorMessage(err.message || 'Terjadi gangguan jaringan saat memproses permintaan.');
    } finally {
      setIsLoading(false);
    }
  };

  // Regenerate
  const handleRegenerate = () => {
    if (lastParams) {
      setProductName(lastParams.productName);
      setProductDescription(lastParams.productDescription);
      setProductPrice(lastParams.productPrice);
      setObjective(lastParams.objective);
      setPlatform(lastParams.platform);
      setStrategy(lastParams.strategy);
    }
    handleGenerate();
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (!generatedPlan) return;
    try {
      await navigator.clipboard.writeText(generatedPlan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  };

  // Save to Vault
  const handleSave = () => {
    if (!generatedPlan || !onSaveToVault) return;
    onSaveToVault({
      title: productName || 'Strategi Pemasaran SAS AI',
      category: `Marketing · ${objective}`,
      content: generatedPlan,
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
              <TrendingUp className="w-3.5 h-3.5 text-[#E5AA9C]" />
              <span>Full-Funnel Growth Architecture</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
              AI Marketing Strategy Assistant
            </h1>
            <p className="text-xs sm:text-sm text-[#DCD4CA]/80 mt-1 max-w-2xl leading-relaxed">
              Rancang rencana pemasaran strategis siap eksekusi untuk produk digital dan bisnis UMKM: analisis target pasar, positioning produk, ide konten, copywriting naskah, kalender 7 hari, dan formula Call to Action.
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
              Contoh Studi Kasus Pemasaran Siap Pakai:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SAMPLE_MARKETING_CASES.map((sample, idx) => (
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
                  <span>{sample.price}</span>
                  <span>•</span>
                  <span>{sample.platform}</span>
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

        {/* Section 1: Product Basics & Price */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#FAF7F2]/10 pb-2">
            <Layers className="w-4 h-4 text-[#E5AA9C]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
              1. Informasi Produk, Bisnis & Harga
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#FAF7F2] mb-1.5">
                Nama Produk atau Bisnis <span className="text-[#E5AA9C]">*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Contoh: E-Book Canva Pro & AI, Scarf Sutra Zahara, atau Kopi Literan"
                className="w-full min-h-[44px] bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#DCD4CA]/40 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FAF7F2] mb-1.5 flex items-center justify-between">
                <span>Harga Produk</span>
                <span className="text-[10px] text-[#DCD4CA]/60 font-mono">Format bebas</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#E5AA9C]">
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="Contoh: Rp 99.000 / $29"
                  className="w-full min-h-[44px] bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl pl-8 pr-3.5 py-2.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#DCD4CA]/40 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C]"
                />
              </div>
            </div>
          </div>

          {/* Quick Price Suggestion Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] text-[#DCD4CA]/60 mr-1">Rekomendasi harga cepat:</span>
            {['Gratis (Lead Magnet)', 'Rp 49.000', 'Rp 99.000', 'Rp 149.000', 'Rp 299.000', 'Rp 499.000', 'Harga Kustom'].map((pr) => (
              <button
                key={pr}
                type="button"
                onClick={() => setProductPrice(pr === 'Harga Kustom' ? '' : pr)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                  productPrice === pr
                    ? 'bg-[#E5AA9C]/20 border-[#E5AA9C] text-[#FAF7F2]'
                    : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2]'
                }`}
              >
                {pr}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#FAF7F2] mb-1.5">
              Deskripsi Produk atau Penawaran <span className="text-[#E5AA9C]">*</span>
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={3}
              placeholder="Jelaskan fitur utama, manfaat spesifik bagi pembeli, isi paket, atau apa yang membedakannya dengan produk kompetitor..."
              className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl p-3.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#DCD4CA]/40 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C]"
              required
            />
            <div className="flex justify-between items-center text-[11px] text-[#DCD4CA]/60 mt-1">
              <span>Sertakan nilai manfaat utama dan keunikan produk</span>
              <span>{productDescription.length} karakter</span>
            </div>
          </div>
        </div>

        {/* Section 2: Marketing Objective Selector */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#E5AA9C]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
                2. Sasaran Pemasaran Utama (Marketing Objective)
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#E5AA9C] bg-[#0C0C10] px-2.5 py-0.5 rounded border border-[#E5AA9C]/20">
              {objective}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {OBJECTIVES.map((obj) => {
              const active = objective === obj.id;
              const Icon = obj.icon;
              return (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => setObjective(obj.id)}
                  className={`text-left p-3 rounded-xl border transition-all min-h-[48px] flex flex-col justify-between ${
                    active
                      ? 'bg-gradient-to-br from-[#271E26] to-[#1E1925] border-[#E5AA9C] text-[#FAF7F2] shadow-md ring-1 ring-[#E5AA9C]/40'
                      : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2] hover:bg-[#15131C]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-[#E5AA9C]' : 'text-[#DCD4CA]/60'}`} />
                    <span className="text-xs font-semibold">{obj.label}</span>
                  </div>
                  <p className="text-[10px] text-[#DCD4CA]/65 leading-tight line-clamp-2">
                    {obj.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Platform Selector */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-2">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#E5AA9C]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
                3. Saluran Promosi Pilihan (Platform)
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#E5AA9C] bg-[#0C0C10] px-2.5 py-0.5 rounded border border-[#E5AA9C]/20">
              {platform}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {PLATFORMS.map((plat) => {
              const active = platform === plat.id;
              return (
                <button
                  key={plat.id}
                  type="button"
                  onClick={() => setPlatform(plat.id)}
                  className={`text-left p-3 rounded-xl border transition-all min-h-[48px] flex flex-col justify-between ${
                    active
                      ? 'bg-gradient-to-br from-[#271E26] to-[#1E1925] border-[#E5AA9C] text-[#FAF7F2] shadow-md ring-1 ring-[#E5AA9C]/40'
                      : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2] hover:bg-[#15131C]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{plat.icon}</span>
                    <span className="text-xs font-semibold">{plat.label}</span>
                  </div>
                  <p className="text-[10px] text-[#DCD4CA]/65 leading-tight line-clamp-2">
                    {plat.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Marketing Strategy Selector */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-2">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#E5AA9C]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
                4. Pendekatan Strategi Pemasaran (Marketing Strategy)
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#E5AA9C] bg-[#0C0C10] px-2.5 py-0.5 rounded border border-[#E5AA9C]/20">
              {strategy}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {STRATEGIES.map((strat) => {
              const active = strategy === strat.id;
              return (
                <button
                  key={strat.id}
                  type="button"
                  onClick={() => setStrategy(strat.id)}
                  className={`text-left p-3 rounded-xl border transition-all min-h-[48px] flex flex-col justify-between ${
                    active
                      ? 'bg-gradient-to-br from-[#271E26] to-[#1E1925] border-[#E5AA9C] text-[#FAF7F2] shadow-md ring-1 ring-[#E5AA9C]/40'
                      : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2] hover:bg-[#15131C]'
                  }`}
                >
                  <div className="font-semibold text-xs text-[#FAF7F2] mb-1">
                    {strat.label}
                  </div>
                  <p className="text-[10px] text-[#DCD4CA]/65 leading-tight line-clamp-2">
                    {strat.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Strategic Inclusions Highlights */}
        <div className="p-3.5 bg-[#0C0C10]/80 rounded-xl border border-[#E5AA9C]/20 text-xs text-[#DCD4CA]/85 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-[#E5AA9C]">
            <Calendar className="w-4 h-4" />
            <span>Output Blueprint Pemasaran Lengkap yang Dihasilkan:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-[#DCD4CA]/80">
            <div>✓ Profil Target Audiens & Pain Points</div>
            <div>✓ Positioning Produk & Justifikasi Harga</div>
            <div>✓ Ide Konten Kreatif Terarah</div>
            <div>✓ Contoh Caption Soft & Hard-selling</div>
            <div>✓ Formula 3 Variasi Call to Action</div>
            <div>✓ Kalender Pemasaran 7 Hari Penuh</div>
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
                <span>Merancang Strategi Pemasaran...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#FAF7F2]" />
                <span>Generate Marketing Strategy</span>
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
            Menganalisis Pasar & Menyusun Kalender 7 Hari...
          </h3>
          <p className="text-xs text-[#DCD4CA]/70 mt-1 max-w-md">
            Mengharmonisasikan formula positioning {productName}, sudut pandang konten untuk {platform}, serta jadwal promosi harian berkonversi tinggi.
          </p>
        </div>
      )}

      {/* Generated Result Output Box */}
      {generatedPlan && !isLoading && (
        <section 
          id="marketing-output-section"
          aria-label="Hasil Strategi Pemasaran SAS AI" 
          className="bg-[#14131A] border border-[#E5AA9C]/30 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          {/* Header of Output Box */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FAF7F2]/10">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-semibold tracking-wider uppercase">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Blueprint Rencana Pemasaran Siap Pakai</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2] mt-0.5">
                {productName}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#DCD4CA]/70 mt-1 font-mono">
                <span className="bg-[#0C0C10] px-2 py-0.5 rounded border border-[#E5AA9C]/20 text-[#FAF7F2]">
                  {objective}
                </span>
                <span>•</span>
                <span className="text-[#E5AA9C]">{platform}</span>
                <span>•</span>
                <span>{strategy}</span>
                {productPrice && (
                  <>
                    <span>•</span>
                    <span className="text-[#FAF7F2] font-semibold">{productPrice}</span>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons: Copy, Regenerate, Save to Vault */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-[#FAF7F2] bg-[#0C0C10] hover:bg-[#1E1C27] rounded-xl border border-[#E5AA9C]/30 hover:border-[#E5AA9C] transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#E5AA9C]" />
                    <span>Salin Rencana</span>
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
              {generatedPlan}
            </div>
          </div>

          {/* Footer of Output Box */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#DCD4CA]/70 border-t border-[#FAF7F2]/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Strategi siap pakai · Kalender 7 hari & formula caption lengkap</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="text-[#E5AA9C] hover:underline font-semibold flex items-center gap-1"
              >
                <span>{copied ? 'Berhasil disalin ke clipboard' : 'Salin seluruh naskah'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI Image & Video MP4 Generator for this Marketing Plan */}
          <div className="pt-3">
            <MediaActionCard
              sourceModule="marketing"
              title={`Kampanye Marketing: ${productName}`}
              subtitle={`${objective} · Strategi ${strategy}`}
              content={generatedPlan}
              onOpenInReelsStudio={onOpenInReelsStudio as any}
              onAutoSaveToHistory={(mediaData) => {
                onAutoSaveHistory?.({
                  moduleId: 'marketing',
                  title: `Media Marketing: ${productName}`,
                  subtitle: `Media visual & video MP4 untuk strategi marketing ${productName}`,
                  content: generatedPlan,
                  metadata: {
                    objective,
                    platform,
                    strategy,
                    mediaData,
                    tags: ['Marketing', 'AI Media', strategy]
                  }
                });
              }}
            />
          </div>

        </section>
      )}

      {/* Standalone Visual & Video Generator Section if no plan generated yet */}
      {!generatedPlan && !isLoading && (
        <div className="pt-2">
          <MediaActionCard
            sourceModule="marketing"
            title={`Visual Marketing: ${productName}`}
            subtitle={`Visual AI & Reels MP4 · ${platform}`}
            content={productDescription}
            onOpenInReelsStudio={onOpenInReelsStudio as any}
            onAutoSaveToHistory={(mediaData) => {
              onAutoSaveHistory?.({
                moduleId: 'marketing',
                title: `Visual Marketing: ${productName}`,
                subtitle: `Visual AI & Reels MP4 · ${productName}`,
                content: productDescription,
                metadata: {
                  objective,
                  platform,
                  strategy,
                  mediaData,
                  tags: ['Marketing', 'AI Media', strategy]
                }
              });
            }}
          />
        </div>
      )}

    </div>
  );
};
