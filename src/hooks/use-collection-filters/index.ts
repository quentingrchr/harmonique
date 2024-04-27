import { useEffect, useReducer } from "react";
import { reducer } from "./reducer";

export function useCollectionFilters() {
  const [filters, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    console.log("filter changed", filters);
  }, [filters]);

  return {
    filters,
    dispatch,
  };
}

export default useCollectionFilters;
