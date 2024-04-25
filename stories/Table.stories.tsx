import type { Meta, StoryObj } from '@storybook/react';
import Table from '../src/ui/table/Table';
import { Colors } from '../src/utils/enums';

type DataType = {
  id: number;
  name: string;
  age: number;
  city: string;
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
];

const data: DataType[] = [
  { id: 1, name: 'John Doe', age: 28, city: 'New York' },
  { id: 2, name: 'Jane Doe', age: 34, city: 'Los Angeles' },
  { id: 3, name: 'Mike Johnson', age: 40, city: 'Chicago' },
  { id: 4, name: 'Anna Smith', age: 25, city: 'New York' },
  { id: 5, name: 'Tom Brown', age: 30, city: 'Los Angeles' },
  { id: 6, name: 'Linda Davis', age: 22, city: 'Chicago' },
  { id: 7, name: 'John Smith', age: 32, city: 'New York' },
  { id: 8, name: 'Jane Brown', age: 38, city: 'Los Angeles' },
  { id: 9, name: 'Mike Davis', age: 26, city: 'Chicago' },
  { id: 10, name: 'Anna Johnson', age: 31, city: 'New York' },
  { id: 11, name: 'Tom Smith', age: 37, city: 'Los Angeles' },
  { id: 12, name: 'Linda Brown', age: 23, city: 'Chicago' },
  { id: 13, name: 'John Davis', age: 29, city: 'New York' },
  { id: 14, name: 'Jane Johnson', age: 35, city: 'Los Angeles' },
  { id: 15, name: 'Mike Brown', age: 41, city: 'Chicago' },
  { id: 16, name: 'Anna Davis', age: 24, city: 'New York' },
  { id: 17, name: 'Tom Johnson', age: 39, city: 'Los Angeles' },
  { id: 18, name: 'Linda Smith', age: 21, city: 'Chicago' },
  { id: 19, name: 'John Brown', age: 33, city: 'New York' },
  { id: 20, name: 'Jane Smith', age: 27, city: 'Los Angeles' },
  { id: 21, name: 'Mike Johnson', age: 40, city: 'Chicago' },
  { id: 22, name: 'Anna Smith', age: 25, city: 'New York' },
  { id: 23, name: 'Tom Brown', age: 30, city: 'Los Angeles' },
  { id: 24, name: 'Linda Davis', age: 22, city: 'Chicago' },
  { id: 25, name: 'John Smith', age: 32, city: 'New York' },
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
    }
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
  },
} satisfies Story;

export const WithoutSorting: Story = {
  args: {
    data,
    columns: columns.map(col => ({ ...col })),
    enableColumnFilters: true,
    headerColor: Colors.almond,
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
  },
} satisfies Story;