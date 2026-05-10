
# AI Career Platform — Full Surface UI Build

A mobile-first, web-responsive UI for an AI career platform. Soft pastel + warm neutrals aesthetic. UI only (mock data) — no backend yet. Every listed page ships in this pass with polished surface and seeded data, ready to deepen later.

## Visual direction

- **Palette**: warm off-white background, soft cream cards, muted sage primary, peach accent, terracotta highlight, charcoal foreground. Dark mode swaps to warm dark espresso with same accents.
- **Type**: display = Fraunces (serif, character); body = Geist Sans (clean, neutral). Avoids generic Inter look.
- **Surface**: rounded-2xl cards, soft shadows, subtle pastel gradients on key CTAs and progress visuals.
- **Motion**: Framer Motion — fade/slide on route enter, spring on cards, no flashy parallax.

All tokens in `src/styles.css` as oklch + semantic Tailwind classes. Components consume tokens only — no hardcoded colors.

## Architecture (mobile-first → React Native friendly)

Two layout shells, chosen by route group:

1. **Marketing shell** — landing, pricing, auth (centered, full-bleed)
2. **App shell** — authenticated screens
   - **Mobile (<lg)**: bottom tab bar (Home, Resume, Tracker, Interview, Profile) + top app bar with title/back; secondary screens push as full-screen views; sheets/modals for actions
   - **Desktop (≥lg)**: same routes, side rail nav (icon + label) replaces bottom tabs; content area uses same vertical card stacks (no enterprise tables)

Every screen uses the **same component primitives** in both layouts so the React Native port maps 1:1: `Screen`, `AppBar`, `BottomTabBar`, `SideRail`, `Section`, `Card`, `ListRow`, `StatTile`, `Sheet`, `EmptyState`, `Field`, `SegmentedControl`, `Chip`, `ProgressRing`, `ScoreGauge`. No desktop-only patterns (no data tables, no drag-heavy interactions outside Resume Builder web view).

## Routes

```
src/routes/
  __root.tsx                     // providers, theme, framer-motion config
  index.tsx                      // Landing
  pricing.tsx                    // Pricing + PH/global payment methods preview
  login.tsx
  signup.tsx
  forgot-password.tsx
  reset-password.tsx
  onboarding.tsx                 // 4-step: goal, role, experience, target companies
  app.tsx                        // App shell layout (Outlet + bottom tabs/side rail)
  app.dashboard.tsx              // Home
  app.resume.tsx                 // Resume list
  app.resume.builder.tsx         // Editor (web: drag/drop sections + live preview; mobile: section list editor)
  app.ats.tsx                    // ATS Checker — paste JD, upload resume, score gauge + fixes
  app.review.tsx                 // AI Resume Review — issues, suggestions, rewrite chips
  app.interview.tsx              // Interview prep — generate questions, mock practice
  app.interview.session.tsx      // Practice session (timer, prompt, voice/text answer mock)
  app.tracker.tsx                // Application tracker — web: kanban; mobile: list+filters+timeline tabs
  app.linkedin.tsx               // LinkedIn optimizer — paste URL, headline/about/experience feedback
  app.portfolio.tsx              // Portfolio analyzer — URL input, performance/design/content scores
  app.github.tsx                 // GitHub analyzer — username input, contribution/repo/readme insights
  app.billing.tsx                // Plan, usage meter, payment methods (Stripe, GCash, Maya, PayMongo, PayPal) — UI only
  app.settings.tsx               // Profile, account, notifications, theme, danger zone
```

## Per-screen highlights

- **Landing**: hero with rotating value prop, 8 feature cards (one per tool), social proof strip, "How it works" 3-step, pricing teaser, FAQ, footer.
- **Auth**: single-column centered cards, email + Google/Apple buttons (visual only), password strength meter on signup.
- **Onboarding**: progress dots, one question per screen, large touch targets, swipeable on mobile.
- **Dashboard**: greeting, resume score ring, weekly goals, "Continue where you left off" carousel, quick actions grid (8 tool tiles), recent activity list.
- **Resume Builder**: left = section list (collapsible), center = live preview, right = template + style panel on desktop; mobile = section-by-section sheet editor with preview toggle.
- **ATS Checker**: two-input flow (resume + JD), big circular score, keyword match chips (matched/missing), suggestions list with copy buttons.
- **AI Review**: issue cards grouped by severity, inline suggested rewrites accept/dismiss.
- **Interview**: question generator form (role, level, type), generated question list with start practice CTA → session screen with timer + transcript area.
- **Tracker**:
  - Mobile: segmented filter (All/Applied/Interview/Offer/Rejected), list rows with company logo placeholder, swipe → status change sheet, separate Timeline tab.
  - Desktop: 5-column kanban with drag (using @dnd-kit, light usage), same row component reused inside columns.
- **LinkedIn / Portfolio / GitHub Analyzers**: same shape — URL input → analysis report screen with score + categorized feedback cards.
- **Billing**: current plan card, usage bars, plan comparison, payment methods list with add-method sheet showing Stripe + GCash + Maya + PayMongo + PayPal options, invoice list.
- **Settings**: avatar + profile form, notification toggles, theme switch, language, export data, delete account.

## Reusable components (`src/components/`)

`layout/` AppShell, AppBar, BottomTabBar, SideRail, Screen, Section
`ui-ext/` ScoreGauge, ProgressRing, StatTile, EmptyState, SegmentedControl, FilterChips, Sheet (wraps shadcn Drawer on mobile, Dialog on desktop), KanbanColumn, ListRow, FeatureCard, PricingCard, StepIndicator, FileDropzone, AnalyzerInput
`marketing/` Hero, FeatureGrid, HowItWorks, FAQ, Footer
`resume/` SectionEditor, TemplatePicker, ResumePreview, SectionList
`tracker/` ApplicationCard, KanbanBoard, ApplicationListMobile, TimelineView
Plus shadcn primitives already in project.

## Mock data

`src/lib/mock/` — resumes, applications, interview questions, analyzer reports, billing invoices. Typed with shared interfaces in `src/types/` so a future API swap is mechanical.

## Responsiveness rules

- Base styles target mobile (375px). `lg:` breakpoint switches nav shell only.
- All forms single-column with full-width inputs; multi-column only on `lg+`.
- No horizontal scroll tables — convert to stacked cards on mobile.
- Min tap target 44px; bottom safe-area padding reserved.

## Out of scope (this pass)

- Real auth, persistence, file processing, AI calls, payment processing.
- Real drag-and-drop in Resume Builder beyond simple reorder.
- React Native code itself — but every component is built with primitives that have clean RN equivalents (View/Text/Pressable analogs), no DOM-only APIs in shared logic.

## Technical notes

- Stack: TanStack Start + Tailwind v4 + shadcn + Framer Motion + @dnd-kit (light) + lucide-react. Add: `framer-motion`, `@dnd-kit/core`, `@dnd-kit/sortable`.
- Theme provider via `next-themes` already-compatible pattern (light/dark toggle in settings + system).
- File-based routing with flat dot-separated names. Each route sets its own `head()` meta.
- No backend tools enabled. Cloud can be added later without restructuring.
