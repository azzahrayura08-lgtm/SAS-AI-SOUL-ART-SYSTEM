export interface Env {
  GEMINI_API_KEY: string;
  APP_ORIGIN?: string;
}

const API = "https://generativelanguage.googleapis.com/v1beta/interactions";
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.APP_ORIGIN || "*";
    if (allowedOrigin !== "*" && origin !== allowedOrigin) {
      return json({ error: "Origin tidak diizinkan." }, 403, allowedOrigin);
    }
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": allowedOrigin,
          "access-control-allow-methods": "GET, POST, OPTIONS",
          "access-control-allow-headers": "content-type",
          "vary": "Origin",
        },
      });
    }
    if (!env.GEMINI_API_KEY) return json({ error: "Server belum dikonfigurasi. API key belum dipasang." }, 503, allowedOrigin);

    const url = new URL(request.url);
    if (url.pathname === "/health" && request.method === "GET") {
      return json({ ok: true, service: "SAS AI Media Gateway" }, 200, allowedOrigin);
    }

    if (url.pathname === "/api/generate" && request.method === "POST") {
      let body: any;
      try { body = await request.json(); } catch {
        return json({ error: "Format permintaan tidak valid." }, 400, allowedOrigin);
      }
      const kind = body?.type;
      const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
      if (!["image", "video"].includes(kind) || !prompt || prompt.length > 8000) {
        return json({ error: "Isi deskripsi gambar/video wajib diisi (maksimal 8.000 karakter)." }, 400, allowedOrigin);
      }
      const model = kind === "image" ? IMAGE_MODEL : VIDEO_MODEL;
      const responseFormat = kind === "image"
        ? { type: "image", aspect_ratio: validRatio(body.aspectRatio), image_size: "1K" }
        : { type: "video", aspect_ratio: validVideoRatio(body.aspectRatio), duration: validDuration(body.duration) };

      const upstream = await fetch(API, {
        method: "POST",
        headers: {
          "x-goog-api-key": env.GEMINI_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({ model, input: prompt, response_format: responseFormat }),
      });
      const result = await upstream.text();
      return new Response(result, {
        status: upstream.status,
        headers: {
          "content-type": upstream.headers.get("content-type") || "application/json",
          "access-control-allow-origin": allowedOrigin,
          "vary": "Origin",
          "cache-control": "no-store",
        },
      });
    }

    const match = url.pathname.match(/^\/api\/interactions\/([A-Za-z0-9_-]+)$/);
    if (match && request.method === "GET") {
      const upstream = await fetch(`${API}/${encodeURIComponent(match[1])}`, {
        headers: { "x-goog-api-key": env.GEMINI_API_KEY },
      });
      return new Response(await upstream.text(), {
        status: upstream.status,
        headers: {
          "content-type": upstream.headers.get("content-type") || "application/json",
          "access-control-allow-origin": allowedOrigin,
          "vary": "Origin",
          "cache-control": "no-store",
        },
      });
    }
    return json({ error: "Endpoint tidak ditemukan." }, 404, allowedOrigin);
  },
};

function validRatio(value: unknown): string {
  const allowed = ["1:1", "3:2", "2:3", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"];
  return typeof value === "string" && allowed.includes(value) ? value : "1:1";
}
function validVideoRatio(value: unknown): string {
  return value === "9:16" ? "9:16" : "16:9";
}
function validDuration(value: unknown): string {
  const n = Number(value);
  return Number.isFinite(n) ? `${Math.min(10, Math.max(3, Math.round(n)))}s` : "8s";
}
