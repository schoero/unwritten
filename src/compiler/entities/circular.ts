import { Symbol } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Circular, Kind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionBySymbol } from "../compositions/position.js";


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
