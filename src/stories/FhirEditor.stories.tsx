import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import FhirEditor, { ComponentOverrides } from "../components/FhirEditor/FhirEditor";
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

const initData = {
  resourceType: "Condition",
  id: "4e3be31c-bb2c-479c-b855-23e3103e42d5",
  clinicalStatus: {
    coding: [
      {
        system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
        code: "active",
      },
    ],
  },
  verificationStatus: {
    coding: [
      {
        system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
        code: "confirmed",
      },
    ],
  },
  code: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "410429000",
        display: "Cardiac Arrest",
      },
    ],
    text: "Cardiac Arrest",
  },
  subject: {
    reference: "urn:uuid:5cbc121b-cd71-4428-b8b7-31e53eba8184",
  },
  encounter: {
    reference: "urn:uuid:f78d73fc-9f9b-46d5-93aa-f5db86ba914c",
  },
  onsetDateTime: "1965-11-15T06:22:41-05:00",
  recordedDate: "1965-11-15T06:22:41-05:00",
};

export const EmptyCondition = () => {
  const [data, setData] = useState({});

  const bundle = profileTypes as fhir4.Bundle;

  bundle.entry?.push({
    resource: conditionDefinition as fhir4.StructureDefinition,
  });

  return (
    <FhirEditor
      structureDefinitionId="qicore-condition"
      structureDefinitionBundle={bundle}
      data={data}
      updateData={setData}
    />
  );
};

export const SeedCondition = () => {
  const [data, setData] = useState(initData);

  const bundle = profileTypes as fhir4.Bundle;

  bundle.entry?.push({
    resource: conditionDefinition as fhir4.StructureDefinition,
  });

  return (
    <FhirEditor
      structureDefinitionId="qicore-condition"
      structureDefinitionBundle={bundle}
      data={data}
      updateData={setData}
    />
  );
};

export const CustomCodeableConcept = () => {
  const [data, setData] = useState({});

  const bundle = profileTypes as fhir4.Bundle;

  bundle.entry?.push({
    resource: conditionDefinition as fhir4.StructureDefinition,
  });

  const componentOverrides:ComponentOverrides  = {
    'CodeableConcept': (value: any, updateValue: (data: any) => void) => {
      return (
        <div>
          Hello - {JSON.stringify(value)}
        </div>
      )
    }
  }

  return (
    <FhirEditor
      structureDefinitionId="qicore-condition"
      structureDefinitionBundle={bundle}
      data={data}
      updateData={setData}
      componentOverrides={componentOverrides}
    />
  );
};
