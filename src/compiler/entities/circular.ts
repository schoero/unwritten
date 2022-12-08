import { Symbol } from "typescript";

import { getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { getPositionBySymbol } from "quickdoks:compiler:compositions/position.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Circular, Kind } from "quickdoks:types:types.js";


export function createLinkToSymbol(ctx: CompilerContext, symbol: Symbol): Circular {

  const id = getIdBySymbol(ctx, symbol);
  const position = getPositionBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = Kind.Circular;

  return {
    id,
    kind,
    name,
    position
  };

}
