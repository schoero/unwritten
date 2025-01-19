import { createFunctionLikeEntity } from "unwritten:interpreter:ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";

import type { Symbol } from "typescript";

import type { ConstructorEntity } from "unwritten:interpreter:type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createConstructorEntity(ctx: InterpreterContext, symbol: Symbol): ConstructorEntity {
  return createFunctionLikeEntity(ctx, symbol, EntityKind.Constructor);
}
