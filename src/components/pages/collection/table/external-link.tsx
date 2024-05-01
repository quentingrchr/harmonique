import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function ExternalLink({
  url,
  type = "spotify",
}: {
  url: string;
  type?: "spotify" | "others";
}) {
  return (
    <div className="bg-gray-900 text-white rounded-full w-auto inline-block p-3 cursor-pointer relative">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0"
        title="Open in Spotify"
      ></a>
      {type === "spotify" ? (
        <Image
          src="/spotify-guideline-logo.png"
          alt="spotify logo"
          className="w-4 h-4"
          width={24}
          height={24}
        />
      ) : (
        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
      )}
    </div>
  );
}
