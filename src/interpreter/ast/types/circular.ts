import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType } from "unwritten:interpreter/utils/ts";
import { getSymbolId, getTypeId } from "unwritten:interpreter:ast/shared/id";
import { getNameByType } from "unwritten:interpreter:ast/shared/name";
import { getPositionBySymbol } from "unwritten:interpreter:ast/shared/position";

import type { Type } from "typescript";

import type { CircularType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createCircularType = (ctx: InterpreterContext, type: Type): CircularType => withCachedType(ctx, type, () => {

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

});
