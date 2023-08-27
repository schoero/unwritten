import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getSymbolId, getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameByType } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionBySymbol } from "unwritten:interpreter:ast/shared/position.js";

import type { Type } from "typescript";

import type { CircularType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createCircularType(ctx: InterpreterContext, type: Type): CircularType {

  const typeId = getTypeId(ctx, type);
  const symbol = type.getSymbol();
  const symbolId = symbol && getSymbolId(ctx, symbol);
  const position = symbol && getPositionBySymbol(ctx, symbol);
  const name = getNameByType(ctx, type);
  const kind = TypeKind.Circular;

  return {
    kind,
    name,
    position,
    symbolId,
    typeId
  };

}
