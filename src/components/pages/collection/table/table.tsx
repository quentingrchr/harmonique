import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import cn from "classnames";
import Image from "next/image";
import { TableTrackEntry } from "./type";

const DEFAULT_ARTWORK = "/images/default-artwork.png";
function Track({
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
        className="h-9 w-9"
        width={100}
        height={100}
        src={image.url || DEFAULT_ARTWORK}
        alt={image.alt}
      />
      <div className="flex flex-col justify-between py-[2px] overflow-hidden ">
        <p className="text-sm font-semibold leading-none whitespace-nowrap overflow-hidden text-ellipsis w-full">
          {title}
        </p>
        <p className="text-sm font-thin leading-none whitespace-nowrap overflow-hidden text-ellipsis w-full">
          {artists.join(", ")}
        </p>
      </div>
    </div>
  );
}

function TextCell({ text, percent }: { text: string; percent?: number }) {
  return (
    <div className="flex flex-row items-center gap-3">
      <p className="text-lg font-thin leading-none">{text}</p>
      {percent && (
        <Badge percent={percent} title={"This is a percentage of accuracy"} />
      )}
    </div>
  );
}

function ExternalLink({ url }: { url: string }) {
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

function Badge({ percent, title }: { percent: number; title?: string }) {
  function getBadgeColor(percent: number) {
    if (percent <= 10) {
      return "bg-[#290000] text-red-600 border-red-600";
    } else if (percent < 30) {
      return "bg-[#231B01] text-yellow-600 border-yellow-600";
    } else if (percent >= 30) {
      return "bg-[#151816] text-green-600 border-green-600";
    }
  }
  return (
    <span
      title={title}
      className={cn(
        "text-[10px] px-1.5 py-1 border rounded border-1",
        getBadgeColor(percent)
      )}
    >
      {percent}%
    </span>
  );
}

interface Props {
  data: TableTrackEntry[];
}

const columns: ColumnDef<TableTrackEntry>[] = [
  {
    accessorKey: "track",
    header: "Track",
    cell: (props) => {
      const value = props.cell.getValue<TableTrackEntry["track"]>();
      return <Track {...value} />;
    },
  },
  {
    accessorKey: "key",
    header: "Key",
    cell: (props) => {
      const value = props.cell.getValue<TableTrackEntry["key"]>();
      return <TextCell text={value.value} />;
    },
  },
  {
    accessorKey: "mode",
    header: "Mode",
    cell: (props) => {
      const value = props.cell.getValue<TableTrackEntry["mode"]>();
      return <TextCell text={value.value} />;
    },
  },
  {
    accessorKey: "tempo",
    header: "Tempo",
    cell: (props) => {
      const value = props.cell.getValue<TableTrackEntry["tempo"]>();
      const roundedValue = Math.round(value.value).toFixed(0);
      return <TextCell text={roundedValue} />;
    },
  },
  {
    accessorKey: "track.external_spotify_url",
    header: "",
    cell: (props) => {
      const value =
        props.cell.getValue<TableTrackEntry["track"]["external_spotify_url"]>();
      return (
        <div className="w-full flex justify-end px-5">
          <ExternalLink url={value} />
        </div>
      );
    },
  },
];

export default function Table({ data }: Props) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="mt-7">
      <table className="w-full table-fixed">
        <thead>
          <tr>
            {table.getHeaderGroups()[0].headers.map((header) => (
              <th
                className="text-left text-sm py-4 border-t border-b border-neutral-800 font-light opacity-90"
                key={header.id}
              >
                {header.column.columnDef.header as string}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b-[1px] px-3 border-b-neutral-800 gap-8"
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id} className=" py-3.5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
