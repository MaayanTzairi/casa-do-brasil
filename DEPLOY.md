# Casa do Brasil — Railway Deployment Guide

## Prerequisites

- [Railway account](https://railway.app) (free tier available)
- GitHub repository connected to this project
- MySQL database (Railway provides one, or use PlanetScale/TiDB)

---

## Step 1 — Push to GitHub

The project is already connected to GitHub. Just save a checkpoint and it will sync automatically.

---

## Step 2 — Create Railway Project

1. Go to [railway.app](https://railway.app) → **New Project**
2. Choose **Deploy from GitHub repo**
3. Select your `casa-do-brasil` repository
4. Railway will auto-detect the `Dockerfile` and `railway.toml`

---

## Step 3 — Add MySQL Database

1. In your Railway project → **New Service** → **Database** → **MySQL**
2. Copy the `DATABASE_URL` connection string from the MySQL service
3. Add it to your app's environment variables (see Step 4)

---

## Step 4 — Set Environment Variables

In Railway → your app service → **Variables**, add:

| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | MySQL connection string from Step 3 | ✅ Yes |
| `JWT_SECRET` | Random 32-char string (`openssl rand -base64 32`) | ✅ Yes |
| `NODE_ENV` | `production` | ✅ Yes |
| `SITE_URL` | Your Railway URL (e.g. `https://casa-do-brasil.up.railway.app`) | Recommended |
| `VITE_APP_TITLE` | `Casa do Brasil` | Optional |

---

## Step 5 — Run Database Migrations

After first deploy, open Railway's shell for your app service and run:

```bash
pnpm db:push
```

---

## Step 6 — Your URL

After deployment, Railway gives you a URL like:
```
https://casa-do-brasil-production.up.railway.app
```

You can customize the subdomain in Railway → Settings → Networking.

---

## Custom Domain (Optional)

1. Railway → Settings → Networking → **Custom Domain**
2. Add your domain (e.g. `casadobrasil.co.il`)
3. Add the CNAME record to your DNS provider
4. SSL is automatic

---

## Health Check

The app exposes `/api/health` for Railway's health monitoring:
```
GET /api/health → { "status": "ok", "service": "casa-do-brasil" }
```

---

## SEO — Update Canonical URLs

After deploying, update the canonical URL in `client/index.html`:
```html
<link rel="canonical" href="https://YOUR-DOMAIN.com/" />
```

And set the `SITE_URL` environment variable to match.
