import React, { useState } from 'react';
import { 
  Film, 
  Sparkles, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  Smartphone, 
  Play, 
  ExternalLink,
  Layers,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon
} from 'lucide-react';
import { AspectRatioType, ModuleType, RenderProgress, VideoProject } from '../types';
import { 
  buildModuleVisualPrompt, 
  downloadMediaFile, 
  generateLocalLuxuryCanvasImage, 
  getAiImageUrl, 
  renderVideoToMP4 
} from '../services/mediaEngine';

interface MediaActionCardProps {
  sourceModule: ModuleType;
  title: string;
  subtitle: string;
  content: string;
  onOpenInReelsStudio?: (params: {
    sourceModule: ModuleType;
    title: string;
    hookText: string;
    subtitleText: string;
  }) => void;
  onAutoSaveToHistory?: (mediaData: {
    videoUrl?: string;
    imageUrl?: string;
  }) => void;
}

export const MediaActionCard: React.FC<MediaActionCardProps> = ({
  sourceModule,
  title,
  subtitle,
  content,
  onOpenInReelsStudio,
  onAutoSaveToHistory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('9:16');
  const [hookText, setHookText] = useState(title);
  const [ctaText, setCtaText] = useState('Pesan / Simpan Sekarang');

  // Image State
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Video State
  const [isRenderingVideo, setIsRenderingVideo] = useState(false);
  const [renderProgress, setRenderProgress] = useState<RenderProgress | null>(null);
  const [renderedVideoUrl, setRenderedVideoUrl] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Generate Image for this output
  const handleGenerateImage = () => {
    setIsGeneratingImage(true);
    const prompt = buildModuleVisualPrompt(sourceModule, title, content, { aspectRatio });
    const seed = Math.floor(Math.random() * 999999);
    const url = getAiImageUrl(prompt, aspectRatio, seed);

    const testImg = new Image();
    testImg.onload = () => {
      setImageUrl(url);
      setIsGeneratingImage(false);
      onAutoSaveToHistory?.({ imageUrl: url });
    };
    testImg.onerror = () => {
      const fallback = generateLocalLuxuryCanvasImage(title, subtitle, aspectRatio);
      setImageUrl(fallback);
      setIsGeneratingImage(false);
      onAutoSaveToHistory?.({ imageUrl: fallback });
    };
    testImg.src = url;
  };

  // Render Video MP4 for this output
  const handleRenderVideo = async () => {
    if (isRenderingVideo) return;
    setIsRenderingVideo(true);
    setRenderedVideoUrl(null);
    setDownloadSuccess(false);

    // If no image generated yet, generate one first
    let currentImg = imageUrl;
    if (!currentImg) {
      const prompt = buildModuleVisualPrompt(sourceModule, title, content, { aspectRatio });
      currentImg = getAiImageUrl(prompt, aspectRatio, Math.floor(Math.random() * 888888));
      setImageUrl(currentImg);
    }

    const project: VideoProject = {
      id: `proj_${Date.now()}`,
      sourceModule,
      title: title || 'SAS Visual Creative',
      hookText: hookText || title,
      subtitleText: subtitle,
      ctaText: ctaText,
      aspectRatio,
      durationSeconds: 15,
      fps: 24,
      themeStyle: 'luxury',
      motionStyle: 'luxury_zoom',
      particleEffect: 'rose_gold_sparkles',
      audioStyle: 'luxury_ambient',
      backgroundImageUrl: currentImg,
      brandWatermark: true,
    };

    try {
      const result = await renderVideoToMP4(project, (prog) => {
        setRenderProgress(prog);
      });
      setRenderedVideoUrl(result.url);
      onAutoSaveToHistory?.({ videoUrl: result.url, imageUrl: currentImg });
    } catch (err: any) {
      console.error('Error rendering module video:', err);
      setRenderProgress({
        phase: 'error',
        currentFrame: 0,
        totalFrames: 0,
        percentage: 0,
        errorMessage: err?.message || 'Gagal merender video.',
      });
    } finally {
      setIsRenderingVideo(false);
    }
  };

  const handleDownloadMp4 = () => {
    if (!renderedVideoUrl) return;
    const ok = downloadMediaFile(renderedVideoUrl, `SAS_Reels_${sourceModule}_${Date.now()}.mp4`);
    if (ok) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  const handleDownloadImage = () => {
    if (!imageUrl) return;
    const ok = downloadMediaFile(imageUrl, `SAS_Image_${sourceModule}_${Date.now()}.png`);
    if (ok) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  return (
    <div className="rounded-2xl border border-[#E5AA9C]/30 bg-gradient-to-r from-[#1E1724] via-[#14121C] to-[#0C0C10] p-4 sm:p-5 shadow-xl transition-all space-y-4">
      
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-[#9A5A65] to-[#E5AA9C] text-[#FAF7F2] shrink-0 shadow-md">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#E5AA9C] uppercase tracking-wider bg-[#0C0C10] px-2 py-0.5 rounded border border-[#E5AA9C]/20">
                SAS AI Media Engine
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">100% Gratis Tanpa Biaya</span>
            </div>
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#FAF7F2]">
              Buat Visual Gambar & Video Reels MP4
            </h3>
            <p className="text-[11px] text-[#DCD4CA]/70">
              Ubah hasil {sourceModule.replace('_', ' ')} ini menjadi konten visual sinematik dan video MP4 untuk Reels/TikTok.
            </p>
          </div>
        </div>

        {/* Action Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onOpenInReelsStudio && (
            <button
              type="button"
              onClick={() => onOpenInReelsStudio({ sourceModule, title, hookText: title, subtitleText: subtitle })}
              className="px-3 py-1.5 rounded-lg bg-[#0C0C10] hover:bg-[#1E1C28] text-[#E5AA9C] border border-[#E5AA9C]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Buka di Reels Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg bg-[#14131A] text-[#FAF7F2] border border-white/10 hover:border-[#E5AA9C]/40 transition-colors"
            title={isExpanded ? 'Tutup Panel' : 'Buka Pengaturan Visual'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quick Action Buttons (Always Visible) */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <button
          type="button"
          onClick={handleGenerateImage}
          disabled={isGeneratingImage}
          className="px-3.5 py-2 rounded-xl bg-[#221F2C] hover:bg-[#2C2738] text-[#FAF7F2] border border-[#E5AA9C]/30 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
        >
          <ImageIcon className={`w-3.5 h-3.5 text-[#E5AA9C] ${isGeneratingImage ? 'animate-spin' : ''}`} />
          <span>{imageUrl ? 'Regenerate Visual AI' : '🎨 Buat Gambar AI'}</span>
        </button>

        <button
          type="button"
          onClick={handleRenderVideo}
          disabled={isRenderingVideo}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9A5A65] via-[#E5AA9C] to-[#FAF7F2] text-[#0C0C10] text-xs font-serif font-bold tracking-wide uppercase flex items-center gap-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          <Film className="w-3.5 h-3.5 text-[#0C0C10]" />
          <span>{renderedVideoUrl ? 'Render Ulang MP4' : '🎬 Render Video MP4 (9:16)'}</span>
        </button>
      </div>

      {/* Expanded Controls & Media Preview Section */}
      {(isExpanded || imageUrl || renderedVideoUrl || isRenderingVideo) && (
        <div className="pt-3 border-t border-[#FAF7F2]/10 space-y-4 animate-fade-in">
          
          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-[11px] text-[#DCD4CA]/80 mb-1">Rasio Aspek:</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatioType)}
                className="w-full bg-[#0C0C10] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-[#FAF7F2] focus:border-[#E5AA9C] focus:outline-none"
              >
                <option value="9:16">9:16 (Reels/TikTok/Story)</option>
                <option value="1:1">1:1 (Square Feed)</option>
                <option value="4:5">4:5 (Portrait Editorial)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-[#DCD4CA]/80 mb-1">Hook Headline Video:</label>
              <input
                type="text"
                value={hookText}
                onChange={(e) => setHookText(e.target.value)}
                className="w-full bg-[#0C0C10] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-[#FAF7F2] focus:border-[#E5AA9C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#DCD4CA]/80 mb-1">Tombol Call to Action:</label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full bg-[#0C0C10] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-[#FAF7F2] focus:border-[#E5AA9C] focus:outline-none"
              />
            </div>
          </div>

          {/* Render Progress Bar */}
          {isRenderingVideo && renderProgress && (
            <div className="p-3 rounded-xl bg-[#0C0C10] border border-[#E5AA9C]/30 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-[#E5AA9C] font-mono text-[11px]">
                <span>Merender frame video ({renderProgress.currentFrame}/{renderProgress.totalFrames})...</span>
                <span>{renderProgress.percentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#1A1824] overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#9A5A65] via-[#E5AA9C] to-[#FAF7F2] transition-all duration-150"
                  style={{ width: `${renderProgress.percentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Media Preview Box */}
          {(imageUrl || renderedVideoUrl) && (
            <div className="p-3 rounded-xl bg-[#0C0C10] border border-[#E5AA9C]/20 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-36 sm:w-44 aspect-[9/16] rounded-xl overflow-hidden bg-black shrink-0 border border-[#E5AA9C]/30 shadow-lg">
                {renderedVideoUrl ? (
                  <video
                    src={renderedVideoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              <div className="flex-1 space-y-2.5 text-left w-full">
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#FAF7F2]">
                    {renderedVideoUrl ? '🎬 Video MP4 Reels Siap Diunduh' : '🖼️ Gambar Visual AI Siap Pakai'}
                  </h4>
                  <p className="text-[11px] text-[#DCD4CA]/70">
                    {renderedVideoUrl 
                      ? 'Format file MP4 murni 30 FPS, siap langsung disimpan dan diunggah ke Instagram Reels, TikTok, atau Facebook Pro.'
                      : 'Resolusi HD dengan harmoni palet warna dan pencahayaan studio.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {renderedVideoUrl && (
                    <button
                      type="button"
                      onClick={handleDownloadMp4}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Simpan Video (MP4)</span>
                    </button>
                  )}

                  {imageUrl && (
                    <button
                      type="button"
                      onClick={handleDownloadImage}
                      className="px-3 py-2 rounded-xl bg-[#181622] hover:bg-[#222030] text-[#FAF7F2] border border-[#E5AA9C]/30 font-medium text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-[#E5AA9C]" />
                      <span>Simpan Cover (PNG)</span>
                    </button>
                  )}
                </div>

                {downloadSuccess && (
                  <div className="text-[10px] text-emerald-400 font-mono">
                    ✓ File berhasil disimpan ke galeri perangkat Anda!
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
