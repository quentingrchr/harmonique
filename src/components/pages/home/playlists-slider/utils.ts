import { SimplifiedPlaylistObject } from "@/libs/spotify/types";
import { PlaylistItem } from "./playlists-slider";

export function mapSimplifiedPlaylistToPlaylistSliderItem(
  playlist: SimplifiedPlaylistObject
): PlaylistItem {
  return {
    id: playlist.id,
    description: playlist.description || undefined,
    name: playlist.name,
    img: {
      src: playlist.images[0].url,
      alt: `${playlist.name} playlist`,
    },
    url: playlist.external_urls.spotify,
  };
}
