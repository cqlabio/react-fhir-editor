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

type ResourceRendererProps = {
  resourcePath: string;
  fhirData: any;
  resourceDefinitions: ResourceDefinitions;
  updateFhirData: (value: any) => void;
};

export default function ResourceRenderer({
  resourcePath,
  fhirData,
  updateFhirData,
  resourceDefinitions,
}: ResourceRendererProps) {
  const [isOpen, setIsOpen] = useState(true);

  const resourceDefinition = getResourceDefintionAtPath(
    resourcePath,
    resourceDefinitions
  );

  if (!resourceDefinition) {
    return <div>Resouce Definition Not Found: {resourcePath}</div>;
  }

  const existingKeys = new Set(Object.keys(fhirData || {}));

  const propertyViews = resourceDefinition.properties.map((property) => {
    if (!existingKeys.has(property.propertyName)) {
      return null;
    }

    const propertyFhir = fhirData[property.propertyName];

    const updateInnerProperty = (value: any) => {
      const nextFhirData = { ...fhirData };
      if (value === undefined) {
        delete nextFhirData[property.propertyName];
      } else {
        nextFhirData[property.propertyName] = value;
      }
      updateFhirData(nextFhirData);
    };

    return (
      <PropertyRenderer
        key={property.propertyName}
        property={property}
        resourceDefinitions={resourceDefinitions}
        fhirData={propertyFhir}
        updateFhirData={updateInnerProperty}
      />
    );
  });

  return (
    <Box>
      {propertyViews}
      <Box sx={{ paddingTop: "10px" }}>
        <ElementPropertyPicker
          properties={resourceDefinition.properties}
          existingKeys={existingKeys}
          updateFhirData={updateFhirData}
          fhirData={fhirData}
          isSmall
        />
      </Box>
    </Box>
  );
}
