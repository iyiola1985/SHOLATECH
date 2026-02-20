# SholaTech — Agency Website

A modern, responsive website for a digital agency offering website development, UI/UX design, e-commerce, event/DJ booking sites, and graphic design.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- Responsive, mobile-first layout

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app/` — Pages (Home, Services, Portfolio, Booking, Contact)
- `src/components/` — Navbar, Footer, Button
- `src/data/config.ts` — **Single place to update**: site info, services, portfolio items, testimonials, form options

## Updating Content

Edit **`src/data/config.ts`** to change:

- **Site name, tagline, email, phone, WhatsApp number, social links**
- **Services** — title, description, benefits, starting price, icon
- **Portfolio** — project title, category, description, image path, demo URL, tags
- **Testimonials** — name, role, quote, avatar initial
- **Booking form options** — business types, budget ranges, timeline options

Add real portfolio images by placing files in `public/portfolio/` and setting `image` in each portfolio item (e.g. `"/portfolio/your-image.jpg"`).

## Forms (Nodemailer + Gmail)

Booking and Contact form submissions are sent to your email via Gmail and Nodemailer.

1. Copy `.env.example` to `.env.local`.
2. Set **GMAIL_USER** to your Gmail address.
3. Create a [Gmail App Password](https://myaccount.google.com/apppasswords) (requires 2-Step Verification) and set **GMAIL_APP_PASSWORD** in `.env.local`.
4. Optional: set **NOTIFY_EMAIL** to receive submissions at a different address (e.g. `hello@yourdomain.com`). If unset, emails go to **GMAIL_USER**.

Restart the dev server after changing `.env.local`. Submissions will appear in your inbox with **Reply-To** set to the sender so you can reply directly.

## Build

```bash
npm run build
npm start
```

## Features

- Sticky navigation with mobile menu
- SEO-friendly metadata per page
- Smooth scroll and focus styles
- Clean typography (DM Sans, Outfit)
- Amber accent and soft shadows
