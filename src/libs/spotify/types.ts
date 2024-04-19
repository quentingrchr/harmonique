export interface SearchResponse {
  tracks: {
    href: string; // A link to the Web API endpoint returning the full result of the request
    limit: number; // The maximum number of items in the response
    next: string | null; // URL to the next page of items (null if none)
    offset: number; // The offset of the items returned
    previous: string | null; // URL to the previous page of items (null if none)
    total: number; // The total number of items available to return
    items: TrackObject[]; // Array of TrackObjects
  };
  artists: {
    href: string; // A link to the Web API endpoint returning the full result of the request
    limit: number; // The maximum number of items in the response
    next: string | null; // URL to the next page of items (null if none)
    offset: number; // The offset of the items returned
    previous: string | null; // URL to the previous page of items (null if none)
    total: number; // The total number of items available to return
    items: ArtistObject[]; // Array of ArtistObjects
  };
  albums: {
    href: string; // A link to the Web API endpoint returning the full result of the request
    limit: number; // The maximum number of items in the response
    next: string | null; // URL to the next page of items (null if none)
    offset: number; // The offset of the items returned
    previous: string | null; // URL to the previous page of items (null if none)
    total: number; // The total number of items available to return
    items: SimplifiedAlbumObject[]; // Array of SimplifiedAlbumObjects
  };
  playlists: {
    href: string; // A link to the Web API endpoint returning the full result of the request
    limit: number; // The maximum number of items in the response
    next: string | null; // URL to the next page of items (null if none)
    offset: number; // The offset of the items returned
    previous: string | null; // URL to the previous page of items (null if none)
    total: number; // The total number of items available to return
    items: SimplifiedPlaylistObject[]; // Array of SimplifiedPlaylistObjects
  };
}

export interface TrackObject {
  album: {
    album_type: string; // The type of the album: one of 'album', 'single', or 'compilation'
    total_tracks: number; // The total number of tracks in the album
    available_markets: string[]; // A list of the countries in which the album can be played, identified by their ISO 3166-1 alpha-2 code
    id: string; // Spotify ID for the album
    images: Image[];
    name: string; // The name of the album
    release_date: string; // The date the album was first released
  };
  artists: {
    name: string; // The name of the artist
    id: string; // Spotify ID for the artist
  }[];
  available_markets: string[]; // List of countries where the track can be played
  disc_number: number; // The disc number
  duration_ms: number; // Track length in milliseconds
  explicit: boolean; // Indicates if the track has explicit lyrics
  external_ids: {
    // Known external IDs for the track
    [key: string]: string;
  };
  external_urls: {
    // Known external URLs for this track
    [key: string]: string;
  };
  href: string; // A link to full details of the track
  id: string; // Spotify ID for the track
  is_playable: boolean; // Indicates if the track is playable in the given market
  linked_from: object | null; // Information about the originally requested track when relinking is applied
  restrictions: object | null; // Content restriction applied
  name: string; // The name of the track
  popularity: number; // The popularity of the track
  preview_url: string | null; // Link to a 30-second preview of the track (nullable)
  track_number: number; // The number of the track
  type: "track"; // The object type (only 'track' allowed)
  uri: string; // Spotify URI for the track
  is_local: boolean; // Indicates if the track is from a local file
}

export interface ArtistObject {
  external_urls: {
    // Known external URLs for this artist
    [key: string]: string;
  };
  followers: {
    // Information about the followers of the artist
    href: string; // A link to the Web API endpoint providing full details of the followers
    total: number; // The total number of followers
  };
  genres: string[]; // A list of the genres the artist is associated with
  href: string; // A link to the Web API endpoint providing full details of the artist
  id: string; // Spotify ID for the artist
  images: Image[];
  name: string; // The name of the artist
  popularity: number; // The popularity of the artist
  type: "artist"; // The object type (only 'artist' allowed)
  uri: string; // Spotify URI for the artist
}

export interface SimplifiedAlbumObject {
  href: string; // A link to the Web API endpoint returning the full result of the request
  // Other properties specific to SimplifiedAlbumObject if available
}

