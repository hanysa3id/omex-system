# OMEX Express - UAE Delivery Management System (Bilingual Portal)

A high-performance, enterprise-grade **Delivery Management System** tailored specifically for the UAE logistics market. Features a modern dark green sidebar (`#169C47`), dynamic **Arabic (RTL) & English (LTR)** translation engine, interactive Leaflet heatmaps for UAE Emirates, Recharts analytics, 5% UAE VAT calculators, and batch invoice printing.

![OMEX System Preview](https://img.shields.io/badge/UAE-Logistics-169C47?style=for-the-badge)
![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)

---

## 🌟 Key Features & Modules

1. **Bilingual Support (Arabic & English)**
   - Seamless dynamic language toggle switching layout between **English (LTR)** and **Arabic (RTL)**.
2. **Interactive UAE Map & Analytics**
   - **Leaflet OpenStreetMap** heatmaps displaying active delivery pins across Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, and UAQ.
   - **Recharts** status breakdown gauges, top corporate clients horizontal bar charts, and revenue statistics.
3. **Core Orders Engine**
   - Auto-generated vouchers (`VCH-2026-XXXXXX`), pay types (`COD`, `CAD`, `CAO`, `TAO`, `FOC`, `APS`, `APR`), 5% UAE VAT calculations, fragile/exchange flags, hold/reverse-cancel, and multi-voucher **Batch Invoice & Delivery Note Printing**.
4. **Operations & Allocation Hub**
   - Visual drag/click driver allocation grid, pickup/delivery followups, and push/re-route order tools.
5. **Accounts & RBAC**
   - Drivers registry (license exp, assigned vehicle plate, courier rating), corporate client ledgers (UAE TRN tax numbers, credit limits, current balance), and end recipients.
6. **Fleet & Asset Management**
   - Track vehicle status, maintenance logs, fuel consumption, traffic fine records, and **Mulkiya & Insurance document expiration alerts**.
7. **Reports & Excel Export**
   - Global ability to export any data table or analytical report to **Excel (.xlsx / UTF-8 CSV)** with full Arabic text support.
8. **Command Palette & Quick Track**
   - Global `Cmd + K` search modal and top navbar quick voucher tracker.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ & npm

### Installation
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/omex-delivery-system.git

# Navigate into project directory
cd omex-delivery-system

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portal.

---

## 🗄️ Database Setup (Supabase PostgreSQL)

The complete SQL schema script with custom enum types, tables, triggers, indexes, RLS policies, and UAE sample seed data is located at:
`supabase/schema.sql`

To deploy:
1. Open your **Supabase Dashboard** -> **SQL Editor**.
2. Copy and paste the contents of `supabase/schema.sql`.
3. Click **Run**.

---

## 📤 Push to GitHub & Deploy to Vercel

```bash
git init
git add .
git commit -m "feat: Release OMEX UAE Delivery Management System Portal (Bilingual EN/AR)"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/omex-delivery-system.git
git push -u origin main
```

Deploy seamlessly on **Vercel** by linking your GitHub repository!
