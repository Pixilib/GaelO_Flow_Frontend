import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from "../src/ui/Input";

const meta: Meta<typeof Input> = {
  title: "GAELO FLOW UI/Input",
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