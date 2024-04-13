import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Tabs, { TabsProps } from '../src/ui/menu/Tabs';



const TabContent1 = () => <div>Contenu pour Tab 1</div>;
const TabContent2 = () => <div>Contenu pour Tab 2</div>;
const TabContent3 = () => <div>Contenu pour Tab 3</div>;

// Notez que TabsPropsWithInitialIndex étend maintenant TabsProps
type TabsPropsWithInitialIndex = TabsProps & {
  initialIndex?: number;
};

const TabsWrapper: React.FC<TabsPropsWithInitialIndex> = ({
  tabs,
  variant,
  onTabClick,
  initialIndex = 0,
}) => {
  const [_, setActiveIndex] = useState(initialIndex);

  const modifiedTabs = tabs.map((tab, index) => ({
    ...tab,
    Component: () => (
      <div onClick={() => handleTabClick(tab.path, index)}>
        {tab.Component()}
      </div>
    ),
  }));

  const handleTabClick = (path?: string, index?: number) => {
    if (path) {
      action('Tab clicked')('path', path, 'index', index);
      if (onTabClick) {
        onTabClick(path);
      }
    }
    setActiveIndex(index ?? 0);
  };

  return <Tabs tabs={modifiedTabs} variant={variant} />;
};

const meta: Meta<typeof TabsWrapper> = { // Remarquez le changement ici pour utiliser TabsWrapper
  title: 'GAELO FLOW UI/Tabs2',
  component: TabsWrapper,
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab objects with title, path, and Component',
    },
    variant: {
      control: 'radio',
      options: ['basic', 'underline', 'pill'],
      description: 'Visual style variant of the tabs',
    },
    onTabClick: {
      action: 'tabClicked',
      description: 'Optional function to handle logic on tab click, receives tab path',
    },
    // initialIndex est géré directement dans les stories, pas besoin de le déclarer dans argTypes
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    tabs: [
      { title: 'Tab 1', path: 'tab1', Component: TabContent1 },
      { title: 'Tab 2', path: 'tab2', Component: TabContent2 },
      { title: 'Tab 3', path: 'tab3', Component: TabContent3 },
    ],
    variant: 'basic',
    onTabClick: (activeIndex) => action(`Tab clicked: ${activeIndex}`),
  },
}
export const Underline: Story = {
  args: {
    ...Basic.args,
    variant: 'underline',
  }
};


