import MusicCollectionHeader from "@/components/pages/collection/collection-header";
import PageContainer from "@/components/shared/page-container/page-container";
import useGetPlaylistByIdQuery from "@/hooks/use-get-playlist-by-id";
import useGetWindowLayout from "@/hooks/use-get-window-layout";
import { getFeaturedArtistsFromPlaylistObject } from "@/utils/playlist";
import TracksList from "../tracks-list";
import PlaylistPageSkeleton from "./playlist-page-skeleton";

export default function PlaylistPage({ id }: { id: string }) {
  const { data, error, isLoading } = useGetPlaylistByIdQuery(id);
  const layout = useGetWindowLayout();

  if (isLoading || !data) {
    return <PlaylistPageSkeleton />;
  }

  const trackListItems = data.tracks.items.map((item) => item.track);

  return (
    <PageContainer horizontalMargin={layout === "desktop" ? true : false}>
      <div className="mt-12 w-full">
        <MusicCollectionHeader
          title={data.name}
          cover={data.images[0].url}
          type="playlist"
          songsCount={data.tracks.total}
          featuredArtists={getFeaturedArtistsFromPlaylistObject(data)}
          spotifyUrl={data.external_urls.spotify}
        />
        <TracksList tracks={trackListItems} musicCollectionId={id} />
      </div>
    </PageContainer>
  );
}
