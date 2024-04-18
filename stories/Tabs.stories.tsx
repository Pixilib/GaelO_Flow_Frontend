import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Tabs, Tab } from '../src/ui'; // Assuming these are correctly imported as you mentioned

const LocalUsers = () => <div className="h-26" style={{ height:'300px'}}>Content of Local Users</div>;
const RoleManagement = () => <div className="h-26" style={{ height:'300px'}}>gestion Roles</div>;

const meta: Meta<typeof Tabs> = {
  title: 'GAELO FLOW UI/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'underline', 'pill']
    },
    className: { control: 'text' },
    onTabClick: { action: 'tabClicked' }
  },
  tags: ['navigation','autodocs','interactive','design-system']
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
        <Tab key="1" title="Local Users" path="local" component={<LocalUsers />} />,
        <Tab key="2" title="Rôles" path="roles" component={<RoleManagement />} />
    ],
    variant: 'basic',
    onTabClick: action('Navigate to'),
    className: 'bg-[#EFEFEF]'
  }
};

export const Underline: Story = {
  args: {
    ...Default.args,
    variant: 'underline'
  }
};

export const Pill: Story = {
  args: {
    ...Default.args,
    variant: 'pill'
  }
};
