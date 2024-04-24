import { PlaylistObject } from "@/libs/spotify/types";


export function getFeaturedArtistsFromPlaylistObject(
  playlist: PlaylistObject
): string[] {
  const listOfArtists = playlist.tracks.items.map((item) => item.track.artists);
  // count occurrences of each artist
  const artistCount = listOfArtists.reduce((acc, artists) => {
    artists.forEach((artist) => {
      if (acc[artist.name]) {
        acc[artist.name] += 1;
      } else {
        acc[artist.name] = 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);
  // sort artists by count
  const sortedArtists = Object.keys(artistCount).sort(
    (a, b) => artistCount[b] - artistCount[a]
  );
  return sortedArtists.slice(0, 3);
}
