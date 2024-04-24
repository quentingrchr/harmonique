import { TonalAccidentalKey, TonalMode } from "@/types";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import cn from "classnames";
import AccidentalKeysButtons from "./accidental-keys-buttons";
import TonalModeButtons from "./tonal-mode-buttons";

interface KeySignatureFilterProps {
  resetKeySignatureFilter: () => void;
  addKeyFilter: (key: TonalAccidentalKey) => void;
  addModeFilter: (mode: TonalMode) => void;
  keyValue?: TonalAccidentalKey;
  modeValue?: TonalMode;
  clearKeyFilter: () => void;
  clearModeFilter: () => void;
}
const KeySignatureFilter = ({
  resetKeySignatureFilter,
  addKeyFilter,
  addModeFilter,
  keyValue,
  modeValue,
  clearKeyFilter,
  clearModeFilter,
}: KeySignatureFilterProps) => {
  const getFilterLabel = () => {
    if (keyValue && modeValue) {
      return `${keyValue} ${modeValue}`;
    } else if (keyValue) {
      return keyValue;
    } else if (modeValue) {
      return modeValue;
    }
    return "Key";
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            "group flex border items-center justify-between border-gray-900 rounded-md py-2 px-3 text-sm text-white bg-black gap-2 outline-none focus:border-white overflow-hidden",
            {
              "bg-brand": keyValue || modeValue,
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

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="bg-gray-950 rounded-xl flex flex-col z-50"
        >
          <div className="flex flex-col gap-4 px-4 pt-4 pb-4">
            <AccidentalKeysButtons
              onKeyClick={addKeyFilter}
              value={keyValue}
              clearFilter={clearKeyFilter}
            />

            <TonalModeButtons
              onModeClick={addModeFilter}
              value={modeValue}
              clearFilter={clearModeFilter}
            />
          </div>

          <DropdownMenu.Separator />
          <footer className="pb-4 pt-4 border-white/10 border-t">
            <DropdownMenu.Separator />
            {/* <hr className="border-red-500 w-full" /> */}
            <div className="flex justify-between px-4">
              <DropdownMenu.Item asChild>
                <button
                  disabled={!keyValue && !modeValue}
                  className="text-white text-xs hover:cursor-pointer disabled:cursor-not-allowed underline disabled:opacity-50"
                  onClick={resetKeySignatureFilter}
                >
                  Clear
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <button className="text-white text-xs hover:cursor-pointer px-3 py-1.5 bg-brand rounded-md disabled:bg-gray-900 disabled:text-white/50">
                  Close
                </button>
              </DropdownMenu.Item>
            </div>
          </footer>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default KeySignatureFilter;
