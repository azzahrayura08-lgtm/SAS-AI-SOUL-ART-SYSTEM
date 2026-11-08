import { GenerationResult, ModuleType } from '../types';

export interface GenerationParams {
  moduleId: ModuleType;
  promptText?: string;
  category?: string;
  model?: string;
  aspectRatio?: string;
  theme?: string;
  tone?: string;
  targetAudience?: string;
  productName?: string;
  customNotes?: string;
}

export async function generateContent(params: GenerationParams): Promise<GenerationResult> {
  // Simulate natural brief AI calculation latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  const id = 'sas_' + Math.random().toString(36).substring(2, 9);
  const now = Date.now();

  switch (params.moduleId) {
    case 'prompt':
      return generatePromptResult(id, now, params);
    case 'prewedding':
      return generatePreweddingResult(id, now, params);
    case 'umkm':
      return generateUmkmResult(id, now, params);
    case 'facebook_pro':
      return generateFacebookProResult(id, now, params);
    case 'marketing':
      return generateMarketingResult(id, now, params);
    case 'digital_product':
      return generateDigitalProductResult(id, now, params);
    default:
      return generatePromptResult(id, now, params);
  }
}

function generatePromptResult(id: string, now: number, p: GenerationParams): GenerationResult {
  const model = p.model || 'Midjourney v6.1';
  const ar = p.aspectRatio || '--ar 16:9';
  const category = p.category || 'Editorial Fashion';
  const subject = p.promptText?.trim() || 'Haute couture model with ethereal rose gold veil in misty obsidian temple garden';

  const midjourneyPrompt = `/imagine prompt: ${subject}, shot on Hasselblad H6D-100c, 85mm f/1.4 lens, natural diffused morning rim light, dusty pink silk drapery catching soft wind, subtle warm rose gold ambient reflection, velvety charcoal shadows, hyper-realistic skin texture, cinematic color grading, editorial Vogue cover quality ${ar} --v 6.1 --style raw --q 2 --s 750`;

  const negative = `--no oversaturated colors, plastic skin, deformed fingers, extra limbs, cartoonish blur, low resolution, watermark, amateur lighting`;

  return {
    id,
    moduleId: 'prompt',
    timestamp: now,
    title: `Soul Art Prompt Formula · ${category}`,
    subtitle: `Engineered for ${model} with high dynamic range and subtle rose undertones`,
    content: midjourneyPrompt,
    previewImage: '/src/assets/images/sas_soulart_hero_1793798196330.jpg',
    metadata: {
      category,
      model,
      aspectRatio: ar,
      negativePrompt: negative,
      tags: ['85mm Leica', 'Rose Gold Hour', 'Hasselblad', 'Editorial Raw', 'Vogue Aesthetics'],
      stats: {
        'Prompt Length': `${midjourneyPrompt.length} chars`,
        'Stylize Value': '--s 750',
        'Render Quality': 'High Dynamic Raw'
      },
      sections: [
        {
          title: 'Primary Midjourney Command',
          body: midjourneyPrompt
        },
        {
          title: 'Negative Prompt (Midjourney / FLUX)',
          body: negative
        },
        {
          title: 'FLUX.1 Pro Prompt Translation',
          body: `A cinematic 8k photograph of ${subject}. Natural morning lighting with gentle dusty pink tones and metallic rose gold glimmers. Authentic film grain, crisp focus on eye reflection, subtle dark velvet background, 35mm photograph, masterwork.`
        },
        {
          title: 'Cinematography Breakdown',
          body: `• Lighting: 45° Key light with soft octabox + 10% warm rose bounce reflector\n• Lens: 85mm f/1.4 prime lens wide open for buttery bokeh\n• Color Grading: Desaturated obsidian blacks, rose-quartz highlights, ivory midtones`
        }
      ]
    }
  };
}

