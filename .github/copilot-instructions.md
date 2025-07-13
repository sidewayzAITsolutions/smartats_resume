# Copilot Instructions for SmartATS-Resume

## Project Overview
SmartATS-Resume is a Next.js 14 (App Router) application for AI-powered resume optimization. It integrates with Supabase (auth, database), OpenAI (AI features), and Stripe (payments). The codebase is TypeScript-first, uses Tailwind CSS for styling, and is structured for modularity and scalability.

## Architecture & Key Patterns
- **App Directory**: All routing and pages are under `src/app/` using Next.js App Router conventions. API routes are colocated in `src/app/api/`.
- **Component Structure**: UI components live in `src/components/`, with feature-specific subfolders (e.g., `ResumeBuilder/`). Shared UI elements are in `src/components/ui/`.
- **Lib & Utils**: Business logic, integrations, and helpers are in `src/lib/` and `src/utils/`. For example, `src/lib/ats-analyzer.ts` contains the ATS scoring logic.
- **Styling**: Tailwind CSS is used throughout. Custom color variables are defined in `src/app/global.css`.
- **State & Data Flow**: Most state is managed via React hooks. API calls use fetch or Supabase client. Premium status and authentication are checked via Supabase.

## Developer Workflows
- **Development**: Start with `npm run dev`. The app runs at `http://localhost:3000`.
- **Build**: Use `npm run build` for production builds. Clear cache with `rm -rf .next` if needed.
- **Testing**: Tests are in `test/`. Run with your preferred test runner (not enforced by scripts).
- **Environment**: Copy `.env.example` to `.env.local` and fill in Supabase, OpenAI, Stripe, and NextAuth keys.
- **Debugging**: Use VS Code launch configs for `ts-node` if running scripts, but run the app via Next.js for all UI/API work.

## Project-Specific Conventions
- **API Integration**: All AI and parsing endpoints are under `src/app/api/ai/` and `src/app/api/parse-resume/`. Use POST requests with JSON bodies.
- **Premium Features**: Premium status is checked via Supabase profile fields. UI components may show upgrade banners if `userData.isPremium` is false.
- **Error Handling**: API routes return JSON with error messages and status codes. UI uses `react-hot-toast` for notifications.
- **Component Patterns**: Use functional components and hooks. Prefer colocating feature logic (e.g., ATS analysis) with related UI.
- **Styling**: Use Tailwind utility classes. For custom animations or colors, extend in `global.css` or `tailwind.config.js`.
- **No Direct Node Execution**: Do not run `.tsx` files directly with Node.js. Always use Next.js commands for app code.

## Integration Points
- **Supabase**: Auth, user profiles, and premium status. See `src/lib/supabase/` and `src/lib/auth-utils.ts`.
- **OpenAI**: AI completions via `src/app/api/ai/complete/route.ts`.
- **Stripe**: Payment and subscription management in `src/lib/stripe.ts` and related API routes.

## Examples
- To add a new premium feature, check `userData.isPremium` in the UI and gate access accordingly.
- To add a new API route, create a file in `src/app/api/` and export a handler (e.g., `POST`).
- For custom ATS logic, update `src/lib/ats-analyzer.ts` and related builder components.

## References
- See `README.md` for setup, environment, and deployment details.
- See `CONTRIBUTING.md` for contribution guidelines.

---

If any conventions or workflows are unclear, please ask for clarification or suggest updates to this file.
