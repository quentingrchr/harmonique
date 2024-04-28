import { Image } from "@/libs/spotify/types";

export type SearchResultPossibleTypes =
  | "album"
  | "playlist"
  | "track"
  | "artist";

export interface SearchResult {
  id: string;
  title: string;
  artist: string;
  cover: Image;
  type: SearchResultPossibleTypes;
  searchTerms: string[];
}
