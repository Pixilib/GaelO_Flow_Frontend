import type { Meta, StoryObj } from "@storybook/react";
import Input from "./../src/RenderComponents/Input";

const meta: Meta<typeof Input> = {
  title: "Example/Input",
  component: Input,
  args: {
    type: "text",
    placeholder: "Enter your username",
    className: "",
    label: "username",
    //svgLeft: <Input/>,
  },
  argTypes: {
    children: {
      options: ["user"],
      control: { type: "radio" },
      //mapping: { svgLeft: <User />},
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const InputStory: Story = {};