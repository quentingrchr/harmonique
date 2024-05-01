import { useGetAudioFeatureOfTrackListItems } from "@/hooks/use-get-audio-feature-of-playlist-track-list-items";
import { trackWithAudioFeaturesToTableTrackEntry } from "@/utils/audio-feature";
import Table from "../table";
import { TrackListItem } from "./type";

export default function TracksList({
  tracks,
  musicCollectionId,
}: {
  tracks: TrackListItem[];
  musicCollectionId: string;
}) {
  const { data, isLoading, error } = useGetAudioFeatureOfTrackListItems(
    tracks,
    musicCollectionId
  );

  console.log({ data, isLoading, error }, "TracksList");

  if (isLoading) {
    return null;
  } else {
    return <Table data={data.map(trackWithAudioFeaturesToTableTrackEntry)} />;
  }
}
