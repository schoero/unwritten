import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { createFunctionLikeEntity } from "unwritten:interpreter:ast/entities/index.js";

import type { Symbol } from "typescript";

import type { MethodEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createMethodEntity(ctx: InterpreterContext, symbol: Symbol): MethodEntity {
  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Method);
  return {
    ...functionLike
  };
}