function generatePreweddingResult(id: string, now: number, p: GenerationParams): GenerationResult {
  const theme = p.theme || 'Misty Mountain Caldera & Modern Kebaya';
  const location = p.promptText || 'Mount Bromo Caldera & Savanna Bukit Teletubbies';

  return {
    id,
    moduleId: 'prewedding',
    timestamp: now,
    title: `Prewedding Concept: ${theme}`,
    subtitle: `Exclusive luxury moodboard, wardrobe harmony & 6-shot editorial sequence`,
    content: `KONSEP EDITORIAL: "${theme}"\n\nLokasi: ${location}\nSuasana: Ethereal sunrise, kabut tipis keemasan, siluet romantis, dan perpaduan busana couture modern dengan sentuhan tradisi nusantara.\n\nPalet Warna: Dusty Pink (#C98B94), Rose Gold (#E5AA9C), Ivory Warm (#FAF7F2), dan Dark Slate Charcoal (#14131A).`,
    previewImage: '/src/assets/images/sas_prewedding_editorial_1793798198769.jpg',
    metadata: {
      category: 'Romantic Editorial',
      tags: ['Mount Bromo', 'Dusty Rose Couture', 'Golden Fog', 'Intimate Storyboard'],
      stats: {
        'Waktu Golden Hour': '05:15 – 06:45 WIB',
        'Jumlah Sequence': '6 Curated Shots',
        'Rasio Busana': 'Modern Couture 60% / Tradisi 40%'
      },
      sections: [
        {
          title: '1. Harmoni Busana & Wardrobe Styling',
          body: `• Mempelai Wanita: Gaun organza dusty rose berekor panjang dengan detail bordir bunga 3D transparan, veil sutra ivory 3 meter.\n• Mempelai Pria: Setelan bespoke linen berpotongan modern warna ivory/sand dengan kemeja kerah mandarin dan dasi/aksen rose gold subtle.`
        },
        {
          title: '2. Curated 6-Shot Storyboard',
          body: `1. The Arrival (Wide): Pasangan berjalan bergandengan di bibir kawah berkabut saat matahari baru menyembul.\n2. The Veil in Breeze (Medium): Angin menerbangkan veil dusty pink, pria merangkul pinggang wanita dari belakang.\n3. The Forehead Promise (Close-Up): Pria mencium kening wanita dengan mata terpejam, pantulan cahaya rose gold pada perhiasan.\n4. Intimate Whispers: Tawa candid saat sang pria membisikkan sesuatu di balik veil.\n5. Dramatic Caldera Silhouette: Pasangan berdiri di puncak batu karang dengan latar megah lautan pasir berkabut.\n6. Sunset Warmth: Berganti ke busana kasual rajut ivory & terakota hangat saat senja.`
        },
        {
          title: '3. Midjourney / AI Image Generator Prompt',
          body: `/imagine prompt: High fashion prewedding photography at Mount Bromo sunrise, romantic couple in dusty pink haute couture gown and ivory bespoke suit, ethereal morning mist floating over volcanic caldera, rose gold soft morning light, windblown veil, shot on Leica SL2 50mm Summilux f/1.4, cinematic emotional mood, 8k --ar 4:3 --v 6.1 --style raw`
        }
      ]
    }
  };
}

