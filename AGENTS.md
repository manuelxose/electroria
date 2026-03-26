# AGENTS.md - Electroria AI Agents

Standardized role-based agents for the Electroria monorepo.

## Available Agent Roles

| Role | Mission | Primary Tools |
|------|---------|---------------|
| **Architect** | Monorepo structure & API design | Analysis, planning |
| **Developer** | Full-stack implementation | write_to_file, etc. |
| **Tester** | QA, API/E2E testing | npm run ..., grep_search |
| **UX/UI** | Angular visual excellence | generate_image, CSS |

## Optimization Policy
- **Hierarchical Context**: Start by reading `package.json` and `CLAUDE.md`.
- **Targeted Edits**: Use `multi_replace_file_content` for non-contiguous changes.
- **Context Loading**: Only read the files relevant to the current role mission.
