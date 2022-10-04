import { CompilerConfig, Complete, ExternalTypes, RenderConfig } from "../types/config.js";
import { TypeKind } from "../types/types.js";


export const defaultCompilerConfig: Complete<CompilerConfig> = {
  exclude: ["node_modules/**/*"]
};

export const defaultRenderConfig: Complete<RenderConfig> = {




























  parameterEncapsulation: ["`", "`"],




























  propertyEncapsulation: ["`", "`"],
  // categoryNames: {
  //   [RenderCategories.Function]: "Function",
  //   [RenderCategories.Functions]: "Functions",
  //   [RenderCategories.Class]: "Class",
  //   [RenderCategories.Classes]: "Classes",
  //   [RenderCategories.Constructor]: "Constructor",
  //   [RenderCategories.Constructors]: "Constructors",
  //   [RenderCategories.Property]: "Property",
  //   [RenderCategories.Properties]: "Properties",
  //   [RenderCategories.Method]: "Method",
  //   [RenderCategories.Methods]: "Methods",
  //   [RenderCategories.Setter]: "Setter",
  //   [RenderCategories.Setters]: "Setters",
  //   [RenderCategories.Getter]: "Getter",
  //   [RenderCategories.Getters]: "Getters",
  //   [RenderCategories.Enum]: "Enum",
  //   [RenderCategories.Enums]: "Enums",
  //   [RenderCategories.Interface]: "Interface",
  //   [RenderCategories.Interfaces]: "Interfaces",
  //   [RenderCategories.TypeAlias]: "Type",
  //   [RenderCategories.TypeAliases]: "Types",
  //   [RenderCategories.Variable]: "Variable",
  //   [RenderCategories.Variables]: "Variables",
  //   [RenderCategories.Namespace]: "Namespace",
  //   [RenderCategories.Namespaces]: "Namespaces",
  //   [RenderCategories.Module]: "Module",
  //   [RenderCategories.Modules]: "Modules"
  // },
  stringLiteralTypeEncapsulation: ["`", "`"],
  // renderOrder: [
  //   // EntityKind.Namespace,
  //   // EntityKind.Module,
  //   EntityKind.Function,
  //   EntityKind.Class,
  //   EntityKind.Variable,
  //   // EntityKind.Enum,
  //   EntityKind.TypeAlias,
  //   EntityKind.Interface
  // ],
  tagEncapsulation:  ["`", "`"],
  typeEncapsulation:  ["&lt;", "&gt;"]
};


export const defaultExternalTypes: ExternalTypes = {
  [TypeKind.String]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
  [TypeKind.BigInt]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
  [TypeKind.Number]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
  [TypeKind.Boolean]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
  [TypeKind.Object]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
  [TypeKind.Promise]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
  [TypeKind.Array]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
  [TypeKind.Function]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
  [TypeKind.Symbol]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
  [TypeKind.Undefined]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
  [TypeKind.Null]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null"
};