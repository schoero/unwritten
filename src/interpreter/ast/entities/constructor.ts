import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { createFunctionLikeEntity } from "unwritten:interpreter:ast/entities/index.js";

import type { Symbol } from "typescript";

import type { ConstructorEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createConstructorEntity(ctx: InterpreterContext, symbol: Symbol): ConstructorEntity {
  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Constructor);
  return functionLike;
}
