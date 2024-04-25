import Button from "@/components/shared/button";
import useCollectionFilters from "@/hooks/use-collection-filters";
import { getKeySignatureNotation } from "@/utils/tonal-keys";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ACTIONS } from "../../../../hooks/use-collection-filters/reducer";
import {
  ColumnFilterKeySignature,
  ColumnFilterSearch,
  ColumnFilterTempo,
  ColumnFiltersState,
} from "../../../../hooks/use-collection-filters/type";
import ExternalLink from "./external-link";
import Filters from "./filters/filters";
import Pagination from "./pagination";
import TextCell from "./text-cell";
import Track from "./track";
import { TableTrackEntry } from "./type";

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
    sortingFn: (a, b) => {
      const titleA = a.original.track.title;
      const titleB = b.original.track.title;
      return titleA.localeCompare(titleB);
    },
    filterFn: (row, columnId, filterValue: ColumnFilterSearch["value"]) => {
      const cellValueTitle = row.original.track.title.toLocaleLowerCase();
      const artists = row.original.track.artists.join(" ").toLocaleLowerCase();
      if (!filterValue) {
        return true;
      } else {
        const hasArtistMatch = artists.includes(filterValue);
        const hasTitleMatch = cellValueTitle.includes(filterValue);

        return hasArtistMatch || hasTitleMatch;
      }
    },
  },
  {
    accessorKey: "keySignature",
    header: "Key",
    filterFn: (
      row,
      columnId,
      filterValue: ColumnFilterKeySignature["value"]
    ) => {
      const cellValue = row.original.keySignature;

      if (!filterValue) {
        return true;
      } else {
        const filterKey = filterValue.key;
        const filterMode = filterValue.mode;
        if (filterKey && filterMode) {
          return (
            cellValue.key.value === filterKey &&
            cellValue.mode.value === filterMode
          );
        } else if (filterKey) {
          return cellValue.key.value === filterKey;
        } else if (filterMode) {
          return cellValue.mode.value === filterMode;
        } else {
          return true;
        }
      }
    },
    cell: (props) => {
      const keyValue =
        props.cell.getValue<TableTrackEntry["keySignature"]>().key.value;
      const modeValue =
        props.cell.getValue<TableTrackEntry["keySignature"]>().mode.value;
      return <TextCell text={getKeySignatureNotation(keyValue, modeValue)} />;
    },
    sortingFn: (a, b) => {
      const aKey = a.original.keySignature.key.value;
      const bKey = b.original.keySignature.key.value;
      const aMode = a.original.keySignature.mode.value;
      const bMode = b.original.keySignature.mode.value;
      const aKeyAndMode = `${aKey} ${aMode}`;
      const bKeyAndMode = `${bKey} ${bMode}`;
      return aKeyAndMode.localeCompare(bKeyAndMode);
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
    sortingFn: (a, b) => {
      return a.original.tempo.value - b.original.tempo.value;
    },
    filterFn: (row, columnId, filterValue: ColumnFilterTempo["value"]) => {
      const cellValue = row.original.tempo;
      if (!filterValue) {
        return true;
      } else {
        const min = filterValue.min;
        const max = filterValue.max;
        return cellValue.value >= min && cellValue.value <= max;
      }
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
  const [sortingState, setSortingState] = useState<SortingState>([]);
  const { filters, dispatch } = useCollectionFilters();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingState,
      columnFilters: filters,
    },
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSortingState,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel<ColumnFiltersState>(),
  });

  return (
    <div className="mt-7">
      <Filters
        addKeyFilter={(key) =>
          dispatch({
            type: ACTIONS.ADD_ACCIDENTAL_KEY_FILTER,
            payload: { key },
          })
        }
        addModeFilter={(mode) =>
          dispatch({ type: ACTIONS.ADD_MODE_FILTER, payload: { mode } })
        }
        resetKeySignatureFilter={() =>
          dispatch({ type: ACTIONS.CLEAR_KEY_SIGNATURE_FILTER })
        }
        clearKeyFilter={() =>
          dispatch({
            type: ACTIONS.CLEAR_KEY_SIGNATURE_FILTER,
            payload: { id: "key" },
          })
        }
        clearModeFilter={() =>
          dispatch({
            type: ACTIONS.CLEAR_KEY_SIGNATURE_FILTER,
            payload: { id: "mode" },
          })
        }
        addTempoFilter={(tempoRange) => {
          dispatch({
            type: ACTIONS.ADD_TEMPO_FILTER,
            payload: tempoRange,
          });
        }}
        resetTempoFilter={() => {
          dispatch({
            type: ACTIONS.REMOVE_FILTER,
            payload: { filter: "tempo" },
          });
        }}
        addSearchFilter={(value) => {
          dispatch({
            type: ACTIONS.ADD_SEARCH_FILTER,
            payload: {
              value,
            },
          });
        }}
        resetSearchFilter={() => {
          dispatch({
            type: ACTIONS.REMOVE_FILTER,
            payload: { filter: "track" },
          });
        }}
        filters={filters}
      />

      <div className="mt-7">
        <table className="w-full table-fixed">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left text-sm py-4 border-t border-b border-neutral-800 font-light opacity-90"
                  >
                    <div
                      className="flex items-center gap-2 select-none cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: <span className="pl-2">↑</span>,
                        desc: <span className="pl-2">↓</span>,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            <Rows
              rows={table.getRowModel().rows}
              resetFilters={() => {
                dispatch({ type: ACTIONS.RESET_FILTERS });
              }}
            />
          </tbody>
        </table>
        <Pagination<TableTrackEntry> table={table} />
      </div>
    </div>
  );
}

function Rows({
  rows,
  resetFilters,
}: {
  rows: Row<TableTrackEntry>[];
  resetFilters: () => void;
}) {
  if (rows.length === 0) {
    return (
      <tr>
        <td
          className="py-10 text-centerw-full justify-center items-center"
          colSpan={4}
        >
          <div className="w-full flex flex-col items-center justify-center gap-6">
            <MagnifyingGlassIcon className="w-7 h-7" />
            <div className="flex flex-col items-center justify-center gap-1">
              <h2 className="text-lg font-bold">No results found</h2>
              <p className="text-sm font-light opacity-80">
                Try adjusting your filters
              </p>
            </div>
            <Button onClick={resetFilters} size="sm" variant="outlineWhite">
              Reset filters
            </Button>
          </div>
        </td>
      </tr>
    );
  }
  return rows.map((row) => {
    return (
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
    );
  });
}
