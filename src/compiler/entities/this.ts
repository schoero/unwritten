import { Type } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { This, TypeKind } from "../../types/types.js";
import { createTargetBySymbol } from "./type-reference.js";


export function createThisByType(ctx: CompilerContext, type: Type): This {

  const symbol = type.getSymbol() ?? type.aliasSymbol;

  assert(symbol, "Symbol is not found");

  const target = createTargetBySymbol(ctx, symbol);
  const kind = TypeKind.This;

  return {
    ...target,
    kind
  };

}
