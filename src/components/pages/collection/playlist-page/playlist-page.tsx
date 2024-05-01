import MusicCollectionHeader from "@/components/pages/collection/collection-header";
import PageContainer from "@/components/shared/page-container/page-container";
import useGetPlaylistByIdQuery from "@/hooks/use-get-playlist-by-id";
import { getFeaturedArtistsFromPlaylistObject } from "@/utils/playlist";
import TracksList from "../tracks-list";
import PlaylistPageSkeleton from "./playlist-page-skeleton";

export default function PlaylistPage({ id }: { id: string }) {
  const { data, error, isLoading } = useGetPlaylistByIdQuery(id);

  if (isLoading || !data) {
    return <PlaylistPageSkeleton />;
  }

  const trackListItems = data.tracks.items.map((item) => item.track);

  return (
    <PageContainer>
      <div className="mt-12 w-full">
        <MusicCollectionHeader
          title={data.name}
          cover={data.images[0].url}
          type="playlist"
          songsCount={data.tracks.total}
          featuredArtists={getFeaturedArtistsFromPlaylistObject(data)}
        />
        <TracksList tracks={trackListItems} playlistId={id} />
      </div>
    </PageContainer>
  );
}
