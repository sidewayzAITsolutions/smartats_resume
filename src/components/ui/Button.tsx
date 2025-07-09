// src/components/ui/Button.tsx
import React, { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  asChild?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    disabled = false,
    fullWidth = false,
    children, 
    asChild = false,
    ...props 
  }, ref) => {
    
    // Base styles that apply to all buttons
    const baseStyles = [
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-lg',
      'font-medium',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'disabled:opacity-50',
      'disabled:pointer-events-none',
      'disabled:cursor-not-allowed'
    ].join(' ');

    // Variant styles
    const variantStyles = {
      primary: [
        'bg-blue-600',
        'text-white',
        'hover:bg-blue-700',
        'focus:ring-blue-500',
        'shadow-sm',
        'hover:shadow-md'
      ].join(' '),
      
      secondary: [
        'bg-gray-100',
        'text-gray-900',
        'hover:bg-gray-200',
        'focus:ring-gray-500',
        'border',
        'border-gray-300'
      ].join(' '),
      
      outline: [
        'border',
        'border-gray-300',
        'bg-white',
        'text-gray-700',
        'hover:bg-gray-50',
        'hover:border-gray-400',
        'focus:ring-blue-500',
        'shadow-sm'
      ].join(' '),
      
      ghost: [
        'text-gray-700',
        'hover:bg-gray-100',
        'focus:ring-gray-500'
      ].join(' '),
      
      danger: [
        'bg-red-600',
        'text-white',
        'hover:bg-red-700',
        'focus:ring-red-500',
        'shadow-sm',
        'hover:shadow-md'
      ].join(' ')
    };
    
    // Size styles
    const sizeStyles = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-6 text-base',
      xl: 'h-12 px-8 text-lg'
    };

    // Combine all styles
    const combinedClassName = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth ? 'w-full' : '',
      className
    ].filter(Boolean).join(' ');

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg 
        className="mr-2 h-4 w-4 animate-spin" 
        fill="none" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Handle asChild prop for Link components
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: combinedClassName,
        ref,
        ...props
      } as any);
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };

// Usage Examples:
/*
// Basic usage
<Button>Click me</Button>

// Different variants
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Loading state
<Button loading>Saving...</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// With Link (asChild)
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>

// With icons
<Button>
  <PlusIcon className="w-4 h-4 mr-2" />
  Add Item
</Button>

// Disabled
<Button disabled>Can't click</Button>
*/
