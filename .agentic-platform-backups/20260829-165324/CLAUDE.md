# CLAUDE.md - Electroria Agent Guide

## Project Context
Electroria is a monorepo containing an Angular SSR web application, an editorial/contact API, and shared types.

## Behavioral Rules
- **Concise Execution**: Be direct; avoid unnecessary words.
- **Monorepo Awareness**: Always consider the impact on shared packages when modifying an app.
- **Strict Typing**: Use the shared types in `packages/shared-types` whenever possible.

## Build & Test Commands
- Full Build: `npm run build`
- Build Types: `npm run build:types`
- Web Build (SSR): `npm run build:ssr:web`
- API Build: `npm run build:api`
- Dev Mode: `npm run dev`

## Role-Specific Missions

### [ARCHITECT]
Guard the monorepo structure. Ensure Clean Architecture in `apps/api` and modular design in `apps/web`.

### [DEVELOPER]
Implement features across the stack. Ensure the Angular frontend and Node.js backend are perfectly synced via shared types.

### [TESTER]
Ensure robust testing of the API boundaries and critical user flows in the web app.

### [UX/UI]
Owner of the `apps/web` visual identity. Deliver high-end, premium user experiences.

<!-- BEGIN AGENTIC-ENGINEERING-PLATFORM -->
# Managed engineering policy

Use repository evidence before assumptions. For codebase, architecture, dependency, or data-flow questions, query Graphify first when `graphify-out/graph.json` exists; use its scoped query/path/explain output to identify the smallest relevant file set. Do not bulk-read generated graph artifacts.

For non-trivial changes: understand → graph discovery → plan → implement narrowly → test → independent review when practical → verify. Preserve repository architecture and unrelated working-tree changes. Select skills and a focused specialist only when they materially help; do not create persistent swarms.

Never hardcode secrets, providers, credentials, or machine-local assumptions. Never claim a check passed unless it was executed. Keep context lean without skipping security, migrations, dependency inspection, or validation. Refresh Graphify after material structural changes.

For UI work, use the existing design system and assess responsive layouts, keyboard/focus behavior, accessibility, loading/empty/error/success states, and light/dark themes where supported. Do not present placeholders or fake metrics as working product behavior.
<!-- END AGENTIC-ENGINEERING-PLATFORM -->
