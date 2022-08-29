import { Complete, RenderConfig } from "../../types/config.js";
import { EntityKind } from "../../types/entities.js";
import { RenderCategories } from "../../types/renderer.js";

export const defaultRenderConfig: Complete<RenderConfig> = {
  "parameterEncapsulation": ["`", "`"],
  "propertyEncapsulation": ["`", "`"],
  "typeEncapsulation":  ["&lt;", "&gt;"],
  "linkBasicTypesToExternalDocs": true,
  "tagEncapsulation":  ["`", "`"],
  "literalTypeEncapsulation": ["`", "`"],
  "renderOrder": [
    EntityKind.Namespace,
    EntityKind.Module,
    EntityKind.Function,
    EntityKind.Class,
    EntityKind.Variable,
    EntityKind.Enum,
    EntityKind.TypeAlias,
    EntityKind.Interface
  ],
  "categoryNames": {
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
  }
};
