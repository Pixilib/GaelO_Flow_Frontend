import { useEffect, useMemo, useState } from "react";
import { Column, ColumnDef } from "@tanstack/react-table";
import SelectInput from "../SelectInput";
import { Option } from "../../utils";
import CheckBox from "../Checkbox";

type FilterTableProps = {
  column: Column<any, any>;
  columnDef: ColumnDef<any>;
  table: any;
};

const FilterTable = ({ column, table, columnDef }: FilterTableProps) => {
  const [inverted, setInverted] = useState(false);

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  if (typeof firstValue === "number") {
    return (
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
          className="w-1/2 h-5 pl-1 text-xs font-medium text-gray-600 border border-gray-300 dark:bg-stone-800 rounded-2xl placeholder:text-gray-400"
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
          className="w-1/2 h-5 pl-1 text-xs font-medium text-gray-600 border border-gray-300 dark:bg-stone-800 rounded-2xl placeholder:text-gray-400"
        />
      </div>
    );
  }

  if (columnDef?.filterType === "DATE") {
    //Get Min and Max available date (excluding null)
    let dateArray = sortedUniqueValues.filter((date) => date !== null);
    let max = new Date(Math.max.apply(null, dateArray));
    let min = new Date(Math.min.apply(null, dateArray));

    const [filterMinimum, setFilterMinimum] = useState(null);
    const [filterMaximum, setFilterMaximum] = useState(null);

    useEffect(() => {
      column.setFilterValue([
        filterMinimum ? new Date(filterMinimum) : null,
        filterMaximum ? new Date(filterMaximum) : null,
      ]);
    }, [filterMinimum, filterMaximum]);

    return (
      <div
        onClick={(e) => e.stopPropagation()} //Prevent click from triggering sorting
      >
        <div>
          <input
            type="date"
            //minDate={min ? min : new Date(1990, 1, 1)}
            //maxDate={max ? max : new Date()}
            //selected={filterMinimum}
            //onChange={(date) => setFilterMinimum(date)}
          />
        </div>
        <div>
          <input
            type="date"
            //minDate={min ? new Date(min) : new Date(1990, 1, 1)}
            //maxDate={max ? new Date(max) : new Date()}
            //selected={filterMaximum}
            //onChange={(date) => setFilterMaximum(date?.setHours(23, 59, 59, 999))}
          />
        </div>
      </div>
    );
  }

  if (columnDef?.filterType === "SELECT") {
    return (
      <div>
        <SelectInput
          className="w-full"
          isSearchable
          isClearable
          options={sortedUniqueValues.slice(0, 5000).map((value) => ({
            value: value,
            label: value,
          }))}
          value={columnFilterValue ? columnFilterValue : null}
          placeholder="Filter..."
          onChange={(option) => column.setFilterValue(option?.value)}
        />
      </div>
    );
  }

  if (columnDef.filterType === "MULTISELECT") {
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
      const opositValues = sortedUniqueValues.filter(
        (value) => !(columnFilterValue as string[])?.includes(value)
      );
      column.setFilterValue(opositValues);
    }, [inverted]);

    useEffect(() => {
      column.setFilterValue(selectedValues);
    }, [selectedValues]);

    return (
      <div className="flex flex-col gap-1">
        <SelectInput
          isClearable
          isMulti
          options={sortedUniqueValues.slice(0, 5000).map((value) => ({
            value: value,
            label: value,
          }))}
          value={selectedValues}
          placeholder="Filter..."
          onChange={(options: Option[]) => {
            setSelectedValues(options.map((option) => option.value));
          }}
        />
        <span className="flex gap-3 justify-end normal-case">
          <span className="text-xs">Invert</span>
          <CheckBox
            checked={inverted}
            onChange={() => setInverted((inverted) => !inverted)}
          />
        </span>
      </div>
    );
  }

  return (
    <input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onClick={stopPropagation}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Search..."
      className="w-full h-5 pl-1 text-xs font-medium text-gray-600 border border-gray-300 dark:bg-stone-800 rounded-2xl placeholder:text-gray-400"
    />
  );
};

export default FilterTable;
