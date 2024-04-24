import { TonalAccidentalKey } from "@/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import cn from "classnames";
import React from "react";
const sharpAccidentalKeys: TonalAccidentalKey[] = [
  "C#",
  "D#",
  "F#",
  "G#",
  "A#",
];

const naturalAccidentalKeys: TonalAccidentalKey[] = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
];

function AccidentalKeysButtons(props: {
  onKeyClick: (key: TonalAccidentalKey) => void;
  value?: TonalAccidentalKey;
  clearFilter: () => void;
}) {
  const { value, onKeyClick, clearFilter } = props;

  function handleClick(key: TonalAccidentalKey) {
    if (value === key) {
      clearFilter();
    } else {
      onKeyClick(key);
    }
  }
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="grid grid-cols-7 grid-rows-1 gap-1 translate-x-[16px]">
        {sharpAccidentalKeys.map((key, i) => {
          const isSelected = key === value;
          if (i === 1 || i === 4) {
            return (
              <React.Fragment key={key}>
                <AccidentalTonalKeyButton
                  value={key}
                  onClick={() => {
                    handleClick(key);
                  }}
                  isSelected={isSelected}
                />
                <div></div>
              </React.Fragment>
            );
          }
          return (
            <AccidentalTonalKeyButton
              key={key}
              value={key}
              onClick={() => {
                handleClick(key);
              }}
              isSelected={isSelected}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-7 grid-rows-1 gap-1">
        {naturalAccidentalKeys.map((key) => {
          const isSelected = key === value;
          return (
            <AccidentalTonalKeyButton
              key={key}
              value={key}
              onClick={() => {
                handleClick(key);
              }}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </div>
  );
}

function AccidentalTonalKeyButton(
  props: {
    value: TonalAccidentalKey;
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
          "flex items-center gap-1 border border-white/10 rounded-md px-2 py-0.5 font-light text-white w-[32px] h-[28px] text-xs justify-center",
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

export default AccidentalKeysButtons;
