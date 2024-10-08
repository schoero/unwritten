/* eslint-disable eslint-plugin-perfectionist/sort-objects */
/* eslint-disable eslint-plugin-typescript/naming-convention */
import { TypeKind } from "unwritten:interpreter/enums/type";

import type { ExternalTypes, InterpreterConfig } from "unwritten:type-definitions/config";
import type { Complete } from "unwritten:type-definitions/utils";


export const defaultOutputPath = "./docs/";

export const defaultInterpreterConfig: Complete<InterpreterConfig> = {
  exclude: {
    "node_modules/**/*": "*",
    "!node_modules/typescript/lib/**/*": [
      "Array",
      "Partial",
      "Required",
      "Readonly",
      "Pick",
      "Record",
      "Exclude",
      "Extract",
      "Omit",
      "NonNullable",
      "Parameters",
      "ConstructorParameters",
      "ReturnType",
      "InstanceType",
      "Lowercase",
      "Capitalize",
      "Uncapitalize",
      "ThisType"
    ]
  }
};

export const defaultExternalTypes: ExternalTypes = {
  [TypeKind.String]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
  [TypeKind.BigInt]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
  [TypeKind.Number]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
  [TypeKind.Boolean]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
  [TypeKind.Object]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
  [TypeKind.Array]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
  [TypeKind.Function]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
  [TypeKind.Symbol]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
  [TypeKind.Undefined]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
  [TypeKind.Null]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null",
  [TypeKind.Any]: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any",
  Map: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
  Promise: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
  Set: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
  WeakMap: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap",
  WeakRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef",
  WeakSet: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet"
};
