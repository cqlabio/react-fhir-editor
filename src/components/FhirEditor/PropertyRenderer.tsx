import React, { useCallback, useContext } from "react";
import {
  PropertyTypesEnum,
  ResourceProperty,
  ResourceDefinitions,
} from "./types";
import Box from "@mui/material/Box";
import StringRenderer from "./propertyRenderers/StringRenderer";
import ElementRenderer from "./propertyRenderers/ElementRenderer";
import DateTimeRenderer from "./propertyRenderers/DateTimeRenderer";
import CodeableConceptRenderer from "./propertyRenderers/CodeableConceptRenderer";
import ArrayRenderer from "./propertyRenderers/ArrayRenderer";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { FhirEditorContext } from "./FhirEditor";
import { getNameFromPath } from "./resourceDefintionBuilder";
import PropertyValueRenderer from "./PropertyValueRenderer";

type PropertyRendererProps = {
  property: ResourceProperty;
  fhirData: any;
  updateFhirData: (value: any) => void;
};

export default function PropertyRenderer({
  property,
  fhirData,
  updateFhirData,
}: PropertyRendererProps) {
  const { componentOverrides, resourceDefinitions } =
    useContext(FhirEditorContext);

  let content = null;

  const deleteProperty = useCallback(() => {
    updateFhirData(undefined);
  }, [updateFhirData]);

  const openDescription = () => {
    alert(property.definition.definition);
  };

  // if (property.propertyType === PropertyTypesEnum.Array) {
  //   content = (
  //     <ArrayRenderer
  //       property={property}
  //       value={fhirData}
  //       updateValue={updateFhirData}
  //     />
  //   )
  // }

  // if (property.propertyType === PropertyTypesEnum.String) {
  //   content = (
  //     <StringRenderer
  //       // property={property}
  //       value={fhirData}
  //       updateValue={updateFhirData}
  //     />
  //   );
  // }

  // if (property.propertyType === PropertyTypesEnum.Uri) {
  //   content = (
  //     <StringRenderer
  //       // property={property}
  //       value={fhirData}
  //       updateValue={updateFhirData}
  //     />
  //   );
  // }

  // if (property.propertyType === PropertyTypesEnum.DateTime) {
  //   content = (
  //     <DateTimeRenderer value={fhirData} updateValue={updateFhirData} />
  //   );
  // }

  // if (property.propertyType === PropertyTypesEnum.Element) {
  //   if (componentOverrides) {
  //     const componentName = getNameFromPath(property.referencePath);

  //     if (componentName in componentOverrides) {
  //       content = componentOverrides[componentName](fhirData, updateFhirData);
  //     }
  //   }

  //   if (!content && property.referencePath === "#/CodeableConcept") {
  //     content = (
  //       <CodeableConceptRenderer
  //         value={fhirData}
  //         updateValue={updateFhirData}
  //       />
  //     );
  //   }

  //   if (!content) {
  //     content = (
  //       <ElementRenderer
  //         property={property}
  //         resourceDefinitions={resourceDefinitions}
  //         fhirData={fhirData}
  //         updateFhirData={updateFhirData}
  //       />
  //     );
  //   }
  // }

  // if (!content) {
  //   content = (
  //     <Box>
  //       Not Configured: {property.propertyName} with type:{" "}
  //       {property.propertyType}
  //     </Box>
  //   );
  // }

  return (
    <Box>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "14px",
          paddingTop: "10px",
          paddingBottom: "2px",
          display: "flex",
        }}
      >
        {property.propertyName}

        <InfoOutlinedIcon
          onClick={openDescription}
          sx={{
            paddingLeft: "5px",
            fontWeight: 300,
            cursor: "pointer",
            fontSize: "15px",
            color: "rgb(160,160,160)",
            ":hover": {
              color: "secondary.main",
            },
          }}
        />
        <DeleteOutlineIcon
          onClick={deleteProperty}
          sx={{
            paddingLeft: "5px",
            fontWeight: 300,
            cursor: "pointer",
            fontSize: "15px",
            color: "rgb(160,160,160)",
            ":hover": {
              color: "secondary.main",
            },
          }}
        />
      </Box>

      <PropertyValueRenderer
        property={property}
        fhirData={fhirData}
        updateFhirData={updateFhirData}
      />
    </Box>
  );
}
