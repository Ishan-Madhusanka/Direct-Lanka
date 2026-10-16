# LankaDirect - E-Commerce Monorepo

Shared repository and development baseline for **LankaDirect**, a direct-to-customer Sri Lankan online store with island-wide courier fulfillment and Cash on Delivery (COD).

This codebase is governed by the rules and technical contracts in `docs/` and the LankaDirect Shared AI Development Standard (v1.0).

---

## 🏗 Monorepo Architecture

```text
lankadirect/
  apps/
    web/                  # Next.js App Router (Storefront & /admin)
      src/app/            # App routes with isolated Storefront & Admin layouts
      src/components/     # Shared UI tokens (Button, Card, Badge, Input, Layouts)
      src/features/       # Modular features (catalog, cart, checkout, auth, admin)
      src/lib/            # Utilities (LKR currency formatter, date in Colombo timezone)
    api/                  # NestJS REST API backend (/api/v1)
      prisma/             # Prisma schema and PostgreSQL migrations
  packages/
    contracts/            # Shared TypeScript contracts, DTOs, and domain enums
    docs/                 # Team decision records and feature ownership contracts
  pnpm-workspace.yaml     # Workspace declaration
  package.json            # Monorepo root scripts
```

---

## 🎨 Locked Design System Tokens

| Token | Value | Description |
| :--- | :--- | :--- |
| **Primary** | `#F97316` | Main brand orange accent |
| **Hover** | `#EA580C` | Button and link hover states |
| **Background**| `#F8FAFC` | Page background surface |
| **Surface** | `#FFFFFF` | Card and modal container backgrounds |
| **Text** | `#111827` | High-contrast body and title text |
| **Muted** | `#64748B` | Subtext, labels, and metadata |
| **Headings** | `Plus Jakarta Sans` | Typography for all headers |
| **Body** | `Inter` | Clean readable body typeface |
| **Currency** | `LKR` | Stored as integer minor units (cents) |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npx pnpm install
# or if pnpm is installed globally:
pnpm install
```

### 2. Run Next.js Development Server
```bash
npx pnpm dev
```
- **Storefront**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Catalog**: [http://localhost:3000/catalog](http://localhost:3000/catalog)

### 3. Run Checks
```bash
npx pnpm typecheck
npx pnpm lint
```

---

## 👥 Two-Developer Workflow Contract

1. **Check Ownership**: Always inspect `docs/ownership.md` before claiming a task or creating branches (`feat/catalog`, `feat/checkout`, etc.).
2. **Design Matching**: When implementing pages, match the 54 Google Stitch artboards (15 storefront + 12 admin page types) in mobile-first (`390px`) and desktop (`1440px`).
3. **Shared Files**: Never edit `packages/contracts/` or `apps/api/prisma/schema.prisma` without explicit human coordination.
