import { describe } from "vitest";

import type { TypeKind } from "unwritten:interpreter/enums/type";


type Scopes =
  | "E2E"
  | "HTMLRenderer"
  | "Integration"
  | "Interpreter"
  | "JSONRenderer"
  | "MarkdownRenderer"
  | "MarkupRenderer"
  | "Renderer"
  | "Types"
  | "TypeScriptRenderer";

type Units = TypeKind | string;

type DescribeReturnType = ReturnType<typeof describe>;
type DescribeParams = (typeof describe) extends (name: infer Name, options: infer Options, factory: infer Factory) => DescribeReturnType ? {
  factory: Factory;
  name: Name;
  options: Options;
} : never;

export function scope(scope: Scopes, unit: Units, factory: DescribeParams["factory"], options?: DescribeParams["options"]): DescribeReturnType {
  return describe(`${scope}: ${unit}`, factory);
}
