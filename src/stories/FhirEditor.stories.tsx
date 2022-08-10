import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import FhirEditor from "../components/FhirEditor/FhirEditor";
import conditionDefinition from "./condition.json";
import profileTypes from "./profile-types.json";

export default {
  title: "Components/FhirEditor",
  component: FhirEditor,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

// Create a master template for mapping args to render the Button component
// const Template: Story<ButtonProps> = (args) => <Button {...args} />;

// const Template = (args: any) => <FhirEditor {...args} />

// Reuse that template for creating different stories
// export const Primary = Template.bind({});
// Primary.args = { label: "Primary 😃", size: "large" };

// export const Secondary = Template.bind({});
// Secondary.args = { ...Primary.args, primary: false, label: "Secondary 😇" };

export const Primary = () => (
  <FhirEditor
    structureDefintion={conditionDefinition as fhir4.StructureDefinition}
    structureDefinitionReferncesBundle={profileTypes as fhir4.Bundle}
  />
);
