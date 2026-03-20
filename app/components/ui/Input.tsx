import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

// Input component following shadcn UI patterns with white/blue styling
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-blue-950 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-3 py-2 rounded-lg border border-blue-200 bg-white
              text-sm font-medium text-gray-900 placeholder:text-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400
              hover:border-blue-300
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
              transition-all duration-200
              shadow-sm hover:shadow-md
              ${icon ? "pl-10" : ""}
              ${error ? "border-red-500 focus:ring-red-500 focus:border-red-400" : ""}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
