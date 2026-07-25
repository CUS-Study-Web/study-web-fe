# Testing Guide

This project uses Vitest for unit testing. Tests should be co-located with their source files using the `.test.ts` or `.test.tsx` extension.

## Key Principles

**Place tests next to the code they test.** Keep test files in the same folder as the component or utility being tested, using consistent naming: `MyComponent.tsx` and `MyComponent.test.tsx`.

**Test behavior, not implementation.** Write tests that verify what the code does from the user or caller's perspective, not how it achieves that result. This makes tests more resilient to refactoring.

**Keep each test focused on one behavior.** Use clear, descriptive test names that explain what is being tested. A good rule: if your test name has "and" in it, split it into two tests.

**Write tests as you develop.** Test-driven development helps catch bugs early and makes your code more testable by design.

**Mock external dependencies.** Mock APIs, timers, and other external services so tests are fast and deterministic. Tests should not depend on real network calls or external state.

## Running Tests

Use `pnpm test` to run all tests. Use `pnpm test -- --watch` for watch mode during development. Check coverage with `pnpm test -- --coverage` and aim for 80%+ coverage on statements, functions, and lines.

## Best Practices to Remember

- Test edge cases and error scenarios, not just the happy path
- Keep tests independent; one test failing should not affect others
- Use meaningful variable names in tests so the test intent is clear
- Test user interactions and component behavior, not just utility functions
- Test custom hooks thoroughly since they encapsulate reusable logic
- Run the full pipeline before opening a PR: `pnpm run build && pnpm run lint && pnpm test`
- Always test API integration, not just individual functions
- Avoid testing implementation details like internal state or private methods

## CI/CD Integration

All tests must pass before code can be merged to `main` or `develop` branches. The CI pipeline automatically runs tests on every push and pull request. Make sure tests pass locally before pushing.
