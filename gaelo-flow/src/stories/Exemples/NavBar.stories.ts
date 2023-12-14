//Exemple de story:
import type { Meta, StoryObj } from '@storybook/react';
import SideBar from '../../RenderComponents/NavBar/SideBar';


const meta: Meta<typeof SideBar> = {
    title: 'Example/SideBar',
    component: SideBar,
    }
export default meta;
type Story = StoryObj<typeof SideBar>;

export const SideBarStory: Story = {};
export const Simple: Story = {
    decorators: [],
    name: 'So simple!',
    parameters: {},
  };