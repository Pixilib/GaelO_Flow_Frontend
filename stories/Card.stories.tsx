import { Meta, StoryObj } from "@storybook/react";
import Card from "../src/RenderComponents/Card";
import ChevronRight from '../src/assets/chevron-right.svg?react'
import { Colors } from "../src/utils/enums";

export default {
  title: "Gaelo FLow UI/Card",
  component: Card,
  args: {
    color: Colors.primaryHover,
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
  render: ({ children, ...args }) => (<Card color={args.color}>
    <Card.BasicHeader title="Card Title" />
    <Card.Body>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, facilis non a dolore soluta consectetur modi minima corrupti id ab at ipsa, vel fugit magnam, numquam aperiam dicta doloribus! Harum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, facilis non a dolore soluta consectetur modi minima corrupti id ab at ipsa, vel fugit magnam, numquam aperiam dicta doloribus! Harum
    </Card.Body>
    <Card.Footer>
      {/* Your Footer content goes here */}
      Footer content
    </Card.Footer>
  </Card>)
}
