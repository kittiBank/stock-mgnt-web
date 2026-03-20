import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

// Select/dropdown component following shadcn UI patterns
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-blue-950 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full px-3 py-2 pr-10 rounded-md border border-blue-200 bg-white
              text-sm text-blue-950 placeholder:text-blue-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
              appearance-none cursor-pointer
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none"
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;

