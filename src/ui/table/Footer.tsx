import { Table } from "@tanstack/react-table";
import { Next, Previous, SkipNext, SkipPrevious } from "../../icons";

type FooterProps = {
  table: Table<any>;
  onPageSizeChange: (pageSize: number) => void;
};

const Footer = ({ table, onPageSizeChange }: FooterProps) => {
  const {
    getState,
    setPageIndex,
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
    getPrePaginationRowModel,
  } = table;

  const pageCount = getPageCount();
  const { pageIndex, pageSize } = getState().pagination;
  const totalRows = getPrePaginationRowModel().rows.length;

  // Styles Tailwind avec gestion du mode sombre par défaut
  const btnClassFooter = "border-none bg-transparent p-2 focus:outline-none text-dark dark:text-white";
  const containerClass = "flex items-center justify-end w-full py-0.5 text-sm rounded-b-xl bg-white dark:bg-neutral-800 text-dark dark:text-white";
  const inputClass = "w-12 p-1 mr-4 text-center border rounded text-primary dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary";

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = Number(event.target.value);
    onPageSizeChange(newPageSize);
  };

  return (
    <div className={containerClass}>
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <strong className="mr-2">{totalRows}</strong>
          <em>{totalRows > 1 ? "results" : "result"}</em>
        </div>
        <div className="flex items-center">
          <button
            className={btnClassFooter}
            onClick={() => setPageIndex(0)}
            disabled={!getCanPreviousPage()}
            aria-label="Go to the first page!"
          >
            <SkipPrevious size="2em" />
          </button>
          <button
            className={btnClassFooter}
            onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))}
            disabled={!getCanPreviousPage()}
            aria-label="Go to the previous page!"
          >
            <Previous size="1.3em" />
          </button>
          <span className="flex items-center mx-2">
            <em className="mr-1">Page</em> <strong>{pageIndex + 1} of {pageCount}</strong>
          </span>
          <button
            className={btnClassFooter}
            onClick={() => setPageIndex(Math.min(pageIndex + 1, pageCount - 1))}
            disabled={!getCanNextPage()}
            aria-label="Go to the next page!"
          >
            <Next size="1.3em" />
          </button>
          <button
            className={btnClassFooter}
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={!getCanNextPage()}
            aria-label="Go to the last page"
          >
            <SkipNext size="2em" />
          </button>
          <div className="flex items-center ml-4">
            <label htmlFor="pageSize" className="mr-2 italic">
              Rows per page:
            </label>
            <input
              id="pageSize"
              type="number"
              min="1"
              max={totalRows}
              value={pageSize}
              onChange={handlePageSizeChange}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
