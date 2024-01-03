import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import Button from "../../RenderComponents/Button";
import Ytb from "../assets/youtube.svg";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "UI/Button",
    component: Button,
    argTypes: {
        disabled: {
            options: [true, false],
            control: { type: "radio" },
            description: "Choose disabled state",
        },
        
    },
} as Meta<typeof Button>;

const template_button: StoryFn<typeof Button> = (args) => {
    console.debug(args);
    return (

        <div className={"flex flex-row gap-3"}>
          <Button color="orange">Orange</Button>
          <Button color="purple">Purple</Button>

          <Button color="purple"> 
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>Avec img 
          </Button>
        </div>
            

);
};
export const template_buttons = template_button.bind({});