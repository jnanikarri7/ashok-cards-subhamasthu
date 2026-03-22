# Ashok 9 Cards Subhamasthu

**Premium Traditional South Indian Wedding Invitation Store**

> Premium Traditional South Indian Wedding Invitations — Crafted with Devotion since 1985.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon) via Prisma ORM
- **Payments**: Razorpay
- **State**: Zustand (with localStorage persistence)
- **Email**: Nodemailer (SMTP)
- **Auth**: JWT (HttpOnly cookies, admin only)

## Setup

### 1. Clone & Install
```bash
git clone <repo>
cd ashok-cards-subhamasthu
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env
# Fill in your values — see .env.example for all required vars
```

Required variables:
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon/Supabase/local) |
| `JWT_SECRET` | Min 32-char secret for admin auth |
| `RAZORPAY_KEY_ID` | Razorpay API key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay API secret |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay webhook signing secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Public Razorpay key (client-side) |
| `SMTP_HOST` | SMTP server (e.g. smtp.gmail.com) |
| `SMTP_PORT` | SMTP port (587 for TLS) |
| `SMTP_USER` | SMTP email address |
| `SMTP_PASS` | SMTP app password |
| `NEXT_PUBLIC_SITE_URL` | Production URL (e.g. https://ashok9cards.com) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number with country code |

### 3. Database Setup
```bash
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:seed       # Seed with 20 sample products + admin
```

### 4. Run Development
```bash
npm run dev
# Visit http://localhost:3000
```

### 5. Admin Access
- URL: `/admin`
- Default email: `admin@ashokcards.com`
- Default password: `Admin@123`
- **Change the password immediately in production**

## Deployment (Vercel)

1. Push to GitHub (private repo recommended)
2. Connect repo to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

```bash
# Or deploy via CLI
vercel deploy --prod
```

## Security Features
- Rate limiting on login, orders, payment APIs
- Zod input validation on all API routes
- HttpOnly secure cookies for admin auth
- Razorpay webhook signature verification
- Server-side price validation (client prices never trusted)
- CSP, HSTS, X-Frame-Options security headers
- No secrets committed (all via env vars)

## Features
- 🏛️ Temple-themed premium South Indian design
- 🛒 Full e-commerce with cart & Razorpay checkout
- 📝 Customization form for wedding details
- 📧 Auto email confirmations (order + status updates)
- 📦 Order tracking with status timeline
- 🔐 Admin dashboard (CRUD, order management, CSV export)
- 📱 WhatsApp integration
- 🌐 SEO optimized (sitemap, robots, JSON-LD, OG tags)
- ⚡ Skeleton loaders, Suspense streaming, optimized images

## Business Info
**Brand**: Ashok 9 Cards Subhamasthu  
**Address**: #3-3-832, Bazar Road, near Dargah, General Bazaar, Secunderabad, Telangana 500003  
**Email**: info@ashok9cards.com  
**Est.**: 1985
