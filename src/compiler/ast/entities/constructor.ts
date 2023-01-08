import { createFunctionLikeEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";

import type { Symbol } from "typescript";

import type { ConstructorEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createConstructorEntity(ctx: CompilerContext, symbol: Symbol): ConstructorEntity {
  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Constructor);
  return functionLike;
}
