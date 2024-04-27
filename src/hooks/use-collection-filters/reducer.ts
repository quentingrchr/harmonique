import { TonalAccidentalKey, TonalMode } from "@/types";
import { ColumnFilterKeySignature, ColumnFiltersState } from "./type";

export const ACTIONS = {
  RESET_FILTERS: "RESET_FILTERS",
  ADD_ACCIDENTAL_KEY_FILTER: "ADD_ACCIDENTAL_KEY_FILTER",
  ADD_MODE_FILTER: "ADD_MODE_FILTER",
  ADD_TEMPO_FILTER: "ADD_TEMPO_FILTER",
  CLEAR_KEY_SIGNATURE_FILTER: "CLEAR_KEY_SIGNATURE_FILTER",
  REMOVE_FILTER: "REMOVE_FILTER",
  ADD_SEARCH_FILTER: "ADD_SEARCH_FILTER",
} as const;

export interface AccidentalKeyFilterAction {
  type: typeof ACTIONS.ADD_ACCIDENTAL_KEY_FILTER;
  payload: {
    key: TonalAccidentalKey;
  };
}

export interface ModeFilterAction {
  type: typeof ACTIONS.ADD_MODE_FILTER;
  payload: {
    mode: TonalMode;
  };
}

export interface TempoFilterAction {
  type: typeof ACTIONS.ADD_TEMPO_FILTER;
  payload: {
    min: number;
    max: number;
  };
}

export interface ResetFilterAction {
  type: typeof ACTIONS.RESET_FILTERS;
}

export interface ClearKeySignatureFilterAction {
  type: typeof ACTIONS.CLEAR_KEY_SIGNATURE_FILTER;
  payload?: {
    // If key or mode is provided, only that part of the filter will be reset, otherwise the whole filter will be reset
    id: Partial<keyof ColumnFilterKeySignature["value"]>;
  };
}

export interface RemoveFilterAction {
  type: typeof ACTIONS.REMOVE_FILTER;
  payload: {
    filter: "keySignature" | "tempo" | "track";
  };
}

export interface SearchFilterAction {
  type: typeof ACTIONS.ADD_SEARCH_FILTER;
  payload: {
    value: string;
  };
}

export type ReducerAction =
  | AccidentalKeyFilterAction
  | ModeFilterAction
  | TempoFilterAction
  | ResetFilterAction
  | ClearKeySignatureFilterAction
  | RemoveFilterAction
  | SearchFilterAction;

export function reducer(
  state: ColumnFiltersState,
  action: ReducerAction
): ColumnFiltersState {
  switch (action.type) {
    case ACTIONS.RESET_FILTERS:
      return [];

    case ACTIONS.ADD_ACCIDENTAL_KEY_FILTER:
      const prevState = state;
      const payload = action.payload;
      const keyFilter = prevState.find(
        (filter) => filter.id === "keySignature"
      ) as ColumnFilterKeySignature | undefined;
      if (keyFilter) {
        return prevState.map((filter) => {
          if (filter.id === "keySignature") {
            return {
              ...filter,
              value: {
                ...filter.value,
                key: action.payload.key,
              },
            };
          }
          return filter;
        });
      } else {
        return [
          ...prevState,
          {
            id: "keySignature",
            value: {
              key: action.payload.key,
            },
          },
        ];
      }

    case ACTIONS.ADD_MODE_FILTER:
      const modeFilter = state.find(
        (filter) => filter.id === "keySignature"
      ) as ColumnFilterKeySignature | undefined;
      if (modeFilter) {
        return state.map((filter) => {
          if (filter.id === "keySignature") {
            return {
              ...filter,
              value: {
                ...filter.value,
                mode: action.payload.mode,
              },
            };
          }
          return filter;
        });
      } else {
        return [
          ...state,
          {
            id: "keySignature",
            value: {
              mode: action.payload.mode,
            },
          },
        ];
      }

    case ACTIONS.ADD_TEMPO_FILTER:
      return [
        ...state,
        {
          id: "tempo",
          value: {
            min: action.payload.min,
            max: action.payload.max,
          },
        },
      ];

    case ACTIONS.CLEAR_KEY_SIGNATURE_FILTER:
      const keySignatureFilter = state.find(
        (filter) => filter.id === "keySignature"
      ) as ColumnFilterKeySignature | undefined;
      if (action.payload !== undefined) {
        let id = action.payload.id;

        if (keySignatureFilter) {
          return state.map((filter) => {
            if (filter.id === "keySignature") {
              return {
                ...filter,
                value: {
                  ...filter.value,
                  [id]: undefined,
                },
              };
            } else {
              return filter;
            }
          });
        } else {
          return state;
        }
      } else {
        return state.filter((filter) => filter.id !== "keySignature");
      }

    case ACTIONS.REMOVE_FILTER:
      return state.filter((filter) => filter.id !== action.payload.filter);

    case ACTIONS.ADD_SEARCH_FILTER:
      if (state.find((filter) => filter.id === "track")) {
        return state.map((filter) => {
          if (filter.id === "track") {
            return {
              ...filter,
              value: action.payload.value,
            };
          }
          return filter;
        });
      } else {
        return [
          ...state,
          {
            id: "track",
            value: action.payload.value,
          },
        ];
      }

    default:
      return state;
  }
}
