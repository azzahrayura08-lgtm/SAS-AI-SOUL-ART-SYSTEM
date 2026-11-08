import React, { useState, useRef } from 'react';
import { 
  User, 
  Camera, 
  Save, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  Upload, 
  Image as ImageIcon,
  Heart,
  Palette,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types';
import { SasLogo } from './SasLogo';

interface UserProfileViewProps {
  profile: UserProfile;
  onSaveProfile: (updated: Partial<UserProfile>) => Promise<void> | void;
  onBackToStudio: () => void;
  onOpenSettings?: () => void;
  onOpenAbout?: () => void;
}

// Preset luxury avatars
const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
];

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  profile,
  onSaveProfile,
  onBackToStudio,
  onOpenSettings,
  onOpenAbout,
}) => {
  const [displayName, setDisplayName] = useState(profile.displayName || 'Soul Art Creator');
  const [bio, setBio] = useState(profile.bio || '');
  const [role, setRole] = useState(profile.role || 'Digital Creator & Business Strategist');
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || '');
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran foto maksimal 2MB untuk performa terbaik.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;

    setIsSaving(true);
    try {
      await onSaveProfile({
        displayName: displayName.trim(),
        bio: bio.trim(),
        role: role.trim(),
        avatarUrl: avatarUrl.trim(),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Top Breadcrumb & Navigation */}
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
              <User className="w-3.5 h-3.5" />
              <span>Profil Pengguna</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#FAF7F2]">
              User Profile & Identity
            </h1>
          </div>
        </div>

        {/* Quick Tabs to Settings & About */}
        <div className="flex items-center gap-2">
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#14131A] text-[#DCD4CA]/80 hover:text-[#FAF7F2] border border-[#E5AA9C]/20 transition-colors"
            >
              ⚙️ Pengaturan
            </button>
          )}
          {onOpenAbout && (
            <button
              onClick={onOpenAbout}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#14131A] text-[#DCD4CA]/80 hover:text-[#FAF7F2] border border-[#E5AA9C]/20 transition-colors"
            >
              ✨ Tentang SAS AI
            </button>
          )}
        </div>
      </div>

      {/* Main Profile Form & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Editable Form */}
        <div className="lg:col-span-2 bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Brand Banner Card (Requirement 4: Show brand name SAS Soul Art System with luxury logo) */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#2A1820] via-[#1E1725] to-[#14131A] border border-[#E5AA9C]/30 flex flex-wrap items-center justify-between gap-4">
              <SasLogo variant="horizontal" size="md" showSlogan={true} />
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#E5AA9C]/15 text-[#E5AA9C] border border-[#E5AA9C]/30 whitespace-nowrap">
                Official Member
              </span>
            </div>

            {/* Profile Picture (Requirement 3: Add an optional profile picture) */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider">
                Foto Profil (Opsional)
              </label>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Current Avatar preview */}
                <div className="relative group w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#E5AA9C]/40 bg-[#1C1A24] shrink-0 shadow-md">
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt="Profile Avatar" 
                      className="w-full h-full object-cover"
                      onError={() => setAvatarUrl('')}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#E5AA9C]">
                      <User className="w-8 h-8" />
                      <span className="text-[9px] font-mono mt-0.5">Avatar</span>
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    title="Ganti Foto"
                  >
                    <Camera className="w-5 h-5 text-[#E5AA9C]" />
                  </button>
                </div>

                {/* Actions for photo */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="min-h-[40px] px-3.5 py-2 text-xs font-medium text-[#FAF7F2] bg-[#1F1D27] hover:bg-[#2A2735] border border-[#E5AA9C]/25 rounded-xl transition-all flex items-center gap-2"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#E5AA9C]" />
                      <span>Upload Foto (Maks 2MB)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="min-h-[40px] px-3.5 py-2 text-xs font-medium text-[#DCD4CA] bg-[#14131A] hover:bg-[#1E1C27] border border-white/10 rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#E5AA9C]" />
                      <span>Input URL Gambar</span>
                    </button>

                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={() => setAvatarUrl('')}
                        className="min-h-[40px] px-3 py-2 text-xs font-medium text-rose-300 hover:text-rose-200 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-800/30 rounded-xl transition-all"
                      >
                        Hapus Foto
                      </button>
                    )}
                  </div>

                  {showUrlInput && (
                    <div className="flex items-center gap-2 pt-1 animate-fade-in">
                      <input
                        type="url"
                        value={customUrlInput}
                        onChange={(e) => setCustomUrlInput(e.target.value)}
                        placeholder="https://contoh.com/foto-anda.jpg"
                        className="flex-1 bg-[#0C0C10] border border-[#E5AA9C]/30 rounded-xl px-3 py-2 text-xs text-[#FAF7F2] placeholder-[#DCD4CA]/40 focus:outline-none focus:border-[#E5AA9C]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customUrlInput.trim()) {
                            setAvatarUrl(customUrlInput.trim());
                            setCustomUrlInput('');
                            setShowUrlInput(false);
                          }
                        }}
                        className="px-3 py-2 text-xs font-medium bg-[#E5AA9C] text-[#0C0C10] font-semibold rounded-xl hover:bg-[#F0C2B7]"
                      >
                        Terapkan
                      </button>
                    </div>
                  )}

                  {/* Quick Avatar Presets */}
                  <div className="pt-1">
                    <span className="text-[10px] text-[#DCD4CA]/60 block mb-1.5">
                      Atau pilih avatar gaya editorial elegan:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {PRESET_AVATARS.map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatarUrl(url)}
                          className={`w-9 h-9 rounded-xl overflow-hidden border transition-transform hover:scale-105 shrink-0 ${
                            avatarUrl === url ? 'border-[#E5AA9C] ring-2 ring-[#E5AA9C]/40' : 'border-white/10 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Display Name (Requirement 2: Allow users to enter and edit their display name) */}
            <div className="space-y-2">
              <label htmlFor="display-name-input" className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider">
                Nama Tampilan (Display Name) <span className="text-[#E5AA9C]">*</span>
              </label>
              <input
                id="display-name-input"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Masukkan nama tampilan Anda"
                required
                className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] focus:ring-1 focus:ring-[#E5AA9C] rounded-xl px-4 py-3 text-sm text-[#FAF7F2] placeholder-[#DCD4CA]/40 transition-all font-sans"
              />
              <p className="text-[11px] text-[#DCD4CA]/60">
                Nama ini akan muncul di header aplikasi, kartu studio, dan watermark kreasi AI Anda.
              </p>
            </div>

            {/* Role / Title */}
            <div className="space-y-2">
              <label htmlFor="role-input" className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider">
                Peran / Profesi Kreator
              </label>
              <input
                id="role-input"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Contoh: Digital Creator, UMKM Owner, Visual Artist"
                className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] focus:ring-1 focus:ring-[#E5AA9C] rounded-xl px-4 py-3 text-sm text-[#FAF7F2] placeholder-[#DCD4CA]/40 transition-all font-sans"
              />
            </div>

            {/* Profile Description / Bio (Requirement 5: Add a short profile description) */}
            <div className="space-y-2">
              <label htmlFor="bio-input" className="block text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider">
                Deskripsi Singkat Profil (Bio)
              </label>
              <textarea
                id="bio-input"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tuliskan deskripsi singkat tentang fokus karya kreatif Anda..."
                className="w-full bg-[#0C0C10] border border-[#E5AA9C]/30 focus:border-[#E5AA9C] focus:ring-1 focus:ring-[#E5AA9C] rounded-xl p-3.5 text-sm text-[#FAF7F2] placeholder-[#DCD4CA]/40 transition-all font-sans leading-relaxed resize-none"
              />
              <div className="flex justify-between text-[11px] text-[#DCD4CA]/60">
                <span>Ceritakan keunikan identitas karya atau produk Anda.</span>
                <span>{bio.length} karakter</span>
              </div>
            </div>

            {/* Submit & Save Button (Requirement 6: Save profile settings persistently) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isSaving || !displayName.trim()}
                className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-xl text-sm font-semibold text-[#0C0C10] bg-gradient-to-r from-[#E5AA9C] via-[#F2C4BA] to-[#FAF7F2] hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E5AA9C]/20 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#0C0C10]" />
                    <span>Menyimpan ke Server...</span>
                  </>
                ) : savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                    <span>Profil Tersimpan Persisten!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-[#0C0C10]" />
                    <span>Simpan Perubahan Profil</span>
                  </>
                )}
              </button>

              {savedSuccess && (
                <span className="text-xs text-emerald-400 flex items-center gap-1.5 animate-fade-in font-medium">
                  <Check className="w-3.5 h-3.5" />
                  Tersimpan di database & perangkat Anda
                </span>
              )}
            </div>

          </form>
        </div>

        {/* Right Col: Live Digital Creator Pass / Identity Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Live Identity Card
            </span>
            <span className="text-[10px] font-mono text-[#E5AA9C]">Preview Kartu</span>
          </div>

          <div className="relative rounded-2xl p-6 bg-gradient-to-b from-[#221A28] via-[#171420] to-[#0E0D14] border border-[#E5AA9C]/40 shadow-2xl overflow-hidden group">
            {/* Ambient luxury glow accents */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#E5AA9C]/15 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-[#9A5A65]/20 blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E5AA9C]/15">
                <SasLogo variant="horizontal" size="sm" showSlogan={false} />
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#E5AA9C]/10 text-[#E5AA9C] border border-[#E5AA9C]/30">
                  VERIFIED
                </span>
              </div>

              {/* Avatar + Name Block */}
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#E5AA9C]/60 bg-[#14131A] shrink-0 shadow-lg">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#9A5A65]/40 to-[#E5AA9C]/30 text-[#FAF7F2] font-serif font-bold text-lg">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-bold text-[#FAF7F2] truncate">
                    {displayName || 'Soul Art Creator'}
                  </h3>
                  <p className="text-xs text-[#E5AA9C] font-medium truncate">
                    {role || 'Digital Creator'}
                  </p>
                  <p className="text-[10px] text-[#DCD4CA]/50 font-mono mt-0.5">
                    ID: SAS-{Math.abs(displayName.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0) % 100000).toString().padStart(6, '0')}
                  </p>
                </div>
              </div>

              {/* Bio snippet */}
              <div className="p-3 rounded-xl bg-[#0C0C10]/70 border border-[#E5AA9C]/15 text-xs text-[#DCD4CA]/80 leading-relaxed font-sans min-h-[58px]">
                {bio || 'Belum ada deskripsi profil. Isi deskripsi untuk memperkenalkan fokus karya Anda.'}
              </div>

              {/* Card Footer badges */}
              <div className="pt-2 flex items-center justify-between text-[10px] text-[#DCD4CA]/60 border-t border-white/5 font-mono">
                <span>Access: 6 AI Engines</span>
                <span className="text-[#E5AA9C]">Soul Art License</span>
              </div>
            </div>
          </div>

          {/* Persistent Data Assurance Badge */}
          <div className="p-3.5 rounded-xl bg-[#14131A] border border-[#E5AA9C]/15 flex items-start gap-2.5 text-xs text-[#DCD4CA]/70">
            <ShieldCheck className="w-4 h-4 text-[#E5AA9C] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Pengaturan profil Anda tersimpan aman dan persisten di database internal SAS AI serta disinkronkan otomatis pada browser Anda.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
