import Button from "../Button";
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
  return (
    <div className="flex justify-end">
      <Button color={Colors.orange} onClick={() => setPageIndex(0)} disabled={!canPreviousPage}>
        {"<<"}
      </Button>
      <Button color={Colors.primary} onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))} disabled={!canPreviousPage}>
        {"<"}
      </Button>

      <span className="flex items-center">
        Page <strong>{pageIndex + 1} of {pageCount}</strong>
      </span>

      <Button color={Colors.primary} onClick={() => setPageIndex(Math.min(pageIndex + 1, pageCount - 1))} disabled={!canNextPage}>
        {">"}
      </Button>
      <Button color={Colors.orange} onClick={() => setPageIndex(pageCount - 1)} disabled={!canNextPage}>
        {">>"}
      </Button>
    </div>
  );
};

export default Footer;
