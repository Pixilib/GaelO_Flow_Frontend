import type { Meta, StoryObj } from '@storybook/react-vite';
import JobIcons from '../src/admin/jobs/JobActions';

const meta: Meta<typeof JobIcons> = {
  title: 'GAELO FLOW COMPONENTS/JOB/JobIcons',
  component: JobIcons,
  // Aucun argType n'est nécessaire ici car le composant n'accepte pas de props
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
