import type { Meta, StoryObj } from "@storybook/react-vite";
import Popover from "../src/ui/Popover";

const meta = {
    title: 'GAELO FLOW UI/Popover',
    component: Popover,
    argTypes: {
      placement: {
        control: { type: 'select', options: ['top', 'right', 'bottom', 'left'] },
      },
      className: {
        control: 'text',
      },
      withOnClick: {
        control: 'boolean',
      },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Popover>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center justify-center p-5 mt-20 mb-10 ml-20"> {/* Adjust Tailwind classes as needed */}
      <Popover {...args}>
        {args.children}
      </Popover>
    </div>
  ),
  args: {
    children: <div className="p-2 border border-black cursor-pointer bg-red">Hover me</div>,
    popover: <div className="max-w-xs p-2 text-center">This is a popover content</div>, 
  },
};

export const TopPlacement: Story = {
  ...Default,
  args: {
    ...Default.args,
    placement: 'top',
  },
};

export const RightPlacement: Story = {
  ...Default,
  args: {
    ...Default.args,
    placement: 'right',
  },
};
 export const LeftPlacement: Story = {
  ...Default,
  args: {
    ...Default.args,
    placement: 'left',
  },
};

export const BottomPlacement: Story = {
  ...Default,
  args: {
    ...Default.args,
    placement: 'bottom',
  },
};

export const WithOnClick: Story = {
  ...Default,
  args: {
    ...Default.args,
    withOnClick: true,
  },
};
