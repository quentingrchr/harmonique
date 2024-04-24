import {
  ColumnFilterKeySignature,
  ColumnFilterTempo,
  TempoFilterValue,
} from "@/hooks/use-collection-filters/type";
import { TonalAccidentalKey, TonalMode } from "@/types";
import { ColumnFiltersState } from "@tanstack/react-table";
import KeySignatureFilter from "./key-signature-filter/key-signature-filter";
import TempoFilter from "./tempo-filter";
interface Props {
  filters: ColumnFiltersState;
  resetKeySignatureFilter: () => void;
  addKeyFilter: (key: TonalAccidentalKey) => void;
  addModeFilter: (mode: TonalMode) => void;
  clearKeyFilter: () => void;
  clearModeFilter: () => void;
  addTempoFilter: (tempoRange: TempoFilterValue) => void;
  resetTempoFilter: () => void;
}

export default function Filters({
  filters,
  resetKeySignatureFilter,
  addKeyFilter,
  addModeFilter,
  clearKeyFilter,
  clearModeFilter,
  addTempoFilter,
  resetTempoFilter,
}: Props) {
  const keySignatureFilter = filters.find(
    (filter) => filter.id === "keySignature"
  ) as ColumnFilterKeySignature | undefined;

  const tempoFilterValue = filters.find((filter) => filter.id === "tempo") as
    | ColumnFilterTempo
    | undefined;

  return (
    <div className="w-full flex h-auto gap-4">
      <KeySignatureFilter
        addKeyFilter={addKeyFilter}
        addModeFilter={addModeFilter}
        resetKeySignatureFilter={resetKeySignatureFilter}
        keyValue={keySignatureFilter?.value?.key}
        modeValue={keySignatureFilter?.value?.mode}
        clearKeyFilter={clearKeyFilter}
        clearModeFilter={clearModeFilter}
      />
      <TempoFilter
        filterValue={
          tempoFilterValue?.value || {
            min: null,
            max: null,
          }
        }
        setFilterValue={addTempoFilter}
        resetTempoFilter={resetTempoFilter}
      />
    </div>
  );
}
