import { TonalAccidentalKey, TonalMode } from "@/types";
import { TableTrackEntry } from "../../components/pages/collection/table/type";

interface BaseFilterColumn {
  id: keyof TableTrackEntry;
}

export type ColumnFiltersState = ColumnFilter[];
export interface ColumnFilterKeySignature extends BaseFilterColumn {
  id: "keySignature";
  value: {
    key?: TonalAccidentalKey;
    mode?: TonalMode;
  };
}

export interface ColumnFilterTempo extends BaseFilterColumn {
  id: "tempo";
  value: TempoFilterValue;
}

export type TempoFilterValue = {
  min: number;
  max: number;
};

export type ColumnFilter = ColumnFilterKeySignature | ColumnFilterTempo;
