import { Column } from "@tanstack/react-table";

type FilterTableProps = {
    column: Column<any, any>;
    table: any;
};

const FilterTable = ({
    column,
    table,
}: FilterTableProps) => {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return typeof firstValue === "number" ? (
        <div className="flex flex-col space-y-1">
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
                className="w-1/2 h-5 pl-1 text-xs font-medium text-gray-600 border border-gray-300 rounded-2xl placeholder:text-gray-400"
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
                className="w-1/2 h-5 pl-1 text-xs font-medium text-gray-600 border border-gray-300 rounded-2xl placeholder:text-gray-400"
            />
        </div>
    ) : (
        <input
            type="text"
            value={(columnFilterValue ?? "") as string}
            onClick={stopPropagation}
            onChange={(e) => column.setFilterValue(e.target.value)}
            placeholder="Search..."
            className="w-2/3 h-5 pl-1 text-xs font-medium text-gray-600 border border-gray-300 rounded-2xl placeholder:text-gray-400"
        />
    );
};

export default FilterTable;