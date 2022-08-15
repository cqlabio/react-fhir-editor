import React, { useState, createContext } from "react";
import Box from "@mui/material/Box";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// import LocalizationProvider from '@mui/lab/LocalizationProvider';

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

export type ComponentOverrides = Record<
  string,
  (value: any, updateValue: (data: any) => void) => React.ReactNode
>;

type FhirEditorProps = {
  // structureDefintion: fhir4.StructureDefinition;
  structureDefinitionId: string;
  structureDefinitionBundle: fhir4.Bundle;
  data: any;
  updateData: (data: any) => void;
  componentOverrides?: ComponentOverrides;
};

// const  = React.createContext(themes.light);

export const FhirEditorContext = createContext<{
  componentOverrides?: ComponentOverrides;
  resourceDefinitions: ResourceDefinitions;
}>({
  resourceDefinitions: {},
});

export default function FhirEditor({
  // structureDefintion,
  structureDefinitionId,
  structureDefinitionBundle,
  data,
  updateData,
  componentOverrides,
}: FhirEditorProps) {
  // const [data, setData] = useState(initData);

  const { rootPath, resourceDefinitions } = buildResourceDefintions(
    structureDefinitionId,
    structureDefinitionBundle
  );

  console.log("aaaa", resourceDefinitions);
  console.log("bbbb", data);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FhirEditorContext.Provider
        value={{
          componentOverrides,
          resourceDefinitions,
        }}
      >
        <ResourceRenderer
          resourcePath={rootPath}
          resourceDefinitions={resourceDefinitions}
          fhirData={data}
          updateFhirData={updateData}
        />
      </FhirEditorContext.Provider>
    </LocalizationProvider>
  );
}
