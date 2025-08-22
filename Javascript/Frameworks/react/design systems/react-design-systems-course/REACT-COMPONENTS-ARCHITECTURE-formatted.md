# React Components Architecture

## Core Goals

Building a design system requires balancing three fundamental goals:

### 🔄 Reusable APIs
- Components solve one problem well and can be combined (Button, Input, Tabs)
- Small, predictable prop surfaces
- Focus on single responsibility

### 🧩 Composition
- Prefer children/slots over dozens of props
- Enable flexible combinations without prop explosion
- Let consumers control layout and content structure

#### ✅ The Right Way: Composition Pattern
```tsx
// Flexible, composable dialog with child components
<Dialog open={open} onClose={close}>
  <Dialog.Header>Delete file</Dialog.Header>
  <Dialog.Body>
    <p>Are you sure you want to delete "document.pdf"?</p>
    <p className="text-sm text-gray-500">This action cannot be undone.</p>
  </Dialog.Body>
  <Dialog.Footer>
    <Button variant="ghost" onClick={close}>Cancel</Button>
    <Button variant="error" onClick={confirm}>Delete</Button>
  </Dialog.Footer>
</Dialog>

// Or a different layout for the same dialog:
<Dialog open={open} onClose={close}>
  <Dialog.Body>
    <div className="flex items-center gap-3">
      <Icon name="warning" className="text-red-500" />
      <div>
        <Dialog.Header as="h3">Delete file</Dialog.Header>
        <p>This will permanently delete the file.</p>
      </div>
    </div>
  </Dialog.Body>
  <Dialog.Footer justify="end">
    <Button size="sm" variant="ghost" onClick={close}>Cancel</Button>
    <Button size="sm" variant="error" onClick={confirm}>Delete</Button>
  </Dialog.Footer>
</Dialog>
```

#### ❌ The Wrong Way: Props Explosion
```tsx
// Inflexible dialog with too many props
<Dialog
  open={open}
  onClose={close}
  title="Delete file"
  message="Are you sure you want to delete this file?"
  subtitle="This action cannot be undone."
  showIcon={true}
  iconName="warning"
  iconColor="red"
  primaryButtonText="Delete"
  primaryButtonVariant="error"
  primaryButtonAction={confirm}
  secondaryButtonText="Cancel"
  secondaryButtonVariant="ghost"
  secondaryButtonAction={close}
  headerLevel="h3"
  footerJustification="end"
  buttonSize="sm"
/>
```

**Why Composition is Better:**
- **Flexibility**: Content can be any JSX, not just strings
- **Maintainability**: No need to add props for every possible variation
- **Reusability**: Same dialog structure works for many use cases
- **Type Safety**: Each sub-component has its own focused prop types
- **Accessibility**: Easier to control semantic HTML structure

#### 🔧 Implementation: Compound Component Pattern
```tsx
// Dialog context for shared state
const DialogContext = createContext<{
  onClose: () => void;
} | null>(null);

// Main Dialog component
interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Dialog = ({ open, onClose, children }: DialogProps) => {
  if (!open) return null;

  return (
    <DialogContext.Provider value={{ onClose }}>
      <div className="dialog-overlay" onClick={onClose}>
        <div 
          className="dialog-content" 
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  );
};

// Sub-components
interface DialogHeaderProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

Dialog.Header = ({ children, as: Component = 'h2' }: DialogHeaderProps) => (
  <Component className="dialog-header">
    {children}
  </Component>
);

interface DialogBodyProps {
  children: React.ReactNode;
}

Dialog.Body = ({ children }: DialogBodyProps) => (
  <div className="dialog-body">
    {children}
  </div>
);

interface DialogFooterProps {
  children: React.ReactNode;
  justify?: 'start' | 'center' | 'end' | 'between';
}

Dialog.Footer = ({ children, justify = 'end' }: DialogFooterProps) => (
  <div className={`dialog-footer dialog-footer--${justify}`}>
    {children}
  </div>
);

// Usage with TypeScript autocomplete and type safety
const MyComponent = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Dialog.Header as="h3">Delete file</Dialog.Header>
      <Dialog.Body>
        <p>Are you sure?</p>
      </Dialog.Body>
      <Dialog.Footer justify="between">
        <Button variant="ghost">Cancel</Button>
        <Button variant="error">Delete</Button>
      </Dialog.Footer>
    </Dialog>
  );
};
```

**Key Implementation Details:**
- **Context**: Shares state (like `onClose`) between parent and children
- **Namespace Pattern**: `Dialog.Header`, `Dialog.Body` creates clear relationships
- **Event Handling**: Each sub-component can access shared functionality
- **TypeScript**: Each sub-component has its own focused interface
- **Accessibility**: Proper ARIA roles and modal behavior

### 🛡️ Stability
- Backwards-compatible props
- Sensible defaults
- Predictable behavior across themes/apps

## Props Design Principles

### Sane Defaults
Set defaults so a component is useful with zero props:
- `type="button"` for buttons
- `variant="primary"` for primary actions
- Components should work out of the box

