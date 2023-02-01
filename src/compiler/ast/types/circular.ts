import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdByType } from "unwritten:compiler:shared/id.js";
import { getNameByType } from "unwritten:compiler:shared/name.js";
import { getPositionBySymbol } from "unwritten:compiler:shared/position.js";

import type { Type } from "typescript";

import type { CircularType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


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
