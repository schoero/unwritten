import { createFunctionLikeEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";

import type { Symbol } from "typescript";

import type { SetterEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createSetterEntity(ctx: InterpreterContext, symbol: Symbol): SetterEntity {

  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Setter);

  return {
    ...functionLike
  };

}
