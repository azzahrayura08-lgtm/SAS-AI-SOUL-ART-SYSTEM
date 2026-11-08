import React, { useState, useRef, useEffect } from 'react';
import { 
  Film, 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Music, 
  Play, 
  Pause, 
  Download, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  Clock, 
  Palette, 
  Layers, 
  FolderDown, 
  ArrowRight,
  Eye,
  Check,
  ChevronRight,
  Plus
} from 'lucide-react';
import { AspectRatioType, MediaItem, ModuleType, RenderProgress, ThemeStyle, VideoProject } from '../../types';
import { 
  ASPECT_RATIO_DIMENSIONS, 
  buildModuleVisualPrompt, 
  downloadMediaFile, 
  generateLocalLuxuryCanvasImage, 
  getAiImageUrl, 
  renderVideoToMP4 
} from '../../services/mediaEngine';

interface ReelsStudioModuleProps {
  onSaveToHistory?: (item: {
    moduleId: ModuleType;
    title: string;
    subtitle: string;
    content: string;
    metadata?: Record<string, any>;
    generatedVideoUrl?: string;
    generatedImageUrl?: string;
  }) => void;
  initialSourceModule?: ModuleType;
}

export const ReelsStudioModule: React.FC<ReelsStudioModuleProps> = ({
  onSaveToHistory,
  initialSourceModule = 'umkm',
}) => {
  // Navigation Tabs: Studio Editor vs Media Gallery
  const [activeTab, setActiveTab] = useState<'studio' | 'gallery'>('studio');

  // 1. Input Judul Video
  const [videoTitle, setVideoTitle] = useState('Promosi Produk Unggulan');

  // 2. Input Nama Produk
  const [productName, setProductName] = useState('Parfum Couture Rose Gold');

  // 3. Input Deskripsi Produk
  const [productDescription, setProductDescription] = useState(
    'Aroma kemewahan floral manis dengan sentuhan amber hangat dan partikel kilau emas 24k untuk penampilan memikat sepanjang hari.'
  );

  // 4. Upload Beberapa Gambar Produk dari HP
  const [uploadedImages, setUploadedImages] = useState<{ id: string; url: string; name: string }[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 5. Pilihan Format Video (Default Vertikal 9:16)
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('9:16');

  // 6. Pilihan Durasi 15, 30, dan 60 Detik
  const [duration, setDuration] = useState<15 | 30 | 60>(15);

  // 7. Pilihan Tema: Luxury, Minimalis, Ceria, Profesional
  const [themeStyle, setThemeStyle] = useState<ThemeStyle>('luxury');

  // 8. Input Teks: Pembuka (Hook), Promosi, dan Penutup (CTA)
  const [hookText, setHookText] = useState('Rahasia Tampil Menawan & Elegan Setiap Hari');
  const [promoText, setPromoText] = useState('Dapatkan Diskon Spesial 35% Khusus Hari Ini + Gratis Ongkir Seluruh Indonesia');
  const [ctaText, setCtaText] = useState('Pesan Sekarang via WhatsApp');

  // 9. Upload Audio atau Musik Latar Milik Pengguna
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // 10. Preview Susunan Video (Canvas animation)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(true);
  const [currentSlidePreviewIndex, setCurrentSlidePreviewIndex] = useState(0);

  // 11. Render Video State & Progress
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState<RenderProgress | null>(null);
  const [renderedVideoUrl, setRenderedVideoUrl] = useState<string | null>(null);
  const [renderedFileName, setRenderedFileName] = useState<string | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  // 12. Download Manager & Gallery
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [galleryItems, setGalleryItems] = useState<MediaItem[]>([]);

  // Generated AI Backdrop Fallback if no images uploaded
  const [aiBackdropUrl, setAiBackdropUrl] = useState<string>('');

  // Generate initial AI backdrop
  useEffect(() => {
    const prompt = buildModuleVisualPrompt('umkm', productName, productDescription, { theme: themeStyle, aspectRatio });
    const url = getAiImageUrl(prompt, aspectRatio, 4422);
    setAiBackdropUrl(url);
  }, [productName, themeStyle, aspectRatio]);

  // Handle Multi-Image Upload from HP
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImgs: { id: string; url: string; name: string }[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      newImgs.push({
        id: `img_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        url,
        name: file.name,
      });
    });

    setUploadedImages((prev) => [...prev, ...newImgs]);
    // Reset file input so user can add more
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Handle Audio File Upload from HP
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setUploadedAudioUrl(url);
    setAudioFileName(file.name);
    setIsPlayingAudio(false);

    // Convert audio file to Base64 for server-side AAC mixing
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      if (res && res.includes(',')) {
        setAudioBase64(res.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTogglePlayAudio = () => {
    if (!audioPlayerRef.current || !uploadedAudioUrl) return;
    if (isPlayingAudio) {
      audioPlayerRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  // Interactive Live Preview Loop
  useEffect(() => {
    let animId: number;
    let startTime = performance.now();

    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imagesToUse = uploadedImages.length > 0 
      ? uploadedImages.map((i) => i.url) 
      : [aiBackdropUrl || generateLocalLuxuryCanvasImage(productName, hookText, aspectRatio, themeStyle)];

    // Preload preview images
    const htmlImgs: HTMLImageElement[] = [];
    imagesToUse.forEach((src) => {
      const img = new Image();
      img.src = src;
      htmlImgs.push(img);
    });

    const renderPreviewLoop = (now: number) => {
      if (!isPreviewPlaying) {
        animId = requestAnimationFrame(renderPreviewLoop);
        return;
      }

      const elapsedSec = ((now - startTime) / 1000) % duration;
      const progressNorm = elapsedSec / duration;

      const numImgs = htmlImgs.length;
      const timePerImg = duration / numImgs;
      const curIdx = Math.min(Math.floor(elapsedSec / timePerImg), numImgs - 1);
      setCurrentSlidePreviewIndex(curIdx);

      const w = canvas.width;
      const h = canvas.height;

      // Clear
      ctx.fillStyle = '#0C0C10';
      ctx.fillRect(0, 0, w, h);

      // Draw background image
      const activeImg = htmlImgs[curIdx];
      if (activeImg && activeImg.complete && activeImg.naturalWidth > 0) {
        ctx.save();
        const scale = 1.0 + (elapsedSec % timePerImg) * 0.02;
        ctx.translate(w / 2, h / 2);
        ctx.scale(scale, scale);
        ctx.drawImage(activeImg, -w / 2, -h / 2, w, h);
        ctx.restore();
      }

      // Vignette
      const grad = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.8);
      grad.addColorStop(0, 'rgba(12, 12, 16, 0.2)');
      grad.addColorStop(0.7, 'rgba(12, 12, 16, 0.65)');
      grad.addColorStop(1, 'rgba(12, 12, 16, 0.9)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Header Badge
      ctx.textAlign = 'center';
      ctx.fillStyle = themeStyle === 'profesional' ? '#D4AF37' : '#E5AA9C';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(`✨ ${productName.toUpperCase()}`, w / 2, 28);

      // Kinetic Text Phasing
      if (progressNorm < 0.32) {
        // Phase 1: Hook
        ctx.font = 'bold 16px serif';
        ctx.fillStyle = '#FAF7F2';
        ctx.shadowColor = 'rgba(0,0,0,0.9)';
        ctx.shadowBlur = 8;
        ctx.fillText(hookText.slice(0, 36), w / 2, h * 0.45);
        ctx.shadowBlur = 0;
      } else if (progressNorm < 0.72) {
        // Phase 2: Promo
        ctx.font = 'bold 14px sans-serif';
        ctx.fillStyle = '#FAF7F2';
        ctx.shadowColor = 'rgba(0,0,0,0.9)';
        ctx.shadowBlur = 8;
        ctx.fillText(promoText.slice(0, 42), w / 2, h * 0.46);
        ctx.font = 'italic 11px serif';
        ctx.fillStyle = '#E5AA9C';
        ctx.fillText(productName, w / 2, h * 0.52);
        ctx.shadowBlur = 0;
      } else {
        // Phase 3: CTA
        ctx.font = 'bold 14px serif';
        ctx.fillStyle = '#FAF7F2';
        ctx.fillText('Penawaran Terbatas!', w / 2, h * 0.44);

        // CTA button pill
        ctx.fillStyle = themeStyle === 'profesional' ? '#D4AF37' : '#E5AA9C';
        ctx.beginPath();
        ctx.roundRect(w / 2 - 80, h * 0.78 - 14, 160, 28, 14);
        ctx.fill();

        ctx.fillStyle = '#0C0C10';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(ctaText.slice(0, 24), w / 2, h * 0.78 + 4);
      }

      animId = requestAnimationFrame(renderPreviewLoop);
    };

    animId = requestAnimationFrame(renderPreviewLoop);
    return () => cancelAnimationFrame(animId);
  }, [uploadedImages, aiBackdropUrl, productName, hookText, promoText, ctaText, themeStyle, duration, isPreviewPlaying, aspectRatio]);

  // Execute Real MP4 Video Rendering
  const handleRenderVideo = async () => {
    if (isRendering) return;
    setIsRendering(true);
    setRenderError(null);
    setRenderedVideoUrl(null);
    setRenderedFileName(null);
    setDownloadSuccess(false);

    const imagesToProcess = uploadedImages.length > 0 
      ? uploadedImages.map((i) => i.url) 
      : [aiBackdropUrl || generateLocalLuxuryCanvasImage(productName, hookText, aspectRatio, themeStyle)];

    const project: VideoProject = {
      id: `proj_${Date.now()}`,
      sourceModule: 'reels_studio',
      title: videoTitle.trim() || 'SAS Reels Project',
      productName: productName.trim(),
      productDescription: productDescription.trim(),
      hookText: hookText.trim(),
      promoText: promoText.trim(),
      ctaText: ctaText.trim() || 'Pesan Sekarang',
      aspectRatio,
      durationSeconds: duration,
      fps: 24,
      themeStyle,
      motionStyle: 'luxury_zoom',
      particleEffect: themeStyle === 'luxury' ? 'rose_gold_sparkles' : themeStyle === 'ceria' ? 'dusty_bokeh' : 'ambient_glow',
      audioStyle: uploadedAudioUrl ? 'user_audio' : 'luxury_ambient',
      imageUrls: imagesToProcess,
      audioFileUrl: uploadedAudioUrl || undefined,
      audioBase64: audioBase64 || undefined,
      brandWatermark: true,
    };

    try {
      const result = await renderVideoToMP4(project, (progress) => {
        setRenderProgress(progress);
      });

      setRenderedVideoUrl(result.url);
      setRenderedFileName(result.fileName);

      // Add to session gallery
      const mediaItem: MediaItem = {
        id: `media_${Date.now()}`,
        type: 'video',
        title: project.title,
        url: result.url,
        thumbnailUrl: imagesToProcess[0],
        sourceModule: 'reels_studio',
        aspectRatio,
        durationSeconds: duration,
        mimeType: 'video/mp4',
        createdAt: Date.now(),
      };
      setGalleryItems((prev) => [mediaItem, ...prev]);

      // Save to History Database
      if (onSaveToHistory) {
        onSaveToHistory({
          moduleId: 'reels_studio',
          title: `🎬 Video Reels MP4: ${project.title}`,
          subtitle: `Produk: ${project.productName} · Durasi: ${duration}s · Tema: ${themeStyle.toUpperCase()}`,
          content: `### 🎬 Video Reels MP4 Berhasil Di-Render\n\n• **Judul Video**: ${project.title}\n• **Nama Produk**: ${project.productName}\n• **Teks Pembuka (Hook)**: "${project.hookText}"\n• **Teks Promosi**: "${project.promoText}"\n• **Teks Penutup (CTA)**: "${project.ctaText}"\n• **Durasi**: ${duration} Detik (Universal Android MP4)\n• **Jumlah Foto Produk**: ${imagesToProcess.length} Foto\n• **Musik**: ${audioFileName ? `File Musik: ${audioFileName}` : 'Audio Synth Bawaan'}\n• **Format**: ISO-BMFF MP4 (H.264/AVC1 Universal Playback)`,
          metadata: {
            duration,
            themeStyle,
            aspectRatio,
            productName: project.productName,
          },
          generatedVideoUrl: result.url,
          generatedImageUrl: imagesToProcess[0],
        });
      }
    } catch (err: any) {
      console.error('Render error:', err);
      const detailMsg = err?.message || String(err);
      setRenderError(`Terjadi kesalahan saat melakukan rendering: ${detailMsg}`);
    } finally {
      setIsRendering(false);
    }
  };

  // Direct Download MP4 Trigger
  const handleDownloadMp4 = () => {
    if (!renderedVideoUrl || !renderedFileName) return;
    const ok = downloadMediaFile(renderedVideoUrl, renderedFileName);
    if (ok) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      
      {/* Studio Header Banner */}
      <div className="relative rounded-2xl p-5 sm:p-7 bg-gradient-to-r from-[#2A1624] via-[#1B1525] to-[#12111A] border border-[#E5AA9C]/35 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5AA9C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5AA9C]/15 border border-[#E5AA9C]/30 text-xs font-mono text-[#E5AA9C]">
              <Film className="w-3.5 h-3.5 text-[#E5AA9C]" />
              <span>SAS AI Media Engine · Video MP4 Renderer</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
              AI Reels Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#DCD4CA]/80 max-w-2xl font-sans">
              Pusat pembuatan dan rendering video promosi MP4 vertikal 9:16 dari foto produk dan musik Anda. Menghasilkan file MP4 asli yang dapat langsung disimpan ke galeri HP Android.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 bg-[#0C0C10] p-1.5 rounded-xl border border-[#E5AA9C]/25 shrink-0">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'studio'
                  ? 'bg-gradient-to-r from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2] shadow-md'
                  : 'text-[#DCD4CA]/70 hover:text-[#FAF7F2]'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Studio Editor</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2] shadow-md'
                  : 'text-[#DCD4CA]/70 hover:text-[#FAF7F2]'
              }`}
            >
              <FolderDown className="w-4 h-4" />
              <span>Galeri MP4 ({galleryItems.length})</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'studio' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* =========================================================
              LEFT COLUMN (7 COLS): FULL CONFIGURATION FORM
             ========================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1, 2, 3: Judul Video, Nama Produk, Deskripsi Produk */}
            <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#FAF7F2] tracking-wider uppercase pb-2 border-b border-[#E5AA9C]/10">
                <span className="w-5 h-5 rounded-full bg-[#E5AA9C]/20 text-[#E5AA9C] flex items-center justify-center font-mono text-[10px]">1</span>
                <span>Informasi Produk & Judul Video</span>
              </div>

              <div className="space-y-3">
                {/* 1. Input Judul Video */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#FAF7F2] mb-1">
                    Judul Video (Project Title):
                  </label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Contoh: Video Promosi Reels Instagram"
                    className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF7F2] focus:border-[#E5AA9C] focus:outline-none"
                  />
                </div>

                {/* 2. Input Nama Produk */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#FAF7F2] mb-1">
                    Nama Produk / Bisnis:
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Contoh: Tas Kulit Handmade Classic"
                    className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF7F2] font-semibold focus:border-[#E5AA9C] focus:outline-none"
                  />
                </div>

                {/* 3. Input Deskripsi Produk */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#FAF7F2] mb-1">
                    Deskripsi Produk:
                  </label>
                  <textarea
                    rows={2}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Tuliskan keunggulan, bahan, atau manfaat utama produk..."
                    className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#FAF7F2] focus:border-[#E5AA9C] focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 4. Upload Beberapa Gambar Produk dari HP */}
            <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5AA9C]/10">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#FAF7F2] tracking-wider uppercase">
                  <span className="w-5 h-5 rounded-full bg-[#E5AA9C]/20 text-[#E5AA9C] flex items-center justify-center font-mono text-[10px]">2</span>
                  <span>Upload Foto Produk dari HP</span>
                </div>
                <span className="text-[10px] font-mono text-[#E5AA9C]">
                  {uploadedImages.length} Foto Dipilih
                </span>
              </div>

              {/* Upload Dropzone / Button */}
              <input
                ref={imageInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="product-images-upload"
              />

              <div 
                onClick={() => imageInputRef.current?.click()}
                className="border-2 border-dashed border-[#E5AA9C]/30 hover:border-[#E5AA9C] bg-[#0C0C10]/60 hover:bg-[#181622] rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-[#E5AA9C]/15 text-[#E5AA9C] flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#FAF7F2]">
                    Sentuh di sini untuk memilih beberapa foto dari HP
                  </p>
                  <p className="text-[10px] text-[#DCD4CA]/60 mt-0.5">
                    Mendukung format JPG, PNG, WEBP (bisa pilih lebih dari 1 foto untuk slideshow)
                  </p>
                </div>
              </div>

              {/* Uploaded Images Thumbnails Grid */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 pt-1">
                  {uploadedImages.map((img, idx) => (
                    <div 
                      key={img.id}
                      className="relative rounded-xl overflow-hidden border border-[#E5AA9C]/40 bg-[#0C0C10] aspect-square group shadow-md"
                    >
                      <img 
                        src={img.url} 
                        alt={img.name} 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1 left-1 bg-black/70 text-[#FAF7F2] text-[9px] font-mono px-1.5 py-0.5 rounded">
                        #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(img.id);
                        }}
                        className="absolute top-1 right-1 bg-rose-600/90 hover:bg-rose-600 text-white p-1 rounded-md transition-colors"
                        title="Hapus foto ini"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 5 & 6: Format Video & Pilihan Durasi (15, 30, 60s) */}
            <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#FAF7F2] tracking-wider uppercase pb-2 border-b border-[#E5AA9C]/10">
                <span className="w-5 h-5 rounded-full bg-[#E5AA9C]/20 text-[#E5AA9C] flex items-center justify-center font-mono text-[10px]">3</span>
                <span>Format & Durasi Video</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 5. Format Video (Default Vertikal 9:16) */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-[#FAF7F2]">
                    Format Video:
                  </label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as AspectRatioType)}
                    className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#FAF7F2] focus:border-[#E5AA9C] focus:outline-none"
                  >
                    <option value="9:16">📱 Vertikal 9:16 (Reels, TikTok, Shorts)</option>
                    <option value="1:1">⬛ Persegi 1:1 (Instagram Feed)</option>
                    <option value="4:5">🖼️ Potret 4:5 (Post Instagram)</option>
                    <option value="16:9">💻 Lanskap 16:9 (YouTube / Web)</option>
                  </select>
                </div>

                {/* 6. Pilihan Durasi 15, 30, dan 60 Detik */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-[#FAF7F2]">
                    Durasi Video:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[15, 30, 60].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => setDuration(sec as 15 | 30 | 60)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          duration === sec
                            ? 'border-[#E5AA9C] bg-[#E5AA9C]/20 text-[#FAF7F2] shadow-sm'
                            : 'border-white/10 bg-[#0C0C10] text-[#DCD4CA]/60 hover:border-white/20'
                        }`}
                      >
                        {sec} Detik
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 7. Pilihan Tema: Luxury, Minimalis, Ceria, Profesional */}
            <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#FAF7F2] tracking-wider uppercase pb-2 border-b border-[#E5AA9C]/10">
                <span className="w-5 h-5 rounded-full bg-[#E5AA9C]/20 text-[#E5AA9C] flex items-center justify-center font-mono text-[10px]">4</span>
                <span>Pilihan Tema Visual</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'luxury', name: 'Luxury', desc: 'Rose Gold & Obsidian', icon: '✨' },
                  { id: 'minimalis', name: 'Minimalis', desc: 'Bersih & Monokrom', icon: '◻️' },
                  { id: 'ceria', name: 'Ceria', desc: 'Peach & Enerjik', icon: '🎉' },
                  { id: 'profesional', name: 'Profesional', desc: 'Emas & Slate Navy', icon: '💼' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeStyle(t.id as ThemeStyle)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      themeStyle === t.id
                        ? 'border-[#E5AA9C] bg-[#E5AA9C]/20 text-[#FAF7F2] shadow-md ring-1 ring-[#E5AA9C]'
                        : 'border-white/10 bg-[#0C0C10] text-[#DCD4CA]/70 hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg mb-1">{t.icon}</span>
                    <div>
                      <div className="text-xs font-serif font-bold text-[#FAF7F2]">{t.name}</div>
                      <div className="text-[10px] text-[#DCD4CA]/60">{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 8. Input Teks Pembuka, Promosi, dan Penutup */}
            <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#FAF7F2] tracking-wider uppercase pb-2 border-b border-[#E5AA9C]/10">
                <span className="w-5 h-5 rounded-full bg-[#E5AA9C]/20 text-[#E5AA9C] flex items-center justify-center font-mono text-[10px]">5</span>
                <span>Susunan Teks Kinetik (Hook, Promosi & CTA)</span>
              </div>

              <div className="space-y-3">
                {/* Teks Pembuka (Hook) */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#FAF7F2] mb-1">
                    🎯 Teks Pembuka (Hook 3 Detik Pertama):
                  </label>
                  <input
                    type="text"
                    value={hookText}
                    onChange={(e) => setHookText(e.target.value)}
                    placeholder="Contoh: Rahasia Tampil Menawan Sepanjang Hari"
                    className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF7F2] font-semibold focus:border-[#E5AA9C] focus:outline-none"
                  />
                </div>

                {/* Teks Promosi */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#FAF7F2] mb-1">
                    💎 Teks Promosi (Penawaran & Keunggulan):
                  </label>
                  <textarea
                    rows={2}
                    value={promoText}
                    onChange={(e) => setPromoText(e.target.value)}
                    placeholder="Contoh: Dapatkan Promo Spesial Diskon 30% + Bonus Eksklusif..."
                    className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#FAF7F2] focus:border-[#E5AA9C] focus:outline-none resize-none"
                  />
                </div>

                {/* Teks Penutup */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#FAF7F2] mb-1">
                    🚀 Teks Penutup (Call to Action / Tombol):
                  </label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="Contoh: Pesan Sekarang via WhatsApp"
                    className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF7F2] font-semibold focus:border-[#E5AA9C] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 9. Upload Audio atau Musik Latar Milik Pengguna */}
            <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5AA9C]/10">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#FAF7F2] tracking-wider uppercase">
                  <span className="w-5 h-5 rounded-full bg-[#E5AA9C]/20 text-[#E5AA9C] flex items-center justify-center font-mono text-[10px]">6</span>
                  <span>Audio & Musik Latar (Opsional)</span>
                </div>
                {audioFileName && (
                  <span className="text-[10px] font-mono text-emerald-400">
                    ✓ {audioFileName}
                  </span>
                )}
              </div>

              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                className="hidden"
                id="user-audio-upload"
              />

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => audioInputRef.current?.click()}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E5AA9C]/30 bg-[#0C0C10] hover:bg-[#181622] text-xs font-semibold text-[#FAF7F2] flex items-center justify-center gap-2 transition-colors shrink-0"
                >
                  <Music className="w-4 h-4 text-[#E5AA9C]" />
                  <span>{audioFileName ? 'Ganti File Musik' : 'Upload File Musik dari HP'}</span>
                </button>

                {uploadedAudioUrl && (
                  <div className="w-full flex items-center gap-2 p-2 rounded-xl bg-[#0C0C10] border border-white/10">
                    <button
                      type="button"
                      onClick={handleTogglePlayAudio}
                      className="p-2 rounded-lg bg-[#E5AA9C] text-[#0C0C10] hover:scale-105 transition-transform shrink-0"
                      title={isPlayingAudio ? 'Jeda Audio' : 'Putar Audio'}
                    >
                      {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-xs text-[#FAF7F2] truncate flex-1">
                      {audioFileName}
                    </span>
                    <audio
                      ref={audioPlayerRef}
                      src={uploadedAudioUrl}
                      onEnded={() => setIsPlayingAudio(false)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedAudioUrl(null);
                        setAudioFileName(null);
                        setAudioBase64(null);
                        setIsPlayingAudio(false);
                      }}
                      className="text-rose-400 hover:text-rose-300 p-1"
                      title="Hapus Musik"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* =========================================================
              RIGHT COLUMN (5 COLS): 10. PREVIEW, 11. RENDER, 12. DOWNLOAD
             ========================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 10. Preview Susunan Video */}
            <div className="bg-[#14131A] border border-[#E5AA9C]/25 rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5AA9C]/15">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#E5AA9C]" />
                  <span className="text-xs font-serif font-bold text-[#FAF7F2]">
                    10. Preview Susunan Video (9:16)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPreviewPlaying(!isPreviewPlaying)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#E5AA9C] bg-[#0C0C10] border border-[#E5AA9C]/30 hover:border-[#E5AA9C] flex items-center gap-1.5 transition-colors"
                >
                  {isPreviewPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isPreviewPlaying ? 'Jeda' : 'Putar'}</span>
                </button>
              </div>

              {/* Mobile Phone Mockup Frame */}
              <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-[#E5AA9C]/35 bg-[#0C0C10] shadow-2xl max-w-[280px] sm:max-w-[320px] aspect-[9/16] flex items-center justify-center">
                
                {/* If rendered video exists, show actual video player! */}
                {renderedVideoUrl ? (
                  <video
                    src={renderedVideoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* Otherwise show real-time interactive canvas preview */
                  <canvas
                    ref={previewCanvasRef}
                    width={288}
                    height={512}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Slideshow dot indicators if multiple images */}
                {uploadedImages.length > 1 && !renderedVideoUrl && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                    {uploadedImages.map((_, i) => (
                      <span 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          currentSlidePreviewIndex === i ? 'bg-[#E5AA9C] w-3' : 'bg-white/40'
                        }`} 
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* 11. Tombol Render Video */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={handleRenderVideo}
                  disabled={isRendering}
                  className={`w-full min-h-[50px] rounded-xl font-serif text-sm font-bold tracking-wide uppercase shadow-xl transition-all flex items-center justify-center gap-2.5 ${
                    isRendering
                      ? 'bg-[#1C1A24] text-[#E5AA9C] border border-[#E5AA9C]/40 cursor-wait'
                      : 'bg-gradient-to-r from-[#FAF7F2] via-[#E5AA9C] to-[#C98B94] text-[#0C0C10] hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {isRendering ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#E5AA9C]" />
                      <span>Merender Video MP4 ({renderProgress?.percentage || 0}%)...</span>
                    </>
                  ) : (
                    <>
                      <Film className="w-4 h-4" />
                      <span>{renderedVideoUrl ? 'Render Ulang Video MP4' : '11. Render Video MP4'}</span>
                    </>
                  )}
                </button>

                {/* Render Progress Indicator */}
                {isRendering && renderProgress && (
                  <div className="space-y-1.5 p-3 rounded-xl bg-[#0C0C10] border border-[#E5AA9C]/30 text-xs animate-fade-in">
                    <div className="flex items-center justify-between font-mono text-[11px] text-[#E5AA9C]">
                      <span>
                        {renderProgress.phase === 'preparing' && 'Menyiapkan aset & foto...'}
                        {renderProgress.phase === 'drawing_frames' && `Menggambar frame ${renderProgress.currentFrame}/${renderProgress.totalFrames}`}
                        {renderProgress.phase === 'encoding_mp4' && 'Muxing MP4 H.264 Universal...'}
                        {renderProgress.phase === 'completed' && 'Selesai!'}
                      </span>
                      <span>{renderProgress.percentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#181622] overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#9A5A65] via-[#E5AA9C] to-[#FAF7F2] transition-all duration-150"
                        style={{ width: `${renderProgress.percentage}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Render Error Banner */}
                {renderError && (
                  <div className="p-3 bg-rose-950/30 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{renderError}</span>
                  </div>
                )}

                {/* 12. Tombol Download MP4 (HANYA AKTIF JIKA MP4 BERHASIL DI-RENDER) */}
                {renderedVideoUrl ? (
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#1C281F] via-[#141C16] to-[#0C0C10] border border-emerald-500/40 space-y-3 animate-fade-in shadow-xl">
                    <div className="flex items-center gap-2 text-emerald-400 font-serif font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>12. Video MP4 Berhasil Dibuat!</span>
                    </div>
                    <p className="text-[11px] text-[#DCD4CA]/80 leading-relaxed font-sans">
                      File MP4 asli beresolusi tinggi telah berhasil dimuxing. Siap diunduh langsung ke galeri HP Android Anda.
                    </p>

                    <button
                      type="button"
                      onClick={handleDownloadMp4}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Video MP4 ke HP</span>
                    </button>

                    {downloadSuccess && (
                      <div className="text-[11px] text-center font-mono text-emerald-300">
                        ✓ File MP4 berhasil diunduh ke folder Download HP Anda!
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-[#0C0C10] border border-white/5 text-center text-xs text-[#DCD4CA]/50">
                    <span>12. Tombol Download MP4 akan aktif setelah proses render selesai.</span>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Gallery Tab */
        <div className="bg-[#14131A] border border-[#E5AA9C]/20 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5AA9C]/15">
            <div>
              <h2 className="text-base font-serif font-bold text-[#FAF7F2]">
                Koleksi Video Reels MP4
              </h2>
              <p className="text-xs text-[#DCD4CA]/70">
                Daftar video MP4 yang telah di-render dan tersimpan pada sesi ini.
              </p>
            </div>
            <span className="text-xs font-mono text-[#E5AA9C] bg-[#0C0C10] px-3 py-1 rounded-full border border-[#E5AA9C]/20">
              {galleryItems.length} Video MP4
            </span>
          </div>

          {galleryItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Film className="w-10 h-10 text-[#E5AA9C]/40 mx-auto" />
              <h3 className="font-serif text-sm font-semibold text-[#FAF7F2]">Belum Ada Video MP4</h3>
              <p className="text-xs text-[#DCD4CA]/60 max-w-md mx-auto">
                Silakan kembali ke tab Studio Editor untuk menyusun foto produk dan merender video MP4 pertama Anda.
              </p>
              <button
                onClick={() => setActiveTab('studio')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2] text-xs font-semibold shadow-md inline-flex items-center gap-1.5"
              >
                <span>Buka Studio Editor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0C0C10] border border-[#E5AA9C]/20 rounded-xl overflow-hidden shadow-md flex flex-col justify-between"
                >
                  <div className="relative aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
                    <video
                      src={item.url}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-black/70 text-[#E5AA9C] border border-[#E5AA9C]/30">
                      MP4 · {item.durationSeconds}s
                    </span>
                  </div>

                  <div className="p-3.5 space-y-2">
                    <h4 className="font-serif text-xs font-bold text-[#FAF7F2] line-clamp-1">{item.title}</h4>
                    <p className="text-[10px] text-[#DCD4CA]/60 font-mono">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>

                    <button
                      onClick={() => downloadMediaFile(item.url, `SAS_${item.title.replace(/\s+/g, '_')}_${Date.now()}.mp4`)}
                      className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download Video MP4</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
