import { ModuleInfo } from '../types';

export const MODULES: ModuleInfo[] = [
  {
    id: 'prompt',
    title: 'AI Prompt Studio',
    shortTitle: 'Prompt',
    tagline: 'Precision Midjourney & FLUX Formula Builder',
    description: 'Construct hyper-detailed visual prompts with fine-tuned lighting, lenses, camera aesthetics, and negative prompt syntax.',
    iconName: 'Sparkles',
    badge: 'v6 & FLUX.1',
    heroImage: '/src/assets/images/sas_soulart_hero_1793798196330.jpg'
  },
  {
    id: 'prewedding',
    title: 'AI Prewedding Studio',
    shortTitle: 'Prewedding',
    tagline: 'Romantic Editorial & Storyboard Generator',
    description: 'Craft ethereal couple photoshoot concepts, romantic Indonesian & European destinations, wardrobe harmony, and cinematic shot lists.',
    iconName: 'HeartHandshake',
    badge: 'Couture & Story',
    heroImage: '/src/assets/images/sas_prewedding_editorial_1793798198769.jpg'
  },
  {
    id: 'umkm',
    title: 'AI UMKM Studio',
    shortTitle: 'UMKM',
    tagline: 'Indonesian SME Branding & Sales Engine',
    description: 'Generate commercial product photography prompts, high-converting WhatsApp sales scripts, and captivating social media ads.',
    iconName: 'Store',
    badge: 'Local Business',
    heroImage: '/src/assets/images/sas_umkm_product_1793798198783.jpg'
  },
  {
    id: 'facebook_pro',
    title: 'AI Facebook Pro',
    shortTitle: 'FB Pro',
    tagline: 'Monetization Copy & Engagement Engine',
    description: 'Engineer viral FB Pro hooks, relatable storytelling posts, Reels pacing scripts, and monetization-first community threads.',
    iconName: 'Share2',
    badge: 'Viral & Reach',
    heroImage: '/src/assets/images/sas_soulart_hero_1793798196330.jpg'
  },
  {
    id: 'marketing',
    title: 'AI Marketing Architect',
    shortTitle: 'Marketing',
    tagline: 'Strategic Omnichannel Campaign Planner',
    description: 'Formulate 30-day editorial calendars, AIDA/PAS conversion frameworks, competitor angle finders, and launch playbooks.',
    iconName: 'TrendingUp',
    badge: 'Campaign & Funnel',
    heroImage: '/src/assets/images/sas_soulart_hero_1793798196330.jpg'
  },
  {
    id: 'digital_product',
    title: 'AI Digital Product',
    shortTitle: 'Digital Product',
    tagline: 'E-Books, Templates & Creator Monetization',
    description: 'Incubate scalable digital assets, outline comprehensive workbooks, draft high-ticket sales pages, and calculate tiered pricing bundles.',
    iconName: 'Layers',
    badge: 'Passive Asset',
    heroImage: '/src/assets/images/sas_digital_product_1793798199159.jpg'
  },
  {
    id: 'reels_studio',
    title: 'AI Reels & Video Studio',
    shortTitle: 'Reels Studio',
    tagline: 'Pusat Video & MP4 Renderer 9:16',
    description: 'Pusat pembuatan video sinematik, efek kinetik, transisi rose gold, dan rendering MP4 instan tanpa biaya langsung ke galeri HP.',
    iconName: 'Video',
    badge: 'MP4 Generator',
    heroImage: '/src/assets/images/sas_soulart_hero_1793798196330.jpg'
  }
];

export const PREWEDDING_PRESETS = [
  {
    name: 'Bromo Misty Sunrise Couture',
    location: 'Mount Bromo Sand Sea, East Java',
    theme: 'Misty Cinematic Romance',
    wardrobe: 'Dusty Pink Organza Ballgown & Ivory Tailored Linen Suit',
    palette: ['#C98B94', '#FAF7F2', '#3D3B40', '#E5AA9C']
  },
  {
    name: 'Sumba Savanna Golden Twilight',
    location: 'Bukit Warinding, Sumba',
    theme: 'Bohemian Raw Luxury',
    wardrobe: 'Handwoven Tenun Ikat with Rose Gold Accents & Ivory Mandarin Shirt',
    palette: ['#C5837C', '#DDB47A', '#F5EFEB', '#4A3E3D']
  },
  {
    name: 'Lake Como Villa Heritage',
    location: 'Villa Balbianello, Italy',
    theme: 'Old Money Timeless Editorial',
    wardrobe: 'French Silk Slip Dress with Pearl Veil & Charcoal Double-Breasted Tuxedo',
    palette: ['#1C1A24', '#FAF7F2', '#E8C5C8', '#8E8880']
  },
  {
    name: 'Balinese Royal Modern Garden',
    location: 'Tirta Gangga Water Palace, Karangasem',
    theme: 'Royal Heritage Modernity',
    wardrobe: 'Contemporary Songket Kebaya in Dusty Mauve & Dark Velvet Beskap',
    palette: ['#9A5A65', '#D49086', '#14131A', '#FAF7F2']
  }
];

export const UMKM_CATEGORIES = [
  { id: 'fnb', name: 'Kuliner & F&B Lokal', icon: 'Utensils' },
  { id: 'skincare', name: 'Skincare & Botanical Beauty', icon: 'Sparkle' },
  { id: 'fashion', name: 'Fashion & Hijab Chic', icon: 'Shirt' },
  { id: 'craft', name: 'Kerajinan Tangan & Artisan', icon: 'Package' },
  { id: 'coffee', name: 'Kopi Nusantara & Cafe', icon: 'Coffee' }
];

export const FB_PRO_FORMATS = [
  { id: 'viral_hook', name: 'Viral Storytelling Hook', desc: 'Emosional, mengundang empati & komentar panjang' },
  { id: 'debate_poll', name: 'Diskusi Santai & Opini', desc: 'Memicu 500+ komentar organik dalam 24 jam' },
  { id: 'reels_monetize', name: 'Naskah FB Reels 30 Detik', desc: 'Hook 3 detik pertama + audio trend + CTA follow' },
  { id: 'educational_thread', name: 'Tips Praktis Siap Share', desc: 'Nilai tinggi yang mendorong tombol Bagikan/Share' }
];

export const MARKETING_FRAMEWORKS = [
  { id: 'aida', name: 'AIDA Framework', desc: 'Attention → Interest → Desire → Action' },
  { id: 'pas', name: 'PAS Framework', desc: 'Problem → Agitation → Solution' },
  { id: 'bab', name: 'BAB Framework', desc: 'Before → After → Bridge' },
  { id: 'calendar', name: '30-Day Content Matrix', desc: 'Pillar: Edukasi, Soft-Sell, Engagement, Authority' }
];

export const DIGITAL_PRODUCT_TYPES = [
  { id: 'ebook', name: 'E-Book & Guidebook Praktis', priceRange: 'Rp 49.000 – Rp 149.000' },
  { id: 'template', name: 'Notion & Canva Template Bundle', priceRange: 'Rp 99.000 – Rp 249.000' },
  { id: 'prompt_pack', name: 'Soul Art AI Prompt Masterpack', priceRange: 'Rp 75.000 – Rp 199.000' },
  { id: 'mini_course', name: 'Video Masterclass / Workshop', priceRange: 'Rp 199.000 – Rp 499.000' }
];
