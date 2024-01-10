import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { Card, Header } from "../../RenderComponents/Card";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Gaelo FLow UI/Card",
    component: Card,
    argTypes: {
        disabled: {
            options: [true, false],
            control: { type: "radio" },
            description: "Choose disabled state",
        },
        
    },
} as Meta<typeof Card>;

const template_button: StoryFn<typeof Card> = (args) => {
    console.debug(args);
    return (
      <Card color={args.color}>
        <Header />
      </Card>
    );
  };

      
export const template_buttons = template_button.bind({});