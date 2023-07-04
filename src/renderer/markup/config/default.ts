/* eslint-disable @typescript-eslint/naming-convention */
import { EntityKind } from "unwritten:interpreter:enums/entities.js";

import type {
  HTMLRenderConfig,
  MarkdownRenderConfig,
  MarkupRenderConfig
} from "unwritten:renderer:markup/types-definitions/config.js";
import type { Complete } from "unwritten:type-definitions/utils.js";


export const defaultRenderConfig: Complete<MarkupRenderConfig> = {
  indentation: "  ",
  newLine: "\n",
  parameterEncapsulation: ["`", "`"],
  propertyEncapsulation: ["`", "`"],
  removeHyphenAtStartOfTag: true,
  renderOrder: [
    EntityKind.Module,
    EntityKind.Namespace,
    EntityKind.Class,
    EntityKind.Function,
    EntityKind.Variable,
    EntityKind.Enum,
    EntityKind.TypeAlias,
    EntityKind.Interface
  ],
  renderPrivateMembers: false,
  renderUndefinedInOptionalTypes: false,
  sectionSeparator: "---",
  stringLiteralEncapsulation: ["\"", "\""],
  tagEncapsulation: ["`", "`"],
  translations: {
    "abstract": "abstract",
    "beta": "beta",
    "call-signature_one": "call signature",
    "call-signature_other": "call signatures",
    "class_one": "class",
    "class_other": "classes",
    "construct-signature_one": "construct signature",
    "construct-signature_other": "construct signatures",
    "constructor_one": "constructor",
    "constructor_other": "constructors",
    "default": "default",
    "defined-in": "defined in",
    "deprecated": "deprecated",
    "description_one": "description",
    "description_other": "descriptions",
    "enum_one": "enum",
    "enum_other": "enums",
    "example_one": "example",
    "example_other": "examples",
    "export-assignment_one": "export assignment",
    "export-assignment_other": "export assignments",
    "function_one": "function",
    "function_other": "functions",
    "getter_one": "getter",
    "getter_other": "getters",
    "interface": "interface",
    "interface_other": "interfaces",
    "internal": "internal",
    "method_one": "method",
    "method_other": "methods",
    "module_one": "module",
    "module_other": "modules",
    "namespace_one": "namespace",
    "namespace_other": "namespaces",
    "object_one": "object",
    "object_other": "objects",
    "optional": "optional",
    "parameter_one": "parameter",
    "parameter_other": "parameters",
    "property_one": "property",
    "property_other": "properties",
    "readonly": "readonly",
    "remarks_one": "remark",
    "remarks_other": "remarks",
    "required": "required",
    "rest": "rest",
    "return-type": "return type",
    "setter_one": "setter",
    "setter_other": "setters",
    "static": "static",
    "type-alias_one": "type alias",
    "type-alias_other": "type aliases",
    "type-parameter_one": "type parameter",
    "type-parameter_other": "type parameters",
    "type_one": "type",
    "type_other": "types",
    "variable_one": "variable",
    "variable_other": "variables"
  },
  typeEncapsulation: ["`", "`"],
  typeParameterEncapsulation: ["&lt;", "&gt;"]
};


export const defaultMarkdownRenderConfig: Complete<MarkdownRenderConfig> = {
  ...defaultRenderConfig,
  allowedHTMLTags: false
};


export const defaultHTMLRenderConfig: Complete<HTMLRenderConfig> = {
  ...defaultRenderConfig,
  sidebar: false,
  typeEncapsulation: ["<code>", "</code>"]
};
