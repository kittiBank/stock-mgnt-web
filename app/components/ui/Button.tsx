import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "success";
  size?: "sm" | "md" | "lg";
}

const variantStyles = {
  default:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500",
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500",
  secondary:
    "bg-blue-100 text-blue-900 hover:bg-blue-200 active:bg-blue-300 focus-visible:ring-blue-500",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500",
  outline:
    "border-2 border-blue-300 text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500",
  ghost:
    "text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500",
  success:
    "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus-visible:ring-green-500",
};

const sizeStyles = {
  sm: "px-2 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

// Button component following shadcn UI patterns
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      className = "",
      disabled = false,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center gap-2
          font-medium rounded-md
          transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
