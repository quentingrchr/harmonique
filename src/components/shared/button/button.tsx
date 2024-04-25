import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import cn from "classnames";
import React, { forwardRef } from "react";

export type ButtonProps = VariantProps<typeof buttonCva> & {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const buttonCva = cva("hover:cursor-pointer rounded-md", {
  variants: {
    variant: {
      primary:
        "bg-brand text-white disabled:bg-gray-900 disabled:text-white/50",

      outline: "border border-brand text-brand disabled:text-gray-900/50",

      outlineWhite: "border border-white text-white disabled:text-white/50",
    },
    size: {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-4 py-2",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
});

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className, variant, size, ...rest } = props;

  return (
    <button
      {...rest}
      ref={ref}
      className={cn(
        buttonCva({
          variant,
          size,
        }),
        className
      )}
    >
      {children}
    </button>
  );
});

export default Button;
