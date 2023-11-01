import { EntityKind } from "unwritten:interpreter/enums/entity";
import { createFunctionLikeEntity } from "unwritten:interpreter:ast/entities/index";

import type { Symbol } from "typescript";

import type { GetterEntity } from "unwritten:interpreter/type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createGetterEntity(ctx: InterpreterContext, symbol: Symbol): GetterEntity {
  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Getter);
  return {
    ...functionLike
  };
}
