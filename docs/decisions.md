# LankaDirect Architectural & Technical Decisions

## ADR-001: Baseline Tech Stack & Monorepo Selection
- **Status**: Approved
- **Context**: LankaDirect is built by two developers and two AI assistants working together in a unified monorepo.
- **Decision**:
  - Package manager: `pnpm workspaces`
  - Frontend: `Next.js` (App Router) + `React` + `TypeScript (strict)` + `Tailwind CSS` in `apps/web`
  - Backend: `NestJS` + `PostgreSQL` + `Prisma ORM` in `apps/api`
  - Shared contracts: `packages/contracts` for API interfaces, DTOs, and domain enums
- **Consequences**: No second backend, no GraphQL, no MongoDB, no arbitrary hex codes in UI components.

## ADR-002: Design Tokens & Visual Standard
- **Status**: Approved
- **Tokens**:
  - Primary: `#F97316` (Orange-500)
  - Primary Hover: `#EA580C` (Orange-600)
  - Surface Background: `#F8FAFC` (Slate-50)
  - Card/Container Surface: `#FFFFFF`
  - Primary Text: `#111827` (Gray-900)
  - Muted Text: `#64748B` (Slate-500)
  - Headings Font: `Plus Jakarta Sans`
  - Body Font: `Inter`
  - Responsive Viewport Reference: Desktop `1440px`, Mobile `390px` (Mobile-First implementation)
- **Currency**: `LKR` (Sri Lankan Rupee). Money stored and sent across API in integer minor units (cents).

## ADR-003: Phased Frontend Development Plan
- **Phase 1 (Current)**: Monorepo skeleton, design tokens, shared layout shell, shared UI primitive components, and navigation structure for Storefront & Admin.
- **Phase 2**: Step-by-step page implementation following the 15 Storefront and 12 Admin Google Stitch artboards.
