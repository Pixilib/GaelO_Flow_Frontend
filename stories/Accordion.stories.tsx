import type { Meta, StoryObj } from '@storybook/react-vite';
import Accordion from '../src/ui/Accordion';

const meta = {
    title: 'GAELO FLOW UI/Accordion',
    component: Accordion,
    argTypes: {
        summary: {
            control: 'text',
            description: 'The summary content of the accordion',
        },
        children: {
            control: 'text',
            description: 'The children content of the accordion',
        },
        variant: {
            control: 'select',
            options: ['default', 'primary', 'secondary'],
            description: 'Predefined style variants',
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    args: {
        summary: 'Click to expand',
        children: 'This is the default content of the accordion.',
    },
} satisfies Story;

export const WithLongContent = {
    args: {
        summary: 'Click to expand for more information',
        children: 'This accordion contains a long text content. ' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
} satisfies Story;

export const WithCustomSummary = {
    args: {
        summary: <span style={{ color: 'blue', fontWeight: 'bold' }}>Custom Summary</span>,
        children: 'This accordion has a custom styled summary.',
    },
} satisfies Story;

export const MultipleAccordions = {
    args: {
        summary: '',
        children: (
            <div>
                <Accordion summary="First Accordion">
                    This is the content of the first accordion.
                </Accordion>
                <Accordion summary="Second Accordion">
                    This is the content of the second accordion.
                </Accordion>
                <Accordion summary="Third Accordion">
                    This is the content of the third accordion.
                </Accordion>
            </div>
        ),
    },
} satisfies Story;

export const WithComplexContent = {
    args: {
        summary: 'Click to expand for complex content',
        children: (
            <div>
                <h3>Complex Content</h3>
                <p>This accordion contains more complex content including lists and additional components.</p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
                <Accordion summary="Nested Accordion">
                    This is a nested accordion inside the complex content.
                </Accordion>
            </div>
        ),
    },
} satisfies Story;
