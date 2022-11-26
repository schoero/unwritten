import { Type } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { Kind, ThisType } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { parseSymbol } from "../entry-points/symbol.js";


export function createThisByType(ctx: CompilerContext, thisType: Type): ThisType {

  const symbol = thisType.getSymbol() ?? thisType.aliasSymbol;

  assert(symbol, "Symbol is not found");

  const id = getIdByType(ctx, thisType);
  const type = parseSymbol(ctx, symbol);
  const kind = Kind.ThisType;

  return {
    id,
    kind,
    type
  };

}
