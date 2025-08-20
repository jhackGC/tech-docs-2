# Lesson 2: TypeScript Patterns for React Design Systems

## Overview

TypeScript transforms React development by providing type safety, better developer experience, and maintainable APIs. In design systems, TypeScript patterns help create consistent, predictable component interfaces that prevent bugs and improve team productivity.

## Why TypeScript in Design Systems?

1. **API Contracts**: Components have clear, documented interfaces
2. **Autocomplete**: IDEs provide intelligent suggestions
3. **Refactoring Safety**: Changes propagate safely across codebase
4. **Documentation**: Types serve as living documentation
5. **Error Prevention**: Catch mistakes at compile time, not runtime

## Core TypeScript Patterns in Our Codebase

### 1. Component Props with Variants

**File**: `packages/ui/src/components/Button/Button.tsx`

```typescript
// Define allowed variants as union types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Extend HTML button props while adding our custom props
export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  /**
   * Visual variant of the button
   */
  variant?: ButtonVariant;
  
  /**
   * Size of the button
   */
  size?: ButtonSize;
  
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  
  /**
   * Content of the button
   */
  children: React.ReactNode;
}
```

**Key Concepts:**

- **Union Types**: `'primary' | 'secondary'` restricts to specific values
- **Interface Extension**: `extends React.ComponentPropsWithoutRef<'button'>` inherits all button props
- **Optional Props**: `variant?` means it's optional with TypeScript
- **JSDoc Comments**: Provide hover documentation in IDEs

### 2. Forwarding Refs with TypeScript

**File**: `packages/ui/src/components/Button/Button.tsx`

```typescript
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    children, 
    className = '', 
    disabled,
    ...rest 
  }, ref) => {
    // Component implementation
    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

**Key Concepts:**

- **Generic Types**: `React.forwardRef<HTMLButtonElement, ButtonProps>` specifies ref and props types
- **Default Parameters**: `variant = 'primary'` provides defaults
- **Rest/Spread**: `...rest` passes through additional props
- **Display Name**: Helps with React DevTools debugging

### 3. Polymorphic Components

For components that can render as different HTML elements:

```typescript
// Advanced pattern for "as" prop
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PolymorphicProps<C extends React.ElementType, P = {}> = P &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof P | 'as'>;

// Usage example (not in current codebase, but common pattern)
function Box<C extends React.ElementType = 'div'>(
  props: PolymorphicProps<C, { padding?: number }>
) {
  const { as: Component = 'div', padding, ...rest } = props;
  return <Component style={{ padding }} {...rest} />;
}

// Usage:
// <Box as="button" onClick={handleClick}>Click me</Box>
// <Box as="a" href="/home">Home</Box>
```

### 4. Design Token Types

**File**: `packages/ui/src/tokens/colors.ts`

```typescript
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... more shades
  },
  // ... more color groups
} as const;

// Extract types from the actual values
export type ColorToken = keyof typeof colors;        // 'primary' | 'secondary' | ...
export type ColorShade = keyof typeof colors.primary; // '50' | '100' | '500' | ...

// Utility type for any color reference
export type ColorReference = `${ColorToken}-${ColorShade}`;
// Results in: 'primary-50' | 'primary-100' | 'secondary-50' | ...
```

**Key Concepts:**

- **`as const`**: Makes TypeScript treat values as literal types
- **`keyof typeof`**: Extracts keys from object as union type
- **Template Literal Types**: Create complex string patterns
- **Type Extraction**: Generate types from runtime values

### 5. Discriminated Unions for Component States

```typescript
// Example for different button states
type ButtonState = 
  | { loading: true; disabled?: never }
  | { loading?: false; disabled?: boolean }
  | { loading?: false; disabled: true };

// This prevents invalid combinations like loading + disabled
```

### 6. Generic Utility Types

**File**: Throughout the codebase

```typescript
// Common TypeScript utility types used in design systems

// Pick specific props
type ButtonColorProps = Pick<ButtonProps, 'variant' | 'size'>;

// Omit specific props  
type ButtonWithoutChildren = Omit<ButtonProps, 'children'>;

// Make all props optional
type PartialButtonProps = Partial<ButtonProps>;

// Make specific props required
type RequiredVariant = Required<Pick<ButtonProps, 'variant'>>;

// Record type for mappings
type VariantStyles = Record<ButtonVariant, string>;
```

## Component API Design Patterns

### 1. Sensible Defaults

```typescript
export interface ButtonProps {
  variant?: ButtonVariant;  // Optional with smart default
  size?: ButtonSize;        // Optional with smart default
  children: React.ReactNode; // Required - button needs content
}

// In component:
const Button = ({ variant = 'primary', size = 'md', ...props }) => {
  // Smart defaults mean less work for consumers
};
```

### 2. Controlled vs Uncontrolled

```typescript
// Example for a future Input component
interface InputProps {
  // Controlled
  value?: string;
  onChange?: (value: string) => void;
  
  // Uncontrolled
  defaultValue?: string;
  
