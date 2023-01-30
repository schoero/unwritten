import { createFunctionLikeEntity } from "unwritten:compiler:entities";
import { EntityKind } from "unwritten:compiler:enums/entities.js";

import type { Symbol } from "typescript";

import type { ConstructorEntity } from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createConstructorEntity(ctx: CompilerContext, symbol: Symbol): ConstructorEntity {
  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Constructor);
  return functionLike;
}
