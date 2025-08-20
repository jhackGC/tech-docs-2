# Getting Started with React Design Systems Course

Welcome to your React Design Systems course repository! 🎉

## What You've Got

This repository is a fully configured monorepo for learning React design systems. Here's what's included:

### ✅ Repository Structure
```
react-design-systems-course/
├── packages/
│   └── ui/                 # Main design system package
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── tokens/     # Design tokens
│       │   └── styles/     # Global CSS
├── .storybook/            # Storybook configuration
├── e2e/                   # E2E tests
├── scripts/               # Utility scripts
└── docs/                  # Documentation
```

### ✅ Tools Configured
- **TypeScript** - Type safety and better DX
- **Storybook** - Component documentation and development
- **Jest + React Testing Library** - Unit testing
- **Playwright** - E2E testing
- **ESLint + Prettier** - Code quality and formatting
- **Loki** - Visual regression testing (to be configured)
- **Axe** - Accessibility testing

### ✅ Sample Components
- **Button** - Complete with TypeScript, tests, and stories
- **Design Tokens** - Colors, typography, spacing systems
- **Global Styles** - CSS reset and design system foundations

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
This will start Storybook at http://localhost:6006

### 3. Run Tests
```bash
# Unit tests
npm test

# E2E tests (requires Storybook to be running)
npm run test:e2e

# Accessibility tests (requires Storybook to be running)
npm run test:a11y
```

### 4. Check Code Quality
```bash
npm run check:all
```

## Course Progress

### Module 0: Environment & Scaffolding ✅
**Status: COMPLETE**
- [x] Monorepo structure created
- [x] TypeScript configured
- [x] Storybook set up
- [x] Testing tools configured
- [x] Linting and formatting configured

### Module 1: HTML/CSS → Tokens & Theming 🏗️
**Status: IN PROGRESS**
- [x] Design tokens created (colors, typography, spacing)
- [x] CSS custom properties implemented
- [x] Global styles with accessibility features
- [x] Button component started
- [ ] **Next:** Complete Button component lab
- [ ] **Next:** Document color contrast ratios
- [ ] **Next:** Create responsive typography scale

### Module 2-5: Coming Next 📋
See [CURRICULUM.md](./CURRICULUM.md) for complete course outline.

## Next Steps

### Immediate Tasks (Module 1 Lab)
1. **Complete the Button Component**
   - Review the existing Button component in `packages/ui/src/components/Button/`
   - Test all variants and states in Storybook
   - Run accessibility tests: `npm run test:a11y`

2. **Create ButtonLink Component**
   - Create a link component that looks like a button
   - Implement proper semantic HTML (`<a>` tags)
   - Add keyboard navigation support

3. **Document Design Tokens**
   - Create Storybook stories for design tokens
   - Document color contrast ratios
   - Show theming capabilities

### Development Workflow
1. **Make changes** to components in `packages/ui/src/components/`
2. **Write stories** in `ComponentName.stories.tsx`
3. **Write tests** in `ComponentName.test.tsx`
4. **View in Storybook** at http://localhost:6006
5. **Run quality checks** with `npm run check:all`

### Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Storybook development server |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:a11y` | Run accessibility tests |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Check TypeScript types |
| `npm run check:all` | Run all quality checks |

## Getting Help

- **Course Curriculum:** See [CURRICULUM.md](./CURRICULUM.md)
- **Component Guidelines:** Coming in Module 2
- **Testing Guidelines:** Coming in Module 4
- **TypeScript Patterns:** Already documented in your original README

## Tips for Success

1. **Start Small:** Focus on one component at a time
2. **Test Early:** Write tests as you build components
3. **Document Everything:** Use Storybook stories to document usage
4. **Check Accessibility:** Run `npm run test:a11y` frequently
5. **Follow the Quality Gates:** Each module has specific completion criteria

## Troubleshooting

### Storybook Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tests Failing
```bash
# Run tests in verbose mode
npm test -- --verbose

# Update snapshots if needed
npm test -- --updateSnapshot
```

### TypeScript Errors
```bash
# Check types explicitly
npm run type-check
```

## Ready to Begin?

1. Run `npm install`
2. Run `npm run dev`
3. Open http://localhost:6006
4. Start with Module 1 in [CURRICULUM.md](./CURRICULUM.md)

Happy coding! 🚀
