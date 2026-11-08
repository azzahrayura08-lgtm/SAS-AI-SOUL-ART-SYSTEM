# SAS AI Media Gateway

Server-side gateway for real Gemini image and short-video generation. The Gemini API key stays in a Cloudflare Worker secret; never place it in React code, GitHub files, APK settings, or chat.

## Models
- Image generation: `gemini-3.1-flash-image` (stable).
- Video generation: `gemini-omni-1.1-flash` (stable model ID).

## Endpoints
- `GET /health` — service status and whether the key is configured.
- `POST /api/generate` — JSON body: `{ "type": "image" | "video", "prompt": "...", "aspectRatio": "9:16" }`.
- `GET /api/files/{id}/download` — securely proxies the generated MP4 download.

## Deploy (parent/guardian should manage the API account and any billing)
1. Install Node.js on a computer, then open a terminal in this folder.
2. Run `npx wrangler login`.
3. Create/manage the Gemini API key with a parent/guardian. Review the model's current pricing, quota, and terms first; usage may incur charges.
4. Run `npx wrangler secret put GEMINI_API_KEY` and paste the key only into the secure terminal prompt. Never paste it into GitHub source, the APK, or ChatGPT.
5. Run `npx wrangler deploy`.
6. Copy the deployed Worker URL, such as `https://sas-ai-media-gateway.<account>.workers.dev`.
7. In SAS AI, open **Reels Studio → SAS Real AI Media Generator**, paste only the Worker URL into **Alamat Server AI**, then generate a test image.

## Important
- The app's new generator appears in Reels Studio. It does not use the old Pollinations URL or canvas fallback for the new AI generator.
- The APK cannot generate media until the Worker is deployed and its URL is entered in the app.
- Video generation returns a short clip; model duration, output, quotas, safety filters, and availability are controlled by Google.
- CORS is permissive by default for initial setup. Before public production use, set `APP_ORIGIN` in `wrangler.toml` to the exact web origin where the app is hosted, and configure Cloudflare rate limiting/abuse protection.
- This scaffold does not mean that a live API has been configured or that the generated outputs have been tested with a real key.
