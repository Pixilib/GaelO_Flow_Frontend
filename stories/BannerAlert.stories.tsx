import React from 'react';
import { Meta, Story } from '@storybook/react';
import BannerAlert, { BannerProps } from '../src/ui/BannerAlert';
import { Colors } from '../src/utils/enums';

export default {
  title: "GAELO FLOW UI/BannerAlert",
  component: BannerAlert,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['info', 'danger', 'success', 'warning', 'dark']
      },
    },
    children: {
      control: 'text',
      description: 'Content of the banner',
    },
    buttonLabel: {
      control: 'text',
      description: 'Label text for the button',
    },
  },
  parameters: {
    tags: ['autodocs'],
  },
} as Meta;

const Template: Story<BannerProps> = (args) => <BannerAlert {...args} />;

export const Info = Template.bind({});
Info.args = {
  color: Colors.primary,
  children: 'DICOM files import errors',
  buttonLabel: 'See Errors',
  onClickButton: () => {
    alert('Button clicked!');
  },
};

export const Danger = Template.bind({});
Danger.args = {
  color: Colors.red,
  children: 'DICOM files import errors',
  buttonLabel: 'See Errors',
  onClickButton: () => {
    alert('Button clicked!');
  },
};

export const Success = Template.bind({});
Success.args = {
  color: Colors.light,
  children: 'DICOM files import errors',
  buttonLabel: 'See Errors',
  onClickButton: () => {
    alert('Button clicked!');
  },
};

export const Warning = Template.bind({});
Warning.args = {
  color: Colors.warning,
  children: 'DICOM files import errors',
  buttonLabel: 'See Errors',
  onClickButton: () => {
    alert('Button clicked!');
  },
};
