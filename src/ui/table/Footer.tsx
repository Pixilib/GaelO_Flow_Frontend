import { GrNext, GrPrevious } from "react-icons/gr";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { Table } from "@tanstack/react-table";

type FooterProps = {
  table: Table<any>;
}
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

  return (
    <div className="flex justify-end w-full bg-white border-t-2 border-gray-200 rounded shadow-md">
      <div className="flex items-center justify-between flex-grow px-4 py-2">
        <div className="text-left">
          <strong>{totalRows}</strong>
          <em>{totalRows > 1 ? " results" : " result"}</em>
        </div>
        <div className="flex">
          <button 
            className="p-2 bg-transparent focus:outline-none text-dark"
            onClick={() => setPageIndex(0)} 
            disabled={!getCanPreviousPage}
            aria-label="Go to the first page!"
          >
            <MdSkipPrevious size="2em" />
          </button>
          <button 
            className="p-2 bg-transparent focus:outline-none text-dark"
            onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))} 
            disabled={!getCanPreviousPage}
            aria-label="Go to the previous page!"
          >
            <GrPrevious size="1.3em" />
          </button>

          <span className="flex items-center px-3">
            <em>Page</em> <strong> {pageIndex + 1} of {getPageCount()}</strong>
          </span>

          <button 
            className="p-2 bg-transparent focus:outline-none text-dark"
            onClick={() => setPageIndex(Math.min(pageIndex + 1, getPageCount() - 1))} 
            disabled={!getCanNextPage}
            aria-label="Go to the next page!"
          >
            <GrNext size="1.3em" />
          </button>
          <button 
            className="p-2 bg-transparent focus:outline-none text-dark"
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
