import { mapSimplifiedPlaylistToPlaylistSliderItem } from "@/components/pages/home/playlists-slider/utils";
import useGetCategoryPlaylists from "../use-get-category-playlists";
import useGetFeaturedPlaylists from "../use-get-featured-playlists";
import useGetUsersPlaylists from "../use-get-users-playlists";

export function useHomePlaylists() {
  const usersPlaylists = useGetUsersPlaylists();
  const featuredPlaylists = useGetFeaturedPlaylists();
  const chillPlaylists = useGetCategoryPlaylists({ categoryId: "chill" });
  const party = useGetCategoryPlaylists({ categoryId: "party" });

  const usersPlaylistsCollectionItems = usersPlaylists.data
    ? usersPlaylists.data?.items.map(mapSimplifiedPlaylistToPlaylistSliderItem)
    : undefined;

  const featuredPlaylistsCollectionItems = featuredPlaylists.data
    ? featuredPlaylists.data?.playlists.items.map(
        mapSimplifiedPlaylistToPlaylistSliderItem
      )
    : undefined;

  const chillPlaylistsCollectionItems = chillPlaylists.data
    ? chillPlaylists.data?.playlists.items.map(
        mapSimplifiedPlaylistToPlaylistSliderItem
      )
    : undefined;

  const partyPlaylistsCollectionItems = party.data
    ? party.data?.playlists.items.map(mapSimplifiedPlaylistToPlaylistSliderItem)
    : undefined;

  return {
    users: {
      isLoading: usersPlaylists.isLoading,
      items: usersPlaylistsCollectionItems,
      error: usersPlaylists.error,
    },
    featured: {
      isLoading: featuredPlaylists.isLoading,
      items: featuredPlaylistsCollectionItems,
      error: featuredPlaylists.error,
    },
    chill: {
      isLoading: chillPlaylists.isLoading,
      items: chillPlaylistsCollectionItems,
      error: chillPlaylists.error,
    },
    party: {
      isLoading: party.isLoading,
      items: partyPlaylistsCollectionItems,
      error: party.error,
    },
  };
}
