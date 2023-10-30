import { EntityKind } from "unwritten:interpreter/enums/entity";
import { createFunctionLikeEntity } from "unwritten:interpreter:ast/entities/index";

import type { Symbol } from "typescript";

import type { MethodEntity } from "unwritten:interpreter/type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createMethodEntity(ctx: InterpreterContext, symbol: Symbol): MethodEntity {
  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Method);
  return {
    ...functionLike
  };
}
