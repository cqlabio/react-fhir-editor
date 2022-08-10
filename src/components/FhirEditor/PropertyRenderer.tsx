import React from "react";
import {
  PropertyTypesEnum,
  ResourceProperty,
  ResourceDefinitions,
} from "./types";
import Box from "@mui/material/Box";
import StringRenderer from "./propertyRenderers/StringRenderer";

import ElementRenderer from "./propertyRenderers/ElementRenderer";

type PropertyRendererProps = {
  property: ResourceProperty;
  resourceDefinitions: ResourceDefinitions;
  fhirData: any;

  updateFhirData: (value: any) => void;
};

export default function PropertyRenderer({
  property,
  resourceDefinitions,
  fhirData,
  updateFhirData,
}: PropertyRendererProps) {
  let content = null;

  // const updateValue = (value: any) => {
  //   console.log('ballz', property.propertyName, value)

  //   updateFhirProperty(property.propertyName, value)
  // }

  if (property.propertyType === PropertyTypesEnum.String) {
    content = (
      <StringRenderer
        property={property}
        value={fhirData}
        updateValue={updateFhirData}
      />
    );
  }

  if (property.propertyType === PropertyTypesEnum.Element) {
    content = (
      <ElementRenderer
        property={property}
        resourceDefinitions={resourceDefinitions}
        fhirData={fhirData}
        updateFhirData={updateFhirData}
      />
    );
  }

  if (!content) {
    content = (
      <Box>
        Not Configured: {property.propertyName} with type:{" "}
        {property.propertyType}
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ fontWeight: "bold", fontSize: "14px", paddingBottom: "2px" }}>
        {property.propertyName}
      </Box>
      {content}
    </Box>
  );
}
