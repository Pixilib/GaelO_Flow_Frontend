import type { Meta, StoryObj } from '@storybook/react';
import JobIcons from '../src/admin/jobs/JobIcons';

const meta: Meta<typeof JobIcons> = {
  title: 'GAELO FLOW UI/JOB/JobIcons',
  component: JobIcons,
  // Aucun argType n'est nécessaire ici car le composant n'accepte pas de props
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
