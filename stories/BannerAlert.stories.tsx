import { Meta, Story } from '@storybook/react';
import BannerAlert, { BannerProps } from '../src/ui/BannerAlert';
import { Colors } from '../src/utils/enums';

export default {
    title: "GAELO FLOW UI/BannerAlert",
  component: BannerAlert,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['info', 'danger', 'success', 'warning', 'dark'], // Corrected options here
      },
    },
    title: {
      control: 'text',
      description: 'Title of the alert',
    },
    message: {
      control: 'text',
      description: 'Message content of the alert',
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
  children: 'Change a few things up and try submitting again.',
};

export const Danger = Template.bind({});
Danger.args = {
  color: Colors.red,
  children: 'Change a few things up and try submitting again.',
};

export const Success = Template.bind({});
Success.args = {
  color: Colors.light,
  children: 'Change a few things up and try submitting again.',
};

export const Warning = Template.bind({});
Warning.args = {
  color: Colors.warning,
  children: 'Change a few things up and try submitting again.',
};
