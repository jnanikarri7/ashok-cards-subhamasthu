# Ashok Cards Subhamasthu

**Traditional South Indian Wedding Invitation Store**

> Traditional South Indian Wedding Invitations — Crafted with Elegance.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL via Prisma ORM
- **Payments**: Razorpay
- **State**: Zustand

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
# Fill in your DATABASE_URL, RAZORPAY keys, SMTP credentials
```

### 3. Database Setup
```bash
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:seed       # Seed with 20 sample products
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

## Deployment (Vercel)
```bash
vercel deploy
```
Set environment variables in Vercel dashboard.

## Features
- 🏛️ Temple-themed traditional South Indian design
- 🛒 Full e-commerce with cart & Razorpay checkout
- 📝 Customization form for wedding details
- 📧 Auto email confirmations
- 📦 Order tracking with status timeline
- 🔐 Admin dashboard (CRUD, order management)
- 📱 WhatsApp integration
- 🌐 SEO optimized

## Business Info
**Address**: #3-3-832, Bazar Road, near Dargah, General Bazaar, Secunderabad, Telangana 500003  
**Email**: info@ashokcards.com
