import { createFunctionLikeEntity } from "unwritten:compiler:entities";
import { EntityKind } from "unwritten:compiler:enums/entities.js";

import type { Symbol } from "typescript";

import type { MethodEntity } from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createMethodEntity(ctx: CompilerContext, symbol: Symbol): MethodEntity {

  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Method);
  const kind = EntityKind.Method;

  return {
    ...functionLike,
    kind
  };

}
