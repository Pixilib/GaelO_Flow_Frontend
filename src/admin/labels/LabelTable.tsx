import React, { useMemo } from "react";
import ToggleChevron from "../../ui/menu/ToggleChevron";
import { Table, Button, Label, Popover } from "../../ui";
import { Colors } from "../../utils/enums";
import { Label as LabelType } from "../../utils/types";
import LabelsRoles from "./LabelsRoles";
import { Admin, Trash } from "../../icons";

interface LabelsTableProps {
  data: LabelType[];
  onDeleteLabel: (labelName: string) => void;
  className?: string;
}

const LabelsTable: React.FC<LabelsTableProps> = ({
  data = [],
  onDeleteLabel,
}) => {
  const rows = useMemo(() => data, [data]);

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: "Label",
        cell: ({ getValue }: any) => <Label value={getValue() as string} />,
      },
      {
        header: "roles",
        id: "roles",

        cell: ({ row }: any) => (
          <div className="flex gap-2.5">
            <Popover
              withOnClick={true}
              popover={<LabelsRoles key={row.original.name} labelName={row.original.name} />}
              placement="right"
              backgroundColor="bg-white"
              className="max-h-30 overflow-y-auto overflow-x-hidden"
            >
              <Button color={Colors.secondary} className="flex items-center gap-1.5">
                <Admin size="1.3rem" />
                <ToggleChevron isOpen={false} />
              </Button>
            </Popover>
          </div>
        ),
      },
      {
        header: "Delete",
        id: "delete",
        cell: ({ row }: any) => (
          <div className="flex justify-center w-full">
            <Button onClick={() => onDeleteLabel(row.original.name)} color={Colors.danger}>
              <Trash size="1.3rem" className="transition duration-70 hover:scale-110" color={Colors.light} />
            </Button>
          </div>


        ),
      },
    ];


  }, []);

  return (
    <Table
      columns={columns}
      data={rows}
      headerColor={Colors.white}
      headerTextSize="xs"
      className="bg-gray-100 dark:bg-slate-950 dark:text-white"
      enableColumnFilters
      enableSorting
      getRowClasses={() => "hover:bg-indigo-100 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-700 hover:cursor-pointer"}

    />
  );
};
export default LabelsTable;
