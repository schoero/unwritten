import { createFunctionLikeEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";

import type { Symbol } from "typescript";

import type { SetterEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createSetterEntity(ctx: CompilerContext, symbol: Symbol): SetterEntity {

  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Setter);
  const kind = EntityKind.Setter;

  return {
    ...functionLike,
    kind
  };

}
