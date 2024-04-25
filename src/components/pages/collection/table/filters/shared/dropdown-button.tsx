import { ChevronDownIcon } from "@heroicons/react/20/solid";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import cn from "classnames";

export default function DropdownButton({
  isActive,
  label,
}: {
  isActive: boolean;
  label: string;
}) {
  return (
    <DropdownMenu.Trigger asChild>
      <button
        className={cn(
          "group flex border items-center justify-between border-gray-900 rounded-md py-2 px-3 text-sm text-white bg-black gap-2 outline-none overflow-hidden",
          {
            "bg-brand focus:border-brand": isActive,
            "focus:border-white": !isActive,
          }
        )}
      >
        <span>{label}</span>
        <span
          className={cn(
            "rotate-180 transform transition-all duration-150 group-data-[state=open]:rotate-0"
          )}
        >
          <ChevronDownIcon className="h-4 w-4" />
        </span>
      </button>
    </DropdownMenu.Trigger>
  );
}
