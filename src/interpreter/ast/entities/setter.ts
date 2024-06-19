import { EntityKind } from "unwritten:interpreter/enums/entity";
import { createFunctionLikeEntity } from "unwritten:interpreter:ast/entities/index";

import type { Symbol } from "typescript";

import type { SetterEntity } from "unwritten:interpreter:type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createSetterEntity(ctx: InterpreterContext, symbol: Symbol): SetterEntity {
  return createFunctionLikeEntity(ctx, symbol, EntityKind.Setter);
}
