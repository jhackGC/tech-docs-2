# Front-End Systems with React: Design Systems, Testing & Accessibility

_A hands-on, project-based course to build a mini React design system end-to-end (components, tokens, docs, tests, a11y) using Jest, React Testing Library, Playwright, Loki, and WCAG throughout._

## Quick Start

```bash
# Install dependencies
npm install

# Start Storybook
npm run dev

# Run tests
npm test

# Run all quality checks
npm run check:all
```

## Course Structure

This repository follows the 6-module course structure:

- **Module 0:** Environment & Scaffolding
- **Module 1:** HTML/CSS → Tokens & Theming
- **Module 2:** React Component Architecture
- **Module 3:** Accessibility Deep Dive
- **Module 4:** Testing Strategy
- **Module 5:** Distribution, Docs & Ops

## Repository Structure

```
react-design-systems-course/
├── packages/
│   ├── ui/                 # Main design system package
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── tokens/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── docs/               # Storybook documentation
├── apps/
│   └── playground/         # Test playground app
├── tools/
│   ├── eslint-config/
│   └── prettier-config/
├── scripts/
├── .github/
│   └── workflows/
└── package.json
```

## Development Workflow

1. **Start development:** `npm run dev`
2. **Make changes** to components in `packages/ui/src/components/`
3. **Write stories** in `packages/ui/src/components/ComponentName/ComponentName.stories.tsx`
4. **Write tests** in `packages/ui/src/components/ComponentName/ComponentName.test.tsx`
5. **Run checks:** `npm run check:all`

## Quality Gates

- ✅ TypeScript compilation
- ✅ ESLint rules pass
- ✅ Prettier formatting
- ✅ Jest unit tests
- ✅ React Testing Library integration tests
- ✅ Playwright E2E tests
- ✅ Loki visual regression tests
- ✅ Axe accessibility checks
- ✅ Bundle size limits

## Getting Help

- Check the [Course Curriculum](./CURRICULUM.md) for detailed module breakdown
- Review [TypeScript Guidelines](./docs/TYPESCRIPT.md) for patterns
- See [Component Guidelines](./docs/COMPONENTS.md) for API design
- Check [Testing Guidelines](./docs/TESTING.md) for test strategies

## License

MIT
