import * as React from 'react';

import { cn } from '@/lib/utils';


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {startIcon &&
          <span
            className={cn({ 'opacity-50': props.disabled }, 'absolute left-2.5 opacity-80 text-sm')}>{startIcon}</span>}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
            startIcon && 'pl-9',
            endIcon && 'pr-6',
            className,
          )}
          ref={ref}
          {...props}
        />
        {endIcon &&
          <span className={cn({ 'opacity-50': props.disabled }, 'absolute right-2.5 text-sm')}>{endIcon}</span>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
