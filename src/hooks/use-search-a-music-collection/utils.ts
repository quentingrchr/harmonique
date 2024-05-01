import { DEFAULT_COVER_IMAGE } from "@/constants/spotify";
import { SearchResponse, SimplifiedPlaylistObject } from "@/libs/spotify/types";
import { SearchResult, SearchResultPossibleTypes } from "./types";

export function playlistToResult(
  playlist: SimplifiedPlaylistObject
): SearchResult {
  return {
    id: playlist.id,
    searchTerms: [playlist.name],
    title: playlist.name,
    artist: "unknown",
    cover: {
      height: playlist?.images[0]?.height ?? 300,
      url: playlist?.images[0]?.url ?? DEFAULT_COVER_IMAGE,
      width: playlist?.images[0]?.width ?? 300,
    },
    type: "playlist",
  };
}

/**
 * Function to sort an array of objects by a search term. Item with the most matches will be first.
 * @param search The search term
 * @param array The array of objects to sort
 */
function sortWithSearchTerm<
  T extends {
    searchTerms: string[];
  }
>(search: string, array: T[]): T[] {
  const searchTerm = search.toLowerCase();
  const sorted = array.sort((a, b) => {
    const aMatches = a.searchTerms.filter((term) =>
      term.toLowerCase().includes(searchTerm)
    );
    const bMatches = b.searchTerms.filter((term) =>
      term.toLowerCase().includes(searchTerm)
    );
    return bMatches.length - aMatches.length;
  });
  return sorted;
}

export function aggregateResults(
  data: SearchResponse,
  search: string
): SearchResult[] {
  const results: SearchResult[] = [];
  const { albums, artists, playlists, tracks } = data;

  if (artists && artists.items.length) {
    artists.items.forEach((artist) => {
      results.push({
        searchTerms: [artist.name],
        id: artist.id,
        title: artist.name,
        artist: artist.name,
        cover: {
          height: artist?.images[0]?.height ?? 300,
          url: artist?.images[0]?.url ?? DEFAULT_COVER_IMAGE,
          width: artist?.images[0]?.width ?? 300,
        },
        type: "artist",
      });
    });
  }

  if (playlists && playlists.items.length) {
    playlists.items.forEach((playlist) => {
      results.push(playlistToResult(playlist));
    });
  }

  if (tracks && tracks.items.length) {
    tracks.items.forEach((track) => {
      results.push({
        id: track.id,
        searchTerms: [track.name, track.artists[0].name],
        title: track.name,
        artist: track.artists[0].name,
        cover: {
          height: track.album.images[0]?.height ?? 300,
          url: track.album?.images[0]?.url ?? DEFAULT_COVER_IMAGE,
          width: track.album?.images[0]?.width ?? 300,
        },
        type: "track",
      });
    });
  }

  if (albums && albums.items.length) {
    albums.items.forEach((album) => {
      results.push({
        id: album.id,
        searchTerms: [album.name, album.artists[0].name],
        title: album.name,
        artist: album.artists[0].name,
        cover: {
          height: album.images[0]?.height ?? 300,
          url: album?.images[0]?.url ?? DEFAULT_COVER_IMAGE,
          width: album?.images[0]?.width ?? 300,
        },
        type: "album",
      });
    });
  }

  return sortWithSearchTerm<SearchResult>(search, results);
}

export function getQueryParamsFromType(
  type: SearchResultPossibleTypes | undefined
) {
  if (!type) {
    return "&type=playlist%2Ctrack%2Cartist&limit=2";
  }
  return `&type=${type}`;
}
