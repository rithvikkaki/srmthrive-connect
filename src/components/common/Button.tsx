
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  fullWidth,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-thrive-500 focus:ring-offset-2",
        {
          "bg-thrive-500 text-white hover:bg-thrive-600": variant === "primary",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "bg-transparent border border-border hover:bg-muted": variant === "outline",
          "bg-transparent hover:bg-muted": variant === "ghost",
          "bg-transparent underline-offset-4 hover:underline": variant === "link",
          "text-xs px-2 py-1": size === "sm",
          "text-sm px-4 py-2": size === "md",
          "text-base px-6 py-3": size === "lg",
          "w-full": fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
