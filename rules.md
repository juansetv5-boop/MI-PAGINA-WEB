# System Rules & Development Instructions for Antigravity

This document outlines the strict guidelines, constraints, and execution workflow for building the high-end web development agency landing page. Antigravity must strictly adhere to these rules throughout the entire implementation process.

---

## 1. Core Visual Elements & Design System Specification

* **Design System Reference:** All visual decisions must align strictly with `DESIGN.md`. Do NOT introduce external design trends, unapproved color palettes, or generic UI components.
* **Color Palette Rules:**
  * Canvas: Void Black (`#000000`).
  * Cards & Surfaces: Ground Iron (`#181818`) & Carbon Veil (`#212525`).
  * Hairline Borders: Circuit Border (`#485346`) — 1px solid, no heavy drop shadows.
  * Primary Accent: Lime Pulse (`#7fee64`) — **Strictly rationed**. Use maximum 1–2 instances per viewport (e.g., hero CTA pill, status LED dot).
  * Headlines: Phosphor White (`#ddffdc`).
  * Body Copy: Muted Sages (`#8cab87` / `#677d64`).
* **Typography:**
  * Headlines: Display geometric sans (Space Grotesk / Inter Tight) with tight negative tracking (`-0.012em` to `-0.017em`).
  * Body/UI: Inter Variable with tight tracking (`-0.022em`).
  * Technical/Code: Monospaced (Fira Code / JetBrains Mono).
* **Geometry:** Radios: `8px` on cards/panels, `12px` on standard buttons, `9999px` (pill) ONLY on primary CTAs and status tags.

---

## 2. Responsiveness & Mobile-First Strategy

* **Mobile-First Paradigm:** Write styles starting from small screens up to large displays (`base` -> `sm` -> `md` -> `lg` -> `xl`).
* **Touch & Performance:** Ensure touch-friendly tap targets on mobile (minimum 44x44px).
* **Responsive Animation Adaptation:** The 3D/Apple-style Scrollytelling feature must adjust gracefully on smaller viewports (e.g., vertical stacking or scaled 3D canvas) to preserve smooth 60fps performance without horizontal overflow or layout breakage.

---

## 3. Strict Design Authority & Approval Protocol

* **No Unapproved Variations:** Do NOT invent, substitute, or introduce new design patterns, color tokens, font sizes, or UI layouts that diverge from `DESIGN.md` without explicit permission.
* **Proactive Inquiry:** If a design requirement, asset, or edge-case specification is missing, ask for approval or document it in `context.md` before making assumptions.

---

## 4. State Tracking & Token Budget Management (`context.md`)

* **Mandatory Context File:** Antigravity must maintain and continuously update a root file named `context.md`.
* **Automatic Updates:**
  * Every time a major subtask or component is completed.
  * Whenever token capacity/context window is nearing its limit.
* **Contents of `context.md`:**
  1. **Current Status:** What has been completed so far.
  2. **Pending Tasks:** Next steps in immediate queue.
  3. **Missing Information / Blockers:** Any missing assets, specs, or decisions required from the user.
  4. **Architecture Notes:** Key component structures or state decisions made.

---

## 5. Engineering & Code Quality Guidelines

* **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS.
* **Animations:** Anime.js for scroll synchronization, micro-interactions, and terminal typing effects.
* **Code Structure:** Modular, clean, reusable TypeScript components (`/components`) with well-defined interfaces.
