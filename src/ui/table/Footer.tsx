import { GrNext, GrPrevious } from "react-icons/gr"; 
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { Colors } from "../../utils/enums";

type Pagination = {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
}

type FooterProps = {
  pagination: Pagination;
  setPageIndex: (pageIndex: number) => void;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  pagination: { pageIndex, pageCount, canPreviousPage, canNextPage },
  setPageIndex,
}) => {
  const btnClassFooter= "border-none bg-transparent p-2 focus:outline-none text-primary"
  return (
    <>
      <div className="flex justify-end">
        <button className={`${btnClassFooter}`} color={Colors.orange} onClick={() => setPageIndex(0)} disabled={!canPreviousPage} aria-label="Go to the first page!">
          <MdSkipPrevious size="2em" />
        </button>
        <button className={`${btnClassFooter}`} color={Colors.primary} onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))} disabled={!canPreviousPage} aria-label="Go to the previous page!">
        <GrPrevious size="1.3em"  />
        </button>

        <span className="flex items-center text-primary">
          <em className="me-1">Page</em><br/><strong> {pageIndex + 1} of {pageCount}</strong>
        </span>

        <button className={`${btnClassFooter}`} color={Colors.primary} onClick={() => setPageIndex(Math.min(pageIndex + 1, pageCount - 1))} disabled={!canNextPage} aria-label="Go to the next page!">
        <GrNext size="1.3em"  />

        </button>
        
        <button className={`${btnClassFooter}`} color={Colors.orange} onClick={() => setPageIndex(pageCount - 1)} disabled={!canNextPage} aria-label="Go to the last page">
        <MdSkipNext size="2em" />
        </button>
      </div>

    </>
  );
};

export default Footer;
