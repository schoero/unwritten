import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { getNameByType } from "quickdoks:compiler:mixins/name.js";
import { getPositionBySymbol } from "quickdoks:compiler:mixins/position.js";

import type { Type } from "typescript";

import type { CircularType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createLinkToType(ctx: CompilerContext, type: Type): CircularType {

  const id = getIdByType(ctx, type);
  const symbol = type.getSymbol();
  const position = symbol && getPositionBySymbol(ctx, symbol);
  const name = getNameByType(ctx, type);
  const kind = TypeKind.Circular;

  return {
    id,
    kind,
    name,
    position
  };

}
