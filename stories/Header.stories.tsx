import React from 'react';
import {Meta, StoryObj } from "@storybook/react";
import Header from "../src/root/Header";
import { action } from '@storybook/addon-actions';
import { BrowserRouter as Router } from 'react-router';

const meta: Meta<typeof Header> = {
    title: 'GAELO FLOW Components/Header',
    component: Header,
    argTypes: {
      title: { control: 'text' },
      openItem: { control: 'text' },
      setOpenItem: { action: 'setOpenItem' },
    },
    tags: ["autodocs"],
    decorators: [
        (Story) => (
          <Router>
            <Story />
          </Router>
        ),
      ]
  } satisfies Meta<typeof Header>;
  export default meta;
  
  type Story = StoryObj<typeof meta>;
  
  export const DefaultHeader: Story = {
    args: {
      title: 'Default Title',
      openItem: null,
      setOpenItem: action('setOpenItem'),
    },
  } satisfies Story;
  
  export const WithOpenItem: Story = {
    args: {
      title: 'Title With Open Item',
      openItem: 'SettingsUser',
      setOpenItem: action('setOpenItem'),
    },
  } satisfies Story;