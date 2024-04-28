import getClient from "@/libs/spotify/api";
import { SearchResponse } from "@/libs/spotify/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import useGetUsersPlaylists from "../use-get-users-playlists";
import { SearchResult, SearchResultPossibleTypes } from "./types";
import {
  aggregateResults,
  getQueryParamsFromType,
  playlistToResult,
} from "./utils";

export function useSearchAMusicCollection(
  value: string,
  type?: SearchResultPossibleTypes | undefined
) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [usersPlaylistResults, setUsersPlaylistResults] = useState<
    SearchResult[]
  >([]);
  const client = getClient();
  const {
    data: searchResponse,
    error,
    isLoading,
  } = useQuery<AxiosResponse<SearchResponse>>({
    queryKey: ["search-a-music-collection", value],
    queryFn: () => {
      return client.get(
        `/search?q=${value}${getQueryParamsFromType(type)}`,
        {}
      );
    },
    enabled: !!value,
  });
  const {
    data: usersPlaylistsResponse,
    isLoading: userPlaylistsIsLoading,
    error: userPlaylistsError,
  } = useGetUsersPlaylists();

  useEffect(() => {
    if (searchResponse?.data) {
      const resultsAggregated = aggregateResults(searchResponse.data, value);
      const shortedResults = resultsAggregated.slice(0, 15);
      setSearchResults(shortedResults);
    }
  }, [searchResponse]);

  useEffect(() => {
    if (usersPlaylistsResponse && usersPlaylistsResponse.items) {
      const fullUserPlaylists =
        usersPlaylistsResponse.items.map(playlistToResult);

      const shortedUserPlaylists = fullUserPlaylists.slice(0, 5);
      setUsersPlaylistResults(shortedUserPlaylists);
    }
  }, [usersPlaylistsResponse]);

  return {
    searchResults: {
      data: searchResults,
      isLoading,
      error,
    },
    usersPlaylistResults: {
      data: usersPlaylistResults,
      isLoading: userPlaylistsIsLoading,
      error: userPlaylistsError,
    },
  };
}
