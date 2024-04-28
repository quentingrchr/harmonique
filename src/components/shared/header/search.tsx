"use client";
// import { Result, aggregateResults } from "@/lib/spotify-api/search";
import SearchInput from "@/components/shared/inputs/search";
import { useSearchAMusicCollection } from "@/hooks/use-search-a-music-collection";
import {
  SearchResult,
  SearchResultPossibleTypes,
} from "@/hooks/use-search-a-music-collection/types";
import NextLink from "next/link";
import React, { useEffect } from "react";
import Select from "../inputs/select/select";

function ResultList({
  results,
  headerText,
}: {
  results: SearchResult[];
  headerText?: string;
}) {
  if (results.length === 0) {
    return <NoResults />;
  }
  return (
    <ul className="flex flex-col gap-3 px-2 py-4 max-h-[600px] w-72 overflow-y-auto scrollbar-thin">
      {headerText && (
        <li>
          <p className="text-sm text-neutral-400">{headerText}</p>
        </li>
      )}

      {results.map((item, i) => (
        <li key={`${item.id}-${item.type}-${i}`} className="relative">
          <NextLink
            href={`collection/${item.type}/${item.id}`}
            // href="/"
            className="absolute inset-0"
          ></NextLink>
          <div className="flex items-center space-x-2 w-full overflow-hidden">
            <img
              src={item.cover.url}
              alt={item.title}
              className="h-7 w-7 rounded-md"
            />
            <div className="w-full overflow-hidden">
              <p className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                {item.title}
              </p>
              {item.type === "track" ? (
                <p className="text-xs text-muted-text">{item.artist}</p>
              ) : (
                <p className="text-xs text-muted-text capitalize">
                  {item.type}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function NoResults() {
  return (
    <div className="flex flex-col gap-3 px-2 py-4 justify-center h-12">
      <p className="text-sm text-neutral-400">No matches found</p>
    </div>
  );
}

type searchTermType = "all" | "playlist" | "artist";
export default function Search() {
  const [isFocused, setIsFocused] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchTermType, setSearchTermType] = React.useState<
    SearchResultPossibleTypes | "all"
  >("all");
  const { searchResults, usersPlaylistResults } = useSearchAMusicCollection(
    searchTerm,
    searchTermType === "all" ? undefined : searchTermType
  );
  const containerRef = React.useRef<HTMLDivElement>(null);

  function handleContainerClick(e: MouseEvent) {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsFocused(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleContainerClick);

    return () => {
      document.removeEventListener("click", handleContainerClick);
    };
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Select
        bg="lighter"
        label="options"
        options={[
          { label: "All", value: "all" },
          { label: "Playlists", value: "playlist" },
          { label: "Artists", value: "artist" },
          { label: "Albums", value: "album" },
        ]}
        className="min-w-[14ch]"
        withCheckIcons={false}
        value={searchTermType}
        onValueChange={(value) => setSearchTermType(value as searchTermType)}
      />
      <div
        className="relative scrollbar-thumb-white/25 scrollbar-track-gray-400"
        ref={containerRef}
      >
        <SearchInput
          placeholder="Search for a playlist or an artist"
          className="w-72"
          onFocus={() => setIsFocused(true)}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isFocused && (
          <div className="relative">
            <div className="top-0 absolute bg-gray-700 w-full">
              <span className="w-[90%] m-auto flex border-t-[1px] border-t-neutral-600"></span>
              {searchTerm.length === 0 && usersPlaylistResults.data ? (
                <ResultList
                  key="users-playlist-results"
                  results={usersPlaylistResults.data}
                  headerText="Your playlists"
                />
              ) : (
                <ResultList
                  key={"search-results"}
                  results={searchResults.data}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
