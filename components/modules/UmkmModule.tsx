import React, { useState } from 'react';
import { 
  Store, 
  Utensils, 
  Coffee, 
  Sparkles, 
  Wand2, 
  Copy, 
  Check, 
  Trash2, 
  RefreshCw, 
  AlertCircle, 
  Bookmark, 
  BookmarkCheck,
  Sun,
  Camera,
  Layers,
  ChefHat
} from 'lucide-react';
import { MediaActionCard } from '../MediaActionCard';

export type UmkmProductCategory = 
  | 'Food'
  | 'Drinks'
  | 'Snacks'
  | 'Desserts'
  | 'Traditional Food'
  | 'Coffee'
  | 'Other';

export type UmkmVisualTheme = 
  | 'Luxury Gold'
  | 'Minimalist Modern'
  | 'Korean Cafe'
  | 'Rustic Natural'
  | 'Fresh Colorful'
  | 'Premium Restaurant';

export type UmkmBackground = 
  | 'White Studio'
  | 'Wooden Table'
  | 'Cafe'
  | 'Restaurant'
  | 'Nature'
  | 'Custom';

export type UmkmLighting = 
  | 'Natural Light'
  | 'Softbox'
  | 'Golden Hour'
  | 'Cinematic';

interface UmkmModuleProps {
  onSaveToVault?: (item: { title: string; category: string; content: string }) => void;
  onAutoSaveHistory?: (item: {
    moduleId: 'umkm';
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

const CATEGORIES: { id: UmkmProductCategory; name: string }[] = [
  { id: 'Food', name: 'Food' },
  { id: 'Drinks', name: 'Drinks' },
  { id: 'Snacks', name: 'Snacks' },
  { id: 'Desserts', name: 'Desserts' },
  { id: 'Traditional Food', name: 'Traditional Food' },
  { id: 'Coffee', name: 'Coffee' },
  { id: 'Other', name: 'Other' },
];

const THEMES: { id: UmkmVisualTheme; name: string; desc: string; colors: string[] }[] = [
  { 
    id: 'Luxury Gold', 
    name: 'Luxury Gold', 
    desc: 'Aksen rose gold, piring keramik marmer & pencahayaan mewah',
    colors: ['#D4AF37', '#E5AA9C', '#FAF7F2', '#14131A']
  },
  { 
    id: 'Minimalist Modern', 
    name: 'Minimalist Modern', 
    desc: 'Latar travertine polos, ruang negatif lapang & fokus hidangan',
    colors: ['#FAF7F2', '#DCD4CA', '#C98B94', '#2B2A33']
  },
  { 
    id: 'Korean Cafe', 
    name: 'Korean Cafe', 
    desc: 'Estetika kafe Seoul yang bersih, pastel hangat & piring pastel chic',
    colors: ['#F5EFEB', '#E8C5C8', '#D49086', '#4A3E3D']
  },
  { 
    id: 'Rustic Natural', 
    name: 'Rustic Natural', 
    desc: 'Kayu jati berserat alami, daun pisang, rempah & kain karung linen',
    colors: ['#8B5A2B', '#A3B19B', '#F0EAE1', '#3D2817']
  },
  { 
    id: 'Fresh Colorful', 
    name: 'Fresh Colorful', 
    desc: 'Warna bahan segar menyala, potongan jeruk, herba & kontras tinggi',
    colors: ['#E5AA9C', '#68D391', '#F6AD55', '#FAF7F2']
  },
  { 
    id: 'Premium Restaurant', 
    name: 'Premium Restaurant', 
    desc: 'Standar Michelin star, plating artistik gourmet & suasana temaram',
    colors: ['#1C1A24', '#FAF7F2', '#B76E79', '#DCD4CA']
  },
];

const BACKGROUNDS: { id: UmkmBackground; name: string; desc: string }[] = [
  { id: 'White Studio', name: 'White Studio', desc: 'Latar putih bersih tanpa bayangan mengganggu' },
  { id: 'Wooden Table', name: 'Wooden Table', desc: 'Meja kayu jati bertekstur alami hangat' },
  { id: 'Cafe', name: 'Cafe', desc: 'Suasana interior kafe modern dengan bokeh lembut' },
  { id: 'Restaurant', name: 'Restaurant', desc: 'Interior restoran berkelas dan pencahayaan hangat' },
  { id: 'Nature', name: 'Nature', desc: 'Taman hijau alami, bebatuan & daun tropis' },
  { id: 'Custom', name: 'Custom', desc: 'Tuliskan lokasi latar spesifik pilihan Anda' },
];

const LIGHTINGS: { id: UmkmLighting; name: string; desc: string }[] = [
  { id: 'Natural Light', name: 'Natural Light', desc: 'Cahaya jendela pagi alami yang lembut dan menyegarkan' },
  { id: 'Softbox', name: 'Softbox', desc: 'Pencahayaan studio komersial merata dengan highlight terukur' },
  { id: 'Golden Hour', name: 'Golden Hour', desc: 'Sinar senja hangat keemasan dengan pantulan appetising' },
  { id: 'Cinematic', name: 'Cinematic', desc: 'Kontras dramatis moody chiaroscuro untuk sajian gourmet' },
];

const SAMPLE_PRODUCTS = [
  {
    title: 'Kopi Susu Gula Aren Artisan',
    category: 'Coffee' as UmkmProductCategory,
    description: 'Es kopi susu gula aren dengan lapisan gradasi espresso pekat, susu segar creamy, dan lelehan sirup gula aren di dasar gelas kaca tinggi dengan kondensasi embun dingin segar.',
    theme: 'Korean Cafe' as UmkmVisualTheme,
    background: 'Wooden Table' as UmkmBackground,
    lighting: 'Natural Light' as UmkmLighting,
  },
  {
    title: 'Rendang Daging Sapi Karamelisasi',
    category: 'Traditional Food' as UmkmProductCategory,
    description: 'Potongan daging sapi rendang empuk berwarna cokelat gelap pekat berminyak gurih, taburan bawang goreng renyah, dan cabai merah iris di atas piring tanah liat tradisional.',
    theme: 'Rustic Natural' as UmkmVisualTheme,
    background: 'Wooden Table' as UmkmBackground,
    lighting: 'Golden Hour' as UmkmLighting,
  },
  {
    title: 'Matcha Basque Burnt Cheesecake',
    category: 'Desserts' as UmkmProductCategory,
    description: 'Potongan kue keju matcha dengan permukaan terpanggang karamel gosong yang harum, bagian tengah lumer lembut (creamy molten center), dan taburan bubuk matcha hijau cerah.',
    theme: 'Minimalist Modern' as UmkmVisualTheme,
    background: 'Cafe' as UmkmBackground,
    lighting: 'Softbox' as UmkmLighting,
  },
  {
    title: 'Artisan Berry Sparkling Mocktail',
    category: 'Drinks' as UmkmProductCategory,
    description: 'Minuman mocktail segar warna gradasi merah delima dengan gelembung soda berbuih, garnish tangkai rosemary segar, irisan jeruk nipis, dan es batu kristal transparan berkilau.',
    theme: 'Fresh Colorful' as UmkmVisualTheme,
    background: 'White Studio' as UmkmBackground,
    lighting: 'Cinematic' as UmkmLighting,
  }
];

export const UmkmModule: React.FC<UmkmModuleProps> = ({ 
  onSaveToVault, 
  onAutoSaveHistory,
  onOpenInReelsStudio 
}) => {
  // 1. Product name input
  const [productName, setProductName] = useState('Es Kopi Susu Gula Aren Gayo');

  // 2. Product category
  const [category, setCategory] = useState<UmkmProductCategory>('Coffee');
  const [customCategory, setCustomCategory] = useState('');

  // 3. Product description input
  const [productDescription, setProductDescription] = useState(
    'Minuman kopi susu kekinian dengan gradasi 3 layer memikat: sirup gula aren kental di dasar, susu segar creamy di tengah, dan espresso arabika pekat di atas, disajikan dalam gelas kaca estetik dengan embun tetesan air dingin segar dan biji kopi berserakan rapi di sekitar.'
  );

  // 4. Visual themes
  const [theme, setTheme] = useState<UmkmVisualTheme>('Korean Cafe');

  // 5. Background selection
  const [background, setBackground] = useState<UmkmBackground>('Wooden Table');
  const [customBackground, setCustomBackground] = useState('Meja marmer putih travertine dengan taplak linen');

  // 6. Lighting selection
  const [lighting, setLighting] = useState<UmkmLighting>('Natural Light');

  // State management
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

  // 7 & 8. Generate AI Prompt button & Gemini API integration
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!productName.trim()) {
      setErrorMessage('Nama produk makanan atau minuman wajib diisi.');
      return;
    }

    if (!productDescription.trim()) {
      setErrorMessage('Deskripsi produk wajib diisi.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setIsSaved(false);

    try {
      const response = await fetch('/api/umkm/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: productName.trim(),
          category,
          customCategory: category === 'Other' ? customCategory.trim() : '',
          productDescription: productDescription.trim(),
          theme,
          background,
          customBackground: background === 'Custom' ? customBackground.trim() : '',
          lighting,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat memproses prompt UMKM.');
      }

      setGeneratedPrompt(data.result);
      if (data.model) {
        setActiveModel(data.model);
      }
      if (onAutoSaveHistory) {
        onAutoSaveHistory({
          moduleId: 'umkm',
          title: `UMKM · ${productName.trim()}`,
          subtitle: `F&B ${category} · ${theme} (${lighting})`,
          content: data.result,
          metadata: {
            category,
            theme,
            background,
            lighting,
            tags: ['UMKM', category, theme, 'Food Photography', 'Gemini 3.8 Flash'],
            stats: {
              'Kategori': category,
              'Tema Visual': theme,
              'Background': background,
              'Lighting': lighting,
              'Model AI': data.model || 'gemini-3.8-flash'
            }
          }
        });
      }
      showLocalToast('Prompt Foto Produk F&B berhasil dibuat');
    } catch (err: any) {
      console.error('Error in UMKM generation:', err);
      setErrorMessage(
        err.message || 'Gagal memproses prompt UMKM. Silakan periksa koneksi dan coba lagi.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // 10. Copy button
  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    showLocalToast('Prompt F&B berhasil disalin ke clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  // 10. Clear button
  const handleClear = () => {
    setGeneratedPrompt(null);
    setErrorMessage(null);
    setIsSaved(false);
    showLocalToast('Kotak hasil prompt dibersihkan');
  };

  // 10. Regenerate button
  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleSaveVault = () => {
    if (!generatedPrompt) return;
    if (onSaveToVault) {
      onSaveToVault({
        title: `UMKM F&B: ${productName} (${theme})`,
        category: 'UMKM',
        content: generatedPrompt,
      });
    }
    setIsSaved(true);
    showLocalToast('Tersimpan di Soul Art Saved Vault');
  };

  const handleApplyPreset = (p: typeof SAMPLE_PRODUCTS[0]) => {
    setProductName(p.title);
    setCategory(p.category);
    setProductDescription(p.description);
    setTheme(p.theme);
    setBackground(p.background);
    setLighting(p.lighting);
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
              <Store className="w-3.5 h-3.5" />
              <span>Commercial Food & Beverage Studio</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2] mt-1">
              AI UMKM F&B Photo Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#DCD4CA]/80 mt-1 max-w-2xl leading-relaxed">
              Tingkatkan daya pikat visual kuliner UMKM Anda. Buat prompt fotografi makanan & minuman komersial berkualitas tinggi dalam <strong>Bahasa Indonesia</strong> dengan komposisi appetizing, sudut kamera makro, pencahayaan profesional, dan formula Midjourney v6.1 siap pakai.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <span className="text-[11px] font-mono text-[#E5AA9C] bg-[#0C0C10] px-3 py-1.5 rounded-lg border border-[#E5AA9C]/25 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Gemini F&B Engine</span>
            </span>
          </div>
        </div>

        {/* Preset Product Bar */}
        <div className="pt-3 border-t border-[#FAF7F2]/10">
          <span className="text-xs text-[#DCD4CA]/70 font-medium block mb-2">
            Inspirasi Produk Kuliner (Klik untuk mengisi cepat):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {SAMPLE_PRODUCTS.map((sample, idx) => (
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
                  {sample.category} · {sample.theme}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Generator Form (Optimized for Android Touch & Desktop) */}
      <form onSubmit={handleGenerate} className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
        
        {/* 1. Product Name Input & 2. Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Product Name */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
              1. Nama Produk Kuliner:
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Contoh: Es Kopi Susu Gula Aren, Croissant Almond, Sambal Cumi Juara..."
              className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C] min-h-[44px]"
              required
            />
          </div>

          {/* 2. Product Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
              2. Kategori Produk:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as UmkmProductCategory)}
              className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#FAF7F2] focus:outline-none min-h-[44px]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-[#14131A] text-[#FAF7F2]">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Custom Category Input if 'Other' selected */}
        {category === 'Other' && (
          <div className="animate-fade-in">
            <label className="block text-xs font-medium text-[#DCD4CA]/80 mb-1.5">
              Sebutkan Kategori Khusus Anda:
            </label>
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Misal: Frozen Food Organik, Suplemen Herbal, Bumbu Instan..."
              className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#FAF7F2] focus:outline-none min-h-[44px]"
            />
          </div>
        )}

        {/* 3. Product Description Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider">
              3. Deskripsi Detail Produk & Bahan:
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
            placeholder="Jelaskan tekstur yang menggugah selera: saus mengilap, lelehan keju, uap hangat, embun segar di dinding gelas, potongan bahan segar, atau garnish..."
            required
          />
          <span className="text-[11px] text-[#DCD4CA]/60 block mt-1">
            Tips: Sebutkan tekstur indrawi (crispy, creamy, steaming, melting, icy) agar AI menghasilkan foto yang tampak lezat.
          </span>
        </div>

        {/* 4. Visual Themes */}
        <div>
          <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
            4. Pilihan Tema Visual (Visual Themes):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {THEMES.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[76px] active:scale-[0.98] ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#9A5A65]/35 via-[#1C1A24] to-[#14131A] border-[#E5AA9C] text-[#FAF7F2] shadow-sm ring-1 ring-[#E5AA9C]/50'
                      : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/75 hover:text-[#FAF7F2] hover:border-[#E5AA9C]/35'
                  }`}
                >
                  <div>
                    <span className="font-serif text-xs font-semibold block leading-tight">{t.name}</span>
                    <span className="text-[10px] text-[#DCD4CA]/60 line-clamp-1 mt-0.5 font-sans">{t.desc}</span>
                  </div>
                  {/* Swatches */}
                  <div className="flex items-center gap-1 mt-2">
                    {t.colors.map((c, i) => (
                      <span key={i} className="w-2.5 h-2.5 rounded-full border border-black/50" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Background Selection */}
        <div>
          <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
            5. Latar Belakang Foto (Background):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {BACKGROUNDS.map((bg) => {
              const isSelected = background === bg.id;
              return (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => setBackground(bg.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[64px] active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#1E1C27] border-[#E5AA9C] text-[#FAF7F2] font-semibold shadow-sm ring-1 ring-[#E5AA9C]/40'
                      : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2]'
                  }`}
                >
                  <span className="text-xs font-semibold block">{bg.name}</span>
                  <span className="text-[10px] text-[#DCD4CA]/60 line-clamp-1 mt-0.5">{bg.desc}</span>
                </button>
              );
            })}
          </div>

          {background === 'Custom' && (
            <div className="mt-2.5 animate-fade-in">
              <input
                type="text"
                value={customBackground}
                onChange={(e) => setCustomBackground(e.target.value)}
                placeholder="Tuliskan latar belakang spesifik (misal: Meja marmer hitam, piring tembikar jepang, taplak goni alami...)"
                className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#FAF7F2] focus:outline-none min-h-[44px]"
                required={background === 'Custom'}
              />
            </div>
          )}
        </div>

        {/* 6. Lighting Selection */}
        <div>
          <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
            6. Karakter Pencahayaan (Lighting):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {LIGHTINGS.map((l) => {
              const isSelected = lighting === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLighting(l.id)}
                  className={`p-3 rounded-xl border text-left transition-all min-h-[56px] active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#1E1C27] border-[#E5AA9C] text-[#FAF7F2] shadow-sm ring-1 ring-[#E5AA9C]/40'
                      : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2]'
                  }`}
                >
                  <span className="text-xs font-semibold block">{l.name}</span>
                  <span className="text-[10px] text-[#DCD4CA]/60 line-clamp-1 mt-0.5">{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 11. Error Message Display */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-200 flex items-start gap-2.5 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block">Gagal Membuat Prompt F&B:</span>
              <span className="mt-0.5 block text-rose-300/90">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* 7. Generate AI Prompt Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#DCD4CA]/60 flex items-center gap-1.5">
            <span className="text-[#E5AA9C]">✦</span>
            <span>Mencakup Komposisi, Sudut Lensa Makro, Lighting, Detail Tekstur & Formula Prompt</span>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !productName.trim() || !productDescription.trim()}
            className="w-full sm:w-auto min-h-[48px] px-7 py-2.5 bg-gradient-to-r from-[#9A5A65] via-[#B76E79] to-[#E5AA9C] hover:opacity-95 text-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#E5AA9C]/10 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#FAF7F2]" />
                <span>Menghasilkan Prompt Foto F&B...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-[#FAF7F2]" />
                <span>Generate AI Prompt</span>
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
            Gemini Sedang Merancang Foto Produk Komersial...
          </h3>
          <p className="text-xs text-[#DCD4CA]/70 max-w-md mx-auto">
            Menghitung komposisi Rule of Thirds, sudut makro 45 derajat, pantulan cahaya {lighting}, dan tekstur lezat {productName}.
          </p>
        </div>
      )}

      {/* Output Box */}
      {!isGenerating && generatedPrompt && (
        <div className="bg-[#14131A] border border-[#E5AA9C]/30 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 animate-fade-in">
          
          {/* Output Header with Copy, Regenerate, and Clear buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FAF7F2]/10">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-mono">
                <span className="uppercase font-semibold tracking-wider">Hasil F&B AI Photography</span>
                <span aria-hidden="true">·</span>
                <span>{category}</span>
                <span aria-hidden="true">·</span>
                <span>Tema: {theme}</span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#FAF7F2] mt-0.5">
                Formula Fotografi Produk Komersial: {productName}
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
                title="Buat ulang variasi baru"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#E5AA9C]" />
                <span>Regenerate</span>
              </button>

              {/* Copy button */}
              <button
                type="button"
                onClick={handleCopy}
                className="min-h-[40px] px-4 py-1.5 bg-gradient-to-r from-[#9A5A65] to-[#B76E79] hover:from-[#B76E79] hover:to-[#E5AA9C] text-[#FAF7F2] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                title="Salin seluruh prompt"
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

          {/* Visual Showcase Banner */}
          <div className="relative rounded-xl overflow-hidden border border-[#E5AA9C]/25 group">
            <div className="aspect-[21/9] w-full bg-[#0C0C10] relative">
              <img 
                src="/src/assets/images/sas_umkm_product_1793798198783.jpg" 
                alt="Product Photography Mockup"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C10] via-black/25 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#FAF7F2]">
                <span className="bg-[#14131A]/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#E5AA9C]/30 text-[11px] font-mono text-[#E5AA9C]">
                  Visual Standard: {theme} · {background === 'Custom' ? customBackground : background}
                </span>
                <span className="bg-[#14131A]/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#E5AA9C]/20 text-[11px] text-[#FAF7F2]/90">
                  {lighting}
                </span>
              </div>
            </div>
          </div>

          {/* Readable Output Box Body (Monospace & High Legibility) */}
          <div className="bg-[#0C0C10] border border-[#E5AA9C]/20 rounded-xl p-4 sm:p-5 max-h-[550px] overflow-y-auto">
            <pre className="text-xs sm:text-sm text-[#FAF7F2] font-mono whitespace-pre-wrap leading-relaxed select-all">
              {generatedPrompt}
            </pre>
          </div>

          {/* Footer Guidance */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-[#DCD4CA]/65">
            <span>💡 <strong>Panduan Eksekusi:</strong> Copy formula prompt di bagian <em>Gaya Iklan Komersial</em> ke Midjourney v6.1 atau FLUX.1 Pro untuk merender katalog produk berkelas Michelin.</span>
            <span className="font-mono tabular-nums">{generatedPrompt.length} karakter</span>
          </div>

          {/* AI Image & Video MP4 Generator for this UMKM product */}
          <div className="pt-2">
            <MediaActionCard
              sourceModule="umkm"
              title={`Produk UMKM: ${productName}`}
              subtitle={`Foto Komersial & Reels MP4 · ${theme}`}
              content={generatedPrompt}
              onOpenInReelsStudio={onOpenInReelsStudio as any}
              onAutoSaveToHistory={(mediaData) => {
                onAutoSaveHistory?.({
                  moduleId: 'umkm',
                  title: `Media UMKM: ${productName}`,
                  subtitle: `Media visual & video MP4 untuk produk ${productName}`,
                  content: generatedPrompt,
                  metadata: {
                    category,
                    theme,
                    mediaData,
                    tags: ['UMKM', 'AI Media', category]
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
            sourceModule="umkm"
            title={`Produk UMKM: ${productName}`}
            subtitle={`Visual AI & Reels MP4 · ${theme}`}
            content={productDescription}
            onOpenInReelsStudio={onOpenInReelsStudio as any}
            onAutoSaveToHistory={(mediaData) => {
              onAutoSaveHistory?.({
                moduleId: 'umkm',
                title: `Visual UMKM: ${productName}`,
                subtitle: `Visual AI & Reels MP4 · ${theme}`,
                content: productDescription,
                metadata: {
                  category,
                  theme,
                  mediaData,
                  tags: ['UMKM', 'AI Media', category]
                }
              });
            }}
          />
        </div>
      )}

    </div>
  );
};
