import { Meta, StoryObj } from "@storybook/react";
import Card, { CardHeader, CardBody, CardFooter } from "../src/ui/Card";
import ChevronRight from '../src/assets/chevron-right.svg?react';
import { Colors } from "../src/utils/enums";
import Button from "../src/ui/Button";

import DotMenuRightMore from "../src/assets/dot-menu-more.svg?react";

export default {
  title: "Gaelo Flow UI/Card",
  component: Card,
  args: {
    color: Colors.primary,
    bordered: false,
    children: "Text",

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
    <div className="space-y-5">
      {/* Card   */}
      <Card color={Colors.primary} bordered={false}>
        <CardHeader title="Card  Title" />
        <CardBody>
        </CardBody>
        <CardFooter>
        </CardFooter>
      </Card>


      {/* Card Settings */}
      <Card color={Colors.primary} bordered={false}>
        <CardHeader title="Card Setting Title" centerTitle={true} rightIcon={<ChevronRight />} >
          <>
            <button className={`icon-button mr-4`} onClick={() => console.log('click')}>
              <span className="icon-right">{<DotMenuRightMore />}</span>
            </button>
          </>
        </CardHeader>
        <CardBody>
          Lorem ipsum
        </CardBody>
        <CardFooter className="flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Button color={Colors.success}><ChevronRight /></Button>
            <Button color={Colors.orange}><ChevronRight /></Button>
            <Button color={Colors.danger}><ChevronRight /></Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  ),
};

