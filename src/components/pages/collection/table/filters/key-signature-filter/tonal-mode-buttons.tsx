import { TonalMode } from "@/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import cn from "classnames";
import React from "react";

const modes: TonalMode[] = ["Major", "Minor"];

function TonalModeButton(
  props: {
    value: TonalMode;
    onClick: () => void;
    isSelected?: boolean;
  } & React.ComponentProps<"button">
) {
  const { value, onClick, isSelected, ...rest } = props;
  return (
    <DropdownMenu.Item asChild>
      <button
        onClick={onClick}
        className={cn(
          "flex flex-1 items-center gap-1 border border-white/10 rounded-md px-2 py-0.5 font-light text-white w-[32px] h-[28px] text-xs justify-center cursor-pointer",
          {
            "bg-brand": isSelected,
          }
        )}
        {...rest}
      >
        <span>{value}</span>
      </button>
    </DropdownMenu.Item>
  );
}

function TonalModeButtons({
  value,
  onModeClick,
  clearFilter,
}: {
  value?: TonalMode;
  onModeClick: (mode: TonalMode) => void;
  clearFilter: () => void;
}) {
  function handleClick(mode: TonalMode) {
    if (mode === value) {
      clearFilter();
    } else {
      onModeClick(mode);
    }
  }
  return (
    <div className="flex gap-1 w-full">
      {modes.map((mode) => (
        <TonalModeButton
          key={mode}
          value={mode}
          title={`Select ${mode} mode`}
          isSelected={mode === value}
          onClick={() => {
            handleClick(mode);
          }}
        />
      ))}
    </div>
  );
}

export default TonalModeButtons;
