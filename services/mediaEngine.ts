import { Muxer, ArrayBufferTarget } from 'mp4-muxer';
import { AspectRatioType, MediaItem, ModuleType, RenderProgress, ThemeStyle, VideoProject } from '../types';

/**
 * SAS AI MEDIA ENGINE (CORE SERVICE v2.5 - HARDENED PRODUCTION GRADE)
 * 
 * - Zero-taint Canvas Architecture (safely fetches remote/blob/data images)
 * - Android Mobile Optimized: 720p @ 24fps, adaptive memory queue throttling
 * - Hardware H.264 WebCodecs with dynamic profile detection
 * - Guaranteed FFmpeg MP4 Transcoding Fallback (No renaming fake webm)
 * - 4 Luxury Themes (Luxury, Minimalis, Ceria, Profesional)
 * - 3-Phase Kinetic Copywriting (Hook, Promosi, Penutup/CTA)
 */

export const ASPECT_RATIO_DIMENSIONS: Record<AspectRatioType, { width: number; height: number; label: string }> = {
  '9:16': { width: 720, height: 1280, label: '9:16 Vertikal Reels / TikTok / Story' },
  '1:1': { width: 720, height: 720, label: '1:1 Persegi Feed & Profil' },
  '4:5': { width: 720, height: 900, label: '4:5 Potret Editorial Instagram' },
  '16:9': { width: 1280, height: 720, label: '16:9 Lanskap YouTube / Web' },
};

/**
 * Build tailored visual prompt for each of the 6 modules
 */
