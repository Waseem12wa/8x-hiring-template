# 8x Hiring Template

A modern SaaS starter template for frontend engineering assessments. Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Supabase.

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [Supabase Account](https://supabase.com/) (Cloud or Local with Docker)

### Setup Options

#### Option A: Cloud Supabase (Recommended for Development)
1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com) and sign up
   - Create a new project (free tier available)
   - Wait for project to be provisioned

2. **Get Your Keys**
   - Navigate to Settings → API
   - Copy `Project URL` and `Anon Key` (public key)
   - Copy `Service Role Key` if you need admin operations

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```

4. **Run Database Migrations**
   ```bash
   # Copy the SQL from supabase/migrations/20251223234735_create_subscriptions_table.sql
   # Paste it into Supabase Studio → SQL Editor and execute
   ```

5. **Install Dependencies & Start**
   ```bash
   pnpm install
   pnpm dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

#### Option B: Local Supabase (Docker Required)
1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Start Local Supabase**
   ```bash
   supabase start
   ```
   This will output your local credentials. Copy them.

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with credentials from step 2:
   ```env
   NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="eyJh...your-anon-key..."
   SUPABASE_SERVICE_ROLE_KEY="eyJh...your-service-role-key..."
   ```

4. **Apply Migrations**
   ```bash
   supabase db reset
   ```

5. **Install Dependencies & Start**
   ```bash
   pnpm install
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
- **Email verification**: Disabled in development mode for convenience
- **Test accounts**: Use any email/password to sign up locally
- **Supabase Setup**: This project supports both cloud and local Supabase. See Quick Start for setup instructions.

---

See [CANDIDATE_ASSIGNMENT.md](./CANDIDATE_ASSIGNMENT.md) for assessment instructions.

---

## Setup Notes & Observations

### What I built
A fully functional SaaS frontend application matching the babiceva.ai reference design with:
- Complete authentication system (signup, login, logout, password validation)
- Protected routes with middleware-based redirection
- Subscription tier system (Free/Pro) with fake checkout flow
- 5 AI tool pages with form handling, file uploads, and mock API responses
- Responsive design with dark/light theme support
- Complete user profile management with account deletion
- Pricing page with feature comparison
- Proper error handling and user feedback via toast notifications

### Issues I faced & how I solved them

**Issue 1: Local Supabase Setup on Windows**
- Problem: `supabase start` failed with Docker connection issues, container name conflicts, and network initialization delays
- Solution: Switched to **Cloud Supabase** (free tier). Created a project on supabase.co, ran SQL migrations through Supabase Studio, updated `.env.local` with cloud credentials. This approach was faster and more reliable for development iteration.
- Trade-off: Cloud vs Local is a development choice - both use identical Supabase APIs. For production, either works equally well.

**Issue 2: Auth Context Timeout Safety**
- Problem: Auth context loading state could hang indefinitely if session fetch fails
- Solution: Added a 10-second timeout as a safety guard that forces `isLoading` to false, ensuring UI always becomes interactive

**Issue 3: File Upload Validation**
- Problem: File uploads needed size/type validation without external libraries
- Solution: Implemented client-side validation in upload handlers - checking MIME type and file size before processing

**Issue 4: Subscription Auto-creation**
- Problem: First-time users had no subscription record, breaking tier checks
- Solution: Implemented auto-creation in subscription context - when a new user logs in, a Free tier subscription is automatically created

**Issue 5: Middleware Deprecation Warning**
- Problem: Next.js 16 shows deprecation warning for "middleware" file convention
- Solution: Kept existing middleware structure (it works fine), but this could be refactored to use the new "proxy" convention in a future update

### What I would improve with more time

1. **Real file upload handling**: Currently file uploads are mocked. In production, would integrate with AWS S3 or similar for persistent storage.

2. **Actual AI API integration**: Replace mock 3-second delays with real calls to Replicate API, OpenAI, or similar services.

3. **Real payment processing**: Integrate with Stripe for actual payments instead of simulating checkout.

4. **Better error recovery**: Add retry logic for failed API calls and more granular error messages.

5. **Performance optimizations**:
   - Image lazy loading and optimization
   - Code splitting for tool pages
   - Database query caching with Redis

6. **Analytics and monitoring**: Add error tracking (Sentry), usage analytics, and performance monitoring.

7. **Accessibility improvements**: Full WCAG 2.1 compliance, keyboard navigation for all interactive elements, ARIA labels.

8. **Tests**: Add unit tests for contexts, integration tests for API routes, E2E tests for critical user flows.

9. **Email verification**: Enable Supabase email verification in production (currently disabled for dev convenience).

10. **Admin dashboard**: Add admin panel for viewing user statistics, managing tiers, handling support issues.

---

### Development notes
- All components follow React 19 best practices with proper state management
- UI components from shadcn/ui ensure consistency and accessibility
- Error boundaries could be added for better error recovery
- Subscription context could be optimized to reduce re-renders using useReducer

