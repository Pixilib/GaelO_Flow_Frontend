import { Meta, StoryFn, StoryObj } from "@storybook/react";
import Button, { ButtonProps } from "../../RenderComponents/Button";
import ChevronRight from "./../../assets/chevron-right.svg?react"
export default {
  title: "Gaelo FLow UI/Button",
  component: Button,
  args: {
    color: "primary",
    bordered: false,
    //children: "Text"
  },
  argTypes: {
    children: {
      options : ["text", "icons"],
      control: { type: 'radio' },
      mapping: {
        text: "My Text3",
        icons: <ChevronRight />
      },
    },
  },
  tags: ['autodocs']
} as Meta<typeof Button>;
type Story = StoryObj<typeof Button>;


export const ButtonTextStory: Story = {
  render: (args) => (
    <>
      <Button {...args}></Button>
      
      <Button color="secondary">{args.children}</Button>
    </>)
}