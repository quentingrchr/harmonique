import {
  ColumnFilterKeySignature,
  ColumnFilterSearch,
  ColumnFilterTempo,
  TempoFilterValue,
} from "@/hooks/use-collection-filters/type";
import { TonalAccidentalKey, TonalMode } from "@/types";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ColumnFiltersState } from "@tanstack/react-table";
import KeySignatureFilter from "./key-signature-filter/key-signature-filter";
import SearchFilter from "./search-filter";
import FilterButton from "./shared/filter-button";
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
  addSearchFilter: (value: string) => void;
  resetSearchFilter: () => void;
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
  addSearchFilter,
  resetSearchFilter,
}: Props) {
  const keySignatureFilter = filters.find(
    (filter) => filter.id === "keySignature"
  ) as ColumnFilterKeySignature | undefined;

  const tempoFilterValue = filters.find((filter) => filter.id === "tempo") as
    | ColumnFilterTempo
    | undefined;

  const searchFilter = filters.find((filter) => filter.id === "track") as
    | ColumnFilterSearch
    | undefined;

  return (
    <div className="w-full flex flex-col sm:px-auto px-4">
      <div className="w-full flex justify-between">
        <div className="flex h-auto gap-4">
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
            resetFilter={resetTempoFilter}
          />
          {searchFilter?.value && (
            <FilterButton
              isActive={true}
              label={searchFilter?.value}
              onClick={resetSearchFilter}
              iconRight={<XMarkIcon className="size-4" />}
            />
          )}
        </div>
        <SearchFilter addFilter={addSearchFilter} />
      </div>
    </div>
  );
}
