export interface Env {
  GEMINI_API_KEY: string;
  APP_ORIGIN?: string;
}

const API = "https://generativelanguage.googleapis.com/v1beta/interactions";
const FILES_API = "https://generativelanguage.googleapis.com/v1beta/files";
const IMAGE_MODEL = "gemini-3.1-flash-image";
const VIDEO_MODEL = "gemini-omni-1.1-flash";

function json(data: unknown, status = 200, origin = "*") {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": origin,
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "vary": "Origin",
      "cache-control": "no-store",
    },
  });
}

function corsHeaders(origin: string) {
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "vary": "Origin",
    "cache-control": "no-store",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const requestOrigin = request.headers.get("Origin") || "";
    const allowedOrigin = env.APP_ORIGIN || "*";
    if (allowedOrigin !== "*" && requestOrigin !== allowedOrigin) {
      return json({ error: "Origin tidak diizinkan." }, 403, allowedOrigin);
    }
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(allowedOrigin) });

    const url = new URL(request.url);
    if (url.pathname === "/health" && request.method === "GET") {
      return json({ ok: true, service: "SAS AI Media Gateway", configured: Boolean(env.GEMINI_API_KEY) }, 200, allowedOrigin);
    }
    if (!env.GEMINI_API_KEY) {
      return json({ error: "Server belum dikonfigurasi. API key belum dipasang oleh pengelola." }, 503, allowedOrigin);
    }

    if (url.pathname === "/api/generate" && request.method === "POST") {
      let body: any;
      try { body = await request.json(); } catch {
        return json({ error: "Format permintaan tidak valid." }, 400, allowedOrigin);
      }
      const kind = body?.type;
      const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
      if (!["image", "video"].includes(kind) || !prompt || prompt.length > 8000) {
        return json({ error: "Deskripsi wajib diisi (maksimal 8.000 karakter)." }, 400, allowedOrigin);
      }

      const model = kind === "image" ? IMAGE_MODEL : VIDEO_MODEL;
      const responseFormat = kind === "image"
        ? { type: "image", mime_type: "image/png", aspect_ratio: validImageRatio(body.aspectRatio), image_size: "1K" }
        : { type: "video", aspect_ratio: validVideoRatio(body.aspectRatio), delivery: "uri" };

      let upstream: Response;
      try {
        upstream = await fetch(API, {
          method: "POST",
          headers: {
            "x-goog-api-key": env.GEMINI_API_KEY,
            "content-type": "application/json",
          },
          body: JSON.stringify({ model, input: prompt, response_format: responseFormat }),
        });
      } catch {
        return json({ error: "Tidak dapat terhubung ke layanan Gemini. Periksa koneksi server." }, 502, allowedOrigin);
      }
      const result = await upstream.text();
      return new Response(result, {
        status: upstream.status,
        headers: {
          "content-type": upstream.headers.get("content-type") || "application/json",
          ...corsHeaders(allowedOrigin),
        },
      });
    }

    const fileMatch = url.pathname.match(/^\/api\/files\/([A-Za-z0-9_-]+)(\/download)?$/);
    if (fileMatch && request.method === "GET") {
      const fileId = fileMatch[1];
      const isDownload = Boolean(fileMatch[2]);
      const target = isDownload
        ? `${FILES_API}/${encodeURIComponent(fileId)}:download?alt=media`
        : `${FILES_API}/${encodeURIComponent(fileId)}`;
      const upstream = await fetch(target, { headers: { "x-goog-api-key": env.GEMINI_API_KEY } });
      const headers = new Headers(corsHeaders(allowedOrigin));
      headers.set("content-type", isDownload ? (upstream.headers.get("content-type") || "video/mp4") : "application/json");
      if (isDownload && upstream.ok) headers.set("content-disposition", 'attachment; filename="sas-ai-video.mp4"');
      return new Response(upstream.body, { status: upstream.status, headers });
    }

    return json({ error: "Endpoint tidak ditemukan." }, 404, allowedOrigin);
  },
};

function validImageRatio(value: unknown): string {
  const allowed = ["1:1", "1:4", "1:8", "2:3", "3:2", "3:4", "4:1", "4:3", "4:5", "5:4", "8:1", "9:16", "16:9", "21:9"];
  return typeof value === "string" && allowed.includes(value) ? value : "1:1";
}
function validVideoRatio(value: unknown): string {
  return value === "9:16" ? "9:16" : "16:9";
}
