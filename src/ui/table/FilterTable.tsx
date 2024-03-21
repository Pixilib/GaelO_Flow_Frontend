import { Column } from "@tanstack/react-table";

/**
 * Component that displays the filter of a column.
 */
type FilterTableProps = {
    column: Column<any, any>;
    table: any;
};


const FilterTable = ({
    column,
    table,
}:FilterTableProps) => {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };


    return typeof firstValue === "number" ? (
        <div className="flex flex-col items-center">
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[0] ?? ""}
                onChange={(e) =>
                    column.setFilterValue((old: [number, number]) => [
                        e.target.value,
                        old?.[1],
                    ])
                }
                placeholder={`Min`}
                className="w-3/4 h-6 border rounded-lg shadow"
            />
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[1] ?? ""}
                onChange={(e) =>
                    column.setFilterValue((old: [number, number]) => [
                        old?.[0],
                        e.target.value,
                    ])
                }
                placeholder={`Max`}
                className="w-3/4 h-6 border rounded-lg shadow"
            />
        </div>
    ) : (
        <input
            type="text"
            value={(columnFilterValue ?? "") as string}
            onClick={stopPropagation}
            onChange={(e) => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            className="w-full border rounded-lg shadow"
        />
    );
};
export default FilterTable;