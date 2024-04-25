import * as React from "react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import cn from "classnames";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onSubmit"> {
  clearValue?: () => void;
  onSearchSubmit?: (value: string) => void;
}

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, clearValue, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const isNotEmpty = props.value;
    const shouldDisplayGlass = !clearValue ? true : !isNotEmpty;
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (
        props.onSearchSubmit &&
        props.value &&
        typeof props.value === "string"
      ) {
        props.onSearchSubmit(props.value);
      }
    }

    return (
      <form
        className={cn(
          "flex items-center bg-gray-900 px-3 py-1 h-9 rounded-md text-sm text-white border",
          { "border-white": isFocused, "border-transparent": !isFocused }
        )}
        onSubmit={handleSubmit}
      >
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type={type}
          className={cn(
            "bg-transparent flex w-full transition-colors file:border-0 placeholder:text-muted-text focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <button type="submit" className="sr-only"></button>
        <div className="size-4 relative">
          {shouldDisplayGlass && (
            <MagnifyingGlassIcon className="size-4  absolute" />
          )}
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
