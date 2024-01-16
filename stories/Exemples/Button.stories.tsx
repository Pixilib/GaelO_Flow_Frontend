import { Meta, StoryObj } from "@storybook/react";
import Button from "./../../src/RenderComponents/Button";
import ChevronRight from "./../../src/assets/chevron-right.svg"

export default {
  title: "Gaelo FLow UI/Button",
  component: Button,
  args: {
    color: "primary",
    bordered: false,
    children: "Text"
  },
  argTypes: {
    children: {
      options: ["text", "icons"],
      control: { type: 'radio' },
      mapping: {
        text: "Text",
        icons: <ChevronRight />
      },
    },
  },
  tags: ['autodocs']
} as Meta<typeof Button>;
type Story = StoryObj<typeof Button>;


export const ButtonTextStory: Story = {
  render: ({ children, ...args }) => (
<div style={{ display: 'flex', flexDirection: 'column', margin: '0px', justifyContent: 'center', alignItems: 'center' }}>
      
<div style={{ display: 'flex', flexDirection: 'row',}}>
        <Button {...args} style={{ width: '150px', marginRight: '50px' }}>{children}</Button>
        <Button color="primary" style={{ marginRight: '50px' }}>{children}</Button>
        <Button color="disabled" style={{ width: '150px', marginRight: '150px' }}>{children}</Button>

      </div>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '50px'}}>
        <Button color="secondary" style={{ width: '150px', marginRight: '50px' }}>{children}</Button>
        <Button color="secondary" style={{ marginRight: '50px' }}>{children}</Button>
        <Button color="disabled" style={{ width: '150px', marginRight: '150px' }}>{children}</Button>

      </div>
      <div style={{ display: 'flex', flexDirection: 'row', }}>
        <Button color="success" style={{ width: '150px', marginRight: '50px' }}>{children}</Button>
        <Button color="success" style={{ marginRight: '50px' }}>{children}</Button>
        <Button color="disabled" style={{ width: '150px', marginRight: '150px' }}>{children}</Button>

      </div>
      <div style={{ display: 'flex', flexDirection: 'row',margin: '50px' }}>
        <Button color="danger" style={{ width: '150px', marginRight: '50px' }}>{children}</Button>
        <Button color="danger" style={{ marginRight: '50px' }}>{children}</Button>
        <Button color="disabled" style={{ width: '150px', marginRight: '150px' }}>{children}</Button>

      </div>
      
    </div>
  ),
};
