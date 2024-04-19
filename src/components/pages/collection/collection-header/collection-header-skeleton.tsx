import { MusicCollectionType } from "@/types";

interface Props {
  cover: string;
  type: MusicCollectionType;
  title: string;
  songsCount: number;
  featuredArtists: string[];
}

export default function CollectionHeader() {
  return (
    <div className="w-full">
      <div className="flex sm:flex-row flex-col gap-2 items-start">
        <div className="w-full flex-shrink-0 sm:w-[92px] sm:h-[92px] bg-gray-500 animate-pulse "></div>

        <div className="flex flex-col text-white h-full sm:min-h-[92px] justify-between">
          <div className="flex flex-col-reverse items-stretch justify-stretch gap-1">
            <div className="text-4xl sm:text-4xl font-bold h-8 w-[8ch] bg-gray-800 animate-pulse" />
            <div className="text-xs font-thin w-[10ch] bg-gray-900 animate-pulse h-3" />
          </div>
          <div className="text-xs font-extralight leading-none h-3 w-[20ch] bg-gray-950 animate-pulse"></div>{" "}
        </div>
      </div>
    </div>
  );
}
