import {
  TonalKey,
  TonalMode,
} from "@/hooks/use-get-audio-feature-of-playlist-tracks/type";

export interface TableTrackEntry {
  id: string;
  track: {
    image: {
      url: string;
      alt: string;
    };
    artists: string[];
    title: string;
    external_spotify_url: string;
  };
  key: {
    value: TonalKey;
    confidence?: number;
  };
  mode: {
    value: TonalMode;
    confidence?: number;
  };
  tempo: {
    value: number;
    confidence?: number;
  };
}
