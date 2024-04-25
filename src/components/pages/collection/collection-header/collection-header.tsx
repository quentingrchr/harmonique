import { MusicCollectionType } from "@/types";
import {
  getFeaturedArtistsLabel,
  getMusicCollectionLabel,
} from "@/utils/music-collection";

interface Props {
  cover: string;
  type: MusicCollectionType;
  title: string;
  songsCount: number;
  featuredArtists: string[];
}

export default function CollectionHeader({
  cover,
  type,
  title,
  songsCount,
  featuredArtists,
}: Props) {
  function getSongCountLabel(songsCount: number) {
    return songsCount === 1 ? "1 song" : `${songsCount} songs`;
  }
  return (
    <div className="w-full">
      <div className="flex sm:flex-row flex-col gap-2 items-start">
        <div className="w-full flex-shrink-0 sm:w-[92px] sm:h-[92px] rounded-sm">
          <img
            className="h-[100px] w-[100px]  object-cover object-center rounded-sm"
            src={cover}
            alt={`Cover artwork of ${title}`}
            height={500}
            width={500}
          />
        </div>

        <div className="flex flex-col text-white h-full sm:min-h-[92px] justify-between">
          <div className="flex flex-col-reverse items-stretch justify-stretch">
            <h1 className="text-4xl sm:text-4xl font-bold">{title}</h1>
            <p className="text-xs font-thin">{getMusicCollectionLabel(type)}</p>
          </div>
          <p className="text-xs font-extralight leading-none">
            {getSongCountLabel(songsCount)} •{" "}
            {getFeaturedArtistsLabel(featuredArtists)}
          </p>
        </div>
      </div>
    </div>
  );
}
