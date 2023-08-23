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
  stringLiteralEncapsulation: ["\"", "\""],
  tagEncapsulation: ["`", "`"],
  translations: {
    abstract: "abstract",
    beta: "beta",
    callSignature_many: "call signatures",
    callSignature_one: "call signature",
    checkType: "check type",
    class_many: "classes",
    class_one: "class",
    constructSignature_many: "construct signatures",
    constructSignature_one: "construct signature",
    ctor_many: "constructors",
    ctor_one: "constructor",
    default: "default",
    definedIn: "defined in",
    deprecated: "deprecated",
    description_many: "descriptions",
    description_one: "description",
    enum_many: "enums",
    enum_one: "enum",
    event_many: "events",
    event_one: "event",
    example_many: "examples",
    example_one: "example",
    exportAssignment_many: "export assignments",
    exportAssignment_one: "export assignment",
    extendsType: "extends type",
    falseType: "false type",
    function_many: "functions",
    function_one: "function",
    getter_many: "getters",
    getter_one: "getter",
    interface_many: "interfaces",
    interface_one: "interface",
    internal: "internal",
    intersection: "intersection",
    keyType: "key type",
    mappedType: "mapped type",
    method_many: "methods",
    method_one: "method",
    module_many: "modules",
    module_one: "module",
    namespace_many: "namespaces",
    namespace_one: "namespace",
    object_many: "objects",
    object_one: "object",
    optional: "optional",
    parameter_many: "parameters",
    parameter_one: "parameter",
    property_many: "properties",
    property_one: "property",
    readonly: "readonly",
    remarks_many: "remarks",
    remarks_one: "remark",
    required: "required",
    rest: "rest",
    returnType: "return type",
    setter_many: "setters",
    setter_one: "setter",
    static: "static",
    trueType: "true type",
    typeAlias_many: "type aliases",
    typeAlias_one: "type alias",
    typeLiteral: "type literal",
    typeParameter_many: "type parameters",
    typeParameter_one: "type parameter",
    type_many: "types",
    type_one: "type",
    union: "union",
    valueType: "value type",
    variable_many: "variables",
    variable_one: "variable"
  },
  typeEncapsulation: ["`", "`"],
  typeParameterEncapsulation: ["&lt;", "&gt;"]
};


export const defaultMarkdownRenderConfig: Complete<MarkdownRenderConfig> = {
  ...defaultRenderConfig,
  allowedHTMLTags: false,
  sectionSeparator: "---"
};


export const defaultHTMLRenderConfig: Complete<HTMLRenderConfig> = {
  ...defaultRenderConfig,
  sidebar: false,
  typeEncapsulation: ["<code>", "</code>"]
};
