import { Symbol, Type } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Link, TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionBySymbol } from "../compositions/position.js";


export function createLinkBySymbol(ctx: CompilerContext, symbol: Symbol): Link {

  const id = getIdBySymbol(ctx, symbol);
  const position = getPositionBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = TypeKind.Link;

  return {
    id,
    kind,
    name,
    position
  };

}


export function createLinkByType(ctx: CompilerContext, type: Type): Link {
  return createLinkBySymbol(ctx, type.symbol);
}
