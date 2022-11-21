import { Type } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { This, TypeKind } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { createTypeBySymbol } from "./type.js";


export function createThisByType(ctx: CompilerContext, thisType: Type): This {

  const symbol = thisType.getSymbol() ?? thisType.aliasSymbol;

  assert(symbol, "Symbol is not found");

  const id = getIdByType(ctx, thisType);
  const type = createTypeBySymbol(ctx, symbol);
  const kind = TypeKind.This;

  return {
    id,
    kind,
    type
  };

}
