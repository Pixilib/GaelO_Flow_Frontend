import type { Meta, StoryObj } from "@storybook/react";
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
    },
    tags: ["autodocs"],
  } satisfies Meta<typeof Popover>;
  export default meta;
  
  type Story = StoryObj<typeof meta>;
  
  export const Default: Story = {
    args: {
      children: <div className="flex items-center w-10 border bg-red max-w-5">Hover me</div>,
      popover: <div>This is a popover content</div>,
    },
  };
  
  export const TopPlacement: Story = {
    args: {
      ...Default.args,
      placement: 'top',
    },
  };
  
  export const RightPlacement: Story = {
    args: {
      ...Default.args,
      placement: 'right',
    },
  };