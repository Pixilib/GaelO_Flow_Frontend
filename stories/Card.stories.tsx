import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Card, { CardHeader, CardBody, CardFooter } from "../src/RenderComponents/Card";
import ChevronRight from '../src/assets/chevron-right.svg?react';
import { Colors } from "../src/utils/enums";

export default {
  title: "Gaelo Flow UI/Card",
  component: Card,
  args: {
    color: Colors.primary,
    bordered: false,
  },
  argTypes: {
    children: {
      options: ["Text", <ChevronRight />],
      control: { type: "radio" },
    },
    disabled: {
      options: [true, false],
      control: { type: "radio" },
    },
  },
} as Meta<typeof Card>;

type Story = StoryObj<typeof Card>;
export const CardStory: Story = {
  render: ({ children, ...args }) => (
    <div className="flex justify-center space-x-4">
      {/* Card task */}
      <Card>
        <CardHeader title="Title Task" />
        <CardBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </CardBody>
        <CardFooter>
          {/* footer */}
        </CardFooter>
      </Card>

      {/* Ajoutez de la marge horizontale entre les cartes */}
      <div style={{ margin: '0 16px' }}></div>

      {/* Card Settings */}
      <Card>
        <CardHeader title="Centered Card Title" centerTitle={true} />
        <CardBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </CardBody>
        <CardFooter>
          {/* footer */}
        </CardFooter>
      </Card>
    </div>
  ),
};
