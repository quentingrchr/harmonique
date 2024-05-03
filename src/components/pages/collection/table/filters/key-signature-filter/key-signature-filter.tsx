import Button from "@/components/shared/button";
import { TonalAccidentalKey, TonalMode } from "@/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ClearButton from "../shared/clear-button";
import DropdownButton from "../shared/dropdown-button";
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
      <DropdownMenu.Trigger>
        <DropdownButton
          isActive={Boolean(keyValue || modeValue)}
          label={getFilterLabel()}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="bg-gray-900 rounded-xl flex flex-col z-50"
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
                <ClearButton
                  onClick={resetKeySignatureFilter}
                  disabled={!keyValue && !modeValue}
                />
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Button onClick={() => {}}>Close</Button>
              </DropdownMenu.Item>
            </div>
          </footer>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default KeySignatureFilter;
