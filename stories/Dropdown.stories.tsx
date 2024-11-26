import React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown } from '../src/ui';

const meta: Meta<typeof Dropdown> = {
  title: 'GAELO FLOW UI/Dropdown',
  component: Dropdown,
  argTypes: {
    chevronPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
      description: 'Position du chevron',
    },
    className: { control: 'text', description: 'Classes CSS additionnelles' },
    isOpen: { control: 'boolean', description: 'État ouvert ou fermé du menu déroulant' },
    dropDownOpen: { action: 'dropDownOpen', description: 'Action déclenchée lors de l\'ouverture du menu déroulant' },
    children: { control: 'text', description: 'Contenu du bouton' },
    dropDown: { control: 'boolean', description: 'Contenu du menu déroulant' },
  },
  tags: ['molecules', 'dropdown', 'autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    const handleDropdownOpen = () => {
      setIsOpen(!isOpen);
      if (args.dropDownOpen) {
        args.dropDownOpen();
      }
    };

    return (
      <Dropdown
        {...args}
        isOpen={isOpen}
        dropDownOpen={handleDropdownOpen}
      >
        {args.children}
      </Dropdown>
    );
  }
};

export const Default: Story = {
  ...Template,
  args: {
    children: 'Menu déroulant',
    dropDown: true,
    chevronPosition: 'right',
  },
};

export const WithoutChevron: Story = {
  ...Template,
  args: {
    children: 'Menu sans chevron',
    dropDown: true,
    chevronPosition: undefined,
  },
};

export const CustomContent: Story = {
  ...Template,
  args: {
    children: 'Menu avec contenu personnalisé',
    dropDown: (
      <div className="absolute p-2 bg-white rounded-md shadow-md top-full text-dark">
        <ul>
          <li>
            <input type="checkbox" id="option1" />
            <label htmlFor="option1">Option personnalisée 1</label>
          </li>
          <li>
            <input type="checkbox" id="option2" />
            <label htmlFor="option2">Option personnalisée 2</label>
          </li>
          <li>
            <input type="checkbox" id="option3" />
            <label htmlFor="option3">Option personnalisée 3</label>
          </li>
        </ul>
      </div>
    ),
    chevronPosition: 'left',
  },
};

export const InitiallyOpen: Story = {
  ...Template,
  args: {
    children: 'Menu initialement ouvert',
    dropDown: true,
    isOpen: true,
    chevronPosition: 'right',
  },
};
