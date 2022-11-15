import { describe } from "vitest";

import { TypeKind } from "../../src/types/types.js";


type Scopes = "Compiler" | "Renderer" | "Types";
type Units = TypeKind | string;

type DescribeReturnType = ReturnType<typeof describe>;
type DescribeParams = (typeof describe) extends (name: infer Name, factory?: infer Factory, options?: infer Options) => DescribeReturnType ? {
  factory: Factory;
  name: Name;
  options: Options;
} : never;

export function scope(scope: Scopes, unit: Units, factory?: DescribeParams["factory"], options?: DescribeParams["options"]): DescribeReturnType {
  return describe(`${scope}: ${unit}`, factory, options);
}
