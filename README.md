# Age Calculator — Deploy & PWA Notes

This project includes a Service Worker (PWA). Follow these steps to ensure Netlify serves the latest updates and to verify deployments.

## 1. Commit & push local changes
```bash
git add .
git commit -m "PWA: update SW, update prompt, and cache headers"
git push origin main
```

## 2. Force Netlify to rebuild & clear CDN cache
- In Netlify dashboard: Site → Deploys → Trigger deploy → **Clear cache and deploy site**
- Or push an empty commit to trigger a build:
```bash
git commit --allow-empty -m "trigger netlify redeploy"
git push origin main
```

## 3. `_headers` file
A `_headers` file is included to reduce HTML/SW caching on Netlify. It sets `Cache-Control: no-cache` for critical files:
```
/index.html
  Cache-Control: no-cache, no-store, must-revalidate

/sw.js
  Cache-Control: no-cache, no-store, must-revalidate

/index.js
  Cache-Control: no-cache
```
This helps prevent the CDN from serving stale HTML and service worker scripts.

## 4. Browser verification (after deploy)
- Open your site in Chrome/Edge.
- Open DevTools → Application → Service Workers:
  - Confirm the `sw.js` script URL and cache name (should be `age-calc-v2`).
  - If an update is waiting, the in-app banner appears; click `Reload` to activate.
- DevTools → Network: check "Disable cache" and perform a hard reload (Ctrl+Shift+R).

## 5. If visitors still see old content
- Instruct them to do a hard refresh (Ctrl+F5) or clear site data.
- As a site owner, use Netlify "Clear cache and deploy" to ensure CDN refresh.

## 6. Development notes
- During development the service worker is disabled on `localhost` and `file:` to avoid caching issues.
- The app shows an update banner when a new service worker is installed and waiting; clicking `Reload` posts a `SKIP_WAITING` message to the worker so it activates immediately.

---
If you want, I can add a small GitHub Actions workflow to automatically trigger Netlify deploys, or help craft messaging to users about clearing cache. What next?