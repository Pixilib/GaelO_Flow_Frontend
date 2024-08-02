import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Table from '../src/ui/table/Table';
import { Colors } from '../src/utils/enums';
import { Card, CardBody, CardHeader } from '../src/ui';

type DataType = {
  id: number;
  name: string;
  age: number;
  city: string;
  actions: string;
  edit: string;
};

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
    enableSorting: true,
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
  {
    accessorKey: 'edit',
    header: 'Edit',
  }
];

const data: DataType[] = [
  { id: 1, name: 'John Doe', age: 28, city: 'New York', actions: 'View', edit: 'Edit' },
  { id: 2, name: 'Jane Doe', age: 34, city: 'Los Angeles', actions: 'View', edit: 'Edit' },
  { id: 3, name: 'Mike Johnson', age: 40, city: 'Chicago', actions: 'View', edit: 'Edit' },
  { id: 4, name: 'Anna Smith', age: 25, city: 'New York', actions: 'View', edit: 'Edit' },
  { id: 5, name: 'Tom Brown', age: 30, city: 'Los Angeles', actions: 'View', edit: 'Edit' },
  { id: 6, name: 'Linda Davis', age: 22, city: 'Chicago', actions: 'View', edit: 'Edit' },
  { id: 7, name: 'John Smith', age: 32, city: 'New York', actions: 'View', edit: 'Edit' },
  { id: 8, name: 'Jane Brown', age: 38, city: 'Los Angeles', actions: 'View', edit: 'Edit' },
  { id: 9, name: 'Mike Davis', age: 26, city: 'Chicago', actions: 'View', edit: 'Edit' },
  { id: 10, name: 'Anna Johnson', age: 31, city: 'New York', actions: 'View', edit: 'Edit' },
  { id: 11, name: 'Tom Smith', age: 37, city: 'Los Angeles', actions: 'View', edit: 'Edit' },
  { id: 12, name: 'Linda Brown', age: 23, city: 'Chicago', actions: 'View', edit: 'Edit' },
  { id: 13, name: 'John Davis', age: 29, city: 'New York', actions: 'View', edit: 'Edit' },
  { id: 14, name: 'Jane Johnson', age: 35, city: 'Los Angeles', actions: 'View', edit: 'Edit' },
  { id: 15, name: 'Mike Brown', age: 41, city: 'Chicago', actions: 'View', edit: 'Edit' },
  { id: 16, name: 'Anna Davis', age: 24, city: 'New York', actions: 'View', edit: 'Edit' },
  { id: 17, name: 'Tom Johnson', age: 39, city: 'Los Angeles', actions: 'View', edit: 'Edit' },
  { id: 18, name: 'Linda Smith', age: 21, city: 'Chicago', actions: 'View', edit: 'Edit' },
  { id: 19, name: 'John Brown', age: 33, city: 'New York', actions: 'View', edit: 'Edit' },
  { id: 20, name: 'Jane Smith', age: 27, city: 'Los Angeles', actions: 'View', edit: 'Edit' },
  { id: 21, name: 'Mike Johnson', age: 40, city: 'Chicago', actions: 'View', edit: 'Edit' },
  { id: 22, name: 'Anna Smith', age: 25, city: 'New York', actions: 'View', edit: 'Edit' },
  { id: 23, name: 'Tom Brown', age: 30, city: 'Los Angeles', actions: 'View', edit: 'Edit' },
  { id: 24, name: 'Linda Davis', age: 22, city: 'Chicago', actions: 'View', edit: 'Edit' },
  { id: 25, name: 'John Smith', age: 32, city: 'New York', actions: 'View', edit: 'Edit' },
];

const meta: Meta<typeof Table<DataType>> = {
  title: 'GAELO FLOW UI/Table',
  component: Table,
  argTypes: {
    data: { control: 'object' },
    columns: { control: 'object' },
    enableSorting: { control: 'boolean' },
    enableColumnFilters: { control: 'boolean' },
    headerColor: {
      control: { type: 'select', options: Object.values(Colors) },
      defaultValue: Colors.almond,
    },
    pageSize: { control: 'number' },
    headerTextSize: {
      control: { type: 'select', options: ["xxs", "xs", "sm", "base", "lg"] },
      defaultValue: "sm"
    },
    className: { control: 'text' },
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Table<DataType>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTable: Story = {
  args: {
    data,
    columns,
    enableSorting: true,
    enableColumnFilters: true,
    headerColor: Colors.almond,
    className: 'w-full rounded-xl shadow-md',
    headerTextSize: "sm",
  },
} satisfies Story;

export const WithoutSorting: Story = {
  args: {
    data,
    columns: columns.map(col => ({ ...col })),
    enableColumnFilters: true,
    headerColor: Colors.almond,
    headerTextSize: "sm",
  },
} satisfies Story;

export const CustomStyling: Story = {
  args: {
    data,
    columns: columns.map(col => ({
      ...col,
      cell: (info: any) => (
        <span style={{ color: info.getValue() === 'Chicago' ? 'red' : 'black' }}>
          {info.getValue()}
        </span>
      ),
    })),
    enableSorting: true,
    enableColumnFilters: true,
    headerColor: Colors.almond,
    headerTextSize: "sm",
  },
} satisfies Story;

export const TableInCard: Story = {
  render: (args) => (
    <Card className="h-full max-w-4xl mx-auto overflow-y-auto">
      <CardHeader title="User Data" centerTitle color={Colors.success} />
      <CardBody>
        <Table {...args} className='overflow-y-auto'/>
      </CardBody>
    </Card>
  ),
  args: {
    data,
    columns,
    enableSorting: true,
    enableColumnFilters: true,
    headerColor: Colors.almond,
    headerTextSize: "sm",
  },
} satisfies Story;

export const HighlightYoungAge: Story = {
  args: {
    data,
    columns: columns.map(col => ({
      ...col,
      cell: col.accessorKey === 'age' ? (info: any) => (
        <span style={{ color: info.getValue() < 30 ? 'green' : 'black' }}>
          {info.getValue()}
        </span>
      ) : col.accessorKey,
    })),
    enableSorting: true,
    enableColumnFilters: true,
    headerColor: Colors.almond,
    headerTextSize: "sm",
  },
} satisfies Story;

export const FilterableCities: Story = {
  args: {
    data,
    columns: columns.map(col => ({
      ...col,
      canFilter: col.accessorKey === 'city',
    })),
    enableSorting: true,
    enableColumnFilters: true,
    headerColor: Colors.almond,
    headerTextSize: "sm",
  },
} satisfies Story;

export const RowSelection: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    
    const handleRowSelectionChange = (selected: DataType[]) => {
      setSelectedRows(selected);
      console.log('Selected Rows:', selected);
    };

    return (
      <div>
        <Table {...args} onRowSelectionChange={handleRowSelectionChange} enableRowSelection />
        <div className="p-4 mt-4 bg-gray-100 rounded">
          <h3 className="text-lg font-bold">Selected Rows:</h3>
          <pre className="whitespace-pre-wrap">{JSON.stringify(selectedRows, null, 2)}</pre>
        </div>
      </div>
    );
  },
  args: {
    data,
    columns,
    enableSorting: true,
    enableColumnFilters: true,
    enableRowSelection: true,
    headerColor: Colors.almond,
    headerTextSize: "sm",
    className: 'w-full rounded-xl shadow-md',
  },
} satisfies Story;
