import type { Meta, StoryObj } from '@storybook/react';
import SearchForm from '../src/query/SearchForm';
import { QueryPayload } from '../src/utils';
import { action } from '@storybook/addon-actions';

const meta = {
    title: 'GAELO FLOW COMPONENTS/SearchForm',
    component: SearchForm,
    argTypes: {
        aets: {
            control: 'object',
            description: 'Array of AET options',
            table: {
                type: { summary: 'Option[]' },
            },
        },
        labelsData: {
            control: 'array',
            description: 'Array of labels for the SelectInput',
            table: {
                type: { summary: 'string[]' },
            },
        },
        onLabelChange: {
            action: 'onLabelChange',
            description: 'Callback when labels change',
            table: {
                type: { summary: '(labels: string[]) => void' },
            },
        },
        onSubmit: {
            action: 'onSubmit',
            description: 'Form submit handler',
            table: {
              type: { summary: '(formData: QueryPayload, aets?: string) => void' },
            },
        },
        withAets: {
            control: 'boolean',
            description: 'Toggle for AET input visibility',
            table: {
                type: { summary: 'boolean' },
            },
        },
    },
    tags: ['autodocs']
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const handleSubmit = action('Form Submitted');

export const Default = {
    args: {
        aets: [{ label: 'AET1', value: 'aet1' }, { label: 'AET2', value: 'aet2' }],
        labelsData: ['Label1', 'Label2', 'Label3'],
        withAets: false,
        onSubmit: (formData: QueryPayload, aets?: string) => {
            handleSubmit({ formData, aets });
        },
    },
} satisfies Story;

export const WithAets = {
    args: {
        aets: [{ label: 'AET1', value: 'aet1' }, { label: 'AET2', value: 'aet2' }],
        labelsData: ['Label1', 'Label2', 'Label3'],
        withAets: true,
        onSubmit: (formData: QueryPayload, aets?: string) => {
            handleSubmit({ formData, aets });
        },
    },
} satisfies Story;

export const WithoutAets = {
    args: {
        aets: [],
        labelsData: ['Label1', 'Label2', 'Label3'],
        withAets: false,
        onSubmit: (formData: QueryPayload, aets?: string) => {
            handleSubmit({ formData, aets });
        },
    },
} satisfies Story;
