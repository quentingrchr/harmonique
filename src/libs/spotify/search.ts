import { DEFAULT_COVER_IMAGE } from "@/constants/spotify";
import { Image, SearchResponse, SimplifiedPlaylistObject } from "./types";

export interface Result {
  id: string;
  title: string;
  artist: string;
  cover: Image;
  type: "album" | "playlist" | "track" | "artist";
  searchTerms: string[];
}

export function playlistToResult(playlist: SimplifiedPlaylistObject): Result {
  return {
    id: playlist.href,
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

export function aggregateResults(
  data: SearchResponse,
  search: string
): Result[] {
  const results: Result[] = [];
  const { albums, artists, playlists, tracks } = data;
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

  playlists.items.forEach((playlist) => {
    results.push(playlistToResult(playlist));
  });

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

  return sortWithSearchTerm<Result>(search, results);
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
