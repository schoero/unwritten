import { EntityKind } from "unwritten:interpreter/enums/entity.js";


export const SECTION_TYPE = {
  [EntityKind.Signature]: "signature",
  [EntityKind.Namespace]: "namespace",
  [EntityKind.Module]: "module",
  [EntityKind.Class]: "class",
  [EntityKind.Enum]: "enum",
  [EntityKind.ExportAssignment]: "export-assignment",
  [EntityKind.Variable]: "variable",
  [EntityKind.TypeAlias]: "type",
  [EntityKind.Interface]: "interface",
  [EntityKind.Function]: "class",
  documentation: "documentation",
  tableOfContents: "table-of-contents"
} as const;

export type SectionType = typeof SECTION_TYPE[keyof typeof SECTION_TYPE];