function generateUmkmResult(id: string, now: number, p: GenerationParams): GenerationResult {
  const brand = p.productName || 'Aura Botanica Serum';
  const category = p.category || 'Skincare & Kecantikan Herbal';
  const notes = p.customNotes || 'Dibuat dari ekstrak mawar damaskus & rosehip oil alami lokal';

  return {
    id,
    moduleId: 'umkm',
    timestamp: now,
    title: `UMKM AI Studio Pack: ${brand}`,
    subtitle: `Paket Lengkap: Foto Produk AI + Copywriting Instagram + Script Closing WhatsApp`,
    content: `PAKET LENGKAP BRANDING UMKM: ${brand}\nKategori: ${category}\nUSP: ${notes}`,
    previewImage: '/src/assets/images/sas_umkm_product_1793798198783.jpg',
    metadata: {
      category,
      tags: ['Travertine Studio', 'WhatsApp Script', 'Instagram Copy', 'AIDA Funnel'],
      stats: {
        'Target Closing Rate': '28% - 35%',
        'Media': 'Instagram & WhatsApp',
        'Tone': 'Elegan, Hangat & Terpercaya'
      },
      sections: [
        {
          title: '1. AI Product Photography Studio Prompt',
          body: `/imagine prompt: Commercial studio product photography of ${brand} bottle placed elegantly on warm ivory travertine pedestal, soft rose gold morning light reflection, dried dusty pink botanical flora in background, water droplet condensation, clean luxury cosmetic aesthetic, ultra-sharp 8k, shot on 90mm macro lens --ar 4:3 --v 6.1`
        },
        {
          title: '2. Copywriting Instagram Feed / Reels (AIDA)',
          body: `Pernah merasa kulit tetap kusam meski sudah pakai berlapis skincare? ✨\n\nBisa jadi skin barrier kamu butuh nutrisi yang benar-benar alami dan menyerap hingga lapisan terdalam. Kenalkan *${brand}* — formula ekstrak herbal pilihan dengan tekstur seringan embun yang mengunci kelembapan hingga 24 jam.\n\n💧 Kulit kenyal bercahaya tanpa rasa lengket\n🌿 100% bahan alami nusantara & ramah kulit sensitif\n🌸 Aroma mawar lembut yang menenangkan pikiran\n\nSpesial minggu ini: Dapatkan Free Rose Quartz Roller untuk 50 pemesan pertama! Klik link di bio untuk klaim promonya sekarang.`
        },
        {
          title: '3. WhatsApp Closing Script (Tingkat Closing Tinggi)',
          body: `*Sapaan Hangat:*\n"Halo Kak [Nama Customer]! Salam kenal dari tim ${brand} 🥰 Senang sekali Kakak tertarik dengan varian serum alami kami. Ada yang ingin Kakak tanyakan seputar jenis kulit atau cara pakainya, Kak?"\n\n*Handling Keberatan / Urgensi:*\n"Khusus hari ini, kami ada Bundling Exclusive Glow: Beli 2 Botol Hemat Rp 45.000 + Gratis Ongkir ke seluruh kota Kak. Slot bundling tinggal tersisa 4 paket untuk pengiriman sore ini. Mau kami sisihkan sekarang agar bisa langsung dikirim hari ini, Kak?"`
        }
      ]
    }
  };
}

