import { Type } from "typescript";

import { getPositionBySymbol } from "quickdoks:compiler/compositions/position.js";
import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { getNameByType } from "quickdoks:compiler:compositions/name.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Circular, Kind } from "quickdoks:type-definitions/types.d.js";


export function createLinkToType(ctx: CompilerContext, type: Type): Circular {

  const id = getIdByType(ctx, type);
  const symbol = type.getSymbol();
  const position = symbol && getPositionBySymbol(ctx, symbol);
  const name = getNameByType(ctx, type);
  const kind = Kind.Circular;

  return {
    id,
    kind,
    name,
    position
  };

}
