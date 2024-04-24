import { useReducer } from "react";
import { reducer } from "./reducer";

export function useCollectionFilters() {
  const [filters, dispatch] = useReducer(reducer, []);

  return {
    filters,
    dispatch,
  };
}

export default useCollectionFilters;
