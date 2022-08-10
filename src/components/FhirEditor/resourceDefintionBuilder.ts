// import profileTypes from "./profile-types.json";
import {
  ResourceProperty,
  PropertyTypesEnum,
  ResourceDefinitions,
  ResourceDefintion,
} from "./types";

export function makeResourcePath(name: string): string {
  return `#/${name}`;
}

export function getResourceDefintionAtPath(
  path: string,
  resourceDefinitions: ResourceDefinitions
): ResourceDefintion {
  const items = path.split("/");
  const key = items[items.length - 1];
  return resourceDefinitions[key];
}

function parseDefinition(
  structureDefinition: fhir4.StructureDefinition,
  resourceDefinitions: ResourceDefinitions,
  depth: number,
  structureDefinitionReferncesBundle: fhir4.Bundle
): ResourceDefinitions {
  let nextResourceDefinitions = { ...resourceDefinitions };

  // const resourcePath = makeResourcePath(structureDefinition.name)
  const resourceName = structureDefinition.name;

  // Return if resource has already been added
  if (resourceDefinitions[resourceName] || depth > 5) {
    return nextResourceDefinitions;
  }

  const properties: ResourceProperty[] = [];

  structureDefinition.snapshot?.element.forEach((element) => {
    // console.log(element.id, element.slicing ? 'has slice': undefined,)

    if (element.type && element.type.length > 0) {
      if (element.type.length === 1) {
        let elementCode = element.type[0].code;

        const paths = element.path.split(".");

        if (paths.length === 2) {
          const propertyName = paths[1];

          if (
            elementCode === "http://hl7.org/fhirpath/System.String" ||
            elementCode === "string"
          ) {
            properties.push({
              // multiType: false,
              propertyType: PropertyTypesEnum.String,
              propertyName: propertyName,
            });
          } else if (elementCode === "boolean") {
            properties.push({
              // multiType: false,
              propertyType: PropertyTypesEnum.Boolean,
              propertyName: propertyName,
            });
          } else if (elementCode === "dateTime") {
            properties.push({
              // multiType: false,
              propertyType: PropertyTypesEnum.DateTime,
              propertyName: propertyName,
            });
          } else if (elementCode === "uri") {
            properties.push({
              // multiType: false,
              propertyType: PropertyTypesEnum.Uri,
              propertyName: propertyName,
            });
          } else if (elementCode === "Extension") {
            // console.log('Skipping Extension')
          } else {
            const foundDef = structureDefinitionReferncesBundle.entry?.find(
              (res) => {
                return res.resource?.id === elementCode;
              }
            );

            if (foundDef) {
              const foundDefintion =
                foundDef.resource as fhir4.StructureDefinition;

              const linkedDefintions = parseDefinition(
                foundDefintion,
                nextResourceDefinitions,
                depth + 1,
                structureDefinitionReferncesBundle
              );

              nextResourceDefinitions = {
                ...nextResourceDefinitions,
                ...linkedDefintions,
              };

              properties.push({
                // dataType: elementCode,
                // multiType: false,
                propertyType: PropertyTypesEnum.Element,
                propertyName: propertyName,
                referencePath: makeResourcePath(elementCode),
              });
            } else {
              if (elementCode === "Resource") {
              } else {
                // console.log('NOT found', elementCode)
              }
            }
          }
        } else {
          // console.log('should be backbone package', element.path)
        }
      }
    } else {
      // console.log('Multi Type', element.id)
    }
  });

  nextResourceDefinitions[resourceName] = {
    properties: properties,
  };
  // return { properties: properties, elements: nextResourceDefinitions }

  return nextResourceDefinitions;
}

export function buildResourceDefintions(
  structureDefinition: fhir4.StructureDefinition,
  structureDefinitionReferncesBundle: fhir4.Bundle
): {
  rootPath: string;
  resourceDefinitions: ResourceDefinitions;
} {
  return {
    rootPath: makeResourcePath(structureDefinition.name),
    resourceDefinitions: parseDefinition(
      structureDefinition,
      {},
      0,
      structureDefinitionReferncesBundle
    ),
  };
}

// export  class StructureDefinition {
//   structureDefinition: fhir4.StructureDefinition;

//   properties: StructureProperty[] = [];
//   elements = {} as any;

//   constructor(structureDefinition: fhir4.StructureDefinition) {
//     this.structureDefinition = structureDefinition;

//     this.properties = this.parseDefinition(this.structureDefinition, 0);
//   }

//   getResults() {
//     return {
//       properties: this.properties,
//       elements: this.elements,
//     };
//   }

//   getElementByName(name: string) {
//     return this.elements[name];
//   }

//   parseDefinition(
//     structureDefition: fhir4.StructureDefinition,
//     depth: number
//   ): any[] {
//     const properties: any[] = [];

//     if (depth > 5) {
//       // console.log('Max Depth incurred', structureDefition.id)
//       return [];
//     }

//     structureDefition.snapshot?.element.forEach((element) => {
//       // console.log(element.id, element.slicing ? 'has slice': undefined,)

//       if (element.type && element.type.length > 0) {
//         if (element.type.length === 1) {
//           let elementCode = element.type[0].code;

//           const paths = element.path.split(".");

//           if (paths.length === 2) {
//             const propertyName = paths[1];

//             if (
//               elementCode === "http://hl7.org/fhirpath/System.String" ||
//               elementCode === "string"
//             ) {
//               properties.push({
//                 dataType: elementCode,
//                 multiType: false,
//                 viewType: PropertyTypesEnum.String,
//                 propertyName: propertyName,
//               });
//             } else if (elementCode === "boolean") {
//               properties.push({
//                 dataType: elementCode,
//                 multiType: false,
//                 viewType: PropertyTypesEnum.Boolean,
//                 propertyName: propertyName,
//               });
//             } else if (elementCode === "dateTime") {
//               properties.push({
//                 dataType: elementCode,
//                 multiType: false,
//                 viewType: PropertyTypesEnum.DateTime,
//                 propertyName: propertyName,
//               });
//             } else if (elementCode === "uri") {
//               properties.push({
//                 dataType: elementCode,
//                 multiType: false,
//                 viewType: PropertyTypesEnum.Uri,
//                 propertyName: propertyName,
//               });
//             } else if (elementCode === "Extension") {
//               // console.log('Skipping Extension')
//             } else {
//               const foundDef = profileTypes.entry.find((res) => {
//                 return res.resource.id === elementCode;
//               });

//               if (foundDef) {
//                 const foundDefintion =
//                   foundDef.resource as fhir4.StructureDefinition;
//                 this.elements[elementCode] = {
//                   properties: this.parseDefinition(foundDefintion, depth + 1),
//                 };

//                 properties.push({
//                   dataType: elementCode,
//                   multiType: false,
//                   viewType: PropertyTypesEnum.Element,
//                   propertyName: propertyName,
//                   reference: makeResourcePath(elementCode),
//                   // properties: this.parseDefinition(foundDef.resource as fhir4.StructureDefinition, depth + 1)
//                 });
//               } else {
//                 if (elementCode === "Resource") {
//                 } else {
//                   // console.log('NOT found', elementCode)
//                 }
//               }
//             }
//           } else {
//             // console.log('should be backbone package', element.path)
//           }
//         }
//       } else {
//         // console.log('Multi Type', element.id)
//       }
//     });

//     return properties;
//   }
// }
