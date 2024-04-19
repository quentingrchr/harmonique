import { PlaylistTrackObject } from "@/libs/spotify/types";
import { TableTrackEntry } from "./type";

export function playlistTrackObjectToTableTrackEntry(
  playlistTrack: PlaylistTrackObject
): TableTrackEntry {
  return {
    id: playlistTrack.track.id,
    track: {
      image: {
        url: playlistTrack.track.album.images[0].url,
        alt: playlistTrack.track.album.name,
      },
      artists: playlistTrack.track.artists.map((artist) => artist.name),
      title: playlistTrack.track.name,
    },
    key: {
      value: "F",
    },
    mode: {
      value: "Minor",
    },
    tempo: {
      value: 128,
    },
  };
}
