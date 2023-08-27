import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { createFunctionLikeEntity } from "unwritten:interpreter:ast/entities/index.js";

import type { Symbol } from "typescript";

import type { GetterEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createGetterEntity(ctx: InterpreterContext, symbol: Symbol): GetterEntity {
  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Getter);
  return {
    ...functionLike
  };
}
