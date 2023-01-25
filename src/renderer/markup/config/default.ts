import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { RenderCategories } from "quickdoks:renderer:markup/types/renderer.js";

import type { MarkupRenderConfig } from "quickdoks:renderer:markup/types/config.js";
import type { Complete } from "quickdoks:type-definitions/utils.js";


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
    EntityKind.Namespace,
    EntityKind.Module,
    EntityKind.Function,
    EntityKind.Class,
    EntityKind.Variable,
    EntityKind.Enum,
    EntityKind.TypeAlias,
    EntityKind.Interface
  ],
  stringLiteralTypeEncapsulation: ["`", "`"],
  tagEncapsulation: ["`", "`"],
  typeEncapsulation: ["&lt;", "&gt;"]
};
