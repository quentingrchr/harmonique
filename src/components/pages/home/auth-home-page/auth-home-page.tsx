import PlaylistsSlider from "@/components/pages/home/playlists-slider";
import PageContainer from "@/components/shared/page-container/page-container";
import { useHomePlaylists } from "@/hooks/use-home-playlists-sliders";

export default function Home() {
  const { chill, featured, party, users } = useHomePlaylists();

  return (
    <PageContainer horizontalMargin={false}>
      <main className="py-12 w-full">
        <div className="flex flex-col gap-4 md:gap-12">
          <PlaylistsSlider
            isLoading={users.isLoading}
            title="Your Spotify playlists"
            items={users.items}
          />
          <PlaylistsSlider
            isLoading={featured.isLoading}
            title="Spotify Today's featured"
            items={featured.items}
          />
          <PlaylistsSlider
            isLoading={chill.isLoading}
            title="Spotify Chill"
            items={chill.items}
          />
          <PlaylistsSlider
            isLoading={party.isLoading}
            title="Spotify Party"
            items={party.items}
          />
        </div>
      </main>
    </PageContainer>
  );
}
