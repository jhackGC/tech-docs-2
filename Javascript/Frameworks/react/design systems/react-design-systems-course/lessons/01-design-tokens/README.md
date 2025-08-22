# Lesson 1: Design Tokens - The Foundation of Your Design System

## Overview

Design tokens are the foundation of any scalable design system. They are the smallest units of design decisions that store visual design attributes like colors, typography, spacing, and more. Think of them as the "single source of truth" for your design decisions.

## What Are Design Tokens?

Design tokens are named entities that store visual design attributes. Instead of hard-coding values like `#3b82f6` throughout your codebase, you use semantic names like `primary-500` that reference these values.

### Benefits:
- **Consistency**: Same values used everywhere
- **Maintainability**: Change once, update everywhere  
- **Scalability**: Easy to add themes and variants
- **Collaboration**: Shared language between design and development

# Importnat Notes
In this current setup, no one uses the typed tokens (e.g. colors.primary.50) directly from the tokens' TypeScript files.

The TypeScript tokens (like colors.primary.50) are currently only used for:

Type definitions - Creating types like ColorToken = keyof typeof colors
Reference/documentation - Showing what colors exist
But the actual values (#eff6ff) are only consumed through the CSS variables (var(--color-primary-50)).

In a more advanced setup, you might see the TypeScript tokens used directly like:
```html
<div style={{ backgroundColor: colors.primary[50] }}>
```

Or in styled-components:

```javascript
// Also not used in this project
const StyledDiv = styled.div`
  background: ${colors.primary[50]};
`;
```
But in this design system, we've chosen to use CSS variables for all styling, so the TypeScript tokens are mainly for type safety and keeping the values organized. 

The CSS variables are directly consumed by the components CSS stylesheets and NOT IN SYNC with the token values. They are synched manually ...

The design system works best when these values stay in sync. In a production system, you'd typically have a build tool that generates the CSS variables from the TypeScript tokens to prevent this kind of drift.

## Implementation in Our Codebase

### 1. Color Tokens

**File**: `packages/ui/src/tokens/colors.ts`

```typescript
export const colors = {
  // Primary colors - Used for main actions, links, focus states
  primary: {
    50: '#eff6ff',   // Very light blue
    100: '#dbeafe',  // Light blue
    500: '#3b82f6',  // Main blue (your primary color)
    600: '#2563eb',  // Darker blue for hover states
    900: '#1e3a8a',  // Very dark blue
  },
  
  // Semantic colors - Convey meaning
  success: {
    50: '#f0fdf4',   // Light green background
    500: '#22c55e',  // Success green
    700: '#15803d',  // Dark success green
  },
  
  // Neutral colors - For text, borders, backgrounds
  neutral: {
    0: '#ffffff',    // Pure white
    100: '#f3f4f6',  // Light gray
    500: '#6b7280',  // Medium gray
    900: '#111827',  // Almost black
  }
} as const;
```

**Key Concepts:**
- **Scale System**: Using 50-900 numbering (50 = lightest, 900 = darkest)
- **Semantic Naming**: `primary`, `success`, `error` instead of `blue`, `green`, `red`
- **TypeScript `as const`**: Ensures the values are literal types, not just `string`

### 2. Typography Tokens

**File**: `packages/ui/src/tokens/typography.ts`

```typescript
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px  
    base: '1rem',       // 16px (browser default)
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
} as const;
```

**Key Concepts:**
- **Modular Scale**: Each size relates mathematically to others
- **Semantic Names**: `base`, `lg`, `xl` instead of `16px`, `18px`, `20px`
- **Font Stacks**: Fallback fonts for reliability

### 3. Spacing Tokens

**File**: `packages/ui/src/tokens/spacing.ts`

```typescript
export const spacing = {
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
} as const;
```

**Key Concepts:**
- **Base Unit**: Everything based on `0.25rem` (4px)
- **Geometric Progression**: Each step is meaningful
- **Rem Units**: Scalable with user's font size preferences

## CSS Custom Properties (CSS Variables)

**File**: `packages/ui/src/styles/global.css`

Our design tokens are converted to CSS custom properties for runtime theming:

```css
:root {
  /* Colors */
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  
  /* Typography */
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-size-base: 1rem;
  --font-weight-medium: 500;
  
  /* Spacing */
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
}
```

### Why CSS Custom Properties?

1. **Runtime Theming**: Can change values with JavaScript
2. **Inheritance**: Children inherit parent values
3. **Fallbacks**: `var(--color-primary, #3b82f6)` provides fallback
4. **Performance**: No build-time processing needed

## Using Tokens in Components

**File**: `packages/ui/src/components/Button/Button.css`

```css
.btn {
  /* Using spacing tokens */
  padding: var(--spacing-3) var(--spacing-4);
  
  /* Using typography tokens */
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  
  /* Using color tokens */
  background-color: var(--color-primary-500);
  color: var(--color-neutral-0);
  
  /* Using border radius token */
  border-radius: var(--border-radius-md);
}

.btn:hover {
  /* Semantic hover state */
  background-color: var(--color-primary-600);
}
```

## TypeScript Integration

**File**: `packages/ui/src/tokens/colors.ts`

```typescript

// tokens file
export type ColorToken = keyof typeof colors;
export type ColorShade = keyof typeof colors.primary;

// Usage in components:
interface ButtonProps {
  variant?: ColorToken;  // Automatically includes all color tokens
}

// Or for more specific control:
export type ButtonVariant = Extract<ColorToken, 'primary' | 'secondary' | 'success' | 'error'>;

interface ButtonProps {
  variant?: ButtonVariant;  // Only allows specific color tokens that make sense for buttons
}
```

This gives you:
- **Autocomplete**: IDE knows available color tokens
- **Type Safety**: Can't use non-existent colors
- **Refactor Safety**: Renaming updates everywhere
- **Automatic Sync**: Adding new colors to `colors.ts` automatically makes them available as variants
- **Real Connection**: Creates an actual link between TypeScript tokens and component props

## Theming Support

**File**: `packages/ui/src/styles/global.css`

```css
/* Light theme (default) */
:root {
  --color-background: var(--color-neutral-0);
  --color-text: var(--color-neutral-900);
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--color-neutral-900);
    --color-text: var(--color-neutral-0);
  }
}

/* High contrast theme */
@media (prefers-contrast: high) {
  :root {
    --color-primary-500: #0000ff;
    --color-error-500: #ff0000;
  }
}
```

## Exercises

### Exercise 1: Add Border Radius Tokens
1. Create `packages/ui/src/tokens/borderRadius.ts`
2. Add tokens for: `none`, `sm`, `md`, `lg`, `full`
3. Add to CSS custom properties
4. Use in Button component

### Exercise 2: Create Semantic Color Aliases
1. In `global.css`, create semantic aliases:
   ```css
   --color-background: var(--color-neutral-0);
   --color-text: var(--color-neutral-900);
   --color-border: var(--color-neutral-200);
   ```
2. Update Button component to use semantic names

### Exercise 3: Add Shadow Tokens
1. Create shadow tokens for elevation
2. Add to Button component for depth

## Key Takeaways

1. **Design tokens are your source of truth** - All visual decisions come from tokens
2. **Use semantic naming** - `primary` not `blue`, `lg` not `18px`
3. **CSS custom properties enable theming** - Runtime value changes
4. **TypeScript adds safety** - Prevents using wrong token names
5. **Start small, grow systematically** - Begin with colors, add complexity gradually

## Real-World Examples

- **Material Design**: `primary`, `secondary`, `surface` colors
- **Tailwind CSS**: `blue-500`, `text-lg`, `p-4` utility classes
- **Shopify Polaris**: Semantic tokens like `action`, `critical`, `highlight`
- **GitHub Primer**: `primer-border-color`, `primer-text-primary`



## Next Steps

In the next lesson, we'll learn how TypeScript patterns help us create type-safe, maintainable component APIs that leverage these design tokens.
