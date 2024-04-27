import cn from "classnames";
import { forwardRef } from "react";

interface Props {
  isActive: boolean;
  label: string;
  iconRight?: React.ReactNode;
  onClick?: () => void;
}

const FilterButton = forwardRef<HTMLButtonElement, Props>(
  ({ isActive, label, onClick, iconRight }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group flex border items-center justify-between border-gray-900 rounded-md py-2 px-3 text-sm text-white bg-black gap-2 outline-none overflow-hidden",
          {
            "bg-brand focus:border-brand": isActive,
            "focus:border-white": !isActive,
          }
        )}
        onClick={onClick}
      >
        <span>{label}</span>
        <span
          className={cn(
            "rotate-180 transform transition-all duration-150 group-data-[state=open]:rotate-0"
          )}
        >
          {iconRight}
        </span>
      </button>
    );
  }
);

export default FilterButton;
