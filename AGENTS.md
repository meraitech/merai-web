# Merai Web — Architecture Rules

## Folder Tree

```
src/
├── app/          # Next.js App Router pages (route segments only)
├── features/     # Feature-specific modules (grouped by feature name)
└── shared/       # Shared source of truth — reusable across the entire project
```

### `app/`
Only Next.js route segments (`page.tsx`, `layout.tsx`, `loading.tsx`, etc.).
No reusable components or business logic lives here.
Each route segment is independent — **do not import from other route segments.**
Co-located `_components/` within the same route segment is allowed.

### `shared/`
The single source of truth. Contains reusable components, utilities, types, constants, styles, and hooks.
Can only import from other `shared/` files.
**Must not import from `app/` or `features/`.**

### `features/`
Feature-specific code grouped by feature folder (e.g. `features/contact/`, `features/works/`).
Patterns are copied/adapted from `shared/` for feature-specific needs.
Each feature folder is self-contained — **do not import from other feature folders.**
If code is needed across features, promote it to `shared/`.

---

## Dependency Rules

```
app ────────► features ────────► shared
 │                                   ▲
 └───────────────────────────────────┘
```

| Layer | Can import from | Cannot import from |
|---|---|---|
| `app/` | `features/`, `shared/`, same route `_components/` | other route segments |
| `features/{name}/` | `shared/`, same feature folder | `app/`, other feature folders |
| `shared/` | other `shared/` files | `app/`, `features/` |

### Escalation Rule

> If **feature A** needs to import from **feature B**, that shared code must be **promoted to `shared/`.**

---

## ESLint Enforcement

These rules are enforced via ESLint. Violations will fail CI.

| Rule | Enforcement |
|---|---|
| `features/` → `app/` | `import/no-restricted-paths` (error) |
| `shared/` → `app/` or `features/` | `import/no-restricted-paths` (error) |
| `app/` cross-route via `@/app/` | `no-restricted-imports` (error) |
| `features/` → other `features/` | Team convention — see escalation rule |

To manually check: `pnpm lint`

---

## Examples

### Allowed

```ts
// ✅ app/(marketing)/page.tsx imports from same route _components/
import { Hero } from "./_components/hero-7";

// ✅ app/page.tsx imports from features
import { ContactForm } from "@/features/contact/components/ContactForm";

// ✅ app/layout.tsx imports from shared
import "@/shared/styles/globals.css";

// ✅ features/contact/components/Form.tsx imports from its own feature
import { validate } from "@/features/contact/utils/validate";

// ✅ features/contact/components/Form.tsx imports from shared
import { Button } from "@/shared/components/Button";

// ✅ shared/components/Button.tsx imports from shared
import { cn } from "@/shared/utils/cn";
```

### Not Allowed

```ts
// ❌ app/(marketing)/page.tsx imports from another route segment
import { Header } from "@/app/(blog)/_components/header";

// ❌ features/contact imports from features/works
import { Gallery } from "@/features/works/components/Gallery";

// ❌ features/contact imports from app
import { metadata } from "@/app/layout";

// ❌ shared imports from features
import { ContactForm } from "@/features/contact/components/ContactForm";

// ❌ shared imports from app
import { metadata } from "@/app/layout";
```
