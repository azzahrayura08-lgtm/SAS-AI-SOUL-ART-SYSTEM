# SAS AI Media Gateway

This Worker keeps the Gemini API key on the server. Never put the key in the React app, GitHub source, APK, or chat.

## Models
- Image: `gemini-3.1-flash-image`
- Video: `gemini-omni-1.1-flash`

## Endpoints
- `GET /health` — service health check.
- `POST /api/generate` — JSON body: `{ "type": "image" | "video", "prompt": "...", "aspectRatio": "9:16", "duration": 8 }`.
- `GET /api/interactions/{id}` — retrieve an asynchronous interaction.

The Worker forwards the Gemini Interactions API response without exposing the secret.

## Deployment (parent/guardian should manage API access and any billing)
1. Install the Cloudflare Wrangler CLI on a computer and sign in to the Cloudflare account.
2. From this directory, set the secret interactively: `npx wrangler secret put GEMINI_API_KEY`. Paste the key only into the secure terminal prompt, never into GitHub source or ChatGPT.
3. Set `APP_ORIGIN` in `wrangler.toml` to the exact HTTPS origin where the SAS web app is hosted. Do not leave wildcard CORS for a public production deployment.
4. Deploy with `npx wrangler deploy`.
5. Open the deployed `/health` endpoint. It should return `{"ok":true,"service":"SAS AI Media Gateway"}`.

## Important
- The APK cannot generate media through this gateway until its API base URL is configured in the app and the Worker is deployed.
- Video generation is asynchronous and can take time; the client must poll the returned interaction ID until it is complete, then present the generated video output.
- API use may incur charges and is subject to Google's model availability, quotas, and terms. A parent/guardian should review and manage the account.
- This folder is a secure server scaffold; it does not mean the Android APK has already been rebuilt or tested against a live API.
