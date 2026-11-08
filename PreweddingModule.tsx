import React, { useState } from 'react';
import { 
  HeartHandshake, 
  MapPin, 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Check, 
  Trash2, 
  AlertCircle, 
  Bookmark, 
  BookmarkCheck,
  Sun,
  Camera,
  Compass,
  Palette,
  Maximize2,
  Wand2
} from 'lucide-react';
import { MediaActionCard } from '../MediaActionCard';

export type PreweddingTheme = 
  | 'Luxury Pink Gold'
  | 'Korean Elegant'
  | 'Garden Romance'
  | 'Traditional Indonesian'
  | 'Royal Classic'
  | 'Minimalist';

export type PreweddingLocation = 
  | 'Studio'
  | 'Garden'
  | 'Beach'
  | 'Palace'
  | 'Custom Location';

export type PreweddingLighting = 
  | 'Soft Natural Light'
  | 'Golden Hour'
  | 'Studio Lighting'
  | 'Cinematic';

export type PreweddingAspectRatio = '1:1' | '4:5' | '3:4' | '9:16';

interface PreweddingModuleProps {
  onSaveToVault?: (item: { title: string; category: string; content: string }) => void;
  onAutoSaveHistory?: (item: {
    moduleId: 'prewedding';
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

const THEMES: { id: PreweddingTheme; name: string; desc: string; colors: string[] }[] = [
  { 
    id: 'Luxury Pink Gold', 
    name: 'Luxury Pink Gold', 
    desc: 'Gaun sutra dusty pink, aksen rose gold & velvet obsidian',
    colors: ['#C98B94', '#E5AA9C', '#FAF7F2', '#14131A']
  },
  { 
    id: 'Korean Elegant', 
    name: 'Korean Elegant', 
    desc: 'Nuansa pastel clean, pencahayaan lembut & tatapan intim subtle',
    colors: ['#F5EFEB', '#E8C5C8', '#DCD4CA', '#3D3B40']
  },
  { 
    id: 'Garden Romance', 
    name: 'Garden Romance', 
    desc: 'Penuh bunga botanical mawar, dedaunan hijau & kanopi alami',
    colors: ['#D49086', '#A3B19B', '#FAF7F2', '#4A3E3D']
  },
  { 
    id: 'Traditional Indonesian', 
    name: 'Traditional Indonesian', 
    desc: 'Kebaya modern, kain tenun/songket nusantara & motif wastra',
    colors: ['#9A5A65', '#DDB47A', '#1C1A24', '#F0EAE1']
  },
  { 
    id: 'Royal Classic', 
    name: 'Royal Classic', 
    desc: 'Arsitektur istana megah, busana couture formal & aura bangsawan',
    colors: ['#B76E79', '#D4AF37', '#121118', '#FAF7F2']
  },
  { 
    id: 'Minimalist', 
    name: 'Minimalist', 
    desc: 'Siluet bersih monokrom, latar travertine polos & fokus emosi',
    colors: ['#14131A', '#FAF7F2', '#C98B94', '#8E8880']
  },
];

const LOCATIONS: { id: PreweddingLocation; name: string }[] = [
  { id: 'Studio', name: 'Studio' },
  { id: 'Garden', name: 'Garden' },
  { id: 'Beach', name: 'Beach' },
  { id: 'Palace', name: 'Palace' },
  { id: 'Custom Location', name: 'Custom Location' },
];

const LIGHTING_OPTIONS: { id: PreweddingLighting; name: string; desc: string }[] = [
  { id: 'Soft Natural Light', name: 'Soft Natural Light', desc: 'Cahaya pagi lembut merata tanpa bayangan kasar' },
  { id: 'Golden Hour', name: 'Golden Hour', desc: 'Kilau senja keemasan hangat dengan pantulan rose gold' },
  { id: 'Studio Lighting', name: 'Studio Lighting', desc: 'Octabox terarah dengan rim light specular profesional' },
  { id: 'Cinematic', name: 'Cinematic', desc: 'Kontras dramatis chiaroscuro dengan kabut atmosferik' },
];

const ASPECT_RATIOS: { id: PreweddingAspectRatio; label: string; desc: string }[] = [
  { id: '1:1', label: '1:1', desc: 'Square Feed' },
  { id: '4:5', label: '4:5', desc: 'Instagram Portrait' },
  { id: '3:4', label: '3:4', desc: 'Editorial Frame' },
  { id: '9:16', label: '9:16', desc: 'Reels / Mobile Wallpaper' },
];

const SAMPLE_CONCEPTS = [
  {
    title: 'Bromo Misty Sunrise Couture',
    concept: 'Pasangan berdiri berpelukan di puncak tebing berkabut saat fajar menyingsing, hembusan angin menerbangkan gaun dusty pink berekor panjang dengan latar kawah lautan pasir keemasan.',
    theme: 'Luxury Pink Gold' as PreweddingTheme,
    location: 'Custom Location' as PreweddingLocation,
    customLocation: 'Mount Bromo Caldera & Savanna, Jawa Timur',
    outfit: 'Gaun organza dusty pink berekor 3 meter dengan bordir 3D & setelan bespoke jas linen warna ivory pasir',
    lighting: 'Golden Hour' as PreweddingLighting,
    ratio: '4:5' as PreweddingAspectRatio
  },
  {
    title: 'Korean Studio Minimalist',
    concept: 'Pasangan duduk berdampingan di kursi kayu vintage dengan senyum candid yang tulus, saling menatap mata dengan ekspresi kasih sayang yang tenang dan hangat.',
    theme: 'Korean Elegant' as PreweddingTheme,
    location: 'Studio' as PreweddingLocation,
    customLocation: '',
    outfit: 'Gaun sutra satin putih ivory simpel & setelan blazer abu-abu berpotongan rileks',
    lighting: 'Soft Natural Light' as PreweddingLighting,
    ratio: '3:4' as PreweddingAspectRatio
  },
  {
    title: 'Balinese Royal Heritage Water Palace',
    concept: 'Pasangan berjalan di jembatan batu istana air dengan pantulan cahaya keemasan di permukaan kolam bunga teratai, siluet payung tradisional dan ukiran batu kuno.',
    theme: 'Traditional Indonesian' as PreweddingTheme,
    location: 'Palace' as PreweddingLocation,
    customLocation: '',
    outfit: 'Kebaya modern berpayet rose gold dengan kain songket nusantara tenun tangan halus & beskap gelap berkerah bordir emas',
    lighting: 'Cinematic' as PreweddingLighting,
    ratio: '4:5' as PreweddingAspectRatio
  }
];

export const PreweddingModule: React.FC<PreweddingModuleProps> = ({ 
  onSaveToVault, 
  onAutoSaveHistory,
  onOpenInReelsStudio 
}) => {
  // 1. Concept / description input
  const [conceptDescription, setConceptDescription] = useState(
    'Pasangan berdiri berpelukan mesra di tepi tebing berkabut saat matahari baru terbit, pria memegang pinggang wanita dengan lembut sambil menatap keningnya, angin lembut meniup veil transparan dengan latar pemandangan alam spektakuler.'
  );

  // 2. Theme options
  const [theme, setTheme] = useState<PreweddingTheme>('Luxury Pink Gold');

  // 3. Location options
  const [location, setLocation] = useState<PreweddingLocation>('Garden');
  const [customLocation, setCustomLocation] = useState('Mount Bromo Caldera & Savanna, Jawa Timur');

  // 4. Outfit and color preferences
  const [outfitPreference, setOutfitPreference] = useState(
    'Gaun couture dusty pink organza berekor bordir bunga 3D, veil sutra ivory transparan, dan setelan bespoke jas linen warna pasir ivory dengan aksen cufflinks rose gold'
  );

  // 5. Lighting options
  const [lighting, setLighting] = useState<PreweddingLighting>('Golden Hour');

  // 6. Aspect ratio options
  const [aspectRatio, setAspectRatio] = useState<PreweddingAspectRatio>('4:5');

  // UI state
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

  // 7 & 8. Generate Prewedding Prompt using server-side Gemini API
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!conceptDescription.trim()) {
      setErrorMessage('Konsep atau deskripsi foto pasangan wajib diisi.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setIsSaved(false);

    try {
      const response = await fetch('/api/prewedding/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conceptDescription: conceptDescription.trim(),
          theme,
          location,
          customLocation: location === 'Custom Location' ? customLocation.trim() : '',
          outfitPreference: outfitPreference.trim(),
          lighting,
          aspectRatio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat memproses prompt prewedding.');
      }

      setGeneratedPrompt(data.result);
      if (data.model) {
        setActiveModel(data.model);
      }
      if (onAutoSaveHistory) {
        onAutoSaveHistory({
          moduleId: 'prewedding',
          title: `Prewedding · ${theme}`,
          subtitle: conceptDescription.trim().slice(0, 60) + (conceptDescription.length > 60 ? '...' : ''),
          content: data.result,
          metadata: {
            category: theme,
            location,
            lighting,
            aspectRatio,
            tags: ['Prewedding', theme, location, 'Gemini 3.8 Flash'],
            stats: {
              'Tema': theme,
              'Lokasi': location,
              'Lighting': lighting,
              'Rasio': aspectRatio,
              'Model AI': data.model || 'gemini-3.8-flash'
            }
          }
        });
      }
      showLocalToast('Prompt Prewedding AI berhasil dibuat');
    } catch (err: any) {
      console.error('Error in prewedding generation:', err);
      setErrorMessage(
        err.message || 'Gagal memproses prompt prewedding. Silakan periksa koneksi dan coba lagi.'
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
    showLocalToast('Prompt Prewedding berhasil disalin ke clipboard');
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
        title: `Prewedding: ${theme} (${location})`,
        category: 'Prewedding',
        content: generatedPrompt,
      });
    }
    setIsSaved(true);
    showLocalToast('Tersimpan di Soul Art Saved Vault');
  };

  const handleApplyPreset = (p: typeof SAMPLE_CONCEPTS[0]) => {
    setConceptDescription(p.concept);
    setTheme(p.theme);
    setLocation(p.location);
    if (p.customLocation) setCustomLocation(p.customLocation);
    setOutfitPreference(p.outfit);
    setLighting(p.lighting);
    setAspectRatio(p.ratio);
    setErrorMessage(null);
    showLocalToast(`Preset "${p.title}" dimuat`);
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

      {/* Intro Header Card */}
      <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-semibold tracking-wider uppercase">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Romantic Editorial Visual Studio</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2] mt-1">
              AI Prewedding Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#DCD4CA]/80 mt-1 max-w-2xl leading-relaxed">
              Rancang prompt visual prewedding mewah dan detail dalam <strong>Bahasa Indonesia</strong> dengan preservasi kesamaan identitas wajah subjek dewasa pada foto referensi, harmoni busana, pencahayaan sinematik, dan rasio aspek yang fleksibel.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <span className="text-[11px] font-mono text-[#E5AA9C] bg-[#0C0C10] px-3 py-1.5 rounded-lg border border-[#E5AA9C]/25 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Gemini Prewedding AI</span>
            </span>
          </div>
        </div>

        {/* Preset Concept Bar */}
        <div className="pt-3 border-t border-[#FAF7F2]/10">
          <span className="text-xs text-[#DCD4CA]/70 font-medium block mb-2">
            Inspirasi Konsep Populer (Klik untuk mengisi cepat):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SAMPLE_CONCEPTS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(sample)}
                className="text-left p-3 rounded-xl bg-[#0C0C10]/80 border border-[#E5AA9C]/15 hover:border-[#E5AA9C]/40 transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-serif font-semibold text-[#E5AA9C]">
                  <span className="truncate">{sample.title}</span>
                  <span className="text-[10px] text-[#DCD4CA]/50 font-mono">0{idx + 1}</span>
                </div>
                <p className="text-[11px] text-[#DCD4CA]/65 line-clamp-1 mt-1 font-sans">
                  {sample.concept}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Generator Form */}
      <form onSubmit={handleGenerate} className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
        
        {/* 1. Couple's Photo Concept or Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider">
              1. Konsep & Deskripsi Foto Pasangan:
            </label>
            {conceptDescription && (
              <button
                type="button"
                onClick={() => setConceptDescription('')}
                className="text-[11px] text-[#DCD4CA]/50 hover:text-[#FAF7F2] transition-colors"
              >
                Hapus teks
              </button>
            )}
          </div>
          <textarea
            value={conceptDescription}
            onChange={(e) => {
              setConceptDescription(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            rows={3}
            className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl p-3.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C] transition-all leading-relaxed"
            placeholder="Deskripsikan pose, interaksi kasih sayang, ekspresi wajah, atau momen candid yang ingin divisualisasikan..."
            required
          />
          <span className="text-[11px] text-[#DCD4CA]/60 block mt-1">
            Contoh: Pasangan bergandengan di bibir tebing, tawa candid di bawah veil, tatapan intim kening saling menempel.
          </span>
        </div>

        {/* 2. Theme Options */}
        <div>
          <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
            2. Pilihan Tema Prewedding:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {THEMES.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[72px] ${
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

        {/* 3. Location Options */}
        <div>
          <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
            3. Lokasi Pemotretan:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {LOCATIONS.map((loc) => {
              const isSelected = location === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setLocation(loc.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-[#1E1C27] border-[#E5AA9C] text-[#FAF7F2] font-semibold shadow-sm'
                      : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2]'
                  }`}
                >
                  <span className="text-xs">{loc.name}</span>
                </button>
              );
            })}
          </div>

          {location === 'Custom Location' && (
            <div className="mt-2.5 animate-fade-in">
              <input
                type="text"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder="Tuliskan nama lokasi spesifik (misal: Savanna Bukit Warinding Sumba, Villa Balbianello Lake Como...)"
                className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#FAF7F2] focus:outline-none"
                required={location === 'Custom Location'}
              />
            </div>
          )}
        </div>

        {/* 4. Outfit and Color Preferences */}
        <div>
          <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
            4. Preferensi Busana & Warna (Outfit & Color Harmony):
          </label>
          <textarea
            value={outfitPreference}
            onChange={(e) => setOutfitPreference(e.target.value)}
            rows={2}
            className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl p-3.5 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:ring-1 focus:ring-[#E5AA9C] transition-all"
            placeholder="Deskripsikan gaun wanita, jas pria, warna palet (dusty pink, ivory, rose gold, songket)..."
          />
        </div>

        {/* 5 & 6. Lighting Options & Aspect Ratio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* 5. Lighting Options */}
          <div>
            <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
              5. Karakter Pencahayaan (Lighting):
            </label>
            <div className="grid grid-cols-2 gap-2">
              {LIGHTING_OPTIONS.map((l) => {
                const isSelected = lighting === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLighting(l.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#1E1C27] border-[#E5AA9C] text-[#FAF7F2] shadow-sm'
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

          {/* 6. Aspect Ratio Options */}
          <div>
            <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider mb-2">
              6. Rasio Aspek (Aspect Ratio):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ASPECT_RATIOS.map((ar) => {
                const isSelected = aspectRatio === ar.id;
                return (
                  <button
                    key={ar.id}
                    type="button"
                    onClick={() => setAspectRatio(ar.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-[#1E1C27] border-[#E5AA9C] text-[#FAF7F2] shadow-sm'
                        : 'bg-[#0C0C10] border-[#E5AA9C]/15 text-[#DCD4CA]/70 hover:text-[#FAF7F2]'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold block">{ar.label}</span>
                    <span className="text-[10px] text-[#DCD4CA]/60 mt-0.5 block">{ar.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* 9. Identity & Realism Guidance Notice */}
        <div className="p-3.5 bg-[#0C0C10]/70 rounded-xl border border-[#E5AA9C]/15 text-xs text-[#DCD4CA]/80 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-[#E5AA9C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preservasi Identitas & Standar Etika Visual:</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#DCD4CA]/75">
            Prompt yang dihasilkan menyertakan instruksi teknis untuk mempertahankan konsistensi wajah, warna kulit, dan kontur fitur subjek dewasa dari foto referensi. Seluruh hasil divisualisasikan sebagai kreasi seni prewedding sintetis berbasis AI tanpa klaim palsu sebagai foto dokumentasi nyata.
          </p>
        </div>

        {/* 11. Error Message */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-200 flex items-start gap-2.5 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block">Gagal Membuat Prompt Prewedding:</span>
              <span className="mt-0.5 block text-rose-300/90">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* 7. Generate Prewedding Prompt Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#DCD4CA]/60 flex items-center gap-1.5">
            <span className="text-[#E5AA9C]">✦</span>
            <span>Didukung Gemini 3.8 Flash server-side: Formula prompt Midjourney & FLUX</span>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !conceptDescription.trim()}
            className="w-full sm:w-auto min-h-[44px] px-7 py-2.5 bg-gradient-to-r from-[#9A5A65] via-[#B76E79] to-[#E5AA9C] hover:opacity-95 text-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#E5AA9C]/10 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#FAF7F2]" />
                <span>Menyusun Prompt Prewedding...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-[#FAF7F2]" />
                <span>Generate Prewedding Prompt</span>
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
            Gemini Sedang Merancang Visual Prewedding Editorial...
          </h3>
          <p className="text-xs text-[#DCD4CA]/70 max-w-md mx-auto">
            Mengharmonisasikan komposisi pose, sudut pencahayaan {lighting}, palet warna {theme}, dan parameter rasio {aspectRatio}.
          </p>
        </div>
      )}

      {/* Output Box */}
      {!isGenerating && generatedPrompt && (
        <div className="bg-[#14131A] border border-[#E5AA9C]/30 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 animate-fade-in">
          
          {/* Header row with Copy, Regenerate, Clear buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FAF7F2]/10">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-mono">
                <span className="uppercase font-semibold tracking-wider">Hasil Prewedding AI</span>
                <span aria-hidden="true">·</span>
                <span>Tema: {theme}</span>
                <span aria-hidden="true">·</span>
                <span>Rasio: {aspectRatio}</span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#FAF7F2] mt-0.5">
                Formula Visual Prewedding & Parameter AI
              </h2>
            </div>

            {/* 10. Copy, Regenerate, and Clear buttons */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
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

              {/* Clear button */}
              <button
                type="button"
                onClick={handleClear}
                className="min-h-[38px] px-3 py-1.5 bg-[#1C1A24] hover:bg-[#252230] text-[#DCD4CA]/80 hover:text-rose-200 border border-[#E5AA9C]/20 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Bersihkan output"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>

              {/* Regenerate button */}
              <button
                type="button"
                onClick={handleRegenerate}
                className="min-h-[38px] px-3.5 py-1.5 bg-[#1C1A24] hover:bg-[#252230] text-[#FAF7F2] border border-[#E5AA9C]/30 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Buat ulang variasi baru"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#E5AA9C]" />
                <span>Regenerate</span>
              </button>

              {/* Copy button */}
              <button
                type="button"
                onClick={handleCopy}
                className="min-h-[38px] px-4 py-1.5 bg-gradient-to-r from-[#9A5A65] to-[#B76E79] hover:from-[#B76E79] hover:to-[#E5AA9C] text-[#FAF7F2] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
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

          {/* Visual Editorial Preview Banner */}
          <div className="relative rounded-xl overflow-hidden border border-[#E5AA9C]/25 group">
            <div className="aspect-[21/9] w-full bg-[#0C0C10] relative">
              <img 
                src="/src/assets/images/sas_prewedding_editorial_1793798198769.jpg" 
                alt="Prewedding Visual Showcase"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C10] via-black/25 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#FAF7F2]">
                <span className="bg-[#14131A]/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#E5AA9C]/30 text-[11px] font-mono text-[#E5AA9C]">
                  Contoh Visualisasi: {theme} · {location === 'Custom Location' ? customLocation : location}
                </span>
                <span className="bg-[#14131A]/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#E5AA9C]/20 text-[11px] text-[#FAF7F2]/90">
                  Rasio {aspectRatio}
                </span>
              </div>
            </div>
          </div>

          {/* Readable Output Box Body */}
          <div className="bg-[#0C0C10] border border-[#E5AA9C]/20 rounded-xl p-4 sm:p-5 max-h-[550px] overflow-y-auto">
            <pre className="text-xs sm:text-sm text-[#FAF7F2] font-mono whitespace-pre-wrap leading-relaxed select-all">
              {generatedPrompt}
            </pre>
          </div>

          {/* Footer Guidance */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-[#DCD4CA]/65">
            <span>💡 <strong>Tips Eksekusi:</strong> Copy formula di bagian <em>Formula Prompt Siap Pakai</em> ke Midjourney v6.1 atau FLUX.1 Pro dengan melampirkan foto referensi pasangan.</span>
            <span className="font-mono tabular-nums">{generatedPrompt.length} karakter</span>
          </div>

          {/* AI Image & Video MP4 Generator for this Prewedding concept */}
          <div className="pt-2">
            <MediaActionCard
              sourceModule="prewedding"
              title={`Prewedding ${theme}: ${conceptDescription.slice(0, 45)}`}
              subtitle={`Editorial Prewedding · ${theme} · ${location}`}
              content={generatedPrompt}
              onOpenInReelsStudio={onOpenInReelsStudio as any}
              onAutoSaveToHistory={(mediaData) => {
                onAutoSaveHistory?.({
                  moduleId: 'prewedding',
                  title: `Prewedding Media: ${theme}`,
                  subtitle: `Media visual & video MP4 untuk konsep prewedding ${theme}`,
                  content: generatedPrompt,
                  metadata: {
                    theme,
                    location,
                    mediaData,
                    tags: ['Prewedding', 'AI Media', theme]
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
            sourceModule="prewedding"
            title={`Visual Prewedding: ${theme}`}
            subtitle={`Visual AI & Reels MP4 · ${theme}`}
            content={conceptDescription}
            onOpenInReelsStudio={onOpenInReelsStudio as any}
            onAutoSaveToHistory={(mediaData) => {
              onAutoSaveHistory?.({
                moduleId: 'prewedding',
                title: `Visual Prewedding: ${theme}`,
                subtitle: `Media visual & video MP4 · ${theme}`,
                content: conceptDescription,
                metadata: {
                  theme,
                  location,
                  mediaData,
                  tags: ['Prewedding', 'AI Media', theme]
                }
              });
            }}
          />
        </div>
      )}

    </div>
  );
};
