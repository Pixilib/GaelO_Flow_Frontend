import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { Edit, Trash } from "../src/icons";
import { DropdownButton } from "../src/ui";

const meta: Meta<typeof DropdownButton> = {
  title: "GAELO FLOW UI/DropdownButton",
  component: DropdownButton,
  argTypes: {
    options: {
      control: "object",
      description: "The list of options for the dropdown menu.",
    },
    buttonText: {
      control: "text",
      description: "The text displayed on the dropdown button.",
    },
  },
  tags: ["molecules", "dropdown", "button", "autodocs"],
} satisfies Meta<typeof DropdownButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
  {
    label: "Edit",
    icon: <Edit />,
    color: "blue",
    action: action("edit-action"),
  },
  {
    label: "Delete",
    icon: <Trash />,
    color: "red",
    action: action("delete-action"),
  },
];

const Template = (args: any) => <DropdownButton {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    options,
    buttonText: "Actions",
  },
};

export const CustomButtonText: Story = {
  render: Template,
  args: {
    options,
    buttonText: "More Options",
  },
};

export const OnlyIcons: Story = {
  render: Template,
  args: {
    options: [
      {
        label: "Edit",
        icon: <Edit />,
        action: action("edit-action"),
      },
      {
        label: "Delete",
        icon: <Trash />,
        action: action("delete-action"),
      },
    ],
    buttonText: "Options",
  },
};

export const ColoredOptions: Story = {
  render: Template,
  args: {
    options: [
      {
        label: "Edit",
        icon: <Edit />,
        color: "green",
        action: action("edit-action"),
      },
      {
        label: "Delete",
        icon: <Trash />,
        color: "orange",
        action: action("delete-action"),
      },
    ],
    buttonText: "Actions",
  },
};
