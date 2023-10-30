import { EntityKind } from "unwritten:interpreter/enums/entity";
import { createFunctionLikeEntity } from "unwritten:interpreter:ast/entities/index";

import type { Symbol } from "typescript";

import type { ConstructorEntity } from "unwritten:interpreter/type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createConstructorEntity(ctx: InterpreterContext, symbol: Symbol): ConstructorEntity {
  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Constructor);
  return functionLike;
}
