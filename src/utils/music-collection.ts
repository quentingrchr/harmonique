import { MusicCollectionType } from "@/types";

export function getMusicCollectionLabel(type: MusicCollectionType) {
  switch (type) {
    case "album":
      return "Album";
    case "playlist":
      return "Playlist";
    case "artist":
      return "Artist";
  }
}

export function getFeaturedArtistsLabel(artists: string[]) {
  if (artists.length > 2) {
    return `${artists[0]}, ${artists[1]} and more`;
  }
  return artists.join(", ");
}
