import Image from "next/image";

const DEFAULT_ARTWORK = "/images/default-artwork.png";
export default function Track({
  image,
  artists,
  title,
}: {
  image: {
    url: string;
    alt: string;
  };
  artists: string[];
  title: string;
}) {
  return (
    <div className="flex gap-3 px-5">
      <Image
        className="h-9 w-9 rounded-none"
        width={100}
        height={100}
        src={image.url || DEFAULT_ARTWORK}
        alt={image.alt}
        title={"Track artwork for " + title}
      />
      <div className="flex flex-col justify-between py-[2px] overflow-hidden">
        <p
          className="text-sm font-semibold leading-none whitespace-nowrap overflow-hidden text-ellipsis w-full"
          title={title}
        >
          {title}
        </p>
        <p
          className="text-sm font-thin leading-none whitespace-nowrap overflow-hidden text-ellipsis w-full"
          title={artists.join(", ")}
        >
          {artists.join(", ")}
        </p>
      </div>
    </div>
  );
}
