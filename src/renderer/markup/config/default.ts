import { MarkupRenderConfig } from "quickdoks:renderer:markup/types/config.js";
import { RenderCategories } from "quickdoks:renderer:markup/types/renderer.js";
import { Kind } from "quickdoks:types:types.js";
import { Complete } from "quickdoks:types:utils.js";


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
  parameterEncapsulation: ["`", "`"],
  propertyEncapsulation: ["`", "`"],
  removeHyphenAtStartOfTag: true,
  renderOrder: [
    Kind.Namespace,
    Kind.Module,
    Kind.Function,
    Kind.Class,
    Kind.Variable,
    Kind.Enum,
    Kind.TypeAlias,
    Kind.Interface
  ],
  stringLiteralTypeEncapsulation: ["`", "`"],
  tagEncapsulation: ["`", "`"],
  typeEncapsulation: ["&lt;", "&gt;"]
};
