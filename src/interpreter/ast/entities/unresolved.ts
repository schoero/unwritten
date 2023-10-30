import { EntityKind } from "unwritten:interpreter/enums/entity";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name";
import { getPositionBySymbol } from "unwritten:interpreter:ast/shared/position";

import type { Symbol } from "typescript";

import type { UnresolvedEntity } from "unwritten:interpreter/type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createUnresolvedEntity(ctx: InterpreterContext, symbol: Symbol): UnresolvedEntity {

  const name = getNameBySymbol(ctx, symbol);
  const symbolId = getSymbolId(ctx, symbol);
  const position = getPositionBySymbol(ctx, symbol);
  const kind = EntityKind.Unresolved;

  return {
    kind,
    name,
    position,
    symbolId
  };

}
