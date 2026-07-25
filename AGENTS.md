# AGENTS.md

## WHY

This project is the frontend for an educational institution’s e-learning platform. It should support courses, documents, and question sets for learners, while also presenting the organization as a professional and credible provider of education.

## Tech Stack

- Vite for fast development and production builds.
- React for the UI layer.
- TypeScript for safer implementation and clearer contracts.
- Tailwind CSS for utility-based styling.
- The current source layout is defined in [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) and should be treated as the working structure for the app.

## WHAT

Build a frontend that helps learners discover and use course content, access documents, and work through question sets.

The UI should also help the organization promote itself through a clear, trustworthy, and easy-to-navigate experience.

Keep the product focused on learning workflows first, then presentation and promotion.

## HOW

Follow the existing folder structure and place code in the most specific folder available.

- `src/pages/` for page-level screens.
- `src/components/` for reusable UI pieces.
- `src/routes/` for navigation and route definitions.
- `src/services/` for data access and API calls.
- `src/contexts/` for shared state.
- `src/hooks/` for custom hooks.
- `src/utils/` for helpers and pure functions.
- `src/styles/` for shared styling.

Keep components small and composable.

Prefer readable TypeScript over clever shortcuts.

Use Tailwind for layout and styling where it helps speed and consistency, but avoid piling classes into components when a reusable component or shared style is clearer.

Before editing, identify the smallest file or folder that actually owns the behavior.

Before finishing, verify the change with the relevant project command, usually `npm run build` and, when relevant, `npm run lint`.

## Progressive Disclosure

Read only the `agent-docs` file that is relevant to the work you are doing.

- `agent-docs/code_conventions.md` - Coding rules, naming preferences, component patterns, and implementation constraints. Read this before making shared code changes, refactors, or new patterns.

If more files are added under `agent-docs`, add one short line for each file here so the next agent can quickly decide what to open and what to skip.
