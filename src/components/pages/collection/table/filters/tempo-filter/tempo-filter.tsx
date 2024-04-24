import { TempoFilterValue } from "@/hooks/use-collection-filters/type";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as RadioGroup from "@radix-ui/react-radio-group";
import cn from "classnames";
import { useState } from "react";

function InputText(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={cn(
        "bg-gray-900 border border-gray-700 text-white rounded-md px-2 py-1.5 focus:border-brand outline-none",
        className
      )}
    />
  );
}

export default function TempoFilter({
  filterValue,
  setFilterValue,
  resetTempoFilter,
}: {
  filterValue: {
    min: number | null;
    max: number | null;
  };
  setFilterValue: (value: TempoFilterValue) => void;
  resetTempoFilter: () => void;
}) {
  const [type, setType] = useState<"exact" | "range">("exact");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [internalTempoValue, setInternalTempoValue] = useState<{
    min: number | null;
    max: number | null;
  }>({ min: null, max: null });

  function getTempoValue() {
    if (
      filterValue.max &&
      filterValue.min &&
      filterValue.max === filterValue.min
    ) {
      return `${filterValue.min}`;
    } else if (filterValue.max && filterValue.min) {
      return `${filterValue.min} - ${filterValue.max}`;
    } else {
      return undefined;
    }
  }

  function getFilterLabel() {
    const tempoValue = getTempoValue();
    if (tempoValue) {
      return tempoValue;
    } else {
      return "Tempo";
    }
  }

  function handleSubmit() {
    setErrorMessage(null);

    if (
      !internalTempoValue.min ||
      !internalTempoValue.max ||
      internalTempoValue.max < internalTempoValue.min ||
      internalTempoValue.min > internalTempoValue.max
    ) {
      setErrorMessage("Invalid range");
      return;
    }
    setFilterValue({
      min: internalTempoValue.min,
      max: internalTempoValue.max,
    });
  }

  function handleTempoChange(value: string, type?: "min" | "max") {
    setErrorMessage(null);
    const number = parseInt(value);
    if (isNaN(number)) {
      return;
    } else {
      if (type === "min") {
        setInternalTempoValue({ ...internalTempoValue, min: number });
      } else if (type === "max") {
        setInternalTempoValue({ ...internalTempoValue, max: number });
      } else {
        setInternalTempoValue({ min: number, max: number });
      }
    }
  }

  function handleFilterTypeClick(type: "exact" | "range") {
    setType(type);
    setInternalTempoValue({ min: null, max: null });
  }

  function RadioItem({ value }: { value: string }) {
    return (
      <RadioGroup.Item value={value} id={value}>
        <div className="flex items-center gap-2 size-4 relative rounded-full bg-white">
          <RadioGroup.Indicator className="top-1/2 left-1/2 absolute size-4 bg-brand rounded-full cursor-pointer flex justify-between items-center -translate-x-1/2 -translate-y-1/2" />
        </div>
      </RadioGroup.Item>
    );
  }

  function RadioLabel({
    value,
    children,
  }: {
    value: string;
    children: React.ReactNode;
  }) {
    return (
      <label className="" htmlFor={value}>
        {children}
      </label>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            "group flex border items-center justify-between border-gray-900 rounded-md py-2 px-3 text-sm text-white bg-black gap-2 outline-none focus:border-white overflow-hidden",
            {
              "bg-brand": getTempoValue(),
            }
          )}
        >
          <span>{getFilterLabel()}</span>
          <span
            className={cn(
              "rotate-180 transform transition-all duration-150 group-data-[state=open]:rotate-0"
            )}
          >
            <ChevronDownIcon className="h-4 w-4" />
          </span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={5}
        className="bg-gray-950 rounded-xl flex flex-col z-50"
      >
        <div className="flex flex-col gap-4 px-4 pt-4 pb-4 text-sm">
          <form>
            <RadioGroup.Root
              defaultValue="exact"
              aria-label="View density"
              className="flex flex-col gap-4"
              onValueChange={(value) => {
                handleFilterTypeClick(value as "exact" | "range");
              }}
              value={type}
            >
              <div className="flex items-center gap-2 py-1.5">
                <RadioItem value="exact" />
                <div className="flex items-center gap-8 relative">
                  <RadioLabel value="exact">Exact</RadioLabel>
                  <div
                    className={cn("flex gap-2", {
                      "opacity-0 select-none invisible": type !== "exact",
                    })}
                  >
                    <InputText
                      type="number"
                      className="max-w-[7ch]"
                      placeholder="BPM"
                      disabled={type !== "exact"}
                      tabIndex={type === "exact" ? 0 : -1}
                      onChange={(e) => {
                        handleTempoChange(e.target.value);
                      }}
                      value={
                        internalTempoValue.min
                          ? internalTempoValue.min.toFixed()
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RadioItem value="range" />
                <div className="flex items-center gap-8 relative">
                  <RadioLabel value="range">Range</RadioLabel>
                  <div
                    className={cn("flex gap-2 items-center", {
                      "opacity-0 select-none invisible": type !== "range",
                    })}
                  >
                    <InputText
                      type="number"
                      className="max-w-[7ch]"
                      placeholder="Min"
                      disabled={type !== "range"}
                      tabIndex={type === "range" ? 0 : -1}
                      onChange={(e) => {
                        handleTempoChange(e.target.value, "min");
                      }}
                      value={
                        internalTempoValue.min
                          ? internalTempoValue.min.toFixed()
                          : ""
                      }
                    />
                    <span className="text-white">-</span>
                    <InputText
                      type="number"
                      className="max-w-[7ch]"
                      placeholder="Max"
                      disabled={type !== "range"}
                      tabIndex={type === "range" ? 0 : -1}
                      onChange={(e) => {
                        handleTempoChange(e.target.value, "max");
                      }}
                      value={
                        internalTempoValue.max
                          ? internalTempoValue.max.toFixed()
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>
            </RadioGroup.Root>
          </form>
          {errorMessage && (
            <div className="text-red-800 text-xs">{errorMessage}</div>
          )}
        </div>
        <footer className="pb-4 pt-4 border-white/10 border-t">
          <DropdownMenu.Separator />
          {/* <hr className="border-red-500 w-full" /> */}
          <div className="flex justify-between px-4">
            <DropdownMenu.Item asChild>
              <button
                disabled={!internalTempoValue.max && !internalTempoValue.min}
                className="text-white text-xs hover:cursor-pointer disabled:cursor-not-allowed underline disabled:opacity-50"
                onClick={resetTempoFilter}
              >
                Clear
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <button
                className="text-white text-xs hover:cursor-pointer px-3 py-1.5 bg-brand rounded-md disabled:bg-gray-900 disabled:text-white/50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={
                  !!errorMessage ||
                  !internalTempoValue.max ||
                  !internalTempoValue.min
                }
              >
                Save
              </button>
            </DropdownMenu.Item>
          </div>
        </footer>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