### Minimal Surface
- Each prop should have a clear, single responsibility
- Avoid "prop soup" - too many configuration options
- Question every prop: is this truly needed?

### Controlled vs Uncontrolled Pattern

**Controlled Components:**
- Parent owns state (`value` + `onChange`)
- Predictable, form-friendly, testable
- More verbose but explicit

**Uncontrolled Components:**
- Component manages internal state (`defaultValue`)
- Simpler to use, fewer re-renders
- Less control for parent

**Best Practice Pattern:**
```typescript
interface InputProps {
  value?: string;        // Controlled
  defaultValue?: string; // Uncontrolled
  onChange?: (value: string) => void;
}
```
If `value` is provided, treat as controlled.

## Component Implementation Patterns

### forwardRef
```typescript
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});
```
- Pass refs to DOM nodes for focus/measure/scroll
- Crucial for accessibility and composition
- Essential for form libraries

### className Merging
```typescript
const Button = ({ className, ...props }) => (
  <button className={`btn ${className || ''}`} {...props} />
);
```
- Always append user classes to base classes
- Allows consumers to style/override
- Maintains component styling while enabling customization

### as Prop (Optional)
```typescript
interface ButtonProps {
  as?: React.ElementType;
}

const Button = ({ as: Component = 'button', ...props }) => (
  <Component {...props} />
);
```
- Let consumers change underlying element
- Maintains styles/behavior across different elements
- Example: `<Button as="a" href="/link">Link Button</Button>`
- **Use sparingly** - only when polymorphism is truly needed

### Context Usage
```typescript
const TabsContext = createContext();

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};
```
- Use for shared, cross-component state
- Don't put frequently changing per-item state in context (causes re-renders)
- Perfect for compound components like Tabs, Dialog, Accordion

## Styling Architecture

### CSS Modules + CSS Variables (Recommended)

**Pros:**
- Tiny runtime footprint
- Excellent tree-shaking
- Easy SSR support
- Works seamlessly with design tokens via `var(--token)`
- No build-time complexity

**Cons:**
- Dynamic variants require class logic in JavaScript
- Less colocated than CSS-in-JS

**Best for:** Design systems focused on performance and broad compatibility

### CSS-in-JS (styled-components, Emotion, vanilla-extract)

**Pros:**
- Powerful variants/themes colocated with JavaScript
- Excellent developer experience
- Dynamic styling capabilities

**Cons:**
- Potential runtime cost (varies by library)
- SSR complexity (not all libraries handle this well)
- Bundle size implications

**Best for:** Complex theming requirements or highly dynamic styling needs

**Rule of Thumb:** Start with CSS Modules + tokens. Reach for CSS-in-JS only if you truly need dynamic runtime styling.

## Component Lab Exercises

### Input Component
- [ ] Controlled/uncontrolled support
- [ ] Label + id/htmlFor association
- [ ] Error/help text states
- [ ] `aria-invalid` for error states
- [ ] Focus ring styling

### Checkbox/Radio Components
- [ ] Native inputs under the hood
- [ ] Keyboard support (Space, Arrow keys in radio groups)
- [ ] Proper name grouping for radio buttons
- [ ] Custom styling while maintaining accessibility

### Switch Component
- [ ] Keyboard support (Space/Enter)
- [ ] `role="switch"` + `aria-checked`
- [ ] Focus outline
- [ ] **Note:** Not a replacement for checkbox in forms unless properly mapped

### Tabs Component (Advanced)
- [ ] "Roving tabindex" pattern (only one tab has `tabIndex=0`, others `-1`)
- [ ] Arrow keys move focus between tabs
- [ ] Enter/Space activates selected tab
- [ ] Link tabs to panels via `aria-controls`/`aria-labelledby`

## Documentation & Quality Standards

### Component Documentation (Storybook/MDX)
Include:
- **What it is** - Component purpose and use cases
- **When to use** - Appropriate scenarios
- **Accessibility notes** - Screen reader support, keyboard interactions
- **Keyboard map** - List of supported keyboard shortcuts
- **Do's and Don'ts** - Usage guidelines with examples

### Variants and States
Document all:
- Visual variants (primary, secondary, outline, etc.)
- Interactive states (hover, focus, disabled, error)
- Examples with realistic content (not just "Lorem ipsum")

### Prop Tables
For each prop, document:
- **name** - The prop name
- **type** - TypeScript type definition
- **default** - Default value (if any)
- **required?** - Whether the prop is required
- **description** - Clear explanation of purpose
- **a11y notes** - Accessibility considerations (e.g., "if aria-label is used, children should be icon-only")

### Quality Gates
Every component must have:
- [ ] **Unit tests** - Examples covered by React Testing Library
- [ ] **Keyboard E2E test** - At least one Playwright test for keyboard interactions
- [ ] **Visual regression** - Loki snapshot for each visual state

## Next Steps

Ready to implement? I can provide code examples for:
1. **Dual controlled/uncontrolled Input** - Complete implementation
2. **forwardRef Button** - With proper TypeScript types
3. **Tabs roving-tabindex handler** - Accessible keyboard navigation

Let me know which patterns you'd like to see in action!