export interface SimplifiedPlaylistObject {
  href: string; // A link to the Web API endpoint returning the full result of the request
  collaborative: boolean; // Returns true if context is not search and the owner allows other users to modify the playlist
  description: string | null; // The playlist description. Only returned for modified, verified playlists, otherwise null
  external_urls: {
    // Known external URLs for this playlist
    [key: string]: string;
  };
  images: Image[];
  name: string; // The name of the playlist
  public: boolean | null; // The playlist's public/private status: true the playlist is public, false the playlist is private, null the playlist status is not relevant
  snapshot_id: string; // The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version
  tracks: {
    href: string; // A link to the Web API endpoint returning the full result of the request
    total: number; // The total number of tracks in the playlist
  };
  type: "playlist"; // The object type (only 'playlist' allowed)
  uri: string; // Spotify URI for the playlist
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface PagedItems<T> {
  href: string; // A link to the Web API endpoint returning the full result of the request
  limit: number; // The maximum number of items in the response
  next: string | null; // URL to the next page of items (null if none)
  offset: number; // The offset of the items returned
  previous: string | null; // URL to the previous page of items (null if none)
  total: number; // The total number of items available to return
  items: T[]; // Array of items
}

export interface SimplifiedPlaylistObject {
  collaborative: boolean; // Returns true if context is not search and the owner allows other users to modify the playlist
  description: string | null; // The playlist description. Only returned for modified, verified playlists, otherwise null
  external_urls: {
    // Known external URLs for this playlist
    [key: string]: string;
  };
  href: string; // A link to the Web API endpoint returning the full result of the request
  id: string; // The Spotify ID for the playlist
  images: Image[]; // Images for the playlist
  name: string; // The name of the playlist
  owner: any;
  public: boolean | null; // The playlist's public/private status: true the playlist is public, false the playlist is private, null the playlist status is not relevant
  tracks: {
    href: string; // A link to the Web API endpoint returning the full result of the request
    total: number; // The total number of tracks in the playlist
  };
}

export interface BrowsedPlaylistsResponse {
  message: string; // A message providing information the playlists browsed
  playlists: PagedItems<SimplifiedPlaylistObject>; // A list of simplified playlist objects
}

export interface PlaylistObject {
  collaborative: boolean; // Returns true if context is not search and the owner allows other users to modify the playlist
  description: string | null; // The playlist description. Only returned for modified, verified playlists, otherwise null
  external_urls: {
    // Known external URLs for this playlist
    [key: string]: string;
  };
  href: string; // A link to the Web API endpoint returning the full result of the request
  id: string; // The Spotify ID for the playlist
  images: Image[]; // Images for the playlist
  name: string; // The name of the playlist
  owner: any;
  public: boolean | null; // The playlist's public/private status: true the playlist is public, false the playlist is private, null the playlist status is not relevant
  tracks: {
    href: string; // A link to the Web API endpoint returning the full result of the request
    total: number; // The total number of tracks in the playlist
    items: PlaylistTrackObject[]; // Array of PlaylistTrackObject
  };
  type: "playlist";
  uri: string; // The Spotify URI for the track
}

export interface PlaylistTrackObject {
  added_at: string; // The date and time the track was added
  added_by: any;
  is_local: boolean; // Whether this track is a local file or not
  track: TrackObject; // The track
}

export interface AudioFeaturesObject {
  acounsticness: number; // A confidence measure from 0.0 to 1.0 of whether the track is acoustic
  analysis_url: string; // An HTTP URL to access the full audio analysis of this track
  danceability: number; // Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable
  duration_ms: number; // The duration of the track in milliseconds
  energy: number; // Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy
  id: string; // The Spotify ID for the track
  instrumentalness: number; // Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0
  key: number; // The key the track is in. Integers map to pitches using standard Pitch Class notation
  liveness: number; // Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live
  loudness: number; // The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks
  mode: number; // Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0
  speechiness: number; // Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music
  tempo: number; // The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration
  time_signature: number; // An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure)
  track_href: string; // A link to the Web API endpoint providing full details of the track
  type: "audio_features"; // The object type
  uri: string; // The Spotify URI for the track
  valence: number; // A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)
}

export interface AudioAnalysisObject {
  meta: {
    analyzer_version: string; // The analyzer version that generated this data
    platform: string; // The platform that generated this data
    // Metadata about the audio analysis
  };
  track: {
    num_samples: number; // The number of samples in the audio analysis of the track
    duration: number; // The duration of the track in seconds
    sample_md5: string; // The MD5 hash of the samples
    offset_seconds: number; // The offset in seconds of the start of the track
    window_seconds: number; // The window size in seconds used in the analysis
    analysis_sample_rate: number; // The analysis sample rate in Hz
    analysis_channels: number; // The number of channels used in the analysis
    end_of_fade_in: number; // The end of the first segment in seconds
    start_of_fade_out: number; // The start of the first segment in seconds
    loudness: number; // The overall loudness of the track in decibels (dB)
    tempo: number; // The tempo of the track in BPM
    tempo_confidence: number; // The confidence of the tempo
    time_signature: number; // The time signature of the track
    time_signature_confidence: number; // The confidence of the time signature
    key: number; // The estimated key of the track
    key_confidence: number; // The confidence of the key
    mode: number; // The estimated mode of the track
    mode_confidence: number; // The confidence of the mode
    codestring: string; // A base64-encoded string of the track
    code_version: number; // The version of the code
    echoprintstring: string; // A base64-encoded string of the echoprint
    echoprint_version: number; // The version of the echoprint
    synchstring: string; // A base64-encoded string of the synch
    synch_version: number; // The version of the synch
    rhythmstring: string; // A base64-encoded string of the rhythm
    rhythm_version: number; // The version of the rhythm
  };
}
