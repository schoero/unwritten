import { CompilerConfig, Complete, ExternalTypes, RenderConfig } from "../types/config.js";
import { EntityKind } from "../types/types.js";


export const defaultCompilerConfig: Complete<CompilerConfig> = {
  exclude: ["node_modules/**/*"]
};

export const defaultRenderConfig: Complete<RenderConfig> = {
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
  literalTypeEncapsulation: ["`", "`"],
  parameterEncapsulation: ["`", "`"],
  propertyEncapsulation: ["`", "`"],
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
  [EntityKind.String]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
  [EntityKind.BigInt]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
  [EntityKind.Number]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
  [EntityKind.Boolean]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
  [EntityKind.Object]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
  [EntityKind.Promise]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
  [EntityKind.Array]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
  [EntityKind.Function]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
  [EntityKind.Symbol]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
  [EntityKind.Undefined]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
  [EntityKind.Null]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null"
};