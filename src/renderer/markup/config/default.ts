import { EntityKind } from "unwritten:compiler:enums/entities.js";
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
