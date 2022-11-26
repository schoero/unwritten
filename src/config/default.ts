import { CompilerConfig, ExternalTypes } from "../types/config.js";
import { Kind } from "../types/types.js";
import { Complete } from "../types/utils.js";


export const defaultCompilerConfig: Complete<CompilerConfig> = {
  exclude: ["node_modules/**/*"]
};

export const defaultExternalTypes: ExternalTypes = {
  [Kind.String]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
  [Kind.BigInt]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
  [Kind.Number]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
  [Kind.Boolean]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
  [Kind.ObjectLiteral]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
  [Kind.Array]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
  Promise: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
  [Kind.Function]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
  [Kind.Symbol]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
  [Kind.Undefined]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
  [Kind.Null]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null"
};
