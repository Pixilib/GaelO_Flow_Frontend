import { Meta, StoryObj } from '@storybook/react';
import ToggleSwicth from '../src/ui/menu/ToggleSwitch';


const meta: Meta<typeof ToggleSwicth> = {
    title: 'GAELO FLOW UI/ToogleSwicth',
    component: ToggleSwicth,
    args: {
        isToggled: false,
    },
    argTypes: {
        isToggled: {
            control: { type: "boolean" },
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToggleSwicth>;

export const ToogleSwicthStory: Story = {};
