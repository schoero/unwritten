import { createFunctionLikeEntity } from "unwritten:interpreter:ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";

import type { Symbol } from "typescript";

import type { FunctionEntity } from "unwritten:interpreter:type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createFunctionEntity(ctx: InterpreterContext, symbol: Symbol): FunctionEntity {
  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Function);
  return functionLike;
}
