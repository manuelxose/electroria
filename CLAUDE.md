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
