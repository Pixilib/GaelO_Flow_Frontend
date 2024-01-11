import type { Meta, StoryObj } from '@storybook/react';
import {ChangePasswordForm} from '../auth/ChangePasswordForm';

const meta: Meta<typeof ChangePasswordForm> = {
    title: 'Example/ChangePasswordForm',
    component: ChangePasswordForm,
    tags: ['autodocs'],
    }
export default meta;
type Story = StoryObj<typeof ChangePasswordForm>;

export const ChangePasswordFormStory: Story = {};
export const Simple: Story = {
    decorators: [],
    name: 'So simple!',
    parameters: {},
  };