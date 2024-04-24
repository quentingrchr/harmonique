import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

export default function ExternalLink({ url }: { url: string }) {
  return (
    <div className="bg-gray-900 text-white rounded-full w-auto inline-block p-3 cursor-pointer relative">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0"
        title="Open in Spotify"
      ></a>
      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
    </div>
  );
}
