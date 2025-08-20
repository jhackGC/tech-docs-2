# React Design Systems Course Curriculum

This course builds a production-ready React design system from scratch, covering all aspects from design tokens to deployment.

## Course Overview

- **Duration:** 6 modules (6 weeks part-time or 2-3 weeks intensive)
- **Format:** Hands-on project-based learning
- **Deliverable:** A publishable design system with full documentation and tests

## Prerequisites

- Solid JavaScript/React fundamentals (hooks, JSX, components)
- Basic TypeScript knowledge (helpful but not required)
- Git and npm/yarn experience
- Basic understanding of CSS

## Module 0: Environment & Scaffolding (½ day)

### Goals
Set up the development environment and project structure.

### Tasks
- [x] Create monorepo structure with packages/ui and packages/docs
- [x] Set up TypeScript configuration
- [x] Configure Storybook for component documentation
- [x] Set up Jest + React Testing Library for unit tests
- [x] Configure Playwright for E2E tests
- [x] Set up Loki for visual regression tests
- [x] Configure ESLint with accessibility rules
- [x] Set up Prettier for code formatting
- [x] Configure Axe for accessibility testing

### Deliverable
✅ Working development environment with Storybook running locally

### Resources
- [Storybook Documentation](https://storybook.js.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Module 1: HTML/CSS → Tokens & Theming (3-4 days)

### Goals
Build the foundation with semantic HTML, CSS reset, and design tokens.

### Tasks
- [x] Create design tokens for colors, typography, spacing
- [x] Implement CSS custom properties (CSS variables)
- [x] Set up theming system (light/dark/high-contrast)
- [x] Create accessible focus styles
- [x] Implement prefers-reduced-motion support
- [ ] **Lab:** Build Button + ButtonLink with accessible focus & states
- [ ] Document color contrast ratios
- [ ] Create responsive typography scale

### Learning Outcomes
- Understand design token concepts and implementation
- Learn CSS custom properties for theming
- Implement accessible color schemes
- Master focus management and keyboard navigation

### Deliverable
Button component with full theming support documented in Storybook

### Resources
- [Design Tokens W3C Specification](https://design-tokens.github.io/community-group/format/)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## Module 2: React Component Architecture (1 week)

### Goals
Design reusable, composable, and stable component APIs.

### Tasks
- [ ] Learn props design best practices (sane defaults, minimal API surface)
- [ ] Implement controlled vs uncontrolled patterns
- [ ] Master `forwardRef` for ref forwarding
- [ ] Implement className merging strategies
- [ ] Create polymorphic components with `as` prop
- [ ] Use React Context where appropriate
- [ ] Choose and implement styling approach (CSS Modules vs CSS-in-JS)
- [ ] **Labs:** Input, Checkbox/Radio, Switch components
- [ ] **Advanced Lab:** Composable Tabs with roving tabindex

### Learning Outcomes
- Design intuitive component APIs
- Understand composition patterns
- Implement proper TypeScript interfaces
- Master ref forwarding and polymorphic components

### Deliverable
Form components (Input, Checkbox, Radio, Switch) with comprehensive prop tables and usage docs

### Resources
- [React Component Patterns](https://reactpatterns.com/)
- [Polymorphic React Components](https://www.benmvp.com/blog/polymorphic-react-components-typescript/)

---

## Module 3: Accessibility Deep Dive (1 week)

### Goals
Implement WCAG and ARIA APG patterns for real-world accessibility.

### Tasks
- [ ] Learn keyboard navigation patterns and focus management
- [ ] Implement accessible names and descriptions
- [ ] Master ARIA attributes and roles
- [ ] **Critical Patterns Implementation:**
  - [ ] Dialog (focus trap, aria-modal, return focus)
  - [ ] Combobox/Listbox with full keyboard support
  - [ ] Menu with arrow navigation
  - [ ] Tooltip with proper timing
  - [ ] Accordion with proper state management
- [ ] Integrate axe-core for automated testing
- [ ] Implement color contrast checking
- [ ] Add RTL (right-to-left) support
- [ ] **Labs:** Accessible Dialog & Combobox with full keyboard support

### Learning Outcomes
- Understand WCAG 2.1 AA requirements
- Implement complex ARIA patterns correctly
- Master focus management in dynamic UIs
- Create inclusive components for all users

### Deliverable
Complex accessible components with full keyboard support, axe tests passing, and comprehensive a11y documentation

### Resources
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/)

---

## Module 4: Testing Strategy (4-5 days)

### Goals
Build confidence through comprehensive testing strategy.

### Testing Layers
1. **Unit/Integration Tests:** Jest + React Testing Library
2. **Visual Regression Tests:** Loki with Storybook
3. **E2E Tests:** Playwright for keyboard flows
4. **Accessibility Tests:** axe-core integration

### Tasks
- [ ] Learn behavior-first testing with React Testing Library
- [ ] Master DOM queries and user event simulation
- [ ] Set up visual regression testing with Loki
- [ ] Configure Playwright for E2E keyboard testing
- [ ] Implement performance testing (avoid flaky timers)
- [ ] Set up CI parallelization
- [ ] Configure coverage thresholds
- [ ] **Labs:** 
  - [ ] Dialog tests (open/close/focus restoration)
  - [ ] Tabs tests (arrow navigation)
  - [ ] Combobox tests (typeahead functionality)

### Learning Outcomes
- Write maintainable, behavior-focused tests
- Implement visual regression testing
- Test complex keyboard interactions
- Set up effective CI/CD pipelines

### Deliverable
Comprehensive test suite with >90% coverage, passing E2E tests, and stable visual regression baseline

### Resources
- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [Playwright Testing Guide](https://playwright.dev/docs/test-assertions)

---

## Module 5: Distribution, Docs & Ops (3-4 days)

### Goals
Make the design system shippable and maintainable.

### Tasks
- [ ] Create comprehensive Storybook documentation with MDX
- [ ] Write usage guidelines and do's/don'ts
- [ ] Document accessibility guidance for each component
- [ ] Set up versioning with Changesets
- [ ] Configure semantic versioning and release automation
- [ ] Optimize package exports for tree-shaking
- [ ] Set up TypeScript declaration files
- [ ] Create migration documentation templates
- [ ] Set up issue templates and contribution guidelines
- [ ] **Lab:** Release @your-org/ui@1.0.0 and write migration docs

### Learning Outcomes
- Create maintainable documentation
- Understand semantic versioning
- Set up automated releases
- Plan for long-term maintenance

### Deliverable
Published npm package with complete documentation, automated releases, and contribution guidelines

### Resources
- [Changesets Documentation](https://github.com/changesets/changesets)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules)

---

## Quality Gates (Definition of Done)

Each module must meet these criteria:

### Functionality ✅
- All components meet API and UX specifications
- Components work across supported browsers
- All user interactions function correctly

### Accessibility ✅
- WCAG 2.1 AA compliance verified
- Keyboard navigation paths documented and tested
- axe-core tests pass
- Color contrast meets requirements
- Screen reader compatibility verified

### Testing ✅
- ≥90% test coverage on critical paths
- E2E tests for complex focus management
- Visual regression tests stable
- Performance benchmarks met

### Documentation ✅
- Storybook stories for all variants and states
- MDX usage guides with examples
- Accessibility notes and keyboard shortcuts documented
- API documentation auto-generated from TypeScript

### Performance ✅
- Bundle size within budget
- No unnecessary re-renders (React Profiler verified)
- Loading performance meets targets
- Tree-shaking working correctly

---

## Assessment Rubric

### Beginner (Getting Started)
- Basic component structure implemented
- TypeScript interfaces defined
- Basic Storybook stories created
- Some tests written

### Intermediate (Production Ready)
- Accessible keyboard navigation
- Comprehensive test coverage
- Design tokens properly implemented
- Documentation complete

### Advanced (Maintainable)
- Complex ARIA patterns implemented correctly
- Performance optimized
- Automated releases configured
- Comprehensive migration guides

### Expert (Industry Standard)
- All quality gates met
- Innovative accessibility solutions
- Comprehensive testing strategy
- Excellent developer experience

---

## Final Project: Component Showcase

Create a comprehensive showcase that demonstrates:

1. **Component Library:** All core components with variants
2. **Design Token System:** Complete theming capabilities
3. **Documentation Site:** Professional docs with examples
4. **Testing Suite:** All testing layers implemented
5. **Release Process:** Automated versioning and publishing

### Evaluation Criteria
- **Technical Excellence:** Code quality, architecture, performance
- **Accessibility:** WCAG compliance, inclusive design
- **Developer Experience:** API design, documentation, tooling
- **Maintainability:** Testing, versioning, contribution guidelines

---

## Bonus Challenges (Stretch Goals)

- [ ] Implement theme switching with system preference detection
- [ ] Add internationalization (i18n) support
- [ ] Create RTL language support
- [ ] Build a DataTable with virtual scrolling
- [ ] Implement advanced animation system
- [ ] Create design token synchronization with Figma
- [ ] Build a CLI for component generation
- [ ] Add Chromatic for visual testing in CI
