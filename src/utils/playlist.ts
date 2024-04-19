import { PlaylistObject } from "@/libs/spotify/types";

// @todo add test
// -test for playlist with no tracks
// -test for playlist with 1 artist
// -test for playlist with 2 artists
// -test for playlist with 3 artists
// -test for playlist with 1 track or less than 3
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
