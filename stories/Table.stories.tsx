import type { Meta, StoryObj } from '@storybook/react';
import Table from '../src/ui/Table';

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
];

const meta: Meta<typeof Table<DataType>> = {
  title: 'GAELO FLOW UI/Table',
  component: Table,
  argTypes: {
    data: { control: 'object' },
    columns: { control: 'object' },
    enableSorting: { control: 'boolean' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table<DataType>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTable: Story = {
  args: {
    data,
    columns,
    enableSorting: true,
  },
} satisfies Story;

export const WithoutSorting: Story = {
  args: {
    data,
    columns: columns.map(col => ({ ...col, enableSorting: false })),
    enableSorting: false,
  },
} satisfies Story;

export const CustomStyling: Story = {
  args: {
    data,
    columns: columns.map(col => ({
      ...col,
      cell: (info:any) => (
        <span style={{ color: info.getValue() === 'Chicago' ? 'red' : 'black' }}>
          {info.getValue()}
        </span>
      ),
    })),
    enableSorting: true,
  },
} satisfies Story;
