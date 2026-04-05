# Vercel Deployment Instructions for NyteHawk

## 1️⃣ Install Command
```bash
npm install
```
*(If you prefer Yarn, use `yarn install`.)*

## 2️⃣ Build Command
```bash
npm run build
```
This runs the standard Create‑React‑App build script (`react-scripts build`) which bundles the app into a static folder.

## 3️⃣ Output Directory
Vercel expects the static files to be located in the **`build`** directory (the default output of `react-scripts build`).

## 4️⃣ Vercel Configuration (`vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "https://nytehawk-nxwv.onrender.com/api/$1" }
  ],
  "env": {
    "REACT_APP_API_URL": "https://nytehawk-nxwv.onrender.com"
  }
}
```
- **`distDir`** tells Vercel that the build output lives in the `build` folder.
- The **`routes`** entry proxies any request that starts with `/api/` to your live Render backend.
- The **`env`** variable injects the backend URL at build time so `src/config.js` resolves correctly.

## 5️⃣ Deploy Steps
1. Commit the changes (including `vercel.json` and this README) and push to GitHub.
2. In the Vercel dashboard, import the repository (or re‑link if already imported).
3. Vercel will automatically run:
   - **Install**: `npm install`
   - **Build**: `npm run build`
4. After a successful build, Vercel will serve the static files from the `build` directory and proxy API calls as defined.

## 6️⃣ Quick Reference
| Setting | Value |
|---------|-------|
| **Install Command** | `npm install` |
| **Build Command**   | `npm run build` |
| **Output Directory**| `build` |
| **Backend URL**     | `https://nytehawk-nxwv.onrender.com` |

Now you can trigger a new deployment by pushing any commit to the `main` branch. Vercel will handle the rest! 🎉
