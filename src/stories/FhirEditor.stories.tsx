import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import FhirEditor, {
  ComponentOverrides,
} from "../components/FhirEditor/FhirEditor";
import conditionDefinition from "./StructureDefinition-qicore-condition.json";
import observationDefinition from "./StructureDefinition-qicore-observation.json";

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

const bloodPressureExample = {
  resourceType: "Observation",
  id: "blood-pressure",
  meta: {
    profile: ["http://hl7.org/fhir/StructureDefinition/vitalsigns"],
  },
  text: {
    status: "generated",
    div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative</b></p></div>',
  },
  identifier: [
    {
      system: "urn:ietf:rfc:3986",
      value: "urn:uuid:187e0c12-8dd2-67e2-99b2-bf273c878281",
    },
  ],
  basedOn: [
    {
      identifier: {
        system: "https://acme.org/identifiers",
        value: "1234",
      },
    },
  ],
  status: "final",
  category: [
    {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/observation-category",
          code: "vital-signs",
          display: "Vital Signs",
        },
      ],
    },
  ],
  code: {
    coding: [
      {
        system: "http://loinc.org",
        code: "85354-9",
        display: "Blood pressure panel with all children optional",
      },
    ],
    text: "Blood pressure systolic & diastolic",
  },
  subject: {
    reference: "Patient/example",
  },
  effectiveDateTime: "2012-09-17",
  performer: [
    {
      reference: "Practitioner/example",
    },
  ],
  interpretation: [
    {
      coding: [
        {
          system:
            "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
          code: "L",
          display: "low",
        },
      ],
      text: "Below low normal",
    },
  ],
  bodySite: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "368209003",
        display: "Right arm",
      },
    ],
  },
  component: [
    {
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "8480-6",
            display: "Systolic blood pressure",
          },
          {
            system: "http://snomed.info/sct",
            code: "271649006",
            display: "Systolic blood pressure",
          },
          {
            system: "http://acme.org/devices/clinical-codes",
            code: "bp-s",
            display: "Systolic Blood pressure",
          },
        ],
      },
      valueQuantity: {
        value: 107,
        unit: "mmHg",
        system: "http://unitsofmeasure.org",
        code: "mm[Hg]",
      },
      interpretation: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
              code: "N",
              display: "normal",
            },
          ],
          text: "Normal",
        },
      ],
    },
    {
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "8462-4",
            display: "Diastolic blood pressure",
          },
        ],
      },
      valueQuantity: {
        value: 60,
        unit: "mmHg",
        system: "http://unitsofmeasure.org",
        code: "mm[Hg]",
      },
      interpretation: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
              code: "L",
              display: "low",
            },
          ],
          text: "Below low normal",
        },
      ],
    },
  ],
};

const bundle = profileTypes as fhir4.Bundle;

bundle.entry?.push({
  resource: conditionDefinition as fhir4.StructureDefinition,
});

bundle.entry?.push({
  resource: observationDefinition as fhir4.StructureDefinition,
});

export const EmptyCondition = () => {
  const [data, setData] = useState({});

  bundle.entry?.push({
    resource: conditionDefinition as fhir4.StructureDefinition,
  });

  return (
    <div style={{ minWidth: "600px" }}>
      <FhirEditor
        structureDefinitionId="qicore-condition"
        structureDefinitionBundle={bundle}
        data={data}
        updateData={setData}
      />
    </div>
  );
};

export const SeedCondition = () => {
  const [data, setData] = useState(initData);

  return (
    <div style={{ minWidth: "600px" }}>
      <FhirEditor
        structureDefinitionId="qicore-condition"
        structureDefinitionBundle={bundle}
        data={data}
        updateData={setData}
      />
    </div>
  );
};

export const SeedObservation = () => {
  const [data, setData] = useState(bloodPressureExample);

  return (
    <div style={{ minWidth: "600px" }}>
      <FhirEditor
        structureDefinitionId="qicore-observation"
        structureDefinitionBundle={bundle}
        data={data}
        updateData={setData}
      />
    </div>
  );
};

export const CustomCodeableConcept = () => {
  const [data, setData] = useState({});

  const componentOverrides: ComponentOverrides = {
    CodeableConcept: (value: any, updateValue: (data: any) => void) => {
      return <div>Hello - {JSON.stringify(value)}</div>;
    },
  };

  return (
    <div style={{ minWidth: "600px" }}>
      <FhirEditor
        structureDefinitionId="qicore-condition"
        structureDefinitionBundle={bundle}
        data={data}
        updateData={setData}
        componentOverrides={componentOverrides}
      />
    </div>
  );
};
