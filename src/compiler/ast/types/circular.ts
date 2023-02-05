import { getIdByType } from "unwritten:compiler/ast/shared/id.js";
import { getNameByType } from "unwritten:compiler/ast/shared/name.js";
import { getPositionBySymbol } from "unwritten:compiler/ast/shared/position.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";

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
