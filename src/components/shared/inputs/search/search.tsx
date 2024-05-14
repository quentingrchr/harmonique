import * as React from "react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import cn from "classnames";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onSubmit"> {
  clearValue?: () => void;
  onSearchSubmit?: (value: string) => void;
  variant?: "ghost" | "solid";
}

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      clearValue,
      onSearchSubmit,
      variant = "solid",
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const isNotEmpty = props.value;
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (onSearchSubmit && props.value && typeof props.value === "string") {
        onSearchSubmit(props.value);
      }
    }

    return (
      <form
        className={cn(
          "flex items-center px-3 py-1 h-9 rounded-md text-sm text-white border",
          {
            "border-white": isFocused,
            "border-transparent": !isFocused && variant === "solid",
            "bg-gray-700": variant === "solid",
            "bg-transparent border-gray-900": variant === "ghost",
          },
          className
        )}
        onSubmit={handleSubmit}
      >
        <MagnifyingGlassIcon className="size-4 mr-2" />
        <input
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          type={type}
          className={cn(
            "bg-transparent flex w-full min-w-0 transition-colors file:border-0 placeholder:text-muted-text focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <button type="submit" className="sr-only"></button>
        <div className="size-4 relative">
          {isNotEmpty && clearValue && (
            <button onClick={clearValue} className="size-4 absolute">
              <XMarkIcon className="size-4" />
            </button>
          )}
        </div>
      </form>
    );
  }
);
Search.displayName = "Search";

export default Search;
