import Search from "@/components/shared/inputs/search";
import { useState } from "react";

export default function SearchFilter({
  addFilter,
}: {
  addFilter: (value: string) => void;
}) {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <Search
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onSearchSubmit={(v) => {
        addFilter(v);
        setSearchValue("");
      }}
      clearValue={() => {
        setSearchValue("");
      }}
      placeholder="Search for a song"
    />
  );
}
