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

**Issue 1: Local Supabase Setup**
- Problem: `supabase start` failed on Windows with Docker container conflicts and network issues
- Solution: Switched to cloud Supabase (free tier). Created a project on supabase.co, ran SQL migrations manually, updated `.env.local` with cloud credentials. This was actually faster and more reliable than fighting Docker.

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

