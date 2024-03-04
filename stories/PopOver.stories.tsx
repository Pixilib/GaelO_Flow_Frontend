import type { Meta, StoryObj } from "@storybook/react";
import Popover from "../src/ui/menu/Popover";

const meta: Meta<typeof Popover> = {
    title: "GAELO FLOW UI/Popover",
    component: Popover,
    args: {
        trigger: "Button",
        content: "Content here",
    },
    argTypes: {
        trigger: {
            control: 'text',
        },
        content: {
            control: 'text',
        },
        className: {
            control: 'text',
        },
        placement: {
            options: ['top', 'right', 'bottom', 'left'],
            control: { type: 'select' },
        },
    },
    tags: ["autodocs"]
}
export default meta;


type Story = StoryObj<typeof Popover>;
export const PopOvertory: Story = {

    render: (args) => (
        <div className="space-y-5">
            <Popover
                trigger={args.trigger}
                content={args.content}
                className={args.className}
                placement={args.placement}
            />
        </div>
    )
};