import { describe } from "vitest";

import type { TypeKind } from "quickdoks:compiler:enums/types.js";


type Scopes = "Compiler" | "E2E" | "Integration" | "Renderer" | "Types";
type Units = TypeKind | string;

type DescribeReturnType = ReturnType<typeof describe>;
type DescribeParams = (typeof describe) extends (name: infer Name, factory?: infer Factory, options?: infer Options) => DescribeReturnType ? {
  factory: Factory;
  name: Name;
  options: Options;
} : never;

export function scope(scope: Scopes, unit: Units, factory?: DescribeParams["factory"], options?: DescribeParams["options"]): DescribeReturnType {
  return describe(`${scope}: ${unit}`, factory);
}
