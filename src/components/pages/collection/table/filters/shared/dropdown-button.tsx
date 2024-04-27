import { ChevronDownIcon } from "@heroicons/react/20/solid";
import FilterButton from "./filter-button";

interface FilterButtonProps {
  isActive: boolean;
  label: string;
}
export default function DropdownButton({ label, isActive }: FilterButtonProps) {
  return (
    <FilterButton
      isActive={isActive}
      label={label}
      iconRight={<ChevronDownIcon className="size-4" />}
    />
  );
}
