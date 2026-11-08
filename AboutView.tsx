import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  Edit3, 
  Save, 
  Check, 
  ArrowLeft, 
  Heart, 
  ShieldCheck, 
  Layers, 
  Compass, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  RotateCcw,
  ExternalLink,
  Gem
} from 'lucide-react';
import { AboutInfo } from '../types';
import { SasLogo, SasMonogram } from './SasLogo';

interface AboutViewProps {
  aboutInfo: AboutInfo;
  onSaveAboutInfo: (updated: Partial<AboutInfo>) => Promise<void> | void;
  onBackToStudio: () => void;
  onOpenProfile?: () => void;
  onOpenSettings?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  aboutInfo,
  onSaveAboutInfo,
  onBackToStudio,
  onOpenProfile,
  onOpenSettings,
}) => {
  const [isEditingCreator, setIsEditingCreator] = useState(false);
  const [creatorName, setCreatorName] = useState(aboutInfo.creatorInfo?.name || 'Soul Art System Creative Director');
  const [creatorTitle, setCreatorTitle] = useState(aboutInfo.creatorInfo?.title || 'Creator & Lead AI Architect');
  const [creatorBio, setCreatorBio] = useState(
    aboutInfo.creatorInfo?.bioNote ||
    'Diciptakan dengan dedikasi tinggi untuk memberdayakan insan kreatif, UMKM Indonesia, dan pemilik produk digital agar dapat menghasilkan karya berestetika tinggi dan bernilai komersial tanpa hambatan teknis.'
  );
  const [creatorEmail, setCreatorEmail] = useState(aboutInfo.creatorInfo?.email || 'soulart.system@gmail.com');
  const [creatorLocation, setCreatorLocation] = useState(aboutInfo.creatorInfo?.location || 'Jakarta, Indonesia');

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveCreatorInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSaveAboutInfo({
        creatorInfo: {
          ...aboutInfo.creatorInfo,
          name: creatorName.trim(),
          title: creatorTitle.trim(),
          bioNote: creatorBio.trim(),
          email: creatorEmail.trim(),
          location: creatorLocation.trim(),
          editable: true,
          updatedAt: Date.now(),
        },
      });
      setIsEditingCreator(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetCreatorDefaults = () => {
    setCreatorName('Soul Art System Creative Director');
    setCreatorTitle('Creator & Lead AI Architect');
    setCreatorBio(
      'Diciptakan dengan dedikasi tinggi untuk memberdayakan insan kreatif, UMKM Indonesia, dan pemilik produk digital agar dapat menghasilkan karya berestetika tinggi dan bernilai komersial tanpa hambatan teknis.'
    );
    setCreatorEmail('soulart.system@gmail.com');
    setCreatorLocation('Jakarta, Indonesia');
  };

  const BRAND_COLORS = [
    {
      name: 'Dusty Pink',
      hex: aboutInfo.brandIdentity?.dustyPink || '#C98B94',
      bgClass: 'bg-[#C98B94]',
      desc: 'Keanggunan feminin, kelembutan visual, dan nuansa couture berkelas.',
      role: 'Secondary Accent & Emotion'
    },
    {
      name: 'Rose Gold',
      hex: aboutInfo.brandIdentity?.roseGold || '#E5AA9C',
      bgClass: 'bg-[#E5AA9C]',
      desc: 'Kilau kemewahan, prestise, dan inovasi kecerdasan buatan berdaya tinggi.',
      role: 'Primary Signature & Halo'
    },
    {
      name: 'Ivory Silk',
      hex: aboutInfo.brandIdentity?.ivory || '#FAF7F2',
      bgClass: 'bg-[#FAF7F2]',
      desc: 'Kemurnian kanvas, ruang negatif bernafas, dan kontras keterbacaan tinggi.',
      role: 'Canvas Background & Light'
    },
    {
      name: 'Obsidian Black',
      hex: aboutInfo.brandIdentity?.black || '#0C0C10',
      bgClass: 'bg-[#0C0C10]',
      desc: 'Kedalaman malam, stabilitas, otoritas, dan eksklusivitas ekosistem studio.',
      role: 'Deep Obsidian Base'
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E5AA9C]/15">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToStudio}
            className="p-2 rounded-xl bg-[#14131A] text-[#FAF7F2] hover:text-[#E5AA9C] border border-[#E5AA9C]/20 transition-all hover:scale-105 active:scale-95"
            title="Kembali ke Dashboard"
            aria-label="Kembali ke Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-[#E5AA9C] font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tentang Aplikasi</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#FAF7F2]">
              About SAS AI
            </h1>
          </div>
        </div>

        {/* Quick Tabs to Profile & Settings */}
        <div className="flex items-center gap-2">
          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#14131A] text-[#DCD4CA]/80 hover:text-[#FAF7F2] border border-[#E5AA9C]/20 transition-colors"
            >
              👤 Profil
            </button>
          )}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#14131A] text-[#DCD4CA]/80 hover:text-[#FAF7F2] border border-[#E5AA9C]/20 transition-colors"
            >
              ⚙️ Pengaturan
            </button>
          )}
        </div>
      </div>

      {/* ========================================================
          HERO BRAND IDENTITY CARD
          Requirements 1, 3, 4:
          1. Show application name: SAS AI – Soul Art System.
          3. Add slogan: Create Your Dream with AI.
          4. Show short application description.
         ======================================================== */}
      <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#2B1B2D] via-[#1A1424] to-[#0E0C14] border border-[#E5AA9C]/40 shadow-2xl overflow-hidden">
        {/* Glow circles */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#E5AA9C]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#9A5A65]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          
          {/* Left: Brand Details */}
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5AA9C]/15 border border-[#E5AA9C]/30 text-xs font-mono text-[#E5AA9C]">
              <Gem className="w-3.5 h-3.5 text-[#E5AA9C]" />
              <span>Official Brand Crest & Logo</span>
            </div>

            {/* Requirement 1: Application Name */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2] leading-tight">
              {aboutInfo.appName || 'SAS AI – Soul Art System'}
            </h2>

            {/* Requirement 3: Slogan */}
            <div className="inline-block">
              <span className="font-serif italic text-xl sm:text-2xl text-[#E5AA9C] font-semibold tracking-wide border-b border-[#E5AA9C]/30 pb-1">
                "{aboutInfo.slogan || 'Create Your Dream with AI'}"
              </span>
            </div>

            {/* Requirement 4: Short Application Description */}
            <p className="text-sm sm:text-base text-[#DCD4CA]/85 leading-relaxed font-sans pt-2">
              {aboutInfo.shortDescription || 
                'Studio kecerdasan buatan kreatif kelas luxury pertama yang mengintegrasikan formula prompt visual sinematik, strategi komersial prewedding & F&B UMKM, monetisasi Facebook Pro & kampanye digital marketing, serta blueprint produk digital siap jual dalam satu ekosistem elegan.'}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-[#FAF7F2] font-mono">
              <span className="px-3 py-1 rounded-lg bg-[#0C0C10]/80 border border-white/10">
                6 Core AI Engines
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#0C0C10]/80 border border-white/10">
                Server-Side Proxy
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#0C0C10]/80 border border-white/10 text-[#E5AA9C]">
                Zero-Billing Architecture
              </span>
            </div>
          </div>

          {/* Right: Grand Interconnected SAS Monogram Display */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1F1926]/90 via-[#15121E]/95 to-[#0C0C10] border border-[#E5AA9C]/50 shadow-2xl flex flex-col items-center gap-3">
              <div className="absolute inset-0 bg-radial from-[#E5AA9C]/15 to-transparent rounded-3xl pointer-events-none" />
              <SasMonogram size={96} className="relative z-10" />
              <div className="relative z-10 text-center">
                <span className="font-serif text-sm font-bold tracking-[0.2em] text-[#FAF7F2] block uppercase">
                  SAS MONOGRAM
                </span>
                <span className="text-[10px] text-[#E5AA9C] font-mono tracking-wider">
                  Interconnected S-A-S
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          BRAND LOGO & MONOGRAM SUITE SHOWCASE
          Requirements 1, 5, 6, 7, 8:
          - Interconnected S-A-S letters
          - Square app icon version (mobile ready)
          - Horizontal header version
          - Transparent background
         ======================================================== */}
      <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5AA9C]/10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#E5AA9C]/15 text-[#E5AA9C]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold text-[#FAF7F2]">
                Sistem Logo Resmi (Official Logo Architecture)
              </h2>
              <p className="text-[11px] text-[#DCD4CA]/60">
                Dua format utama: Versi Horizontal untuk Dashboard & Versi Square untuk Mobile App Icon
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#E5AA9C] bg-[#0C0C10] px-2.5 py-1 rounded-full border border-[#E5AA9C]/25">
            Vector SVG Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card A: Horizontal Logo (Used in Dashboard Header) */}
          <div className="p-5 rounded-2xl bg-[#0C0C10] border border-[#E5AA9C]/25 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#FAF7F2]">
                  1. Logo Horizontal (Dashboard Header)
                </span>
                <span className="text-[10px] font-mono text-[#E5AA9C] bg-[#14131A] px-2 py-0.5 rounded border border-[#E5AA9C]/20">
                  Header & Desktop
                </span>
              </div>
              <p className="text-[11px] text-[#DCD4CA]/70 leading-relaxed font-sans">
                Dirancang khusus untuk bilah navigasi atas (header) dengan proporsi memanjang yang seimbang, menampilkan simbol monogram S-A-S, nama merek lengkap, dan slogan resmi.
              </p>
            </div>

            {/* Live Interactive Preview Box (Transparent / Dark Glass) */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-[#171420] via-[#121118] to-[#1A1624] border border-[#E5AA9C]/20 flex items-center justify-center min-h-[96px]">
              <SasLogo variant="horizontal" size="md" showSlogan={true} />
            </div>

            <div className="pt-1 flex items-center justify-between text-[10px] text-[#DCD4CA]/60 font-mono">
              <span>Rasio: 4:1 Landscape</span>
              <span className="text-emerald-400">Background: Transparan</span>
            </div>
          </div>

          {/* Card B: Square Logo (Mobile App Icon) */}
          <div className="p-5 rounded-2xl bg-[#0C0C10] border border-[#E5AA9C]/25 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#FAF7F2]">
                  2. Logo Square (Mobile App Icon / Favicon)
                </span>
                <span className="text-[10px] font-mono text-[#E5AA9C] bg-[#14131A] px-2 py-0.5 rounded border border-[#E5AA9C]/20">
                  Android & iOS Icon
                </span>
              </div>
              <p className="text-[11px] text-[#DCD4CA]/70 leading-relaxed font-sans">
                Format rasio 1:1 sempurna untuk ikon aplikasi smartphone Android, shortcut home screen, avatar profil, dan favicon tab browser dengan bingkai squircle rose gold.
              </p>
            </div>

            {/* Live Interactive Preview Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#171420] via-[#121118] to-[#1A1624] border border-[#E5AA9C]/20 flex items-center justify-center min-h-[96px] gap-4">
              <SasLogo variant="square" size="md" showSlogan={false} />
              <div className="text-left text-xs font-sans">
                <span className="font-serif font-bold text-[#FAF7F2] block">
                  SAS Monogram App Icon
                </span>
                <span className="text-[11px] text-[#E5AA9C] font-mono block">
                  120x120px HD Vector
                </span>
                <span className="text-[10px] text-[#DCD4CA]/60 block mt-0.5">
                  Interconnected S-A-S Ribbon
                </span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-[10px] text-[#DCD4CA]/60 font-mono">
              <span>Rasio: 1:1 Square</span>
              <span className="text-[#E5AA9C]">Metallic Rose Gold Bezel</span>
            </div>
          </div>

        </div>

        {/* Monogram Design Anatomy & Meaning */}
        <div className="p-4 rounded-xl bg-[#0C0C10]/80 border border-[#E5AA9C]/15 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FAF7F2]">
            <Gem className="w-3.5 h-3.5 text-[#E5AA9C]" />
            <span>Filosofi & Anatomi Simbol Monogram S-A-S:</span>
          </div>
          <p className="text-xs text-[#DCD4CA]/75 leading-relaxed font-sans">
            Huruf <strong>S</strong> di sisi kiri dan kanan saling terhubung menyatu dengan huruf <strong>A</strong> di tengah membentuk simpul pita tak hingga (<em>infinity harmonic loop</em>). Pola ini melambangkan integrasi tanpa batas antara <strong>Soul</strong> (jiwa seni manusia), <strong>Art</strong> (keindahan visual & estetika), dan <strong>System</strong> (ketepatan kecerdasan buatan Gemini AI).
          </p>
        </div>
      </div>

      {/* ========================================================
          BRAND IDENTITY & COLOR PALETTE SWATCHES
          Requirement 2: Show brand identity using dusty pink, rose gold, ivory, and black.
         ======================================================== */}
      <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5AA9C]/10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#E5AA9C]/15 text-[#E5AA9C]">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold text-[#FAF7F2]">
                Identitas Warna Merek (Brand Identity Palette)
              </h2>
              <p className="text-[11px] text-[#DCD4CA]/60">
                Harmoni empat pilar warna signature Soul Art System
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#E5AA9C] bg-[#0C0C10] px-2.5 py-1 rounded-full border border-[#E5AA9C]/25">
            4 Signature Colors
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRAND_COLORS.map((col, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-[#0C0C10] border border-[#E5AA9C]/20 hover:border-[#E5AA9C]/50 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-[#FAF7F2]">
                    {col.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#E5AA9C] font-semibold">
                    {col.hex}
                  </span>
                </div>
                
                {/* Visual Swatch */}
                <div 
                  className={`w-full h-12 rounded-lg border border-white/10 shadow-inner group-hover:scale-[1.02] transition-transform`}
                  style={{ backgroundColor: col.hex }}
                />

                <span className="text-[9px] uppercase tracking-wider text-[#E5AA9C]/80 font-mono block">
                  {col.role}
                </span>
              </div>

              <p className="text-[11px] text-[#DCD4CA]/70 leading-relaxed font-sans">
                {col.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          CREATOR INFORMATION SECTION (EDITABLE TEXT)
          Requirement 5: Add creator information with editable text.
         ======================================================== */}
      <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5AA9C]/10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#E5AA9C]/15 text-[#E5AA9C]">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold text-[#FAF7F2]">
                Informasi Kreator & Pengembang (Creator Information)
              </h2>
              <p className="text-[11px] text-[#DCD4CA]/60">
                Informasi kreator dapat ditinjau dan disunting langsung secara persisten
              </p>
            </div>
          </div>

          {!isEditingCreator ? (
            <button
              type="button"
              onClick={() => setIsEditingCreator(true)}
              className="min-h-[38px] px-3.5 py-1.5 text-xs font-semibold text-[#0C0C10] bg-gradient-to-r from-[#E5AA9C] to-[#FAF7F2] rounded-xl hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Info Kreator</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingCreator(false)}
              className="min-h-[38px] px-3.5 py-1.5 text-xs font-medium text-[#FAF7F2] bg-[#1E1C27] hover:bg-[#282534] border border-white/10 rounded-xl transition-colors"
            >
              Batal Edit
            </button>
          )}
        </div>

        {/* Display / Edit Form */}
        {isEditingCreator ? (
          <form onSubmit={handleSaveCreatorInfo} className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#FAF7F2]">Nama Kreator / Entitas</label>
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  required
                  className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF7F2] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#FAF7F2]">Jabatan / Gelar Kreatif</label>
                <input
                  type="text"
                  value={creatorTitle}
                  onChange={(e) => setCreatorTitle(e.target.value)}
                  required
                  className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF7F2] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#FAF7F2]">Email Kontak</label>
                <input
                  type="email"
                  value={creatorEmail}
                  onChange={(e) => setCreatorEmail(e.target.value)}
                  className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF7F2] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#FAF7F2]">Lokasi Studio</label>
                <input
                  type="text"
                  value={creatorLocation}
                  onChange={(e) => setCreatorLocation(e.target.value)}
                  className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF7F2] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#FAF7F2]">Catatan Dedikasi & Visi Kreator</label>
              <textarea
                rows={3}
                value={creatorBio}
                onChange={(e) => setCreatorBio(e.target.value)}
                required
                className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] rounded-xl p-3 text-xs text-[#FAF7F2] focus:outline-none leading-relaxed resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetCreatorDefaults}
                className="text-xs text-[#DCD4CA]/60 hover:text-[#FAF7F2] flex items-center gap-1.5 underline underline-offset-4"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Pulihkan Teks Bawaan</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingCreator(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#FAF7F2] bg-[#1E1C27] hover:bg-[#282534] border border-white/10 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-[#0C0C10] bg-gradient-to-r from-[#E5AA9C] to-[#FAF7F2] hover:brightness-105 transition-all flex items-center gap-1.5 shadow-md shadow-[#E5AA9C]/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Menyimpan...' : 'Simpan Informasi Kreator'}</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-5 rounded-2xl bg-[#0C0C10] border border-[#E5AA9C]/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">
                  {creatorName}
                </h3>
                <p className="text-xs text-[#E5AA9C] font-mono mt-0.5">
                  {creatorTitle}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#DCD4CA]/70 font-mono">
                {creatorEmail && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#E5AA9C]" />
                    <span>{creatorEmail}</span>
                  </span>
                )}
                {creatorLocation && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E5AA9C]" />
                    <span>{creatorLocation}</span>
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#DCD4CA]/85 leading-relaxed font-sans pt-1 border-t border-white/5">
              "{creatorBio}"
            </p>

            <div className="flex items-center justify-between pt-2 text-[11px] text-[#DCD4CA]/50 font-mono border-t border-white/5">
              <span>Status: Teks Kreator Aktif & Dapat Diedit Kapan Saja</span>
              <span className="text-emerald-400">Terverifikasi Sistem</span>
            </div>
          </div>
        )}

        {saveSuccess && (
          <div className="p-3 bg-[#1C1A24] border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 shadow-lg animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Informasi kreator berhasil diperbarui dan disimpan secara persisten.</span>
          </div>
        )}
      </div>

    </div>
  );
};
