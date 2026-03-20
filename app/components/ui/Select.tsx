'use client';

import { forwardRef, useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

// Custom Select component with styled dropdown options (shadcn style)
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className = '', children, onChange, value, disabled, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    
    // Memoized options extraction
    const options = useMemo(() => {
      if (!children) return [];
      
      const childrenArray = Array.isArray(children) ? children : [children];
      return childrenArray.filter((child) => {
        return child && typeof child === 'object' && 'type' in child && child.type === 'option';
      });
    }, [children]);

    const currentLabel = useMemo(() => {
      const selected = options.find((opt) => opt?.props?.value === value);
      return selected?.props?.children || 'เลือก...';
    }, [options, value]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node) &&
          !triggerRef.current?.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string | number | readonly string[] | undefined) => {
      if (onChange) {
        const event = {
          target: { value: optionValue },
          bubbles: true,
          currentTarget: { value: optionValue },
        } as unknown as React.ChangeEvent<HTMLSelectElement>;
        onChange(event);
      }
      setIsOpen(false);
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-blue-950 mb-2">
            {label}
          </label>
        )}
        
        {/* Hidden native select for form submission */}
        <select
          ref={ref}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
          className="hidden"
          {...props}
        >
          {children}
        </select>

        {/* Custom dropdown trigger */}
        <div className="relative z-40">
          <button
            ref={triggerRef}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`
              w-full px-3 py-2 pr-10 rounded-lg border border-blue-200 bg-white
              text-sm font-medium text-gray-900 text-left
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400
              hover:border-blue-300
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
              transition-all duration-200
              shadow-sm hover:shadow-md
              flex items-center justify-between
              ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-400' : ''}
              ${isOpen ? 'ring-2 ring-blue-500 border-blue-400' : ''}
              ${className}
            `}
          >
            <span>{currentLabel}</span>
            <ChevronDown
              size={18}
              className={`text-blue-600 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-200 rounded-lg shadow-lg z-50 py-1 max-h-60 overflow-y-auto"
            >
              {options.length > 0 ? (
                options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(option?.props?.value)}
                    className={`
                      w-full px-3 py-2 text-left text-sm font-medium
                      transition-colors duration-150
                      ${
                        value === option?.props?.value
                          ? 'bg-blue-100 text-blue-950 font-semibold'
                          : 'text-gray-900 hover:bg-blue-50'
                      }
                      ${option?.props?.value === '' ? 'text-gray-500 font-normal' : ''}
                    `}
                  >
                    {option?.props?.children}
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  ไม่มีตัวเลือก
                </div>
              )}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;

