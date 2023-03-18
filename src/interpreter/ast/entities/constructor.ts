import { createFunctionLikeEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";

import type { Symbol } from "typescript";

import type { ConstructorEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createConstructorEntity(ctx: InterpreterContext, symbol: Symbol): ConstructorEntity {
  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Constructor);
  return functionLike;
}
