# Lesson 4: Accessibility in React Design Systems

## Overview

Accessibility (a11y) is not an afterthought in design systems—it's a fundamental requirement. This lesson explores how to build accessible React components from the ground up, using patterns from our codebase and industry best practices.

## Why Accessibility Matters in Design Systems

1. **Legal Compliance**: WCAG guidelines are legally required in many jurisdictions
2. **User Inclusion**: 15% of the global population has some form of disability
3. **Better UX for Everyone**: Accessible features benefit all users
4. **SEO Benefits**: Screen readers and search engines use similar technologies
5. **Design System Leverage**: Fix accessibility once, benefit everywhere

## Accessibility Tools in Our Codebase

### 1. Automated Testing with Axe

**File**: `scripts/axe-scan.js`

```javascript
// Our codebase includes automated accessibility scanning
const { execSync } = require('child_process');
const { chromium } = require('playwright');

async function runAxeScan() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Inject axe-core for accessibility testing
  await page.addScriptTag({ path: require.resolve('axe-core') });
  
  // Navigate to Storybook stories
  await page.goto('http://localhost:6006');
  
  // Run accessibility audit
  const results = await page.evaluate(async () => {
    return await axe.run();
  });
  
  // Report violations
  if (results.violations.length > 0) {
    console.error('Accessibility violations found:', results.violations);
    process.exit(1);
  }
  
  await browser.close();
}

runAxeScan();
```

This script runs accessibility audits on our Storybook components automatically.

### 2. Package Configuration for Testing

**File**: `package.json`

```json
{
  "scripts": {
    "test:a11y": "node scripts/axe-scan.js",
    "test": "jest && npm run test:a11y"
  },
  "dependencies": {
    "axe-core": "^4.8.0",
    "@axe-core/playwright": "^4.8.0"
  }
}
```

## Core Accessibility Principles (WCAG)

### 1. Perceivable
Information must be presentable in ways users can perceive.

### 2. Operable  
Interface components must be operable by all users.

### 3. Understandable
Information and UI operation must be understandable.

### 4. Robust
Content must be robust enough for various assistive technologies.

## Accessible Button Implementation

### Current Button Component Analysis

**File**: `packages/ui/src/components/Button/Button.tsx`

```typescript
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, children, className = '', disabled, ...rest }, ref) => {
    const classNames = [
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      loading && 'btn--loading',
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        {...rest}
      >
        {loading && <span className="btn__spinner" />}
        <span className="btn__content">{children}</span>
      </button>
    );
  }
);
```

### Accessibility Features Already Present

✅ **Semantic HTML**: Uses native `<button>` element
✅ **Keyboard Navigation**: Native button handles Enter/Space
✅ **Focus Management**: Native focus behavior
✅ **Disabled State**: Properly disabled when loading
✅ **Screen Reader**: Native button announces correctly

### Accessibility Improvements to Consider

```typescript
// Enhanced accessible button
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    children, 
    className = '', 
    disabled,
    ariaLabel,
    ariaDescribedBy,
    ...rest 
  }, ref) => {
    const classNames = [
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      loading && 'btn--loading',
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-busy={loading}
        {...rest}
      >
        {loading && (
          <span 
            className="btn__spinner" 
            aria-hidden="true"
          />
        )}
        <span className="btn__content">
          {children}
        </span>
        {loading && (
          <span className="sr-only">Loading...</span>
        )}
      </button>
    );
  }
);
```

### Accessibility Props Interface

```typescript
interface AccessibilityProps {
  /** Accessible label for the button */
  ariaLabel?: string;
  
  /** ID of element that describes the button */
  ariaDescribedBy?: string;
  
  /** Indicates if button controls expandable content */
  ariaExpanded?: boolean;
  
  /** Indicates if button opens a popup */
  ariaHasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
}

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'>, AccessibilityProps {
  // ... existing props
}
```

## CSS for Accessibility

### 1. Focus Indicators

**File**: `packages/ui/src/components/Button/Button.css`

```css
.btn {
  /* Existing styles */
}

/* High-contrast focus indicator */
.btn:focus-visible {
  outline: 2px solid var(--color-focus, #005fcc);
  outline-offset: 2px;
  /* Remove default browser outline */
  box-shadow: 0 0 0 2px var(--color-focus-ring, rgba(0, 95, 204, 0.25));
}

/* Ensure focus is visible in high contrast mode */
@media (prefers-contrast: high) {
  .btn:focus-visible {
    outline: 3px solid currentColor;
    outline-offset: 2px;
  }
}

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .btn,
  .btn__spinner {
    animation: none !important;
    transition: none !important;
  }
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 2. High Contrast Mode Support

```css
/* Windows High Contrast Mode */
@media (prefers-contrast: high) {
  .btn {
    border: 2px solid ButtonText;
    background: ButtonFace;
    color: ButtonText;
  }
  
  .btn:hover {
    background: Highlight;
    color: HighlightText;
  }
  
  .btn:disabled {
    border-color: GrayText;
    color: GrayText;
  }
}
```

### 3. Dark Mode and Theme Support

**File**: `packages/ui/src/styles/global.css`

```css
/* Light theme (default) */
:root {
  --color-focus: #005fcc;
  --color-focus-ring: rgba(0, 95, 204, 0.25);
}

