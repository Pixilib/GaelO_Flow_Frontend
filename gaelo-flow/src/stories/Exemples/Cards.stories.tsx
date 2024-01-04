import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import Cards from "../../RenderComponents/Cards";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "UI/Cards",
    component: Cards,
    argTypes: {
        disabled: {
            options: [true, false],
            control: { type: "radio" },
            description: "Choose disabled state",
        },
        
    },
} as Meta<typeof Cards>;

const template_button: StoryFn<typeof Cards> = (args) => {
    console.debug(args);
    return (

        <Cards></Cards>
      

);
};
export const template_buttons = template_button.bind({});