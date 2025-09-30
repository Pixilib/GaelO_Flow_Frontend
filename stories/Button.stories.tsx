import { Meta, StoryObj } from "@storybook/react-vite";
import Button from "../src/ui/Button";
import { Colors } from "../src/utils/enums"; 
import { ChevronRight } from "../src/assets";

export default {
  title: "Gaelo FLow UI/Button",
  component: Button,
  args: {
    color: Colors.primary, 
    bordered: false,
    children: "Text",
  },
  argTypes: {
    children: {
      options: ["text", "icons"],
      control: { type: 'radio' },
      mapping: {
        text: "Text",
        icons: <ChevronRight />,
      },
    },
  },
  tags: ['autodocs'],
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const ButtonTextStory: Story = {
  render: ({ children, ...args }) => (
    <div style={{ display: 'flex ', flexDirection: 'column', margin: '0px', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row',}}>
        <Button {...args} style={{ width: '150px', marginRight: '50px' }}>{children}</Button>
        <Button color={Colors.primary} style={{ marginRight: '50px' }}>{children}</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '50px'}}>
        <Button color={Colors.secondary} style={{ width: '150px', marginRight: '50px' }}>{children}</Button>
        <Button color={Colors.secondary} style={{ marginRight: '50px' }}>{children}</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', }}>
        <Button color={Colors.success} style={{ width: '150px', marginRight: '50px' }}>{children}</Button>
        <Button color={Colors.success} style={{ marginRight: '50px' }}>{children}</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row',margin: '50px' }}>
        <Button color={Colors.danger} style={{ width: '150px', marginRight: '50px' }}>{children}</Button>
        <Button color={Colors.danger} style={{ marginRight: '50px' }}>{children}</Button>
      </div>
    </div>
  ),
};
