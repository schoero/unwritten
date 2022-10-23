import { CompilerConfig, ExternalTypes } from "../types/config.js";
import { TypeKind } from "../types/types.js";
import { Complete } from "../types/utils.js";


export const defaultCompilerConfig: Complete<CompilerConfig> = {
  exclude: ["node_modules/**/*"]
};

export const defaultExternalTypes: ExternalTypes = {
  [TypeKind.String]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
  [TypeKind.BigInt]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
  [TypeKind.Number]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
  [TypeKind.Boolean]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
  [TypeKind.Object]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
  ["Array"]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
  ["Promise"]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
  [TypeKind.Function]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
  [TypeKind.Symbol]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
  [TypeKind.Undefined]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
  [TypeKind.Null]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null"
};