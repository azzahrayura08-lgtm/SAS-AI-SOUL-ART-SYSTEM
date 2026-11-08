export type ModuleType = 
  | 'prompt'
  | 'prewedding'
  | 'umkm'
  | 'facebook_pro'
  | 'marketing'
  | 'digital_product'
  | 'reels_studio'
  | 'history'
  | 'profile'
  | 'settings'
  | 'about';

export type AspectRatioType = '9:16' | '1:1' | '4:5' | '16:9';

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  url: string; // Blob URL, object URL, or remote URL
  thumbnailUrl?: string;
  sourceModule: ModuleType;
  prompt?: string;
  aspectRatio: AspectRatioType;
  durationSeconds?: number;
  fileSizeBytes?: number;
  mimeType: string;
  createdAt: number;
}

export type ThemeStyle = 'luxury' | 'minimalis' | 'ceria' | 'profesional';

export interface VideoProject {
  id: string;
  sourceModule: ModuleType;
  title: string;
  productName?: string;
  productDescription?: string;
  hookText: string;
  promoText?: string;
  subtitleText?: string;
  ctaText: string;
  aspectRatio: AspectRatioType;
  durationSeconds: 15 | 30 | 60 | number;
  fps: number;
  themeStyle: ThemeStyle;
  motionStyle: 'ken_burns' | 'luxury_zoom' | 'cinematic_pan' | 'dynamic_pulse' | 'gentle_float';
  particleEffect: 'rose_gold_sparkles' | 'dusty_bokeh' | 'ambient_glow' | 'none';
  audioStyle: 'luxury_ambient' | 'gentle_piano' | 'chill_beat' | 'silent' | 'user_audio';
  backgroundImageUrl?: string;
  imageUrls?: string[];
  audioFileUrl?: string;
  audioBase64?: string;
  brandWatermark: boolean;
}

export interface RenderProgress {
  phase: 'idle' | 'preparing' | 'drawing_frames' | 'encoding_mp4' | 'finalizing' | 'completed' | 'error';
  currentFrame: number;
  totalFrames: number;
  percentage: number;
  errorMessage?: string;
}

export interface UserProfile {
  displayName: string;
  brandName: string;
  avatarUrl: string;
  bio: string;
  role?: string;
  updatedAt: number;
}

export interface AppSettings {
  themeMode: 'dark' | 'light';
  language: 'id' | 'en';
  accentTheme: 'rose_gold' | 'champagne' | 'velvet_rose';
  fontSize: 'compact' | 'normal' | 'large';
  animationEffects: boolean;
  autoSaveHistory: boolean;
  version: string;
  updatedAt: number;
}

export interface AboutInfo {
  appName: string;
  brandName: string;
  slogan: string;
  shortDescription: string;
  brandIdentity: {
    dustyPink: string;
    roseGold: string;
    ivory: string;
    black: string;
  };
  creatorInfo: {
    name: string;
    title: string;
    bioNote: string;
    email: string;
    location: string;
    editable: boolean;
    updatedAt: number;
  };
}

export interface ModuleInfo {
  id: ModuleType;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  iconName: string;
  badge: string;
  heroImage?: string;
}

export interface GenerationResult {
  id: string;
  moduleId: ModuleType;
  timestamp: number;
  title: string;
  subtitle: string;
  content: string;
  metadata: {
    category?: string;
    model?: string;
    aspectRatio?: string;
    tags?: string[];
    stats?: Record<string, string | number>;
    negativePrompt?: string;
    sections?: { title: string; body: string }[];
  };
  previewImage?: string;
  generatedImageUrl?: string;
  generatedVideoUrl?: string;
  mediaItems?: MediaItem[];
  isFavorite?: boolean;
}

export interface PromptPreset {
  id: string;
  title: string;
  category: string;
  prompt: string;
  negative: string;
  aspectRatio: string;
  model: string;
  tags: string[];
}
