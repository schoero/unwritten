import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionBySymbol } from "unwritten:interpreter:ast/shared/position.js";

import type { Symbol } from "typescript";

import type { CircularEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


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