  // Should not have both
}

// Type helper to enforce this
type ControlledInputProps = {
  value: string;
  onChange: (value: string) => void;
  defaultValue?: never;
};

type UncontrolledInputProps = {
  value?: never;
  onChange?: never;
  defaultValue?: string;
};

type InputProps = ControlledInputProps | UncontrolledInputProps;
```

### 3. Event Handler Types

```typescript
export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

// Generic helper for any element
type ElementEventHandler<T extends HTMLElement, E extends Event> = 
  (event: E & { currentTarget: T }) => void;
```

## Testing with TypeScript

**File**: `packages/ui/src/components/Button/Button.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { Button, ButtonProps } from './Button';

// Type-safe test helpers
const renderButton = (props: Partial<ButtonProps> = {}) => {
  const defaultProps: ButtonProps = {
    children: 'Test Button',
  };
  
  return render(<Button {...defaultProps} {...props} />);
};

// Type-safe test cases
describe('Button variants', () => {
  const variants: ButtonProps['variant'][] = ['primary', 'secondary', 'outline', 'ghost'];
  
  variants.forEach(variant => {
    it(`renders ${variant} variant correctly`, () => {
      renderButton({ variant });
      expect(screen.getByRole('button')).toHaveClass(`btn--${variant}`);
    });
  });
});
```

## Storybook Integration

**File**: `packages/ui/src/components/Button/Button.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Type-safe story configuration
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'], // TypeScript knows these are valid
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Type-safe stories
export const Default: Story = {
  args: {
    children: 'Button',
  },
};
```

## Advanced Patterns

### 1. Compound Components

```typescript
// Example for future complex components
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface TabsProps {
  defaultTab?: string;
  children: React.ReactNode;
}

interface TabProps {
  value: string;
  children: React.ReactNode;
}

// Implementation would use React.createContext with TypeScript
const TabsContext = React.createContext<TabsContextValue | null>(null);
```

### 2. Render Props with Types

```typescript
interface RenderPropComponentProps<T> {
  data: T;
  render: (data: T) => React.ReactNode;
}

function RenderPropComponent<T>({ data, render }: RenderPropComponentProps<T>) {
  return <div>{render(data)}</div>;
}
```

## Common TypeScript Errors and Solutions

### 1. "Type 'string' is not assignable to..."

```typescript
// Problem:
const variant = 'primary'; // TypeScript infers as 'string'
<Button variant={variant} /> // Error!

// Solution 1: Type assertion
const variant = 'primary' as const;

// Solution 2: Explicit typing
const variant: ButtonVariant = 'primary';

// Solution 3: Satisfies operator (TypeScript 4.9+)
const variant = 'primary' satisfies ButtonVariant;
```

### 2. "Property does not exist on type..."

```typescript
// Problem: Accessing event.target properties
const handleClick = (event: React.MouseEvent) => {
  console.log(event.target.value); // Error!
};

// Solution: Type assertion or currentTarget
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log(event.currentTarget.value); // Safe
  console.log((event.target as HTMLButtonElement).value); // Type assertion
};
```

## Best Practices

### 1. Start with Strict Mode

**File**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 2. Export Types with Components

```typescript
// Always export props types for consumers
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';
```

### 3. Use Semantic Naming

```typescript
// Good: Semantic names
type ButtonVariant = 'primary' | 'secondary';

// Avoid: Visual names
type ButtonVariant = 'blue' | 'gray';
```

### 4. Document Complex Types

```typescript
/**
 * Props for Button component
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  // ...
}
```

## Exercises

### Exercise 1: Add Size Variants
1. Add `xs` and `xl` to `ButtonSize` type
2. Update CSS with new size classes
3. Add to Storybook controls
4. Verify TypeScript autocomplete works

### Exercise 2: Create Input Component
1. Create `Input.tsx` with proper TypeScript interfaces
2. Support controlled/uncontrolled patterns
3. Add validation state types: `'valid' | 'invalid' | 'warning'`
4. Export all types

### Exercise 3: Generic Icon Component
1. Create a polymorphic Icon component that accepts different icon libraries
2. Use generics to ensure type safety
3. Support size and color props using design tokens

## Key Takeaways

1. **TypeScript enhances DX** - Better autocomplete, error catching, refactoring
2. **Union types for variants** - Restrict props to valid values
3. **Extend HTML element props** - Inherit native functionality
4. **Export types** - Let consumers use your type definitions
5. **Use `as const`** - Convert values to literal types
6. **Generic types for reusability** - Create flexible, type-safe APIs
7. **Document with JSDoc** - Types + comments = great DX

## Real-World Examples

- **Material-UI**: Extensive TypeScript usage with theme typing
- **Chakra UI**: Polymorphic components with `as` prop
- **Mantine**: Comprehensive TypeScript APIs with excellent DX
- **React Aria**: Type-safe accessibility primitives

## Next Steps

In the next lesson, we'll explore React component architecture patterns that build upon these TypeScript foundations to create maintainable, composable components.