function generateFacebookProResult(id: string, now: number, p: GenerationParams): GenerationResult {
  const topic = p.promptText || 'Perjuangan membangun bisnis dari modal 500 ribu sampai punya tim';
  const format = p.category || 'Viral Storytelling Hook';

  return {
    id,
    moduleId: 'facebook_pro',
    timestamp: now,
    title: `FB Pro Viral Engine · ${format}`,
    subtitle: `Hook pemicu interaksi tinggi, retention naskah Reels, dan format siap monetisasi`,
    content: `FORMAT: ${format}\nTopik: ${topic}\nTujuan: Maksimalkan interaksi (komentar, share) & jangkauan algoritma Meta FB Pro 2026.`,
    previewImage: '/src/assets/images/sas_soulart_hero_1793798196330.jpg',
    metadata: {
      category: 'FB Pro Monetization',
      tags: ['Organic Reach', 'High Engagement', 'Comment Magnet', 'Reels Hook'],
      stats: {
        'Target Retensi 3 Detik': '78%',
        'Algoritma Factor': 'Komentar Bernas & Bagikan',
        'Pacing Waktu Posting': 'Pukul 11:30 atau 19:45 WIB'
      },
      sections: [
        {
          title: '1. Viral Post Hook (Pancing 1-3 Baris Pertama)',
          body: `Jangan pernah percaya sama orang yang bilang: "Modal kecil gak bakal bisa berkembang."\n\n3 tahun lalu, di rekening saya cuma tersisa Rp 520.000. Hari ini, saya mau bagikan 3 hal pahit yang gak pernah diajarkan di buku bisnis manapun... (Baca sampai habis, nomor 2 paling nyesek)`
        },
        {
          title: '2. Naskah Post Lengkap (Trik Line-Breaks Meta)',
          body: `Banyak yang tanya ke saya:\n"Gimana caranya bertahan waktu orderan sepi berhari-hari?"\n\nJujur, waktu baru mulai, rasanya pengen nyerah setiap jam 12 malam.\n\nTapi ada satu prinsip yang mengubah segalanya:\n1. Jangan jual produknya, tapi selesaikan rasa takut pembeli.\n2. Konsistensi harian mengalahkan bakat yang cuma muncul seminggu sekali.\n3. Jangan malu mulai dari hal kecil yang orang lain remehkan.\n\nSekarang giliran kamu:\nKira-kira apa ketakutan terbesar kamu yang lagi dihadapi sekarang? Tulis di bawah yuk, siapa tahu kita bisa saling menguatkan dan bantu cari solusinya! 👇💬`
        },
        {
          title: '3. Naskah FB Reels 30 Detik (Monetisasi & Follower)',
          body: `[Visual: Menatap kamera sambil memegang secangkir kopi / produk, transisi cepat]\n\n• Detik 0-3 (Hook Kuat): "Kalau kamu masih punya uang 500 ribu di dompet, tolong jangan belikan baju dulu!"\n• Detik 4-12 (Masalah): "Saya pakai 500 ribu terakhir saya untuk beli sampel produk dan kuota internet. Gak ada yang percaya saya bisa sukses."\n• Detik 13-24 (Solusi): "Langkahnya sederhana: riset masalah tetangga, cari solusinya, tawarkan dengan tulus di Facebook."\n• Detik 25-30 (CTA): "Mau aku spill 5 ide bisnis yang bisa jalan minggu ini? Follow akun ini dan ketik 'MAU' di kolom komentar ya!"`
        }
      ]
    }
  };
}

function generateMarketingResult(id: string, now: number, p: GenerationParams): GenerationResult {
  const brand = p.productName || 'Soul Art Luxury Creative Studio';
  const target = p.targetAudience || 'Pengusaha, Konten Kreator & Calon Pengantin Modern';

  return {
    id,
    moduleId: 'marketing',
    timestamp: now,
    title: `Omnichannel Marketing Blueprint: ${brand}`,
    subtitle: `Kerangka AIDA, Matriks Konten 30 Hari & Formula Konversi Sales Page`,
    content: `MARKETING PLAYBOOK: ${brand}\nTarget Audiens: ${target}`,
    previewImage: '/src/assets/images/sas_soulart_hero_1793798196330.jpg',
    metadata: {
      category: 'Omnichannel Strategy',
      tags: ['AIDA Funnel', '30-Day Matrix', 'Sales Copy', 'High Conversion'],
      stats: {
        'Pilar Konten': '4 Core Pillars',
        'Frekuensi': '5x per Minggu',
        'Target ROAS': '4.2x'
      },
      sections: [
        {
          title: '1. Kerangka AIDA (Attention, Interest, Desire, Action)',
          body: `• [Attention]: Visual kontras hitam-rose gold dengan hook: "Ketika brand lain bersaing di harga murah, brand Anda layak tampil di kelas prestisius."\n• [Interest]: Menampilkan studi kasus transformasi visual yang melipatgandakan persepsi nilai produk hingga 300%.\n• [Desire]: Merasakan sensasi kemudahan sistem Soul Art AI yang menghemat 20 jam kerja desain setiap minggu.\n• [Action]: Undangan sesi audit kreatif gratis untuk 10 brand pertama bulan ini.`
        },
        {
          title: '2. Matriks Konten Mingguan (4 Pilar Seimbang)',
          body: `• Senin (Authority & Insight): Dekonstruksi rahasia estetika brand mewah dunia (Rolex, Chanel) dan aplikasinya untuk brand Anda.\n• Rabu (Behind the Process): Proses pembuatan konsep visual dari draft coretan hingga render ultra-realistis 8k.\n• Jumat (Social Proof / Testimoni): Screenshot chat klien yang omsetnya melesat setelah rebranding estetika.\n• Minggu (Interactive & Lifestyle): Diskusi santai: "Pilih konsep prewedding outdoor kawah atau private villa?"`
        },
        {
          title: '3. High-Converting Sales Page Headline & Guarantee',
          body: `Headline Utama:\n"Hentikan Pemborosan Waktu Membuat Konten Rata-Rata. Miliki Sistem Kreatif Soul Art yang Memikat Audiens Impian Anda dalam Hitungan Detik."\n\nJaminan (Risk Reversal):\n"Garansi kepuasan 14 hari tanpa tanya: jika formula dan materi kami tidak mempercepat alur kerja Anda, dana Anda kami kembalikan 100% tanpa potongan."`
        }
      ]
    }
  };
}

