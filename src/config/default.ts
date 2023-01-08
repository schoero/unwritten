import { TypeKind } from "quickdoks:compiler:enums/types.js";

import type { CompilerConfig, ExternalTypes } from "quickdoks:compiler:type-definitions/config.d.js";
import type { Complete } from "quickdoks:compiler:type-definitions/utils.d.js";


export const defaultCompilerConfig: Complete<CompilerConfig> = {
  exclude: ["node_modules/**/*"]
};

export const defaultExternalTypes: ExternalTypes = {
  [TypeKind.String]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
  [TypeKind.BigInt]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
  [TypeKind.Number]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
  [TypeKind.Boolean]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
  [TypeKind.ObjectLiteral]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
  [TypeKind.Array]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
  Promise: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
  [TypeKind.FunctionType]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
  [TypeKind.Symbol]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
  [TypeKind.Undefined]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
  [TypeKind.Null]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null"
};
