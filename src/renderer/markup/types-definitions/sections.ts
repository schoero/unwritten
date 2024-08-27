import { EntityKind } from "unwritten:interpreter/enums/entity";


const ENTITY_SECTIONS = {
  [EntityKind.CallSignature]: "signature",
  [EntityKind.Class]: "class",
  [EntityKind.Constructor]: "constructor",
  [EntityKind.ConstructSignature]: "signature",
  [EntityKind.Enum]: "enum",
  [EntityKind.ExportAssignment]: "export-assignment",
  [EntityKind.Function]: "function",
  [EntityKind.FunctionSignature]: "signature",
  [EntityKind.Getter]: "getter",
  [EntityKind.GetterSignature]: "signature",
  [EntityKind.Interface]: "interface",
  [EntityKind.Method]: "method",
  [EntityKind.MethodSignature]: "signature",
  [EntityKind.Module]: "module",
  [EntityKind.Namespace]: "namespace",
  [EntityKind.Property]: "property",
  [EntityKind.Setter]: "setter",
  [EntityKind.SetterSignature]: "signature",
  [EntityKind.TypeAlias]: "type",
  [EntityKind.Variable]: "variable"
} as const;


const GENERIC_SECTIONS = {
  classes: "classes",
  constructors: "constructors",
  documentation: "documentation",
  enums: "enums",
  events: "events",
  exportAssignments: "export-assignments",
  functions: "functions",
  getters: "getters",
  interfaces: "interfaces",
  methods: "methods",
  modules: "modules",
  namespaces: "namespaces",
  properties: "properties",
  setters: "setters",
  signatures: "signatures",
  tableOfContents: "table-of-contents",
  types: "types",
  variables: "variables"
} as const;

const SECTION_TYPE = {
  ...ENTITY_SECTIONS,
  ...GENERIC_SECTIONS
} as const;

export type SectionType = typeof SECTION_TYPE[keyof typeof SECTION_TYPE];


export function getSectionType(kind: keyof typeof SECTION_TYPE) {
  return SECTION_TYPE[kind];
}

export function pluralizeEntityKind(entityKind: keyof typeof ENTITY_SECTIONS): keyof typeof SECTION_TYPE {

  switch (entityKind){
    case EntityKind.Class:
      return "classes";
    case EntityKind.Constructor:
      return "constructors";
    case EntityKind.Enum:
      return "enums";
    case EntityKind.Interface:
      return "interfaces";
    case EntityKind.Function:
      return "functions";
    case EntityKind.Method:
      return "methods";
    case EntityKind.Namespace:
      return "namespaces";
    case EntityKind.Property:
      return "properties";
    case EntityKind.Variable:
      return "variables";
    case EntityKind.TypeAlias:
      return "types";
    case EntityKind.ExportAssignment:
      return "exportAssignments";
    case EntityKind.Getter:
      return "getters";
    case EntityKind.Setter:
      return "setters";
    case EntityKind.Module:
      return "modules";
    case EntityKind.FunctionSignature:
    case EntityKind.MethodSignature:
    case EntityKind.SetterSignature:
    case EntityKind.GetterSignature:
    case EntityKind.CallSignature:
    case EntityKind.ConstructSignature:
      return "signatures";
  }

}
