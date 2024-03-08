import type { Meta, StoryObj } from "@storybook/react";
import Popover from "../src/ui/menu/Popover";

const meta: Meta<typeof Popover> = {
    title: "GAELO FLOW UI/Popover",
    component: Popover,
    args: {
        trigger: "Click me",
        content: "popover content !",
        placement: 'bottom',
    },
    argTypes: {
        trigger: {
            control: 'text',
        },
        content: {
            control: 'text',
        },
        placement: {
            options: ['top', 'right', 'bottom', 'left'],
            control: { type: 'select' },
        },
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Popover>;
export const Default: Story = {
    render: (args) => (
        <div className="space-y-5">
            <Popover {...args} />
        </div>
    ),
};