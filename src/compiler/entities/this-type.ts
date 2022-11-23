import { Type } from "typescript";
import { assert } from "vitest";

import { parseSymbol } from "../../parser/index.js";
import { CompilerContext } from "../../types/context.js";
import { ThisType, TypeKind } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";


export function createThisByType(ctx: CompilerContext, thisType: Type): ThisType {

  const symbol = thisType.getSymbol() ?? thisType.aliasSymbol;

  assert(symbol, "Symbol is not found");

  const id = getIdByType(ctx, thisType);
  const type = parseSymbol(ctx, symbol);
  const kind = TypeKind.ThisType;

  return {
    id,
    kind,
    type
  };

}
