import { GrNext, GrPrevious } from "react-icons/gr";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { Table } from "@tanstack/react-table";

type FooterProps = {
  table: Table<any>;
};

const Footer = ({ table }: FooterProps) => {
  const {
    getState,
    setPageIndex,
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
    getPrePaginationRowModel,
  } = table;
  const { pageIndex } = getState().pagination;
  const totalRows = getPrePaginationRowModel().rows.length;
  const btnClassFooter = "border-none bg-transparent p-2 focus:outline-none text-dark";

  return (
        <div className="flex items-center justify-end w-full py-1 bg-white rounded-b-xl">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <strong className="mr-2">{totalRows}</strong>
              <em>{totalRows > 1 ? "results" : "result"}</em>
            </div>
            <div className="flex items-center">
              <button
                className={`${btnClassFooter}`}
                onClick={() => setPageIndex(0)}
                disabled={!getCanPreviousPage}
                aria-label="Go to the first page!"
              >
                <MdSkipPrevious size="2em" />
              </button>
              <button
                className={`${btnClassFooter}`}
                onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))}
                disabled={!getCanPreviousPage}
                aria-label="Go to the previous page!"
              >
                <GrPrevious size="1.3em" />
              </button>
              <span className="flex items-center mx-2">
                <em className="mr-1">Page</em> <strong>{pageIndex + 1} of {getPageCount()}</strong>
              </span>
              <button
                className={`${btnClassFooter}`}
                onClick={() => setPageIndex(Math.min(pageIndex + 1, getPageCount() - 1))}
                disabled={!getCanNextPage}
                aria-label="Go to the next page!"
              >
                <GrNext size="1.3em" />
              </button>
              <button
                className={`${btnClassFooter}`}
                onClick={() => setPageIndex(getPageCount() - 1)}
                disabled={!getCanNextPage}
                aria-label="Go to the last page"
              >
                <MdSkipNext size="2em" />
              </button>
            </div>
          </div>
        </div>
  );
};

export default Footer;
