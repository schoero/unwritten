import { createFunctionLikeEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";

import type { Symbol } from "typescript";

import type { MethodEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createMethodEntity(ctx: CompilerContext, symbol: Symbol): MethodEntity {

  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Method);
  const kind = EntityKind.Method;

  return {
    ...functionLike,
    kind
  };

}
