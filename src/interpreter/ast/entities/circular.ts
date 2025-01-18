import { getSymbolId } from "unwritten:interpreter:ast/shared/id";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name";
import { getPositionBySymbol } from "unwritten:interpreter:ast/shared/position";
import { EntityKind } from "unwritten:interpreter/enums/entity";

import type { Symbol } from "typescript";
import type { CircularEntity } from "unwritten:interpreter:type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createCircularEntity(ctx: InterpreterContext, symbol: Symbol): CircularEntity {

  const symbolId = getSymbolId(ctx, symbol);
  const position = getPositionBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = EntityKind.Circular;

  return {
    kind,
    name,
    position,
    symbolId
  };

}
