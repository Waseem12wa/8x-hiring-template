# 8x Hiring Template - babiceva.ai Recreation

**Assignment:** FullStack Internship (Plays)  
**Candidate:** Waseem Zahid  
**Submission Date:** January 22, 2026

---

## 📹 Loom Walkthrough

**Video Demo (5 min):** https://www.loom.com/share/4f8c72ac4c9f430996c126a4b4016086

---

## 🎯 What I Built

A fully functional recreation of [babiceva.ai](https://babiceva.ai/) - an AI-powered SaaS application for video and image generation. Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Supabase.

### ✅ Completed Features

#### Authentication & User Management
- ✅ Complete auth flow using Supabase Auth (email/password)
- ✅ Sign up, sign in, sign out functionality
- ✅ Protected routes with middleware-based redirection
- ✅ User profile page with account management
- ✅ Account deletion with confirmation dialog
- ✅ Session persistence and auto-refresh

#### Subscription System
- ✅ Free and Pro tier system
- ✅ Pricing page with feature comparison
- ✅ Fake checkout flow (writes to Supabase on "purchase")
- ✅ Feature gating based on subscription tier
- ✅ Upgrade prompts for free users
- ✅ Subscription status display in navigation

#### AI Tool Pages (All 5 Implemented)
1. **Video Generation** (`/tools/video-generation`)
   - Text-to-video and image-to-video modes
   - Model selector (Veo 3.1 / Sora 2)
   - Aspect ratio toggle (16:9 / 9:16)
   - Remove watermark option (Pro only)
   - File upload with drag & drop
   - Real AI generation using Pollinations.ai FLUX model

2. **Image Generator** (`/tools/image-generator`)
   - Text-to-image generation
   - Model version selector
   - Aspect ratio options (1:1, 16:9, 4:3)
   - High resolution toggle (Pro only)
   - Real AI generation using Pollinations.ai FLUX model

3. **AI Dress Changer** (`/tools/dress-changer`)
   - Image upload with drag & drop
   - Before/after preview
   - Real AI processing with instruction-based generation
   - Quality warnings for free tier

4. **AI Car Changer** (`/tools/car-changer`)
   - Image upload with drag & drop
   - Car model selector (Tesla, Porsche, Lamborghini, Mercedes, BMW)
   - Real AI processing
   - Pro-only features highlighted

5. **AI Person Replacer** (`/tools/person-replacer`)
   - Image upload with drag & drop
   - Before/after preview
   - Real AI processing
   - Quality warnings for free tier

#### UI/UX Features
- ✅ Responsive navigation with mobile menu
- ✅ Dark/Light theme toggle (fully functional)
- ✅ Toast notifications for user feedback
- ✅ Loading states for all async operations
- ✅ Error handling with user-friendly messages
- ✅ Empty states and placeholder content
- ✅ Premium design with gradients and animations
- ✅ File upload validation (size, type)

#### Real AI Integration
- ✅ **Groq API** - Llama 3 8B for prompt enhancement
- ✅ **Pollinations.ai** - FLUX.2 Klein model for image generation
- ✅ All 5 tools use real, working AI models
- ✅ Automatic prompt optimization
- ✅ Proper error handling and fallbacks

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v20+)
- npm or pnpm
- Supabase account (Cloud or Local with Docker)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd 8x-hiring-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up Supabase**
   
   **Option A: Cloud Supabase (Recommended)**
   - Create a project at [supabase.com](https://supabase.com)
   - Go to Settings → API and copy your keys
   - Run the SQL migration from `supabase/migrations/20251223234735_create_subscriptions_table.sql` in Supabase Studio

   **Option B: Local Supabase**
   ```bash
   supabase start
   supabase db reset
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
   GROQ_API_KEY="your-groq-api-key"  # For AI features
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

---

## 🐛 Issues I Faced & How I Solved Them

### Issue 1: Local Supabase Setup on Windows
**Problem:** `supabase start` failed with Docker connection issues, container name conflicts, and network initialization delays on Windows.

**Solution:** Switched to **Cloud Supabase** (free tier). This approach was:
- Faster to set up (no Docker debugging)
- More reliable for development iteration
- Identical API surface to local Supabase

**Trade-off:** Cloud vs Local is purely a development choice - both use the same Supabase APIs. For production, either works equally well.

---

### Issue 2: Theme Toggle Not Working
**Problem:** Dark/Light mode toggle was not switching themes. The CSS variables were only defined for dark mode in `:root`, causing both modes to look identical.

**Solution:** 
- Split CSS variables into `:root` (light mode) and `.dark` class (dark mode)
- Defined proper light mode colors (white backgrounds, dark text)
- Kept dark mode colors in `.dark` selector
- Theme toggle now works perfectly

---

### Issue 3: AI Model Integration
**Problem:** Initially used mock/dummy responses for all AI tools. Needed to integrate real, working AI models without requiring paid API keys.

**Solution:**
- **Groq API** (free tier) - Used Llama 3 8B for intelligent prompt enhancement
- **Pollinations.ai** - Free, no-auth-required FLUX.2 Klein model for image generation
- Created server actions (`app/actions/ai.ts`) to handle API calls securely
- Implemented proper error handling and user feedback
- All 5 tools now generate real AI content

**Documentation:** Created `AI_MODELS.md` with complete model details and usage instructions.

---

### Issue 4: Auth Context Timeout Safety
**Problem:** Auth context loading state could hang indefinitely if session fetch fails, leaving users stuck on a loading screen.

**Solution:** 
- Added a 10-second timeout as a safety guard
- Forces `isLoading` to `false` after timeout
- Ensures UI always becomes interactive
- Added error handling for failed session fetches

---

### Issue 5: File Upload Validation
**Problem:** File uploads needed size and type validation without external libraries.

**Solution:**
- Implemented client-side validation in upload handlers
- Check MIME type (`file.type.startsWith('image/')`)
- Validate file size (5MB limit: `file.size > 5 * 1024 * 1024`)
- Display user-friendly error messages via toast notifications
- Clear invalid files immediately

---

### Issue 6: Subscription Auto-creation
**Problem:** First-time users had no subscription record in the database, causing tier checks to fail and breaking the UI.

**Solution:**
- Implemented auto-creation in `subscription-context.tsx`
- When a new user logs in, automatically create a Free tier subscription
- Added proper error handling for subscription creation failures
- Ensured all users have a valid subscription tier

---

### Issue 7: Next.js 16 Middleware Deprecation Warning
**Problem:** Next.js 16 shows deprecation warning for the `middleware.ts` file convention.

**Solution:** 
- Kept existing middleware structure (it works fine in Next.js 16)
- Noted in code comments that this could be refactored to the new "proxy" convention
- Prioritized functionality over eliminating warnings
- Can be updated in a future iteration without breaking changes

---

## 🎨 What I'd Improve With More Time

### 1. Real Payment Processing
**Current:** Fake checkout that writes directly to Supabase  
**Improvement:** Integrate Stripe for actual payment processing
- Stripe Checkout for subscription purchases
- Webhook handling for subscription events
- Proper invoice generation
- Payment method management

---

### 2. True Image-to-Image Editing
**Current:** Generates new images based on text instructions  
**Improvement:** Implement real image-to-image editing
- Integrate ControlNet or InstructPix2Pix via Replicate
- Preserve original image structure while making edits
- Support for masks and selective editing
- Better results for dress/car/person replacement

---

### 3. Real Video Generation
**Current:** Generates high-quality cinematic storyboard frames  
**Improvement:** Generate actual video files
- Integrate Runway ML or similar video generation API
- Support for text-to-video and image-to-video
- Video length controls (5s, 10s, 15s)
- Export in multiple formats (MP4, GIF)

---

### 4. Persistent File Storage
**Current:** Files are converted to base64 and processed in-memory  
**Improvement:** Upload to Supabase Storage or AWS S3
- Persistent storage for user uploads
- CDN delivery for faster loading
- Image optimization and resizing
- Gallery of user's previous generations

---

### 5. Advanced Analytics & Monitoring
- Usage tracking for API calls per user
- Error monitoring with Sentry
- Performance metrics (generation time, success rate)
- User behavior analytics
- Admin dashboard for monitoring

---

### 6. Performance Optimizations
- **Image lazy loading** with Next.js Image component
- **Code splitting** for tool pages (reduce initial bundle)
- **Database query caching** with Redis
- **API response caching** for repeated prompts
- **Optimistic UI updates** for better perceived performance

---

### 7. Accessibility Improvements
- Full WCAG 2.1 AA compliance
- Keyboard navigation for all interactive elements
- Screen reader support with proper ARIA labels
- Focus management in modals and dialogs
- High contrast mode support

---

### 8. Test Coverage
- **Unit tests** for utility functions and contexts
- **Integration tests** for API routes
- **E2E tests** for critical user flows (signup, upgrade, generation)
- **Visual regression tests** for UI components
- CI/CD pipeline with automated testing

---

### 9. Email Verification & Security
- Enable Supabase email verification in production
- Password strength requirements
- Rate limiting for API endpoints
- CAPTCHA for signup to prevent bots
- Two-factor authentication option

---

### 10. Enhanced User Experience
- **Generation history** - Save and view past generations
- **Favorites** - Bookmark favorite outputs
- **Sharing** - Share generations with unique URLs
- **Batch processing** - Generate multiple variations at once
- **Custom models** - Allow users to fine-tune on their own images

---

## 📁 Project Structure

```
├── app/
│   ├── actions/              # Server actions (AI integration)
│   ├── api/                  # API routes
│   ├── auth/                 # Auth pages (login, signup)
│   ├── pricing/              # Pricing page
│   ├── profile/              # User profile
│   ├── tools/                # AI tool pages (5 tools)
│   │   ├── video-generation/
│   │   ├── image-generator/
│   │   ├── dress-changer/
│   │   ├── car-changer/
│   │   └── person-replacer/
│   └── upgrade/              # Subscription upgrade flow
├── components/
│   ├── navigation.tsx        # Main navigation with auth state
│   ├── footer.tsx            # Footer component
│   ├── theme-provider.tsx    # Dark/light theme provider
│   └── ui/                   # Shadcn/ui components
├── contexts/
│   ├── auth-context.tsx      # Authentication context
│   └── subscription-context.tsx  # Subscription tier context
├── lib/
│   └── supabase/             # Supabase client utilities
├── supabase/
│   └── migrations/           # Database migrations
└── middleware.ts             # Route protection
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19 + Tailwind CSS v4 + Shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (email/password)
- **AI Models:**
  - Groq API (Llama 3 8B) - Prompt enhancement
  - Pollinations.ai (FLUX.2 Klein) - Image generation
- **Styling:** Tailwind CSS with custom design tokens
- **State Management:** React Context API
- **Notifications:** Sonner (toast notifications)

---

## 📊 Database Schema

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tier TEXT CHECK (tier IN ('free', 'pro')) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎯 Assignment Completion Checklist

### Part 1: Setup & Orientation ✅
- [x] Forked starter repo
- [x] Got it running locally
- [x] Documented setup issues in README
- [x] Initial observations documented

### Part 2: Core Build ✅

**Must Have:**
- [x] Homepage with hero, navigation, and example gallery
- [x] Auth flows (signup, signin, signout)
- [x] Protected routes with redirect
- [x] At least one functional AI tool page (built all 5!)
- [x] Form inputs with proper state management
- [x] Loading/submitting states
- [x] Routing between pages
- [x] Different UI states (logged out → free → pro)

**Nice to Have:**
- [x] Fake subscription flow
- [x] Pricing page with tiers
- [x] Subscribe button → fake checkout UI
- [x] Write tier to Supabase on success
- [x] Feature gating based on tier
- [x] All 5 AI tool pages implemented
- [x] File upload handling (drag & drop)
- [x] Real AI API integration (not just mocks!)
- [x] Dark theme styling

### Part 3: Production Readiness ✅
- [x] Error handling for auth and API failures
- [x] Loading states for all async operations
- [x] Edge cases handled (empty states, invalid inputs, session expiry)
- [x] Code hygiene (no console.logs, dead code, or leftover comments)
- [x] "What I'd improve" section in README

### Part 4: Walkthrough ✅
- [x] Recorded Loom video (5 min max)
- [x] Demo of what was built
- [x] Code walkthrough with decision explanations
- [x] What I'd do differently

---

## 🚀 Deployment

The application is production-ready and can be deployed to Vercel:

```bash
# Build for production
npm run build

# Start production server
npm start
```

**Environment variables needed for production:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `GROQ_API_KEY`

---

## 📝 Notes

- **No real payments:** The upgrade flow is simulated (writes directly to database)
- **Email verification:** Disabled in development for convenience
- **Test accounts:** Use any email/password to sign up locally
- **AI Generation:** Uses real AI models (Groq + Pollinations.ai)
- **Free to run:** No API costs - all models are free tier

---

## 📚 Additional Documentation

- **[AI_MODELS.md](./AI_MODELS.md)** - Complete documentation of all AI models used
- **[CANDIDATE_ASSIGNMENT.md](./CANDIDATE_ASSIGNMENT.md)** - Original assignment instructions

---

**Questions?** Contact: zwaseem298@gmail.com

**Repository:** (https://github.com/Waseem12wa/8x-hiring-template.git)
