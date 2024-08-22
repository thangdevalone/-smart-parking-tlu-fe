import * as React from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    return (
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          className={cn(
            'flex h-9 w-full rounded-md border  border-input bg-transparent pl-3 pr-8 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          autoComplete="current-password"
          ref={ref}
          {...props}
        />
        <span
          onClick={() => {
            setShow(!show);
          }}
          className="action-input cursor-pointer absolute top-[50%] -translate-y-1/2 right-[10px] z-1"
        >
          {show ? <Eye size={20} /> : <EyeOff size={20} />}
        </span>
      </div>
    );
  }
);
InputPassword.displayName = 'InputPassword';

export { InputPassword };
