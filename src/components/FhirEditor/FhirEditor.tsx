import React, { useState } from "react";
import Box from "@mui/material/Box";
// import last from 'lodash/last'
import {
  buildResourceDefintions,
  getResourceDefintionAtPath,
  makeResourcePath,
} from "./resourceDefintionBuilder";
import ElementPropertyPicker from "./ElementPropertyPicker";
import PropertyRenderer from "./PropertyRenderer";
import { ResourceDefinitions } from "./types";

import ResourceRenderer from "./ResourceRenderer";

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

type FhirEditorProps = {
  structureDefintion: fhir4.StructureDefinition;
  structureDefinitionReferncesBundle: fhir4.Bundle;
};

export default function FhirEditor({
  structureDefintion,
  structureDefinitionReferncesBundle,
}: FhirEditorProps) {
  const [data, setData] = useState(initData);

  const { rootPath, resourceDefinitions } = buildResourceDefintions(
    structureDefintion,
    structureDefinitionReferncesBundle
  );

  // const updateProperty = (key: string, value: any) => {
  //   setData({
  //     ...data,
  //     [key]: value,
  //   });
  // };

  // console.log('eee',rootPath, resourceDefinitions)

  console.log("aaaa", resourceDefinitions);
  console.log("bbbb", data);

  return (
    <Box>
      <ResourceRenderer
        resourcePath={rootPath}
        resourceDefinitions={resourceDefinitions}
        fhirData={data}
        updateFhirData={setData}
      />

      {/* <Box component='pre' sx={{background: 'lightyellow'}}>
        {JSON.stringify(structureDefinition, null, 2)}
      </Box> */}
    </Box>
  );
}
