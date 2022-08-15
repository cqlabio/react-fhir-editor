export enum PropertyTypesEnum {
  // Date = 'Date',
  Element = "Element",
  String = "String",
  Boolean = "Boolean",
  DateTime = "DateTime",
  Decimal = "Decimal",
  Uri = "Uri",
  Choice = "Choice",
  NotFound = "NotFound",
  // Boolean = 'Boolean',
  // Instant = 'Instant',
  // TextDisplay = 'TextDisplay',
  // Duration = 'Duration',
  // Period = 'Period',
  // TextEdit = 'TextEdit',
  // Enum = 'Enum',
}

interface BaseProperty {
  propertyType: PropertyTypesEnum;
  propertyName: string;
  baseChoiceType?: string;
  definition: fhir4.ElementDefinition;
}

export interface ElementProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.Element;
  referencePath: string;
}

export interface StringProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.String;
}

export interface BooleanProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.Boolean;
}

export interface DecimalProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.Decimal;
}

export interface UriProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.Uri;
}

export interface DateTimeProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.DateTime;
}

export interface ChoiceTypeProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.Choice;
  choices: ResourceProperty[];
}

export interface NotFoundProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.NotFound;
  errorMessage: string;
}

// export interface ResourceProperty {
//   viewType: PropertyTypesEnum;
//   dataType: string;
//   multiType: boolean;
//   propertyName: string;
//   reference?: string;
// }

export type ResourceProperty =
  | ElementProperty
  | StringProperty
  | BooleanProperty
  | DecimalProperty
  | UriProperty
  | DateTimeProperty
  | ChoiceTypeProperty
  | NotFoundProperty;

export interface ResourceDefintion {
  properties: ResourceProperty[];
}

export type ResourceDefinitions = Record<string, ResourceDefintion>;

// export interface ResourceDefinition {
//   properties: StructureProperty[],
//   elements: Record<string, ResourceElement>
// }
