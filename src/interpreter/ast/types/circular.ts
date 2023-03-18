import { getIdByType } from "unwritten:interpreter/ast/shared/id.js";
import { getNameByType } from "unwritten:interpreter/ast/shared/name.js";
import { getPositionBySymbol } from "unwritten:interpreter/ast/shared/position.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";

import type { Type } from "typescript";

import type { CircularType } from "unwritten:interpreter/type-definitions/types.js";
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
