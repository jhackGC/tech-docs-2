import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

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

/**
 * Button component for user interactions
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 */
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
        aria-disabled={disabled || loading}
        {...rest}
      >
        {loading && <span className="btn__spinner" aria-hidden="true" />}
        <span className={loading ? 'btn__content--loading' : 'btn__content'}>
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
