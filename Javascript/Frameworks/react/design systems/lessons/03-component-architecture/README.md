# Lesson 3: React Component Architecture Patterns

## Overview

Component architecture in React design systems requires careful consideration of composition, reusability, and maintainability. This lesson explores the architectural patterns used in our codebase and how they enable scalable component libraries.

## Architectural Principles

### 1. Single Responsibility Principle
Each component should have one clear purpose and reason to change.

### 2. Composition over Inheritance
React favors composition patterns over classical inheritance for building complex UIs.

### 3. Prop Drilling vs Context
Know when to use direct props vs React Context for data flow.

### 4. Separation of Concerns
Separate presentation, logic, and state management concerns.

## Component Types in Our System

### 1. Primitive Components

**File**: `packages/ui/src/components/Button/Button.tsx`

These are the foundational building blocks - buttons, inputs, typography, etc.

```typescript
// Characteristics of primitive components:
// - Single HTML element or simple composition
// - Focused on visual presentation
// - Minimal logic, mostly styling variants
// - High reusability across applications

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

**Key Architectural Decisions:**

- **forwardRef**: Allows parent components to access the DOM element
- **Spread props**: Inherits all native button functionality
- **Conditional classes**: Dynamic styling based on state
- **Loading state**: Built-in loading UX pattern

### 2. Composite Components (Future Pattern)

For complex components that combine multiple primitives:

```typescript
// Example: Card component (not in current codebase)
interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
}

// Compound component pattern
const Card = ({ children, variant = 'elevated' }: CardProps) => (
  <div className={`card card--${variant}`}>
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="card__header">{children}</div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="card__content">{children}</div>
);

const CardActions = ({ children }: { children: React.ReactNode }) => (
  <div className="card__actions">{children}</div>
);

// Namespace pattern
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Actions = CardActions;

// Usage:
// <Card variant="elevated">
//   <Card.Header>Title</Card.Header>
//   <Card.Content>Content here</Card.Content>
//   <Card.Actions>
//     <Button>Action</Button>
//   </Card.Actions>
// </Card>
```

### 3. Layout Components (Future Pattern)

Components focused on positioning and spacing:

```typescript
// Example: Stack component for consistent spacing
interface StackProps {
  children: React.ReactNode;
  spacing?: keyof typeof spacing; // From design tokens
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}

const Stack = ({ 
  children, 
  spacing = 'md', 
  direction = 'vertical',
  align = 'stretch',
  justify = 'start'
}: StackProps) => {
  const styles = {
    '--stack-spacing': `var(--spacing-${spacing})`,
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    alignItems: align,
    justifyContent: justify,
    gap: 'var(--stack-spacing)'
  } as React.CSSProperties;

  return (
    <div className="stack" style={styles}>
      {children}
    </div>
  );
};
```

## Design Patterns in Our Codebase

### 1. Prop-based Variants

**File**: `packages/ui/src/components/Button/Button.tsx`

```typescript
// Instead of multiple components, use prop variants
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

// Benefits:
// - Single component to maintain
// - Clear API with TypeScript
// - Easy to add new variants
// - Consistent naming patterns
```

### 2. CSS-in-JS via CSS Custom Properties

**Files**: 
- `packages/ui/src/tokens/*.ts` (token definitions)
- `packages/ui/src/styles/global.css` (CSS custom properties)
- `packages/ui/src/components/Button/Button.css` (component styles)

```css
/* Design tokens become CSS custom properties */
:root {
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
}

/* Component uses tokens */
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-primary-500);
  /* ... */
}

.btn:hover {
  background-color: var(--color-primary-600);
}
```

**Benefits:**
- Design tokens in CSS for performance
- Theme switching via CSS custom property updates
- No runtime CSS-in-JS overhead
- Standard CSS debugging tools work

### 3. Controlled vs Uncontrolled Components

```typescript
// Pattern for input components (future implementation)
interface InputProps {
  // Controlled
  value?: string;
  onChange?: (value: string) => void;
  
  // Uncontrolled  
  defaultValue?: string;
  
  // Common props
  placeholder?: string;
  disabled?: boolean;
}

const Input = ({ value, onChange, defaultValue, ...props }: InputProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalValue(newValue);
    }
  };
  
  return (
    <input
      value={currentValue}
      onChange={handleChange}
      {...props}
    />
  );
};
```

### 4. Render Props Pattern

```typescript
// For sharing stateful logic between components
interface RenderProps<T> {
  children: (data: T) => React.ReactNode;
}

