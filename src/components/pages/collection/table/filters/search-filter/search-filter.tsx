import Search from "@/components/shared/inputs/search";
import { useEffect, useState } from "react";

export default function SearchFilter({
  addFilter,
  resetFilter,
}: {
  addFilter: (value: string) => void;
  resetFilter: () => void;
}) {
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (searchValue === "") {
      resetFilter();
    }
  }, [searchValue, resetFilter]);

  return (
    <Search
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onSearchSubmit={(v) => addFilter(v)}
      clearValue={() => {
        setSearchValue("");
      }}
      placeholder="Search for a song"
    />
  );
}
