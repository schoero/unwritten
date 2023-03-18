import { createFunctionLikeEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";

import type { Symbol } from "typescript";

import type { GetterEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createGetterEntity(ctx: InterpreterContext, symbol: Symbol): GetterEntity {

  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Getter);

  return {
    ...functionLike
  };

}
