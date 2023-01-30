import { createFunctionLikeEntity } from "unwritten:compiler:entities";
import { EntityKind } from "unwritten:compiler:enums/entities.js";

import type { Symbol } from "typescript";

import type { GetterEntity } from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createGetterEntity(ctx: CompilerContext, symbol: Symbol): GetterEntity {

  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Getter);
  const kind = EntityKind.Getter;

  return {
    ...functionLike,
    kind
  };

}
