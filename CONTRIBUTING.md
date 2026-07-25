# Contributing Guide

## Code of Conduct

Be respectful, professional, and constructive in all discussions, reviews, and issue threads. Keep feedback focused on the work, avoid personal attacks, and help create a welcoming environment for contributors of all backgrounds.

## How to Report a Bug

When reporting a bug, include a short description of the issue, the steps to reproduce it, the expected result, and the actual result. If possible, add screenshots, console errors, browser details, and any relevant files or code snippets that help explain the problem.

## Local Development Setup

1. Install Node.js and npm.
2. From the `study-web-fe` folder, install dependencies with `npm install`.
3. Start the development server with `npm run dev`.
4. Run `npm run build` before submitting changes to confirm the project compiles.
5. Run `npm run lint` to check code quality before opening a pull request.

## Git Workflow and Commit Format

Work on a feature branch instead of committing directly to `main`.

Use this commit format for task-based work:

`<type>(TASK-ID): <short summary>`

Examples:

`feat(TASK-102): add login form layout`

`fix(TASK-118): resolve header spacing issue`

Keep commits small, focused, and tied to a single task whenever possible.

## Code Style and Testing Requirements

Follow the existing TypeScript and React patterns in the project.

Use clear, descriptive names, keep components small, and prefer reusable code in the appropriate folder.

Format code consistently before committing, and make sure linting passes with `npm run lint`.

For any UI or behavior change, verify the app with `npm run build` and test the affected flow manually in the browser.

If you add automated tests in the future, include them with the change and keep them passing before merging.
