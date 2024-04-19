import { PlaylistObject } from "@/libs/spotify/types";
import { getFeaturedArtistsFromPlaylistObject } from "@/utils/playlist";

const emptyPlaylist: PlaylistObject = {
  collaborative: false,
  description: "",
  external_urls: {
    spotify: "",
  },
  href: "",
  id: "",
  images: [],
  name: "",
  owner: {
    display_name: "",
    external_urls: {
      spotify: "",
    },
    href: "",
    id: "",
    type: "",
    uri: "",
  },
  public: false,
  type: "playlist",
  uri: "",
  tracks: {
    href: "",
    total: 0,
    items: [],
  },
};

const playlistWithOneTrack: PlaylistObject = {
  collaborative: false,
  description: "",
  external_urls: {
    spotify: "",
  },
  href: "",
  id: "",
  images: [],
  name: "",
  owner: {
    display_name: "",
    external_urls: {
      spotify: "",
    },
    href: "",
    id: "",
    type: "",
    uri: "",
  },
  public: false,
  type: "playlist",
  uri: "",
  tracks: {
    href: "",
    total: 1,
    items: [
      {
        track: {
          artists: [
            {
              id: "1",
              name: "artist1",
            },
          ],
          album: {
            id: "1",
            name: "album1",
            images: [],
            album_type: "album",
            available_markets: [],
            release_date: "",
            total_tracks: 1,
          },
          is_playable: true,
          linked_from: {
            external_urls: {
              spotify: "",
            },
            href: "",
            id: "",
            type: "",
            uri: "",
          },
          restrictions: {},
          id: "1",
          name: "track1",
          available_markets: [],
          disc_number: 1,
          duration_ms: 1,
          explicit: false,
          external_ids: {
            isrc: "",
          },
          external_urls: {
            spotify: "",
          },
          href: "",
          popularity: 1,
          preview_url: "",
          track_number: 1,
          type: "track",
          is_local: false,
          uri: "",
        },

        is_local: false,
        added_at: "",
        added_by: {
          external_urls: {
            spotify: "",
          },
          href: "",
          id: "",
          type: "",
          uri: "",
        },
      },
    ],
  },
};

// -test for playlist with no tracks
// -test for playlist with 1 artist
describe("getFeaturedArtistsFromPlaylistObject", () => {
  it("should return an empty array when there are no tracks", () => {
    const playlist = {
      tracks: {
        items: [],
      },
    };
    expect(getFeaturedArtistsFromPlaylistObject(emptyPlaylist)).toEqual([]);
  });

  it("should return an array with one artist when there is one track", () => {
    expect(getFeaturedArtistsFromPlaylistObject(playlistWithOneTrack)).toEqual([
      "artist1",
    ]);
  });
});
