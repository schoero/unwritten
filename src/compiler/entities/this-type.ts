import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { parseSymbol } from "quickdoks:compiler:entry-points/symbol.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, ThisType } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


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
