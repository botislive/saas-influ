# INFLU Architecture Documentation

## Product Context
**INFLU** is a high-performance influencer and content creator dashboard designed to provide real-time insights into social media performance, audience demographics, and financial metrics. The platform aggregates data from multiple social channels (Facebook, Twitter, Instagram, LinkedIn) into a unified, premium interface.

### Key Features
- **Real-time Dashboard**: Live tracking of Followers, Impressions, Partnerships, and Earnings.
- **Performance Analytics**: Detailed breakdown of post-level metrics including Quality scores and Reach.
- **Audience Insights**: Geographic and Gender distribution visualizations.
- **Profile Management**: Specialized views for individual creator profiles.
- **Semantic Routing (Intelligence Layer)**: An underlying layer designed to route prompts/queries to the most efficient LLM models based on intent (via embeddings).

---

## Tech Stack

### Frontend
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router architecture)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State & Data**: [React Hooks](https://react.dev/) + [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Vector Intelligence**: [Supabase Vector](https://supabase.com/docs/guides/ai) (used for semantic intent routing)

---

## Project Structure

```bash
src/
├── app/               # Next.js App Router (Pages, Layouts, API)
│   ├── all-posts/     # Post management view
│   ├── connect-accounts/ # Social integration page
│   ├── posts/         # Dynamic post detail routes ([id])
│   ├── globals.css    # Global styles and Tailwind directives
│   ├── layout.tsx     # Root layout with Sidebar and Navbar
│   └── page.tsx       # Main Dashboard entry point
├── components/        # Reusable UI components
│   ├── dashboard/     # Feature-specific dashboard cards and charts
│   ├── ui/            # Base atomic components (Button, Badge)
│   ├── Navbar.tsx     # Global top navigation
│   └── Sidebar.tsx    # Persistent side navigation
└── lib/               # Shared logic and configurations
    ├── supabase.ts    # Supabase client initialization
    └── utils.ts       # Tailwind merging and common helpers
```

---

## Data Architecture

The application relies on a shared PostgreSQL schema with real-time replication enabled.

### Core Entities
- **Profiles**: Stores creator information (Full name, bio, avatar, social handles).
- **Stats**: Aggregated metrics for various types (Followers, Earnings, Impressions) linked to profiles.
- **Posts**: Individual content entries with performance data (Reach, Quality, Status).
- **Routing Intents**: (AI Layer) Stores embeddings and metadata for semantic model selection.

---

## Implementation Details

### UI/UX Philosophy
The project adheres to a "Linear-like" aesthetic:
- **Monochromatic & Minimalist**: Strict 8px grid system.
- **Glassmorphism**: Subtle blurs and semi-transparent surfaces (`bg-surface-elevated/50`).
- **Motion-First**: Every page transition and state change is wrapped in `MotionWrapper` or enhanced with GSAP for a premium feel.

### Real-time Sync
The dashboard uses Supabase PostgreSQL Channels to listen for `UPDATE` and `INSERT` events on the `stats` and `posts` tables, ensuring the UI reflects data changes without manual refreshes.
