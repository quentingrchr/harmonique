import { MusicCollectionType } from "@/types";
import {
  getFeaturedArtistsLabel,
  getMusicCollectionLabel,
} from "@/utils/music-collection";
import Image from "next/image";
import Link from "next/link";

interface Props {
  cover: string;
  type: MusicCollectionType;
  title: string;
  songsCount: number;
  featuredArtists: string[];
  spotifyUrl: string;
}

export default function CollectionHeader({
  cover,
  type,
  title,
  songsCount,
  featuredArtists,
  spotifyUrl,
}: Props) {
  function getSongCountLabel(songsCount: number) {
    return songsCount === 1 ? "1 song" : `${songsCount} songs`;
  }
  return (
    <div className="w-full">
      <div className="flex sm:flex-row flex-col gap-2 items-start">
        <div className="w-full flex-shrink-0 sm:w-[92px] sm:h-[92px] rounded-none">
          <img
            className="h-[92px] w-[92px] object-cover object-center rounded-none"
            src={cover}
            alt={`Cover artwork of ${title}`}
            height={500}
            width={500}
          />
        </div>

        <div className="flex flex-col text-white h-full sm:min-h-[92px] justify-between">
          <div className="flex flex-col-reverse items-stretch justify-stretch">
            <h1 className="text-4xl sm:text-4xl font-bold" title={title}>
              {title}
            </h1>
            <p className="text-xs font-thin">{getMusicCollectionLabel(type)}</p>
          </div>
          <div></div>
          <div className="flex items-center gap-1"></div>
          <p
            className="text-xs font-extralight leading-none"
            title={featuredArtists.join(", ")}
          >
            {spotifyUrl && (
              <>
                <Link
                  href={spotifyUrl}
                  target="_blank"
                  className="cursor-pointer"
                >
                  <Image
                    src="/spotify-guideline-logo.png"
                    alt="spotify icon"
                    className="w-4 h-4 inline-block relative z-10"
                    width={40}
                    height={40}
                  />
                </Link>{" "}
              </>
            )}
            • {getSongCountLabel(songsCount)} •{" "}
            {getFeaturedArtistsLabel(featuredArtists)}
          </p>
        </div>
      </div>
    </div>
  );
}