/* Dark theme */
[data-theme="dark"] {
  --color-focus: #66b3ff;
  --color-focus-ring: rgba(102, 179, 255, 0.25);
}

/* Respect system preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --color-focus: #66b3ff;
    --color-focus-ring: rgba(102, 179, 255, 0.25);
  }
}
```

## Accessibility Testing Patterns

### 1. Jest + Testing Library Tests

**File**: `packages/ui/src/components/Button/Button.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Test Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be focusable with keyboard', async () => {
    const user = userEvent.setup();
    render(<Button>Test Button</Button>);
    
    const button = screen.getByRole('button');
    await user.tab();
    
    expect(button).toHaveFocus();
  });

  it('should be clickable with Enter key', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be clickable with Space key', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard(' ');
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should announce loading state to screen readers', () => {
    render(<Button loading>Test Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should be properly labeled', () => {
    render(<Button ariaLabel="Submit form">Submit</Button>);
    
    const button = screen.getByRole('button', { name: 'Submit form' });
    expect(button).toBeInTheDocument();
  });

  it('should not be clickable when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Test Button</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });
});
```

### 2. Playwright E2E Accessibility Tests

**File**: `e2e/accessibility.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('Button component should be accessible', async ({ page }) => {
    await page.goto('/storybook/path-to-button-story');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Button should be keyboard navigable', async ({ page }) => {
    await page.goto('/storybook/path-to-button-story');
    
    // Tab to button
    await page.keyboard.press('Tab');
    
    // Verify button is focused
    const button = page.getByRole('button');
    await expect(button).toBeFocused();
    
    // Test activation with Enter
    await page.keyboard.press('Enter');
    // Assert expected behavior
    
    // Test activation with Space
    await page.keyboard.press(' ');
    // Assert expected behavior
  });

  test('Button should work with screen reader', async ({ page }) => {
    await page.goto('/storybook/path-to-button-story');
    
    const button = page.getByRole('button');
    
    // Check accessible name
    await expect(button).toHaveAccessibleName();
    
    // Check ARIA attributes
    await expect(button).toHaveAttribute('type', 'button');
  });
});
```

## Common Accessibility Patterns

### 1. Form Controls

```typescript
// Accessible Input component (future implementation)
interface InputProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

const Input = ({ label, required, error, hint, ...props }: InputProps) => {
  const id = React.useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  
  return (
    <div className="input-group">
      <label htmlFor={id} className="input__label">
        {label}
        {required && <span aria-hidden="true">*</span>}
        {required && <span className="sr-only">(required)</span>}
      </label>
      
      {hint && (
        <div id={hintId} className="input__hint">
          {hint}
        </div>
      )}
      
      <input
        id={id}
        className={`input ${error ? 'input--error' : ''}`}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...props}
      />
      
      {error && (
        <div id={errorId} className="input__error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
```

### 2. Modal/Dialog Pattern

```typescript
// Accessible Modal component (future implementation)
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const titleId = React.useId();
  const previouslyFocusedElement = React.useRef<HTMLElement | null>(null);
  
  React.useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal
      const modal = document.querySelector('[role="dialog"]') as HTMLElement;
      modal?.focus();
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus
      previouslyFocusedElement.current?.focus();
      
      // Restore body scrolling
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Escape key handler
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id={titleId} className="modal__title">
            {title}
          </h2>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>
        
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
};
```

### 3. Skip Links Pattern

```typescript
// Skip navigation component
const SkipLink = ({ href, children }: { href: string; children: string }) => (
  <a 
    href={href} 
    className="skip-link"
    onFocus={(e) => e.currentTarget.scrollIntoView()}
  >
    {children}
  </a>
);

// CSS for skip links
/*
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
*/
```

## Color and Contrast

### 1. Design Token Compliance

**File**: `packages/ui/src/tokens/colors.ts`

```typescript
// Ensure all color combinations meet WCAG AA standards (4.5:1 contrast ratio)
export const colors = {
  primary: {
    50: '#eff6ff',   // Background only
    100: '#dbeafe',  // Background only
    500: '#3b82f6',  // Primary text on white (7.04:1 ratio)
    600: '#2563eb',  // Primary text on light backgrounds
    900: '#1e3a8a',  // High contrast text (11.4:1 ratio)
  },
  text: {
    primary: '#111827',   // 15.3:1 contrast ratio on white
    secondary: '#6b7280', // 5.2:1 contrast ratio on white
    inverse: '#ffffff',   // For dark backgrounds
  }
} as const;