export function buildModuleVisualPrompt(
  moduleId: ModuleType,
  title: string,
  contextText: string,
  options?: {
    theme?: string;
    aspectRatio?: AspectRatioType;
    category?: string;
  }
): string {
  const cleanTitle = title.replace(/[^\w\s-]/gi, '').trim() || 'Luxury Concept';
  const cleanContext = contextText
    .replace(/[#*`_]/g, '')
    .slice(0, 220)
    .replace(/\s+/g, ' ')
    .trim();

  switch (moduleId) {
    case 'prewedding':
      return `High fashion editorial prewedding photography of an elegant couple, romantic intimate connection, couture dusty pink silk gown with delicate rose gold embroidery and bespoke ivory linen suit, ${cleanTitle}, ${cleanContext}, set in aesthetic luxury garden or scenic villa, shot on Leica SL2 85mm f/1.4, golden hour warm lighting, soft bokeh, cinematic atmosphere, 8k masterpiece --no plastic skin, distorted hands, cartoonish`;

    case 'umkm':
      return `Commercial culinary product photography, gourmet Indonesian F&B presentation, ${cleanTitle}, ${cleanContext}, artisan food styling, garnished with fresh herbs and spices, elegant dark slate background, warm directional rim lighting, subtle steam rising, shot on Hasselblad 100mm macro, appetizing luxury restaurant advertising quality, crisp focus`;

    case 'facebook_pro':
      return `High-engagement lifestyle and creative studio visual, cinematic 9:16 vertical composition, ${cleanTitle}, ${cleanContext}, modern creator desk with soft warm neon glow, luxury rose gold and obsidian aesthetic, iPhone and laptop screen with viral analytics, premium aesthetic, inspiring, crisp detail`;

    case 'marketing':
      return `Luxury brand marketing campaign showcase banner, ${cleanTitle}, ${cleanContext}, 3D floating podium display with polished rose gold accents, dusty pink silk drapery, floating geometric ribbons, modern corporate minimalism, dramatic studio lighting, ultra-sharp 8k`;

    case 'digital_product':
      return `Premium digital product mockup display, ${cleanTitle}, ${cleanContext}, sleek iPad Pro and workbook on minimalist marble desk with rose gold pen and coffee cup, elegant luxury typography on screen, soft morning window light, high-end Lynk.id e-course aesthetic, 8k`;

    case 'prompt':
    default:
      return `Masterpiece digital art visualization, ${cleanTitle}, ${cleanContext}, ethereal lighting with luxury rose gold and ivory sparkles, cinematic mood, depth of field, hyper-detailed, award-winning composition, Unreal Engine 5 render style, 8k`;
  }
}

/**
 * Generate AI Image URL (Zero Cost via free inference + instant canvas fallback)
 */
export function getAiImageUrl(
  prompt: string,
  aspectRatio: AspectRatioType = '9:16',
  seed?: number
): string {
  const { width, height } = ASPECT_RATIO_DIMENSIONS[aspectRatio];
  const finalSeed = seed || Math.floor(Math.random() * 999999);
  const cleanPrompt = encodeURIComponent(
    prompt.slice(0, 350) + ', ultra high resolution, elegant lighting, professional quality'
  );
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&model=flux&seed=${finalSeed}&nologo=true`;
}

/**
 * Generate instant luxury fallback Canvas Image Data URL (100% Offline & Clean Origin)
 */
export function generateLocalLuxuryCanvasImage(
  title: string,
  subtitle: string,
  aspectRatio: AspectRatioType = '9:16',
  themeStyle: ThemeStyle = 'luxury'
): string {
  const { width, height } = ASPECT_RATIO_DIMENSIONS[aspectRatio];
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  if (themeStyle === 'minimalis') {
    ctx.fillStyle = '#0F0F12';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(250, 247, 242, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(30, 30, width - 60, height - 60);
  } else if (themeStyle === 'ceria') {
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#2D1B28');
    bgGrad.addColorStop(0.5, '#24141E');
    bgGrad.addColorStop(1, '#1A0E15');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);
  } else if (themeStyle === 'profesional') {
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#131B2A');
    bgGrad.addColorStop(0.5, '#0E1420');
    bgGrad.addColorStop(1, '#080C14');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);
  } else {
    // Luxury Rose Gold
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#231720');
    bgGrad.addColorStop(0.5, '#151119');
    bgGrad.addColorStop(1, '#0C0C10');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    const radialGlow = ctx.createRadialGradient(width * 0.3, height * 0.25, 10, width * 0.3, height * 0.25, width * 0.7);
    radialGlow.addColorStop(0, 'rgba(229, 170, 156, 0.32)');
    radialGlow.addColorStop(0.6, 'rgba(201, 139, 148, 0.1)');
    radialGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(229, 170, 156, 0.35)';
    ctx.lineWidth = 3;
    ctx.strokeRect(24, 24, width - 48, height - 48);
  }

  // Typography
  ctx.textAlign = 'center';
  ctx.fillStyle = themeStyle === 'profesional' ? '#D4AF37' : '#E5AA9C';
  ctx.font = '600 22px serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('SAS SOUL ART SYSTEM', width / 2, height * 0.38 - 10);

  ctx.fillStyle = '#FAF7F2';
  ctx.font = 'bold 36px serif';
  ctx.letterSpacing = '1px';
  
  const words = (title || 'SAS Visual Creative').split(' ');
  let line = '';
  let y = height * 0.54;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > width - 120 && n > 0) {
      ctx.fillText(line.trim(), width / 2, y);
      line = words[n] + ' ';
      y += 44;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), width / 2, y);

  ctx.fillStyle = 'rgba(220, 212, 202, 0.85)';
  ctx.font = 'italic 20px serif';
  ctx.fillText((subtitle || 'All-In-One Studio').slice(0, 50), width / 2, y + 42);

  ctx.fillStyle = 'rgba(229, 170, 156, 0.6)';
  ctx.font = '14px sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('CREATE YOUR DREAM WITH AI', width / 2, height - 60);

  return canvas.toDataURL('image/png');
}

/**
 * Downscale and pre-crop any image (e.g. 12MP-48MP camera photos from HP)
 * into an exact target canvas (720x1280) once before rendering.
 * Prevents mobile memory overload and eliminates rendering stutter.
 */
export function optimizeImageForMobile(
  img: HTMLImageElement,
  targetW: number,
  targetH: number
): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = targetW;
  c.height = targetH;
  const cCtx = c.getContext('2d');
  if (cCtx) {
    cCtx.fillStyle = '#0C0C10';
    cCtx.fillRect(0, 0, targetW, targetH);

    const naturalW = img.naturalWidth || targetW;
    const naturalH = img.naturalHeight || targetH;
    const imgAspect = naturalW / naturalH;
    const targetAspect = targetW / targetH;

    let sW = naturalW;
    let sH = naturalH;
    let sX = 0;
    let sY = 0;

    if (imgAspect > targetAspect) {
      sW = naturalH * targetAspect;
      sX = (naturalW - sW) / 2;
    } else {
      sH = naturalW / targetAspect;
      sY = (naturalH - sH) / 2;
    }

    cCtx.drawImage(img, sX, sY, sW, sH, 0, 0, targetW, targetH);
  }
  return c;
}

/**
 * Robust Zero-Taint Image Loader
 * Safely loads remote, blob, or data URLs into an HTMLImageElement without tainting canvas.
 */
export async function loadImage(src: string): Promise<HTMLImageElement> {
  let targetSrc = src;
  let isCreatedBlob = false;

  // If remote http/https, fetch as blob first to completely avoid canvas cross-origin taint
  if (src.startsWith('http://') || src.startsWith('https://')) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      const response = await fetch(src, { mode: 'cors', signal: controller.signal });
      clearTimeout(timeoutId);
      if (response.ok) {
        const blob = await response.blob();
        targetSrc = URL.createObjectURL(blob);
        isCreatedBlob = true;
      } else {
        targetSrc = generateLocalLuxuryCanvasImage('SAS Soul Art System', 'Visual Creative Studio', '9:16');
      }
    } catch {
      targetSrc = generateLocalLuxuryCanvasImage('SAS Soul Art System', 'Visual Creative Studio', '9:16');
    }
  }

  return new Promise((resolve) => {
    const img = new Image();
    // Do NOT set crossOrigin on blob or data URLs
    if (targetSrc.startsWith('http://') || targetSrc.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }

    img.onload = () => {
      if (isCreatedBlob) {
        setTimeout(() => URL.revokeObjectURL(targetSrc), 60000);
      }
      resolve(img);
    };

    img.onerror = () => {
      const fallbackUrl = generateLocalLuxuryCanvasImage('SAS Soul Art System', 'Visual Creative Studio', '9:16');
      const fallbackImg = new Image();
      fallbackImg.onload = () => resolve(fallbackImg);
      fallbackImg.onerror = () => resolve(fallbackImg);
      fallbackImg.src = fallbackUrl;
    };

    img.src = targetSrc;
  });
}

/**
 * Hardware-Accelerated MP4 Video Renderer (Multi-Tier Resilient)
 */
export async function renderVideoToMP4(
  project: VideoProject,
  onProgress?: (progress: RenderProgress) => void
): Promise<{ blob: Blob; url: string; fileName: string }> {
  const { width, height } = ASPECT_RATIO_DIMENSIONS[project.aspectRatio];

  // Duration handling: 15s, 30s, 60s
  const duration = Math.min(Math.max(project.durationSeconds || 15, 5), 60);
  
  // Mobile Android optimized FPS: 24 fps for smooth cinematic motion
  const fps = duration >= 60 ? 15 : duration >= 30 ? 20 : 24;
  const totalFrames = Math.round(duration * fps);

  onProgress?.({
    phase: 'preparing',
    currentFrame: 0,
    totalFrames,
    percentage: 3,
  });

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    throw new Error('Gagal menginisialisasi Canvas 2D untuk video rendering.');
  }

  // Load all images safely
  const imageSources = project.imageUrls && project.imageUrls.length > 0 
    ? project.imageUrls 
    : project.backgroundImageUrl 
      ? [project.backgroundImageUrl] 
      : [generateLocalLuxuryCanvasImage(project.productName || project.title, project.hookText, project.aspectRatio, project.themeStyle)];

  const loadedImages: (HTMLImageElement | HTMLCanvasElement)[] = [];
  for (const src of imageSources) {
    try {
      const rawImg = await loadImage(src);
      // Pre-scale and crop onto offscreen canvas for zero-overhead frame rendering
      const scaledCanvas = optimizeImageForMobile(rawImg, width, height);
      loadedImages.push(scaledCanvas);
    } catch {
      // Fallback handled inside loadImage
    }
  }

  if (loadedImages.length === 0) {
    const fallback = await loadImage(generateLocalLuxuryCanvasImage(project.productName || project.title, project.hookText, project.aspectRatio, project.themeStyle));
    const scaledFallback = optimizeImageForMobile(fallback, width, height);
    loadedImages.push(scaledFallback);
  }

  // Particle System
  const particles: { x: number; y: number; r: number; speed: number; alpha: number; angle: number }[] = [];
  const particleCount = project.particleEffect === 'rose_gold_sparkles' ? 36 : project.particleEffect === 'dusty_bokeh' ? 20 : 12;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3.0 + 1.0,
      speed: Math.random() * 0.6 + 0.3,
      alpha: Math.random() * 0.6 + 0.3,
      angle: Math.random() * Math.PI * 2,
    });
  }

  // Theme palettes
  const themeColors = {
    luxury: {
      primary: '#E5AA9C',
      secondary: '#C98B94',
      light: '#FAF7F2',
      bgDark: '#0C0C10',
      pillBg: 'rgba(28, 20, 26, 0.88)',
      pillBorder: 'rgba(229, 170, 156, 0.5)',
      fontSerif: 'bold 36px Cormorant Garamond, Georgia, serif',
      fontSans: '15px Plus Jakarta Sans, sans-serif',
      accentGradient: ['#FAF7F2', '#E5AA9C', '#C98B94', '#9A5A65']
    },
    minimalis: {
      primary: '#FAF7F2',
      secondary: '#8E8880',
      light: '#FAF7F2',
      bgDark: '#0C0C10',
      pillBg: 'rgba(18, 18, 22, 0.92)',
      pillBorder: 'rgba(250, 247, 242, 0.25)',
      fontSerif: 'bold 34px Plus Jakarta Sans, -apple-system, sans-serif',
      fontSans: '14px Plus Jakarta Sans, sans-serif',
      accentGradient: ['#FFFFFF', '#FAF7F2', '#E5E5E5', '#A3A3A3']
    },
    ceria: {
      primary: '#FFA07A',
      secondary: '#FFB6C1',
      light: '#FFF8DC',
      bgDark: '#120D14',
      pillBg: 'rgba(45, 20, 36, 0.9)',
      pillBorder: 'rgba(255, 160, 122, 0.6)',
      fontSerif: 'bold 36px Plus Jakarta Sans, -apple-system, sans-serif',
      fontSans: '15px Plus Jakarta Sans, sans-serif',
      accentGradient: ['#FFF8DC', '#FFA07A', '#FF69B4', '#DA70D6']
    },
    profesional: {
      primary: '#D4AF37',
      secondary: '#38BDF8',
      light: '#F8FAFC',
      bgDark: '#080C14',
      pillBg: 'rgba(15, 23, 42, 0.92)',
      pillBorder: 'rgba(212, 175, 55, 0.55)',
      fontSerif: 'bold 35px Plus Jakarta Sans, sans-serif',
      fontSans: '14px Plus Jakarta Sans, sans-serif',
      accentGradient: ['#FFFFFF', '#D4AF37', '#B8860B', '#1E293B']
    }
  }[project.themeStyle || 'luxury'];

  // Frame Rendering Function
  const drawFrame = (frameIndex: number) => {
    const progressNorm = frameIndex / totalFrames; // 0.0 to 1.0
    const timeSec = frameIndex / fps;

    // 1. Clear base
    ctx.fillStyle = themeColors.bgDark;
    ctx.fillRect(0, 0, width, height);

    // 2. Multi-image slideshow calculation
    const numImages = loadedImages.length;
    const timePerSlide = duration / numImages;
    const slideIdx = Math.min(Math.floor(timeSec / timePerSlide), numImages - 1);
    const nextSlideIdx = (slideIdx + 1) % numImages;
    const slideLocalTime = timeSec % timePerSlide;
    const transitionDuration = Math.min(0.8, timePerSlide * 0.3);

    const isTransitioning = numImages > 1 && slideLocalTime > (timePerSlide - transitionDuration);
    const transitionAlpha = isTransitioning 
      ? (slideLocalTime - (timePerSlide - transitionDuration)) / transitionDuration 
      : 0;

    // Draw active slide with motion
    const drawImageWithMotion = (img: HTMLImageElement | HTMLCanvasElement, localTime: number, alpha = 1.0) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      let scale = 1.0;
      let dx = 0;
      let dy = 0;

      switch (project.motionStyle) {
        case 'luxury_zoom':
          scale = 1.0 + (localTime / timePerSlide) * 0.12;
          break;
        case 'cinematic_pan':
          scale = 1.08;
          dx = Math.sin((localTime / timePerSlide) * Math.PI) * 16;
          break;
        case 'dynamic_pulse':
          scale = 1.02 + Math.sin(timeSec * Math.PI * 3) * 0.02;
          break;
        case 'gentle_float':
          scale = 1.05;
          dy = Math.sin(timeSec * Math.PI * 1.5) * 12;
          break;
        case 'ken_burns':
        default:
          scale = 1.0 + (localTime / timePerSlide) * 0.09;
          dx = ((localTime / timePerSlide) - 0.5) * 14;
          break;
      }

      ctx.translate(width / 2 + dx, height / 2 + dy);
      ctx.scale(scale, scale);
      ctx.drawImage(img, -width / 2, -height / 2, width, height);
      ctx.restore();
    };

    // Draw base current slide
    drawImageWithMotion(loadedImages[slideIdx], slideLocalTime, 1.0);

    // Cross-fade to next slide if transitioning
    if (isTransitioning && numImages > 1) {
      drawImageWithMotion(loadedImages[nextSlideIdx], 0, transitionAlpha);
    }

    // 3. Vignette & Contrast Overlay
    const vignette = ctx.createRadialGradient(
      width / 2, height / 2, Math.min(width, height) * 0.32,
      width / 2, height / 2, Math.max(width, height) * 0.76
    );
    vignette.addColorStop(0, 'rgba(12, 12, 16, 0.18)');
    vignette.addColorStop(0.65, 'rgba(12, 12, 16, 0.58)');
    vignette.addColorStop(1, 'rgba(12, 12, 16, 0.88)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    // 4. Particle Effects
    if (project.particleEffect !== 'none') {
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -10) p.y = height + 10;
        p.x += Math.sin(timeSec + p.angle) * 0.35;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = themeColors.primary;
        ctx.globalAlpha = p.alpha * (0.5 + Math.sin(timeSec * 3 + p.x) * 0.4);
        ctx.fill();
        ctx.restore();
      }
    }

    // 5. Header Badge (Product Name or Module)
    ctx.save();
    ctx.textAlign = 'center';
    const topY = height * 0.13;
    const badgeText = project.productName 
      ? `✨ ${project.productName.toUpperCase()} · REELS`
      : `✨ ${project.sourceModule.replace('_', ' ').toUpperCase()} · SAS REELS`;
    
    ctx.font = 'bold 14px sans-serif';
    const badgeMetrics = ctx.measureText(badgeText);
    const pillW = Math.min(badgeMetrics.width + 36, width - 60);
    const pillH = 34;

    ctx.fillStyle = themeColors.pillBg;
    ctx.strokeStyle = themeColors.pillBorder;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(width / 2 - pillW / 2, topY - pillH / 2, pillW, pillH, 17);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = themeColors.primary;
    ctx.fillText(badgeText, width / 2, topY + 5);
    ctx.restore();

    // 6. Kinetic 3-Phase Copywriting Overlays
    // Phase 1: 0% - 30% -> TEKS PEMBUKA (HOOK)
    // Phase 2: 30% - 75% -> TEKS PROMOSI & PRODUK
    // Phase 3: 75% - 100% -> TEKS PENUTUP & CTA

    const isPhase1 = progressNorm < 0.32;
    const isPhase2 = progressNorm >= 0.28 && progressNorm < 0.75;
    const isPhase3 = progressNorm >= 0.70;

    // Render Hook Text (Phase 1)
    if (isPhase1) {
      const hookAlpha = progressNorm < 0.08 
        ? progressNorm / 0.08 
        : progressNorm > 0.26 
          ? (0.32 - progressNorm) / 0.06 
          : 1.0;

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(hookAlpha, 1.0));
      ctx.textAlign = 'center';
      ctx.font = themeColors.fontSerif;
      ctx.fillStyle = themeColors.light;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 4;

      const hookWords = (project.hookText || project.title || 'Inovasi Visual Terbaik').split(' ');
      let hLine = '';
      let curY = height * 0.44;
      for (let w = 0; w < hookWords.length; w++) {
        const testLine = hLine + hookWords[w] + ' ';
        if (ctx.measureText(testLine).width > width - 100 && w > 0) {
          ctx.fillText(hLine.trim(), width / 2, curY);
          hLine = hookWords[w] + ' ';
          curY += 46;
        } else {
          hLine = testLine;
        }
      }
      ctx.fillText(hLine.trim(), width / 2, curY);

      if (project.subtitleText) {
        ctx.font = 'italic 20px serif';
        ctx.fillStyle = themeColors.primary;
        ctx.fillText(project.subtitleText.slice(0, 60), width / 2, curY + 44);
      }
      ctx.restore();
    }

    // Render Promo & Product Text (Phase 2)
    if (isPhase2) {
      const promoAlpha = progressNorm < 0.35 
        ? (progressNorm - 0.28) / 0.07 
        : progressNorm > 0.68 
          ? (0.75 - progressNorm) / 0.07 
          : 1.0;

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(promoAlpha, 1.0));
      ctx.textAlign = 'center';

      if (project.productName) {
        ctx.font = 'bold 20px sans-serif';
        ctx.fillStyle = themeColors.primary;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fillText(project.productName.toUpperCase(), width / 2, height * 0.40);
      }

      ctx.font = themeColors.fontSerif;
      ctx.fillStyle = themeColors.light;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 14;

      const promoWords = (project.promoText || project.productDescription || project.subtitleText || 'Solusi Eksklusif Produk Digital & Bisnis').split(' ');
      let pLine = '';
      let curY = height * 0.46;
      for (let w = 0; w < promoWords.length; w++) {
        const testLine = pLine + promoWords[w] + ' ';
        if (ctx.measureText(testLine).width > width - 110 && w > 0) {
          ctx.fillText(pLine.trim(), width / 2, curY);
          pLine = promoWords[w] + ' ';
          curY += 44;
        } else {
          pLine = testLine;
        }
      }
      ctx.fillText(pLine.trim(), width / 2, curY);
      ctx.restore();
    }

    // Render Closing & CTA Button (Phase 3)
    if (isPhase3) {
      const ctaAlpha = progressNorm < 0.78 
        ? (progressNorm - 0.70) / 0.08 
        : 1.0;

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(ctaAlpha, 1.0));
      ctx.textAlign = 'center';

      ctx.font = themeColors.fontSerif;
      ctx.fillStyle = themeColors.light;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 14;
      ctx.fillText('Dapatkan Penawaran Spesial', width / 2, height * 0.45);

      if (project.productName) {
        ctx.font = 'italic 20px serif';
        ctx.fillStyle = themeColors.primary;
        ctx.fillText(project.productName, width / 2, height * 0.50);
      }

      const ctaY = height * 0.78;
      const ctaText = project.ctaText || 'Pesan Sekarang via WhatsApp';
      ctx.font = 'bold 18px sans-serif';
      const ctaW = Math.min(ctx.measureText(ctaText).width + 56, width - 70);
      const ctaH = 52;

      const btnGrad = ctx.createLinearGradient(width / 2 - ctaW / 2, ctaY, width / 2 + ctaW / 2, ctaY);
      btnGrad.addColorStop(0, themeColors.accentGradient[0]);
      btnGrad.addColorStop(0.35, themeColors.accentGradient[1]);
      btnGrad.addColorStop(0.75, themeColors.accentGradient[2]);
      btnGrad.addColorStop(1, themeColors.accentGradient[3]);

      ctx.fillStyle = btnGrad;
      ctx.shadowColor = 'rgba(229, 170, 156, 0.45)';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.roundRect(width / 2 - ctaW / 2, ctaY - ctaH / 2, ctaW, ctaH, 26);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#0C0C10';
      ctx.fillText(ctaText, width / 2, ctaY + 6);
      ctx.restore();
    }

    // 7. Watermark footer
    if (project.brandWatermark) {
      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = '12px sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillStyle = 'rgba(250, 247, 242, 0.65)';
      ctx.fillText('SAS SOUL ART SYSTEM · REELS MP4 ENGINE', width / 2, height - 34);
      ctx.restore();
    }
  };

  const fileName = `SAS_Reels_${project.productName ? project.productName.replace(/[^\w-]/g, '_') : 'Video'}_${Date.now()}.mp4`;

  // If user provided custom audio, route directly to FFmpeg so audio is cleanly mixed
  if (project.audioBase64) {
    return await renderWithUniversalFallback(canvas, drawFrame, fps, totalFrames, fileName, project.audioBase64, onProgress);
  }

  // Attempt WebCodecs first if supported by hardware
  const hasWebCodecs = typeof window !== 'undefined' && 'VideoEncoder' in window && 'VideoFrame' in window;

  if (hasWebCodecs) {
    try {
      return await renderWithWebCodecs(canvas, drawFrame, width, height, fps, totalFrames, fileName, onProgress);
    } catch (err: any) {
      console.warn('WebCodecs execution failed, automatically routing to Resilient Universal Fallback:', err?.message || err);
      return await renderWithUniversalFallback(canvas, drawFrame, fps, totalFrames, fileName, undefined, onProgress);
    }
  } else {
    return await renderWithUniversalFallback(canvas, drawFrame, fps, totalFrames, fileName, undefined, onProgress);
  }
}

/**
 * WebCodecs VideoEncoder + mp4-muxer (Pure In-Browser H.264 MP4 with Queue Throttling)
 */
async function renderWithWebCodecs(
  canvas: HTMLCanvasElement,
  drawFrame: (idx: number) => void,
  width: number,
  height: number,
  fps: number,
  totalFrames: number,
  fileName: string,
  onProgress?: (progress: RenderProgress) => void
): Promise<{ blob: Blob; url: string; fileName: string }> {
  // Test which H.264 profile is supported on this Android device
  const codecCandidates = [
    'avc1.42001f', // Baseline Profile Level 3.1 (universal Android)
    'avc1.4d001f', // Main Profile Level 3.1
    'avc1.64001f', // High Profile Level 3.1
    'avc1.420028', // Baseline Level 4.0
    'avc1.42E01E', // Constrained Baseline
  ];

  let selectedCodec = '';
  for (const candidate of codecCandidates) {
    try {
      const support = await (window as any).VideoEncoder.isConfigSupported({
        codec: candidate,
        width,
        height,
        bitrate: 2_500_000,
        framerate: fps,
      });
      if (support && support.supported) {
        selectedCodec = candidate;
        break;
      }
    } catch {
      // Continue to next candidate
    }
  }

  if (!selectedCodec) {
    throw new Error('Hardware H.264 encoder is not available on this device.');
  }

  const muxer = new Muxer({
    target: new ArrayBufferTarget(),
    video: {
      codec: 'avc',
      width,
      height,
    },
    fastStart: 'in-memory',
  });

  let encoderError: Error | null = null;
  const encoder = new (window as any).VideoEncoder({
    output: (chunk: any, meta: any) => muxer.addVideoChunk(chunk, meta),
    error: (e: any) => {
      console.error('VideoEncoder error:', e);
      encoderError = e;
    },
  });

  encoder.configure({
    codec: selectedCodec,
    width,
    height,
    bitrate: 2_500_000,
    framerate: fps,
  });

  onProgress?.({
    phase: 'drawing_frames',
    currentFrame: 0,
    totalFrames,
    percentage: 10,
  });

  for (let i = 0; i < totalFrames; i++) {
    if (encoderError) throw encoderError;

    // Mobile Memory Protection: Drain encoder queue if hardware buffer is congested
    while (encoder.encodeQueueSize > 4) {
      await new Promise((r) => setTimeout(r, 15));
    }

    drawFrame(i);

    const timestampMicros = Math.round((i * 1_000_000) / fps);
    const frame = new (window as any).VideoFrame(canvas, { timestamp: timestampMicros });
    
    // Keyframe every 1 second
    encoder.encode(frame, { keyFrame: i % fps === 0 });
    frame.close();

    // Progress update and yield execution loop
    if (i % 6 === 0 || i === totalFrames - 1) {
      const percentage = Math.round(10 + (i / totalFrames) * 80);
      onProgress?.({
        phase: 'drawing_frames',
        currentFrame: i + 1,
        totalFrames,
        percentage,
      });
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  onProgress?.({
    phase: 'encoding_mp4',
    currentFrame: totalFrames,
    totalFrames,
    percentage: 94,
  });

  await encoder.flush();
  muxer.finalize();

  const buffer = muxer.target.buffer;
  const blob = new Blob([buffer], { type: 'video/mp4' });
  const url = URL.createObjectURL(blob);

  onProgress?.({
    phase: 'completed',
    currentFrame: totalFrames,
    totalFrames,
    percentage: 100,
  });

  return { blob, url, fileName };
}

/**
 * Universal Mobile Fallback (MediaRecorder + FFmpeg MP4 Transcoding Pipeline)
 */
async function renderWithUniversalFallback(
  canvas: HTMLCanvasElement,
  drawFrame: (idx: number) => void,
  fps: number,
  totalFrames: number,
  fileName: string,
  audioBase64?: string,
  onProgress?: (progress: RenderProgress) => void
): Promise<{ blob: Blob; url: string; fileName: string }> {
  return new Promise((resolve, reject) => {
    try {
      // Draw first frame immediately BEFORE captureStream so the canvas track is immediately active
      drawFrame(0);

      const stream = canvas.captureStream(fps);
      const mimeCandidates = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm',
        'video/mp4;codecs=avc1',
        'video/mp4',
      ];

      let selectedMime = '';
      for (const m of mimeCandidates) {
        if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m)) {
          selectedMime = m;
          break;
        }
      }

      const recorderOptions = selectedMime ? { mimeType: selectedMime, videoBitsPerSecond: 2_500_000 } : {};
      const recorder = new MediaRecorder(stream, recorderOptions);

      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const rawBlob = new Blob(chunks, { type: selectedMime || 'video/webm' });

        // Pipe directly to server FFmpeg for guaranteed certified ISO-BMFF H.264 MP4
        try {
          onProgress?.({
            phase: 'encoding_mp4',
            currentFrame: totalFrames,
            totalFrames,
            percentage: 92,
          });

          const reader = new FileReader();
          reader.readAsDataURL(rawBlob);
          reader.onloadend = async () => {
            try {
              const resResult = reader.result as string;
              if (resResult && resResult.includes(',')) {
                const base64data = resResult.split(',')[1];
                const res = await fetch('/api/video/convert-mp4', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    videoBase64: base64data,
                    audioBase64,
                    mimeType: selectedMime || 'video/webm',
                    fileName,
                    duration: Math.round(totalFrames / fps),
                  }),
                });

                if (res.ok) {
                  const data = await res.json();
                  // Retrieve the actual MP4 Blob from the server download URL
                  const mp4Res = await fetch(data.downloadUrl);
                  const mp4Blob = await mp4Res.blob();

                  onProgress?.({
                    phase: 'completed',
                    currentFrame: totalFrames,
                    totalFrames,
                    percentage: 100,
                  });
                  resolve({ blob: mp4Blob, url: data.downloadUrl, fileName });
                  return;
                } else {
                  const errJson = await res.json().catch(() => ({}));
                  reject(new Error(errJson.error || `Server FFmpeg transcode error (HTTP ${res.status})`));
                  return;
                }
              }
              reject(new Error('Gagal membaca data rekaman video (FileReader empty).'));
            } catch (transcodeErr: any) {
              reject(new Error(transcodeErr?.message || 'Gagal memproses encoding MP4 di server.'));
            }
          };
          reader.onerror = () => reject(new Error('Gagal membaca buffer rekaman video lokal.'));
        } catch (readErr: any) {
          reject(new Error(readErr?.message || 'Gagal menyiapkan data video untuk transcoding.'));
        }
      };

      recorder.onerror = (e) => reject(new Error('MediaRecorder error: ' + ((e as any)?.message || 'Rekaman gagal.')));

      // Start recording with 250ms buffer slices to prevent memory spikes on Android
      recorder.start(250);

      let frame = 0;
      const interval = 1000 / fps;

      const renderLoop = () => {
        if (frame >= totalFrames) {
          recorder.stop();
          return;
        }

        drawFrame(frame);
        frame++;

        if (frame % 6 === 0 || frame === totalFrames) {
          const pct = Math.round(10 + (frame / totalFrames) * 80);
          onProgress?.({
            phase: 'drawing_frames',
            currentFrame: frame,
            totalFrames,
            percentage: pct,
          });
        }

        setTimeout(renderLoop, interval);
      };

      renderLoop();
    } catch (err: any) {
      reject(err);
    }
  });
}

/**
 * Direct Download Trigger for Android & Desktop
 */
export function downloadMediaFile(url: string, fileName: string): boolean {
  try {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
    }, 150);
    return true;
  } catch (err) {
    console.error('Download media file error:', err);
    return false;
  }
}
