/* eslint-disable @typescript-eslint/naming-convention */
import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { RenderCategories } from "unwritten:renderer:markup/types-definitions/renderer.d.js";

import type {
  HTMLRenderConfig,
  MarkdownRenderConfig,
  MarkupRenderConfig
} from "unwritten:renderer/markup/types-definitions/config.js";
import type { Complete } from "unwritten:type-definitions/utils.js";


export const defaultRenderConfig: Complete<MarkupRenderConfig> = {
  categoryNames: {
    [RenderCategories.Function]: "Function",
    [RenderCategories.Functions]: "Functions",
    [RenderCategories.Class]: "Class",
    [RenderCategories.Classes]: "Classes",
    [RenderCategories.Constructor]: "Constructor",
    [RenderCategories.Constructors]: "Constructors",
    [RenderCategories.Property]: "Property",
    [RenderCategories.Properties]: "Properties",
    [RenderCategories.Method]: "Method",
    [RenderCategories.Methods]: "Methods",
    [RenderCategories.Setter]: "Setter",
    [RenderCategories.Setters]: "Setters",
    [RenderCategories.Getter]: "Getter",
    [RenderCategories.Getters]: "Getters",
    [RenderCategories.Enum]: "Enum",
    [RenderCategories.Enums]: "Enums",
    [RenderCategories.Interface]: "Interface",
    [RenderCategories.Interfaces]: "Interfaces",
    [RenderCategories.TypeAlias]: "Type",
    [RenderCategories.TypeAliases]: "Types",
    [RenderCategories.Variable]: "Variable",
    [RenderCategories.Variables]: "Variables",
    [RenderCategories.Namespace]: "Namespace",
    [RenderCategories.Namespaces]: "Namespaces",
    [RenderCategories.Module]: "Module",
    [RenderCategories.Modules]: "Modules"
  },
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
  stringLiteralEncapsulation: ["\"", "\""],
  tagEncapsulation: ["`", "`"],
  translations: {
    "abstract": "abstract",
    "beta": "beta",
    "call-signature_one": "call-signature",
    "call-signature_other": "call-signatures",
    "class_one": "class",
    "class_other": "classes",
    "construct-signature_one": "construct-signature",
    "construct-signature_other": "construct-signatures",
    "constructor_one": "constructor",
    "constructor_other": "constructors",
    "default": "default",
    "deprecated": "deprecated",
    "enum_one": "enum",
    "enum_other": "enums",
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
    "optional": "optional",
    "property_one": "property",
    "property_other": "properties",
    "readonly": "readonly",
    "required": "required",
    "rest": "rest",
    "returns": "returns",
    "setter_one": "setter",
    "setter_other": "setters",
    "static": "static",
    "type": "type",
    "type_other": "types",
    "variable_one": "variable",
    "variable_other": "variables"
  },
  typeEncapsulation: ["&lt;", "&gt;"],
  typeParameterEncapsulation: ["&lt;", "&gt;"]
};


export const defaultMarkdownRenderConfig: Complete<MarkdownRenderConfig> = {
  ...defaultRenderConfig,
  allowedHTMLTags: false
};


export const defaultHTMLRenderConfig: Complete<HTMLRenderConfig> = {
  ...defaultRenderConfig
};
