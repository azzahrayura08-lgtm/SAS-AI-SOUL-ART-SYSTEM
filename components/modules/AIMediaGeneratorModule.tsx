import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, Video, Sparkles, Download, Loader2, AlertCircle, Server } from 'lucide-react';

type MediaKind = 'image' | 'video';
type Aspect = '1:1' | '4:5' | '9:16' | '16:9';

const STORAGE_KEY = 'sas_ai_media_gateway_url';

function findOutput(steps: any[], kind: MediaKind) {
  for (const step of steps || []) {
    if (step?.type !== 'model_output') continue;
    for (const part of step.content || []) {
      if (part?.type === kind && (part.data || part.uri)) return part;
    }
  }
  return null;
}

export const AIMediaGeneratorModule: React.FC = () => {
  const [gatewayUrl, setGatewayUrl] = useState('');
  const [kind, setKind] = useState<MediaKind>('image');
  const [prompt, setPrompt] = useState('Buat ilustrasi produk digital anak-anak yang ceria, warna pastel, komposisi profesional, detail bersih, tanpa tulisan yang salah.');
  const [aspectRatio, setAspectRatio] = useState<Aspect>('1:1');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    try { setGatewayUrl(localStorage.getItem(STORAGE_KEY) || ''); } catch {}
  }, []);

  useEffect(() => () => {
    if (imageUrl.startsWith('blob:')) URL.revokeObjectURL(imageUrl);
    if (videoUrl.startsWith('blob:')) URL.revokeObjectURL(videoUrl);
  }, [imageUrl, videoUrl]);

  const generate = async () => {
    if (!gatewayUrl.trim()) {
      setError('Alamat server belum diisi. Server Cloudflare Worker harus dipasang terlebih dahulu.');
      return;
    }
    if (!prompt.trim()) {
      setError('Deskripsi wajib diisi.');
      return;
    }
    setBusy(true);
    setError('');
    setStatus(kind === 'image' ? 'Gemini sedang membuat gambar...' : 'Gemini sedang membuat video AI. Proses dapat memerlukan waktu...');
    setImageUrl('');
    setVideoUrl('');
    try {
      const base = gatewayUrl.trim().replace(/\/$/, '');
      localStorage.setItem(STORAGE_KEY, base);
      const response = await fetch(base + '/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: kind,
          prompt: kind === 'video'
            ? prompt.trim() + '. Buat video pendek sekitar 8 detik, gerakan alami, kualitas sinematik, satu adegan yang jelas.'
            : prompt.trim(),
          aspectRatio,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || payload.message || 'Server AI menolak permintaan. Periksa konfigurasi server dan kuota API.');
      const output = findOutput(payload.steps, kind) ||
        (kind === 'image' ? payload.output_image : payload.output_video);
      if (!output) throw new Error('Respons Gemini belum berisi media. Coba lagi atau periksa status model di server.');
      if (kind === 'image') {
        if (!output.data) throw new Error('Data gambar tidak ditemukan pada respons Gemini.');
        setImageUrl('data:' + (output.mime_type || 'image/png') + ';base64,' + output.data);
        setStatus('Gambar AI berhasil dibuat.');
      } else if (output.data) {
        const binary = atob(output.data);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        setVideoUrl(URL.createObjectURL(new Blob([bytes], { type: output.mime_type || 'video/mp4' })));
        setStatus('Video AI berhasil dibuat.');
      } else if (output.uri) {
        const match = output.uri.match(/files\/([A-Za-z0-9_-]+)/);
        if (!match) throw new Error('Tautan file video dari Gemini tidak dikenali.');
        const fileResponse = await fetch(base + '/api/files/' + encodeURIComponent(match[1]) + '/download');
        if (!fileResponse.ok) throw new Error('Video belum dapat diunduh dari server. Coba beberapa saat lagi.');
        setVideoUrl(URL.createObjectURL(await fileResponse.blob()));
        setStatus('Video AI berhasil dibuat.');
      } else {
        throw new Error('Output video tidak memiliki data atau URI.');
      }
    } catch (e: any) {
      setError(e?.message || 'Terjadi kesalahan saat membuat media AI.');
      setStatus('');
    } finally {
      setBusy(false);
    }
  };

  const download = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <section className="mb-6 rounded-2xl border border-[#E5AA9C]/35 bg-[#14131A] p-4 sm:p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-[#E5AA9C]/15 p-2.5 text-[#E5AA9C]"><Sparkles className="h-5 w-5" /></div>
        <div>
          <h2 className="font-serif text-xl font-bold text-[#FAF7F2]">SAS Real AI Media Generator</h2>
          <p className="text-xs text-[#DCD4CA]/70">Pembuatan gambar dan video berdasarkan deskripsi sendiri, melalui server Gemini.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => { setKind('image'); setError(''); }} className={`rounded-xl border p-3 text-sm flex items-center justify-center gap-2 ${kind === 'image' ? 'border-[#E5AA9C] bg-[#9A5A65]/25 text-white' : 'border-white/10 text-[#DCD4CA]/70'}`}>
          <ImageIcon className="h-4 w-4" /> Buat Gambar AI
        </button>
        <button type="button" onClick={() => { setKind('video'); setError(''); }} className={`rounded-xl border p-3 text-sm flex items-center justify-center gap-2 ${kind === 'video' ? 'border-[#E5AA9C] bg-[#9A5A65]/25 text-white' : 'border-white/10 text-[#DCD4CA]/70'}`}>
          <Video className="h-4 w-4" /> Buat Video AI
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#FAF7F2]">Alamat Server AI (URL Worker)</label>
        <input value={gatewayUrl} onChange={e => setGatewayUrl(e.target.value)} placeholder="https://nama-worker.nama-akun.workers.dev" className="w-full rounded-xl border border-white/15 bg-[#0C0C10] p-3 text-sm text-white outline-none focus:border-[#E5AA9C]" />
        <p className="text-[11px] text-[#DCD4CA]/60 flex gap-1.5 items-start"><Server className="h-3.5 w-3.5 shrink-0 mt-0.5" /> Alamat ini disimpan di perangkat. Jangan masukkan API key di sini.</p>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#FAF7F2]">Deskripsi hasil yang diinginkan</label>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} placeholder="Jelaskan objek, gaya visual, latar, warna, pencahayaan, dan gerakan video..." className="w-full rounded-xl border border-white/15 bg-[#0C0C10] p-3 text-sm leading-relaxed text-white outline-none focus:border-[#E5AA9C]" />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#FAF7F2]">Rasio gambar/video</label>
        <div className="grid grid-cols-4 gap-2">
          {(['1:1', '4:5', '9:16', '16:9'] as Aspect[]).map(ratio => (
            <button key={ratio} type="button" onClick={() => setAspectRatio(ratio)} className={`rounded-lg border py-2 text-xs ${aspectRatio === ratio ? 'border-[#E5AA9C] bg-[#9A5A65]/25 text-white' : 'border-white/10 text-[#DCD4CA]/70'}`}>{ratio}</button>
          ))}
        </div>
        {kind === 'video' && <p className="text-[11px] text-[#DCD4CA]/60">Model video menghasilkan klip pendek; durasi dan hasil akhir mengikuti batas model Gemini.</p>}
      </div>

      {error && <div className="rounded-xl border border-red-400/30 bg-red-950/30 p-3 text-xs text-red-200 flex gap-2"><AlertCircle className="h-4 w-4 shrink-0" />{error}</div>}
      {status && <p className="text-xs text-[#E5AA9C]">{status}</p>}

      <button type="button" onClick={generate} disabled={busy || !prompt.trim()} className="w-full rounded-xl bg-gradient-to-r from-[#9A5A65] to-[#E5AA9C] py-3 font-semibold text-sm text-[#0C0C10] disabled:opacity-50 flex items-center justify-center gap-2">
        {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Memproses AI...</> : <><Sparkles className="h-4 w-4" /> Generate {kind === 'image' ? 'Gambar' : 'Video'} AI</>}
      </button>

      {imageUrl && <div className="space-y-2"><img src={imageUrl} alt="Hasil gambar AI" className="w-full max-h-[620px] rounded-xl border border-white/10 object-contain bg-black" /><button type="button" onClick={() => download(imageUrl, 'sas-ai-image.png')} className="rounded-lg border border-[#E5AA9C]/40 px-4 py-2 text-xs text-white flex items-center gap-2"><Download className="h-4 w-4" /> Unduh Gambar</button></div>}
      {videoUrl && <div className="space-y-2"><video src={videoUrl} controls playsInline className="w-full rounded-xl border border-white/10 bg-black" /><button type="button" onClick={() => download(videoUrl, 'sas-ai-video.mp4')} className="rounded-lg border border-[#E5AA9C]/40 px-4 py-2 text-xs text-white flex items-center gap-2"><Download className="h-4 w-4" /> Unduh Video MP4</button></div>}
    </section>
  );
};
