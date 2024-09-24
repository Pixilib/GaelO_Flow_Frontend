import { Meta, StoryObj } from '@storybook/react';

import Toolsbar from '../src/ui/Toolsbar';

const meta: Meta<typeof Toolsbar> = {
    title: 'GAELO FLOW UI/Toolsbar', // Corrected the title spelling
    component: Toolsbar,
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
type Story = StoryObj<typeof Toolsbar>;

export const ToggleSwitchStory: Story = {}; // Corrected the story name spelling