// Example: Data fetching component
interface AsyncDataProps<T> extends RenderProps<{ data: T | null; loading: boolean; error: string | null }> {
  url: string;
}

function AsyncData<T>({ url, children }: AsyncDataProps<T>) {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null
  });
  
  React.useEffect(() => {
    // Fetch logic here
  }, [url]);
  
  return <>{children(state)}</>;
}

// Usage:
// <AsyncData url="/api/users">
//   {({ data, loading, error }) => (
//     loading ? <Spinner /> : <UserList users={data} />
//   )}
// </AsyncData>
```

### 5. Compound Components with Context

```typescript
// For components with multiple related parts
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a Tabs component');
  }
  return context;
};

const Tabs = ({ defaultTab, children }: { defaultTab: string; children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

const TabList = ({ children }: { children: React.ReactNode }) => (
  <div className="tabs__list" role="tablist">{children}</div>
);

const Tab = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const { activeTab, setActiveTab } = useTabs();
  
  return (
    <button
      className={`tabs__tab ${activeTab === value ? 'tabs__tab--active' : ''}`}
      role="tab"
      aria-selected={activeTab === value}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

const TabPanels = ({ children }: { children: React.ReactNode }) => (
  <div className="tabs__panels">{children}</div>
);

const TabPanel = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const { activeTab } = useTabs();
  
  if (activeTab !== value) return null;
  
  return (
    <div className="tabs__panel" role="tabpanel">
      {children}
    </div>
  );
};

// Namespace assignment
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;
```

## File Organization Patterns

### 1. Component Co-location

**Current Structure**: Each component has all related files together

```
packages/ui/src/components/Button/
├── Button.tsx          # Main component
├── Button.css          # Styles  
├── Button.stories.tsx  # Storybook stories
├── Button.test.tsx     # Tests
└── index.ts           # Exports
```

**Benefits:**
- Easy to find all component files
- Clear component boundaries
- Easy to delete/move components
- Reduces cognitive load

### 2. Barrel Exports

**File**: `packages/ui/src/components/Button/index.ts`

```typescript
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';
```

**File**: `packages/ui/src/index.ts`

```typescript
// Re-export all components
export * from './components/Button';
export * from './tokens';
```

**Benefits:**
- Clean import paths: `import { Button } from '@company/ui'`
- Hide internal file structure
- Easy to reorganize without breaking imports

### 3. Feature-based Organization (Alternative)

```
packages/ui/src/
├── tokens/
├── components/
│   ├── forms/
│   │   ├── Input/
│   │   ├── Select/
│   │   └── Checkbox/
│   ├── feedback/
│   │   ├── Alert/
│   │   ├── Toast/
│   │   └── Modal/
│   └── navigation/
│       ├── Button/
│       ├── Link/
│       └── Breadcrumb/
```

## State Management Patterns

### 1. Local Component State

**File**: `packages/ui/src/components/Button/Button.tsx`

```typescript
// For simple, component-specific state
const [loading, setLoading] = React.useState(false);

// Good for:
// - Toggle states (open/closed, visible/hidden)
// - Form input values
// - Loading states
// - Animation states
```

### 2. Lifted State

```typescript
// When multiple components need to share state
const ParentComponent = () => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  
  return (
    <div>
      <ItemList 
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
      />
      <SelectedItemsDisplay items={selectedItems} />
    </div>
  );
};
```

### 3. Context for Cross-cutting Concerns

```typescript
// For app-wide state like themes, user preferences
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## Performance Patterns

### 1. React.memo for Expensive Components

```typescript
// Prevent unnecessary re-renders
const ExpensiveComponent = React.memo(({ data }: { data: ComplexData }) => {
  // Expensive calculations or rendering
  return <div>{/* Complex UI */}</div>;
});

// With custom comparison
const MyComponent = React.memo(
  ({ items }: { items: Item[] }) => {
    return <div>{/* Render items */}</div>;
  },
  (prevProps, nextProps) => {
    // Custom equality check
    return prevProps.items.length === nextProps.items.length;
  }
);
```

### 2. useMemo for Expensive Calculations

```typescript
const ComponentWithExpensiveCalc = ({ items }: { items: Item[] }) => {
  const expensiveValue = React.useMemo(() => {
    return items.reduce((acc, item) => {
      // Expensive calculation
      return acc + complexCalculation(item);
    }, 0);
  }, [items]);
  
  return <div>{expensiveValue}</div>;
};
```

### 3. useCallback for Stable References

```typescript
const ParentComponent = ({ items }: { items: Item[] }) => {
  const [filter, setFilter] = React.useState('');
  
  // Stable function reference prevents child re-renders
  const handleItemClick = React.useCallback((id: string) => {
    // Handle click
  }, []);
  
  const filteredItems = React.useMemo(() => {
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);
  
  return (
    <div>
      <SearchInput value={filter} onChange={setFilter} />
      <ItemList items={filteredItems} onItemClick={handleItemClick} />
    </div>
  );
};
```

## Error Handling Patterns

### 1. Error Boundaries

```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
    // Log to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} />;
    }
    
    return this.props.children;
  }
}
```

### 2. Graceful Degradation

```typescript
const ComponentWithFallback = ({ data }: { data?: Data }) => {
  if (!data) {
    return <EmptyState message="No data available" />;
  }
  
  try {
    return <ComplexDataVisualization data={data} />;
  } catch (error) {
    return <SimpleDataTable data={data} />;
  }
};
```

## Testing Patterns

### 1. Component Testing Strategy

**File**: `packages/ui/src/components/Button/Button.test.tsx`

```typescript
// Test component API, not implementation details
describe('Button', () => {
  it('renders with correct variant class', () => {
    render(<Button variant="secondary">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--secondary');
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('disables button when loading', () => {
    render(<Button loading>Test</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 2. Custom Hooks Testing

```typescript
// Test custom hooks in isolation
const { result } = renderHook(() => useToggle(false));

act(() => {
  result.current.toggle();
});

expect(result.current.value).toBe(true);
```

## Best Practices

### 1. Component Design Principles

1. **Start simple, add complexity gradually**
2. **Prefer composition over configuration**
3. **Make the common case easy, advanced cases possible**
4. **Follow the Principle of Least Surprise**
5. **Design for both TypeScript and JavaScript users**

### 2. API Design Guidelines

```typescript
// Good: Clear, predictable API
<Button variant="primary" size="lg" loading>
  Submit
</Button>

// Avoid: Too many configuration options
<Button 
  primaryColor="#blue" 
  hoverColor="#darkblue" 
  borderRadius="8px"
  fontSize="16px"
  // ... too many props
>
  Submit
</Button>
```

### 3. Naming Conventions

```typescript
// Components: PascalCase
const Button = () => {};

// Props interfaces: ComponentName + Props
interface ButtonProps {}

// Variants/types: Descriptive names
type ButtonVariant = 'primary' | 'secondary'; // Not 'blue' | 'gray'

// Event handlers: handle + EventName
const handleClick = () => {};
const handleSubmit = () => {};
```

## Real-World Examples

### Material-UI Architecture
- Theming system with CSS-in-JS
- Extensive use of React.forwardRef
- Polymorphic component patterns

### Chakra UI Architecture  
- Simple prop-based styling
- Excellent TypeScript support
- Component composition patterns

### React Aria Architecture
- Headless component patterns
- Hook-based architecture
- Accessibility-first design

## Exercises

### Exercise 1: Create a Card Component
1. Design a compound Card component with Header, Content, and Actions
2. Use TypeScript for all interfaces
3. Add Storybook stories showing composition patterns
4. Write tests for the component API

### Exercise 2: Add Theme Context
1. Create a ThemeProvider with light/dark modes
2. Update Button to respond to theme changes
3. Use CSS custom properties for theme switching
4. Add a theme toggle to Storybook

### Exercise 3: Performance Optimization
1. Add React.memo to Button component
2. Measure re-render frequency with React DevTools
3. Add useMemo for expensive className computations
4. Compare before/after performance

## Key Takeaways

1. **Component hierarchies**: Primitive → Composite → Page-level
2. **Composition patterns**: Compound components, render props, children
3. **State management**: Local → Lifted → Context → External stores
4. **File organization**: Co-location, barrel exports, feature grouping
5. **Performance**: memo, useMemo, useCallback for optimization
6. **Error handling**: Boundaries, graceful degradation, fallbacks
7. **Testing**: API-focused, not implementation-focused
8. **Maintainability**: Clear naming, TypeScript, documentation

## Next Steps

In the next lesson, we'll explore accessibility patterns that ensure our components are usable by everyone, including users with disabilities.
