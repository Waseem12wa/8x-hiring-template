# AI Copilot Instructions for 8x Hiring Template

## Project Overview
This is a SaaS frontend starter template for an AI tool platform (like babiceva.ai). Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Supabase** (local Postgres + Auth).

**Core Purpose:** Multi-tenant AI generation tool with authentication, subscription tiers (Free/Pro), and multiple tool pages (Video Generation, Image Generator, Dress Changer, Car Changer, Person Replacer).

---

## Critical Architecture Patterns

### Authentication & Session Management
- **Supabase SSR with middleware** ([../middleware.ts](../middleware.ts)): Uses server-side cookies for session persistence
- **Auth Context** ([../contexts/auth-context.tsx](../contexts/auth-context.tsx)): 
  - Client-side user state + 10s timeout safety guard
  - Listens to `onAuthStateChange` for real-time sync
  - Auto-redirects logged-in users away from `/auth/*` pages via middleware
- **Protected Routes:** Middleware redirects unauthenticated users to `/auth/login?returnUrl=` before accessing `/tools/*` and `/upgrade/*`
- **Key pattern:** Auth state flows through context → components check `user` + `isLoading` before rendering

### Subscription Tier System
- **Auto-creates Free tier** on first login if no subscription exists ([../contexts/subscription-context.tsx](../contexts/subscription-context.tsx#L65))
- **Subscription table schema:** `id`, `user_id` (FK), `tier` (enum: 'free'|'pro'), `created_at`, `updated_at`
- **Never use real payments** — fake checkout just writes `tier: 'pro'` to DB
- **Gate features by checking** `useSubscription()` hook: `isPro` boolean or `tier` string

### Supabase Client Setup
- **Browser client** ([../lib/supabase/client.ts](../lib/supabase/client.ts)): Uses `NEXT_PUBLIC_` keys (safe for frontend)
- **Server client** ([../lib/supabase/server.ts](../lib/supabase/server.ts)): Uses secret `SUPABASE_SERVICE_ROLE_KEY` for admin operations
- **Middleware client** ([../lib/supabase/middleware.ts](../lib/supabase/middleware.ts)): Special SSR server client for session refresh

---

## Key File Locations & Responsibilities

### Layout & Providers
- **[../app/layout.tsx](../app/layout.tsx):** Root layout with `AuthProvider` → `SubscriptionProvider` nesting (order matters!)
- **Theme + Sonner toasts** configured here

### Authentication Routes
- **[../app/auth/login/page.tsx](../app/auth/login/page.tsx):** Email/password login + `returnUrl` redirect
- **[../app/auth/signup/page.tsx](../app/auth/signup/page.tsx):** Email/password signup (no verification in dev)
- **[../app/api/auth/signout/route.ts](../app/api/auth/signout/route.ts):** Server action for logout

### Tool Pages
- **[../app/tools/video-generation/page.tsx](../app/tools/video-generation/page.tsx):** Main example tool page
- **Pattern:** Form state via `useState` → Submit button triggers fake API call → Loading state → Toast notification
- **All tools require login** (enforced by middleware)

### Components
- **[../components/navigation.tsx](../components/navigation.tsx):** Navbar with theme toggle, auth links, tools dropdown
- **[../components/footer.tsx](../components/footer.tsx):** Global footer
- **UI components in [../components/ui/](../components/ui/):** Shadcn/ui + Radix UI (button, input, label, select, etc.)

---

## Development Patterns to Follow

### Form Handling
- Use `react-hook-form` + `zod` for validation (setup in UI components)
- Example: See AI tool pages for pattern (text inputs, selectors, toggles)
- Always show `isLoading` state on submit button

### Loading & Error States
- **Auth flows:** Show error message in red, preserve form input on failure
- **AI tool submissions:** Disable form + show spinner during fake API call (typically 2-3s delay)
- **Use `sonner` toasts** for success feedback: `toast.success("Generation complete!")`

### Data Flow
1. User fills form → `useState` captures values
2. Click submit → Validation + `setIsLoading(true)` 
3. Fake API call (e.g., `setTimeout` for 2-3s)
4. Update UI with results → `setIsLoading(false)` + toast

### Checking Subscription Tier
```typescript
const { isPro, tier } = useSubscription()
if (!isPro && featureRequiresProTier) {
  return <UpgradePrompt />  // Or disable feature
}
```

---

## Local Development Setup

### Prerequisites
- Node.js v20+, pnpm, Docker

### Boot Sequence
```bash
supabase start              # Starts local Postgres + Auth (~2 min)
# Copy keys from output to .env.local
supabase db reset           # Applies migrations
pnpm install
pnpm dev                    # http://localhost:3000
```

### Key Commands
- `pnpm lint`: ESLint check
- `pnpm build`: Production build
- `supabase studio`: Admin UI (localhost:54323)

---

## Common Gotchas

1. **Middleware matches EVERYTHING except** `_next/*`, `public/*`, `api/auth/*` — be careful redirecting broad paths
2. **Auth context initializes async** — always check `isLoading` before rendering login/signup buttons
3. **Subscription auto-creates on first fetch** — don't manually insert if already exists
4. **`.env.local` must have `NEXT_PUBLIC_` prefix** for browser-accessible keys
5. **Sonner toast requires Toaster in layout** — already configured in [../app/layout.tsx](../app/layout.tsx)

---

## When Adding Features

### New Tool Page
1. Create `app/tools/[tool-name]/page.tsx`
2. Middleware protects it automatically
3. Add form + loading state + mock API
4. Check `isPro` if feature requires Pro tier

### New Auth Flow
1. Update middleware [../middleware.ts](../middleware.ts) protected routes if needed
2. Use Supabase `auth` method (e.g., `signUpWithPassword`)
3. Ensure error states shown to user

### Subscription Gate
1. Import `useSubscription()` hook
2. Check `isPro` boolean or `tier` string
3. Show upgrade CTA or disable feature

---

## Code Quality Standards
- **No `console.log` in production** — use error logging for debugging
- **Clean component structure** — split large components into smaller UI pieces
- **Proper error handling** — catch API errors, show user-friendly messages
- **Loading states** — never leave user unsure if action is pending
