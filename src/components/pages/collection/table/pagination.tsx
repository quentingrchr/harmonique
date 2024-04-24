import Select from "@/components/shared/select/select";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useReactTable } from "@tanstack/react-table";

export default function Pagination<T>({
  table,
}: {
  table: ReturnType<typeof useReactTable<T>>;
}) {
  const itemsPerPage = table.getState().pagination.pageSize;

  const canGoPrevious = table.getCanPreviousPage();
  const canGoNext = table.getCanNextPage();
  const paginationNumber = table.getState().pagination.pageIndex + 1;

  function handleNextPage() {
    table.nextPage();
  }

  function handlePreviousPage() {
    table.previousPage();
  }

  function NavArrow({ direction }: { direction: "prev" | "next" }) {
    return (
      <button
        onClick={() =>
          direction === "prev" ? handlePreviousPage() : handleNextPage()
        }
        disabled={direction === "prev" ? !canGoPrevious : !canGoNext}
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-white ring-1 ring-inset ring-neutral-800 hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
      >
        <span className="sr-only">
          {direction === "prev" ? "Previous" : "Next"}
        </span>
        {direction === "prev" ? (
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between  bg-black px-4 py-4 sm:px-6 text-white border-b border-neutral-800">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border  px-4 py-2 text-sm font-medium "
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border  px-4 py-2 text-sm font-medium "
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-start sm:justify-between opacity-70">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Select
              withCheckIcons={false}
              label="Items per page"
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                table.setPageSize(parseInt(value));
              }}
              className="w-[8ch]"
              options={[
                {
                  label: "10",
                  value: "10",
                },
                {
                  label: "25",
                  value: "25",
                },
                {
                  label: "50",
                  value: "50",
                },
                {
                  label: "100",
                  value: "100",
                },
              ]}
            />
          </div>
          <p className="text-sm ">
            Showing{" "}
            <span className="font-medium">
              {paginationNumber * itemsPerPage - itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {paginationNumber * itemsPerPage >
              table.getFilteredRowModel().rows.length
                ? table.getFilteredRowModel().rows.length
                : paginationNumber * itemsPerPage}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <NavArrow direction="prev" />
            {/* Current: "z-10 bg-brand text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: " ring-1 ring-inset ring-neutral-800 hover:bg-gray-800 focus:outline-offset-0" */}
            {/* <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-brand px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-neutral-800 hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-neutral-800 hover:bg-gray-800 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-neutral-800 focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-neutral-800 hover:bg-gray-800 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-neutral-800 hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-neutral-800 hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
            >
              10
            </a> */}
            <NavArrow direction="next" />
          </nav>
        </div>
      </div>
    </div>
  );
}
