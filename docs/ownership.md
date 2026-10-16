# LankaDirect Feature Ownership Contract

As defined in Section 8 of the Shared AI Development Standard (v1.0):
Both developers may implement frontend, backend, and database code, but each feature has **ONE accountable owner** at a time.

---

## Assigned Owners Table

| Feature Domain | Proposed Owner | Current Status | Notes / Branch |
| :--- | :--- | :--- | :--- |
| **Storefront Catalog, Product Detail, Categories, Search** | Developer A | Planned | `feat/catalog` |
| **Admin Products/Categories and Product Media** | Developer A | Planned | `feat/admin-products` |
| **Inventory UI and Inventory Movement Flows** | Developer A | Planned | `feat/inventory` |
| **Shared Design System Stewardship** | Developer A | Active | Baseline Tokens & Primitives |
| **Authentication, Customer Account, Guest Checkout** | Developer B | Planned | `feat/auth` |
| **Cart, Order Placement and Order History** | Developer B | Planned | `feat/checkout` |
| **Admin Order Processing and Payment/COD Records** | Developer B | Planned | `feat/admin-orders` |
| **Reporting, Coupons and Store Settings** | Developer B | Planned | `feat/reports` |

---

## Cross-Cutting Files Policy

The following files require mutual agreement and a single designated editor before changes:
1. `apps/api/prisma/schema.prisma` & migrations
2. `packages/contracts/`
3. Root configuration (`package.json`, `pnpm-workspace.yaml`, `.env.example`)
4. Core Auth helpers and session tokens
5. Shared UI theme tokens in Tailwind config
