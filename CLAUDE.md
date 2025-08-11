# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Colmena Experience," a Next.js 15 website for a Spanish business that creates gamified experiences for teams, companies, and celebrations. The site is a marketing landing page showcasing their services for team-building and group dynamics.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack)
- **Build**: `npm run build`
- **Production server**: `npm start`
- **Linting**: `npm run lint`

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Components**: Custom component library with shadcn/ui patterns

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata and fonts
│   ├── page.tsx           # Homepage with section imports
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # Reusable components
│   ├── ui/               # Base UI components (Button, Card, Input, etc.)
│   └── [section-components] # Page sections (hero, about, services, etc.)
└── lib/
    └── utils.ts          # Utility functions (cn helper for className merging)
```

### Component Architecture
The homepage (`src/app/page.tsx`) is composed of modular sections:
- Header (navigation)
- Hero (animated landing section)
- About, Services, WhyUs, MissionVision, Testimonials
- Contact (form section)
- Footer

### Design System
- Uses a custom color palette with `primary`, `accent`, and orange gradients
- Typography uses Geist fonts (sans and mono)
- Components follow shadcn/ui patterns with `class-variance-authority` for variants
- Animation-heavy design with Framer Motion for engaging user experience
- Responsive design with mobile-first approach

### Key Patterns
- All components use TypeScript with proper typing
- Animations implemented with Framer Motion (client-side components)
- CSS classes managed with `cn()` utility from `lib/utils.ts`
- Components follow React functional component patterns with hooks
- Smooth scrolling navigation between sections

### Styling Notes
- Uses Tailwind CSS v4 (postcss-based config)
- Custom design tokens for brand colors
- Heavy use of gradients and backdrop blur effects
- Responsive breakpoints: sm, lg standard Tailwind breakpoints
- Dark/light theme not implemented (brand uses specific color scheme)