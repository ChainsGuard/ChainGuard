import React from 'react';
import { cn } from '../utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  label = 'Loading...',
}) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-current border-t-transparent text-primary',
          sizeClasses[size]
        )}
        role="status"
        aria-label={label}
      >
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
