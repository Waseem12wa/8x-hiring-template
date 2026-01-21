# 8x Hiring Template

A modern SaaS starter template for frontend engineering assessments. Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Supabase.

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [Docker](https://www.docker.com/) (for local Supabase)
   Migrations are applied automatically during startup.

4. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with the keys from step 3:
   ```
   NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54521"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="Here was key"
   SUPABASE_SERVICE_ROLE_KEY="<your-secret-key>"
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19 + Tailwind CSS + Shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (email/password)

## Features

- User authentication (sign up, sign in, sign out)
- Protected routes
- Subscription tiers (Free / Pro)
- Profile management
- Account deletion
- Responsive design
- Dark mode support

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Auth pages (login, signup)
│   ├── profile/           # User profile
│   └── upgrade/           # Subscription upgrade flow
├── components/            # Reusable UI components
├── contexts/              # React Context providers
├── lib/                   # Utilities and Supabase clients
└── supabase/              # Database migrations
```

## Useful Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run ESLint
supabase start    # Start local Supabase (applies migrations)
supabase stop     # Stop local Supabase
supabase studio   # Open Supabase Studio (local admin UI)
```

## Database Schema

The template uses a simple `subscriptions` table:

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  tier TEXT CHECK (tier IN ('free', 'pro')),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Notes

- **No real payments**: The upgrade flow is simulated (writes directly to database)
- **Local auth**: Email verification is disabled in development mode
- **Test accounts**: Use any email/password to sign up locally

---

See [CANDIDATE_ASSIGNMENT.md](./CANDIDATE_ASSIGNMENT.md) for assessment instructions.

---

## Setup Notes & Observations

### What I did to get it running
I ran into some trouble getting the local Supabase setup to work on my Windows machine—specifically, `supabase start` kept failing with Docker container name conflicts. Instead of fighting with Docker, I decided to be practical and switch to a **Cloud Supabase** project. 

I created a free project on Supabase, updated my `.env.local` with the cloud credentials, and manually ran the SQL scripts to create the necessary tables. Now everything connects perfectly!

### First impressions
The codebase seems really solid. I like that the auth logic is already handled in the context, and using Shadcn for UI components is going to make building the frontend way faster. The structure is clean and standard for a Next.js app, so I feel comfortable diving in.

I'm ready to start building the core features now!