function generateDigitalProductResult(id: string, now: number, p: GenerationParams): GenerationResult {
  const title = p.promptText || 'Soul Art Prompt Vault: 500+ Luxury Visual Formulas';
  const type = p.category || 'Notion Template & Asset Bundle';

  return {
    id,
    moduleId: 'digital_product',
    timestamp: now,
    title: `Digital Asset Incubator: ${title}`,
    subtitle: `Struktur Kurikulum, Tangga Harga Berjenjang & Copy Landing Page Siap Jual`,
    content: `PRODUK DIGITAL: ${title}\nFormat: ${type}`,
    previewImage: '/src/assets/images/sas_digital_product_1793798199159.jpg',
    metadata: {
      category: 'Digital Product Engine',
      tags: ['Notion Hub', 'Tiered Pricing', 'Landing Page Copy', 'Scalable Passive Income'],
      stats: {
        'Estimasi Gross Margin': '94%',
        'Delivery Method': 'Otomatis via Mayar / Lynk.id / Gumroad',
        'Tier Pricing': 'Rp 49k s/d Rp 499k'
      },
      sections: [
        {
          title: '1. Tangga Harga & Penawaran Berjenjang (Value Ladder)',
          body: `• Tier 0 (Lead Magnet): Checklist PDF Gratis "15 Formula Prompt Estetik untuk Midjourney"\n• Tier 1 (Tripwire / Starter - Rp 79.000): 100 Formula Prompt Kategori Prewedding & Fashion Portrait\n• Tier 2 (Core Offer - Rp 199.000): Complete Soul Art Dashboard di Notion + 500+ Prompt + Panduan Komposisi Kamera\n• Tier 3 (VIP Bundle - Rp 449.000): Semua di Tier 2 + Akses Private Group Discord + Update Formula Selamanya`
        },
        {
          title: '2. Struktur Isi & Outline Modul Produk',
          body: `• Modul 1: Dasar Filosofi Soul Art – Menemukan Ciri Khas Visual Brand Anda\n• Modul 2: Formula Pencahayaan Sinematik (Rose Gold Hour, Moody Dark, Studio Minimalist)\n• Modul 3: Anatomi Kamera & Lensa (85mm Leica, 35mm Anamorphic, Macro 90mm)\n• Modul 4: Masterlist 200+ Modifier Gaya & Negatif Syntax Anti-Gagal\n• Modul 5: Template Notion Interaktif untuk Menyimpan & Menguji Prompt Sendiri`
        },
        {
          title: '3. Copywriting Hero Landing Page (Siap Tempel)',
          body: `[Headline]:\nBuka Akses Rahasia ke Ratusan Formula Prompt AI Bernilai Ratusan Juta Rupiah yang Menghasilkan Gambar Berkelas Editorial Kelas Dunia.\n\n[Subheadline]:\nTanpa perlu trial-and-error berhari-hari. Cukup copy, paste, dan saksikan ide imajinasi Anda berubah menjadi karya seni visual yang memukau dalam 30 detik.\n\n[CTA Button]:\nDapatkan Akses Instan Sekarang (Diskon 50% Khusus Peluncuran)`
        }
      ]
    }
  };
}