// Color validation helper
export const validateContrast = (foreground: string, background: string): boolean => {
  // Implementation would check WCAG contrast ratios
  // Use a library like 'contrast' or build custom logic
  return true; // Placeholder
};
```

### 2. Theme-Aware Color Usage

```css
/* Ensure colors work in all themes */
.btn--primary {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
}

/* Dark theme adjustments */
[data-theme="dark"] .btn--primary {
  background-color: var(--color-primary-400);
  color: var(--color-gray-900);
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .btn--primary {
    background-color: ButtonFace;
    color: ButtonText;
    border: 2px solid ButtonText;
  }
}
```

## Motion and Animation

### 1. Respect Motion Preferences

**File**: `packages/ui/src/styles/global.css`

```css
/* Default animations */
.btn {
  transition: all 0.2s ease-in-out;
}

.btn__spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Essential animations can be preserved with shorter duration */
  .btn__spinner {
    animation: spin 0.5s steps(8) infinite;
  }
}
```

## Storybook Accessibility Integration

### 1. Accessibility Addon

**File**: `.storybook/main.ts`

```typescript
module.exports = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y', // Accessibility addon
  ],
};
```

### 2. Accessibility-Focused Stories

**File**: `packages/ui/src/components/Button/Button.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    a11y: {
      // Configure axe-core rules
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Standard accessibility story
export const Accessible: Story = {
  args: {
    children: 'Accessible Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'A fully accessible button with proper ARIA attributes, keyboard navigation, and screen reader support.',
      },
    },
  },
};

// Loading state accessibility
export const LoadingAccessible: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in loading state with proper ARIA attributes for screen readers.',
      },
    },
  },
};

// High contrast testing
export const HighContrast: Story = {
  args: {
    children: 'High Contrast Button',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#000000' },
      ],
    },
    docs: {
      description: {
        story: 'Test button appearance in high contrast mode.',
      },
    },
  },
};
```

## Accessibility Checklist for Components

### ✅ Basic Requirements

- [ ] Uses semantic HTML elements
- [ ] Has proper focus management
- [ ] Keyboard navigable (Tab, Enter, Space, Arrow keys)
- [ ] Screen reader accessible
- [ ] Proper color contrast (WCAG AA: 4.5:1, AAA: 7:1)
- [ ] Works without JavaScript
- [ ] Respects user preferences (motion, contrast)

### ✅ Advanced Requirements

- [ ] ARIA attributes where needed
- [ ] Focus indicators visible
- [ ] Error states announced
- [ ] Loading states communicated
- [ ] High contrast mode support
- [ ] Touch targets ≥44px
- [ ] Works with voice control

### ✅ Testing

- [ ] Automated axe-core testing
- [ ] Keyboard-only navigation testing
- [ ] Screen reader testing
- [ ] High contrast mode testing
- [ ] Zoom testing (up to 200%)

## Real-World Examples

### Excellent Accessibility

- **React Aria**: Headless accessible components
- **Reach UI**: Accessible component library
- **Gov.UK Design System**: Government-grade accessibility
- **Adobe Spectrum**: Comprehensive accessibility features

### Common Pitfalls

- ❌ Using `div` instead of `button`
- ❌ Missing focus indicators
- ❌ Poor color contrast
- ❌ No keyboard navigation
- ❌ Missing ARIA labels
- ❌ Auto-playing content

## Tools and Resources

### Development Tools

1. **axe DevTools**: Browser extension for accessibility testing
2. **WAVE**: Web accessibility evaluation tool
3. **Lighthouse**: Built-in Chrome accessibility audit
4. **Color Oracle**: Color blindness simulator

### Testing Tools

1. **Jest-axe**: Automated accessibility testing
2. **Playwright**: E2E accessibility testing
3. **Testing Library**: Accessibility-focused testing utilities

### Documentation

1. **WCAG Guidelines**: Web Content Accessibility Guidelines
2. **ARIA Authoring Practices**: Best practices for ARIA usage
3. **MDN Accessibility**: Comprehensive accessibility docs

## Exercises

### Exercise 1: Accessibility Audit
1. Run the axe-scan script on our Button component
2. Fix any violations found
3. Add missing ARIA attributes
4. Test with keyboard navigation

### Exercise 2: Create Accessible Input
1. Build an Input component with proper labeling
2. Add error state handling
3. Include help text support
4. Write comprehensive accessibility tests

### Exercise 3: Modal Accessibility
1. Create an accessible modal component
2. Implement focus trapping
3. Add keyboard shortcuts (Escape to close)
4. Test with screen readers

## Key Takeaways

1. **Built-in first**: Use semantic HTML before adding ARIA
2. **Test early and often**: Automated testing catches most issues
3. **Real user testing**: Nothing replaces testing with actual users
4. **Progressive enhancement**: Start accessible, add features
5. **Color is not enough**: Use multiple indicators for state
6. **Focus management**: Critical for keyboard users
7. **Screen reader support**: Test with actual screen readers
8. **Documentation**: Document accessibility features

## Next Steps

In the next lesson, we'll explore testing strategies that ensure our components work correctly and remain accessible across all scenarios.
