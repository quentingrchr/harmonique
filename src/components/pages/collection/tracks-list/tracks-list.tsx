import { useGetAudioFeatureOfPlaylistTracks } from "@/hooks/use-get-audio-feature-of-playlist-tracks";
import { PlaylistTrackObject } from "@/libs/spotify/types";
import { trackWithAudioFeaturesToTableTrackEntry } from "@/utils/audio-feature";
import Table from "../table";

export default function TracksList({
  tracks,
  playlistId,
}: {
  tracks: PlaylistTrackObject[];
  playlistId: string;
}) {
  const { data, isLoading } = useGetAudioFeatureOfPlaylistTracks(
    tracks,
    playlistId
  );

  if (isLoading) {
    return null;
  } else {
    return <Table data={data.map(trackWithAudioFeaturesToTableTrackEntry)} />;
  }
}
