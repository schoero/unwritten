/* eslint-disable @typescript-eslint/naming-convention */
import { EntityKind } from "unwritten:interpreter/enums/entity.js";

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
    EntityKind.Interface,
    EntityKind.ExportAssignment
  ],
  renderPrivateMembers: false,
  sectionSeparator: "---",
  stringLiteralEncapsulation: ["\"", "\""],
  tagEncapsulation: ["`", "`"],
  translations: {
    abstract: "abstract",
    beta: "beta",
    callSignature_one: "call signature",
    callSignature_other: "call signatures",
    checkType: "check type",
    class_one: "class",
    class_other: "classes",
    constructSignature_one: "construct signature",
    constructSignature_other: "construct signatures",
    constructor_one: "constructor",
    constructor_other: "constructors",
    default: "default",
    definedIn: "defined in",
    deprecated: "deprecated",
    description_one: "description",
    description_other: "descriptions",
    enum_one: "enum",
    enum_other: "enums",
    example_one: "example",
    example_other: "examples",
    exportAssignment_one: "export assignment",
    exportAssignment_other: "export assignments",
    extendsType: "extends type",
    falseType: "false type",
    function_one: "function",
    function_other: "functions",
    getter_one: "getter",
    getter_other: "getters",
    interface: "interface",
    interface_other: "interfaces",
    internal: "internal",
    intersection: "intersection",
    keyType: "key type",
    method_one: "method",
    method_other: "methods",
    module_one: "module",
    module_other: "modules",
    namespace_one: "namespace",
    namespace_other: "namespaces",
    object_one: "object",
    object_other: "objects",
    optional: "optional",
    parameter_one: "parameter",
    parameter_other: "parameters",
    property_one: "property",
    property_other: "properties",
    readonly: "readonly",
    remarks_one: "remark",
    remarks_other: "remarks",
    required: "required",
    rest: "rest",
    returnType: "return type",
    setter_one: "setter",
    setter_other: "setters",
    static: "static",
    trueType: "true type",
    typeAlias_one: "type alias",
    typeAlias_other: "type aliases",
    typeParameter_one: "type parameter",
    typeParameter_other: "type parameters",
    type_one: "type",
    type_other: "types",
    union: "union",
    valueType: "value type",
    variable_one: "variable",
    variable_other: "variables"
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
